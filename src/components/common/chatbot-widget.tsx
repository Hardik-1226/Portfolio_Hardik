"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, X, Sparkles } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

interface Topic {
  id: string;
  keywords: string[];
  answer: string;
  chips: string[];
  deeperTopics?: string[];
}

interface Message {
  from: 'user' | 'ai';
  text: string;
  key: string;
}

interface AnswerResult {
  answer: string;
  chips: string[];
  topicId: string | null;
}

// ═══════════════════════════════════════════════════════════════
// STOP WORDS (filtered during tokenization)
// ═══════════════════════════════════════════════════════════════

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'it', 'its', 'i',
  'me', 'my', 'we', 'our', 'you', 'your', 'he', 'his', 'she', 'her',
  'they', 'them', 'their', 'this', 'that', 'these', 'those', 'am',
  'not', 'no', 'but', 'or', 'so', 'if', 'then',
  'just', 'also', 'very', 'really', 'much', 'most', 'some',
  'any', 'all', 'each', 'every', 'both', 'few', 'many', 'such',
  'own', 'same', 'than', 'too', 'only', 'up', 'out',
  'please', 'tell', 'want', 'like', 'need', 'get', 'know',
]);

// ═══════════════════════════════════════════════════════════════
// SKILLS MAP (for "does he know X?" queries)
// ═══════════════════════════════════════════════════════════════

const SKILLS_MAP: Record<string, string> = {
  java: 'Java', javascript: 'JavaScript', js: 'JavaScript', python: 'Python',
  react: 'React.js', reactjs: 'React.js', 'react.js': 'React.js',
  tailwind: 'Tailwind CSS', html: 'HTML5', html5: 'HTML5', css: 'CSS3', css3: 'CSS3',
  mysql: 'MySQL', mongodb: 'MongoDB Atlas', mongo: 'MongoDB Atlas',
  github: 'GitHub', 'socket.io': 'Socket.io', socketio: 'Socket.io',
  vercel: 'Vercel', render: 'Render',
  selenium: 'Selenium', cucumber: 'Cucumber', jmeter: 'JMeter',
  jenkins: 'Jenkins', allure: 'Allure Report', postman: 'Postman', jira: 'Jira',
  pandas: 'Pandas', matplotlib: 'Matplotlib', mediapipe: 'MediaPipe', opencv: 'OpenCV',
  fastapi: 'FastAPI', node: 'Node.js', nodejs: 'Node.js', 'node.js': 'Node.js',
  jwt: 'JWT Authentication', razorpay: 'Razorpay', nextjs: 'Next.js', 'next.js': 'Next.js',
  dsa: 'Data Structures & Algorithms', oop: 'Object-Oriented Programming',
  sql: 'SQL / MySQL', testng: 'TestNG', typescript: 'TypeScript',
};

// ═══════════════════════════════════════════════════════════════
// KNOWLEDGE BASE (from latest resume PDF)
// ═══════════════════════════════════════════════════════════════

const KNOWLEDGE_BASE: Topic[] = [
  {
    id: 'intro',
    keywords: ['hardik', 'yourself', 'introduce', 'about', 'who', 'summary', 'overview', 'profile', 'bio', 'brief', 'varshney', 'resume', 'cv'],
    answer: `I'm **Hardik Varshney**, a Graduate Engineer Trainee at **Coforge** and a B.Tech Computer Science (AIML) student at GL Bajaj Institute, graduating in 2027.\n\nI specialize in full-stack development with **React.js**, **FastAPI**, and **Java**, with real-world experience building e-commerce platforms, AI-powered marketplaces, and legal-automation systems.\n\nI'm also a hackathon winner at **IIIT Delhi**, with top finishes at IIT Delhi and GGSIPU, and have solved **300+ DSA problems** on LeetCode.`,
    chips: ['Work Experience', 'Projects', 'Technical Skills', 'Achievements'],
    deeperTopics: ['experience', 'projects-overview'],
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'number', 'reach', 'connect', 'linkedin', 'github', 'social', 'media', 'handle', 'message', 'call', 'hire', 'hiring', 'recruit'],
    answer: `Here's how you can connect with Hardik:\n• **Email:** hardikvarshney5@gmail.com\n• **Phone:** 7668850124\n• **LinkedIn:** hardik-varshney\n• **GitHub:** Hardik-1226\n• **LeetCode:** Active profile with 300+ problems solved`,
    chips: ['About Hardik', 'Technical Skills', 'Projects'],
  },
  {
    id: 'skills',
    keywords: ['skills', 'tech', 'technical', 'programming', 'languages', 'tools', 'frameworks', 'technologies', 'stack', 'proficient', 'expertise', 'capable', 'frontend', 'backend'],
    answer: `Hardik has a strong and diverse technical skillset:\n• **Languages:** Java, JavaScript, Python\n• **Frontend:** React.js, Tailwind CSS, HTML5, CSS3\n• **Database:** MySQL, MongoDB Atlas\n• **Infrastructure:** GitHub, Socket.io, Vercel, Render\n• **Testing & CI/CD:** Selenium, Cucumber, JMeter, Jenkins, Allure, Postman, Jira\n• **Data & ML:** Pandas, Matplotlib, MediaPipe, OpenCV\n• **Concepts:** OOP, DSA, System Design Fundamentals`,
    chips: ['Projects', 'Work Experience', 'Achievements'],
  },
  {
    id: 'experience',
    keywords: ['experience', 'work', 'job', 'career', 'professional', 'employment', 'working', 'company', 'companies', 'role', 'position', 'intern', 'internship'],
    answer: `Hardik has **two active professional roles**:\n\n**1. Graduate Engineer Trainee — Coforge** (June 2026 – Present)\nWorking on test automation with 120+ Selenium scripts, 95% pass rate, Jenkins CI, and JMeter performance testing.\n\n**2. Freelance Web Developer — Health Plus Innovation** (Jan 2026 – Present)\nRebuilt a pharmaceutical e-commerce platform (11+ pages) from PHP to React.js, live at hpi.co.in, with Razorpay payments and MongoDB Atlas backend.`,
    chips: ['Coforge Details', 'Freelance Details', 'Projects', 'Technical Skills'],
    deeperTopics: ['experience-coforge', 'experience-hpi'],
  },
  {
    id: 'experience-coforge',
    keywords: ['coforge', 'trainee', 'graduate engineer', 'testing', 'automation', 'qa', 'quality'],
    answer: `At **Coforge** (June 2026 – Present), Hardik works as a Graduate Engineer Trainee:\n• Authored and maintained **120+ automated test scripts** using Selenium and Cucumber/BDD\n• Achieved a **95% test pass rate** with comprehensive Allure Report dashboards\n• Conducted **performance/load testing with JMeter** across key API endpoints to identify bottlenecks\n• Integrated automated suites into **Jenkins CI** pipelines with Allure reporting\n• Used **Postman** for API contract testing and **Jira** for sprint bug tracking\n• Collaborated cross-functionally with developers to resolve issues pre-release`,
    chips: ['Freelance Work', 'Projects', 'Technical Skills'],
  },
  {
    id: 'experience-hpi',
    keywords: ['hpi', 'freelance', 'pharmaceutical', 'ecommerce', 'health plus', 'health', 'freelancer'],
    answer: `As a **Freelance Web Developer at Health Plus Innovation Pvt. Ltd.** (Jan 2026 – Present):\n• Rebuilt a pharmaceutical e-commerce platform (**11+ pages**) from legacy PHP to modern **React.js**\n• Platform is live at **hpi.co.in**\n• Built **REST APIs** backed by MongoDB Atlas with **Razorpay** payment integration\n• Implemented **JWT-based authentication** for secure user sessions\n• Improved **technical SEO** by optimizing metadata, routing, and indexing\n• Deployed on **Vercel** with CI/CD pipeline and custom domain`,
    chips: ['Coforge Role', 'Projects', 'Technical Skills'],
  },
  {
    id: 'projects-overview',
    keywords: ['projects', 'project', 'built', 'portfolio', 'applications', 'apps', 'developed', 'created', 'made', 'build'],
    answer: `Hardik has built several impactful projects:\n\n**1. SuvidhaAI** — AI-Powered Hyperlocal Service Marketplace\nServing 100+ active users with geospatial matching, fake-review detection, and real-time chat.\n\n**2. UBlong** — Autonomous Legal Navigator for Stateless Children\nAdopted by 2+ NGOs, with 82% application success rate using AI-driven legal research.\n\n**3. DemoWebShop** — Selenium Test Automation Framework\nJava-based testing framework with 15+ automated test cases, later applied at Coforge.\n\nAsk about any specific project for more details!`,
    chips: ['SuvidhaAI', 'UBlong', 'DemoWebShop'],
    deeperTopics: ['project-suvidhaai', 'project-ublong', 'project-demowebshop'],
  },
  {
    id: 'project-suvidhaai',
    keywords: ['suvidhaai', 'suvidha', 'marketplace', 'hyperlocal', 'service'],
    answer: `**SuvidhaAI** — AI-Powered Hyperlocal Service Marketplace:\n• Built with **React** and **MongoDB Atlas**, now serving **100+ active users**\n• Connects customers with nearby service providers via **geospatial queries** and REST APIs\n• **FastAPI microservice** for fake-review detection using ML\n• **Random Forest demand-prediction model** achieving 85% recommendation success rate\n• **Real-time chat** via Socket.io with 93% delivery success rate\n• **JWT authentication** with role-based access control (User, Provider, Admin)`,
    chips: ['UBlong', 'DemoWebShop', 'All Projects'],
  },
  {
    id: 'project-ublong',
    keywords: ['ublong', 'legal', 'navigator', 'stateless', 'ngo', 'child', 'registration', 'unhcr'],
    answer: `**UBlong** — Autonomous Legal Navigator for Stateless Child Registration:\n• Built with **React** and **FastAPI**, adopted by **2+ NGOs**\n• AI agent that autonomously **researches legal pathways**, identifies missing documents, and drafts multilingual registration applications\n• Achieved an **82% application success rate**\n• Features real-time **case tracking** and AI-driven rejection re-routing\n• Role-based **caseworker dashboard** with Socket.io notifications\n• **JWT authentication** for NGO/UNHCR workflows`,
    chips: ['SuvidhaAI', 'DemoWebShop', 'All Projects'],
  },
  {
    id: 'project-demowebshop',
    keywords: ['demowebshop', 'webshop', 'testng', 'pageobject', 'demo'],
    answer: `**DemoWebShop** — Selenium Test Automation Framework:\n• Built with **Java**, **Selenium 4**, **TestNG**, and **Cucumber/BDD**\n• Follows **Page Object Model** and **Page Factory** design patterns\n• **Data-driven design** using Apache POI/OpenCSV for Excel/CSV test data\n• **15+ automated test cases** covering login, registration, search, cart, and checkout\n• JMeter performance testing achieving **93% success rate**\n• Structured reporting via **Allure** and WebDriverManager\n• This framework foundation was later **applied professionally at Coforge**`,
    chips: ['SuvidhaAI', 'UBlong', 'Work Experience'],
  },
  {
    id: 'education',
    keywords: ['education', 'college', 'degree', 'btech', 'school', 'university', 'qualification', 'study', 'studies', 'academic', 'institute', 'cgpa', 'class', 'marks', 'percentage', 'gpa'],
    answer: `Here's Hardik's educational background:\n• **B.Tech in Computer Science (AIML)** — GL Bajaj Institute of Technology and Management (2023 – 2027)\n• **Class XII** — Rajni Public School — **86%** (2022 – 2023)\n• **Class X** — Rajni Public School — **90%** (2020 – 2021)`,
    chips: ['Work Experience', 'Achievements', 'Technical Skills'],
  },
  {
    id: 'achievements',
    keywords: ['achievements', 'accomplishments', 'awards', 'hackathon', 'hackathons', 'winner', 'won', 'prize', 'competition', 'leetcode', 'problems', 'solved', 'competitive', 'abhyudaya'],
    answer: `Hardik has an impressive track record:\n• **Winner** at IIIT Delhi Hackathon — Infronix'25\n• **Top 10** at IIT Delhi Hackathon — CubeInnovators @Tryst'25\n• **Top 10** at GGSIPU Delhi Hackathon — VesHack'25\n• **Top 300** at Adobe National Hackathon\n• Solved **300+ DSA problems** on LeetCode\n• **PR Lead** — Abhyudaya Club, GL Bajaj Institute (July 2025 – Present)`,
    chips: ['Projects', 'Technical Skills', 'Certifications'],
    deeperTopics: ['certifications'],
  },
  {
    id: 'certifications',
    keywords: ['certification', 'certifications', 'certified', 'certificate', 'oracle', 'credential'],
    answer: `Hardik holds the following certification:\n• **Oracle Generative AI Certification**\n\nThis demonstrates his knowledge of generative AI technologies and modern AI systems.`,
    chips: ['Achievements', 'Technical Skills', 'Projects'],
  },
  {
    id: 'location',
    keywords: ['location', 'city', 'live', 'based', 'address', 'where', 'place', 'hometown', 'state', 'country', 'noida', 'india'],
    answer: `Hardik is based in **Greater Noida, Uttar Pradesh, India**. He currently works at Coforge in Greater Noida and studies at GL Bajaj Institute.`,
    chips: ['About Hardik', 'Contact Info', 'Education'],
  },
  {
    id: 'interests',
    keywords: ['interests', 'passion', 'hobby', 'enjoy', 'hobbies', 'passionate', 'love', 'favorite'],
    answer: `Hardik is passionate about:\n• **Full-stack development** — building end-to-end applications\n• **AI/ML applications** — integrating intelligent features into real products\n• **Test automation** — ensuring software quality at scale\n• **Hackathons** — competing and building under pressure\n• Building **scalable, production-ready** software that solves real problems`,
    chips: ['Projects', 'Achievements', 'Future Goals'],
  },
  {
    id: 'goals',
    keywords: ['goals', 'future', 'aim', 'dream', 'plans', 'aspiration', 'ambition', 'vision', 'next', 'career'],
    answer: `Hardik's goals include:\n• Growing as a **full-stack engineer** working on impactful products\n• Deepening expertise in **AI** and **scalable web technologies**\n• Contributing to **open-source** communities\n• Building smart, intuitive software that enhances user experience\n• Leveraging his testing and development expertise to deliver **high-quality software** at scale`,
    chips: ['About Hardik', 'Projects', 'Technical Skills'],
  },
];

// ═══════════════════════════════════════════════════════════════
// NLP ENGINE
// ═══════════════════════════════════════════════════════════════

/** Levenshtein edit distance for fuzzy matching */
function levenshtein(a: string, b: string): number {
  const m: number[][] = [];
  for (let i = 0; i <= a.length; i++) m[i] = [i];
  for (let j = 0; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + cost);
    }
  }
  return m[a.length][b.length];
}

/** Tokenize input: lowercase, remove punctuation, filter stop words */
function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\w\s.]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOP_WORDS.has(w));
}

/** Score how well a topic matches the given tokens */
function scoreTopic(topic: Topic, tokens: string[]): number {
  let score = 0;
  const matchedKeywords = new Set<string>();

  for (const token of tokens) {
    let bestForToken = 0;

    for (const keyword of topic.keywords) {
      // Exact match (strongest signal)
      if (token === keyword) {
        bestForToken = Math.max(bestForToken, 3);
        matchedKeywords.add(keyword);
        continue;
      }
      // Substring containment (e.g. "test" in "testing")
      if (token.length > 2 && (keyword.includes(token) || token.includes(keyword))) {
        bestForToken = Math.max(bestForToken, 2);
        matchedKeywords.add(keyword);
        continue;
      }
      // Fuzzy match via Levenshtein distance (handles typos)
      if (token.length > 3 && keyword.length > 3) {
        const dist = levenshtein(token, keyword);
        if (dist <= 1) {
          bestForToken = Math.max(bestForToken, 2.5);
          matchedKeywords.add(keyword);
        } else if (dist <= 2) {
          bestForToken = Math.max(bestForToken, 1.5);
          matchedKeywords.add(keyword);
        }
      }
    }

    score += bestForToken;
  }

  // Bonus for matching multiple distinct keywords (stronger relevance signal)
  if (matchedKeywords.size > 1) {
    score += matchedKeywords.size * 0.5;
  }

  return score;
}

/** Split multi-intent queries: "skills and projects" → ["skills", "projects"] */
function splitMultiIntent(input: string): string[] {
  const segments = input.split(/(?:\s+and\s+|\s*,\s*|\s+&\s+|\s+also\s+|\s+plus\s+)/i);
  if (segments.length > 1) {
    return segments.map(s => s.trim()).filter(s => s.length > 2);
  }
  return [input];
}

/** Check if user is asking about a specific skill ("does he know React?") */
function checkSpecificSkill(input: string): string | null {
  const isAskingAboutSkill = /(?:know|use|work\s*with|familiar|experienced|proficient|good\s*at|skilled|expert|does.*(?:use|know|code))/i.test(input);
  if (!isAskingAboutSkill) return null;

  const tokens = tokenize(input.toLowerCase());
  for (const token of tokens) {
    const skillName = SKILLS_MAP[token];
    if (skillName) {
      return `Yes! **${skillName}** is part of Hardik's technical toolkit. He has used it across his professional work and personal projects.\n\nWant to know more about his projects or full skill set?`;
    }
  }
  return null;
}

/** Check conversational patterns: greetings, thanks, goodbyes, etc. */
function checkConversationalPatterns(input: string): { answer: string; chips: string[] } | null {
  const q = input.toLowerCase().trim();

  // Greetings
  const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo', 'hola', 'namaste'];
  if (greetings.some(g => q === g || q.startsWith(g + ' ') || q.startsWith(g + '!'))) {
    return {
      answer: "Hey there! 👋 I'm Hardik's AI assistant. I can tell you all about his **work experience**, **projects**, **technical skills**, **achievements**, and more.\n\nWhat would you like to know?",
      chips: ['About Hardik', 'Work Experience', 'Projects', 'Technical Skills'],
    };
  }

  // Thanks
  if (/\b(thanks|thank\s*you|thx|ty|appreciate)\b/i.test(q)) {
    return {
      answer: "You're welcome! 😊 Feel free to ask anything else about Hardik.",
      chips: ['Projects', 'Achievements', 'Contact Info'],
    };
  }

  // Goodbye
  if (/\b(bye|goodbye|see\s*you|farewell|later|cya)\b/i.test(q)) {
    return {
      answer: "Goodbye! 👋 Feel free to come back anytime. You can also reach Hardik directly at **hardikvarshney5@gmail.com**.",
      chips: ['Contact Info'],
    };
  }

  // How are you
  if (/\b(how\s*are\s*you|how'?s\s*it\s*going|what'?s\s*up|how\s*do\s*you\s*do)\b/i.test(q)) {
    return {
      answer: "I'm doing great, thanks for asking! 😄 I'm here to help you learn about Hardik. What would you like to know?",
      chips: ['About Hardik', 'Projects', 'Work Experience'],
    };
  }

  // What are you / who made you
  if (/\b(who\s*made\s*you|who\s*created\s*you|what\s*are\s*you|who\s*built\s*you|are\s*you\s*ai|are\s*you\s*real|are\s*you\s*a?\s*bot)\b/i.test(q)) {
    return {
      answer: "I'm an **AI assistant** built into Hardik's portfolio website! I use smart NLP pattern matching with fuzzy search, context tracking, and multi-intent detection to understand your questions.\n\nTry asking me anything about Hardik — his projects, skills, experience, or achievements!",
      chips: ['About Hardik', 'Projects', 'Technical Skills'],
    };
  }

  // Compliments
  const compliments = ['good', 'great', 'awesome', 'amazing', 'excellent', 'cool', 'nice', 'impressive', 'wonderful', 'fantastic', 'brilliant', 'beautiful', 'handsome', 'smart', 'intelligent', 'talented', 'genius', 'pro', 'best'];
  if (compliments.some(c => q.includes(c)) && q.length < 60) {
    return {
      answer: "Thank you for the kind words! 😊 Hardik would appreciate that. Is there something specific you'd like to know about him?",
      chips: ['About Hardik', 'Achievements', 'Projects'],
    };
  }

  // Gender
  if (/\b(gender|male|female|boy|girl|man|woman)\b/i.test(q)) {
    return {
      answer: "Hardik is **male**. He's based in Greater Noida, Uttar Pradesh, India.",
      chips: ['About Hardik', 'Contact Info'],
    };
  }

  // Age
  if (/\b(age|old|young|born|birthday|birth)\b/i.test(q)) {
    return {
      answer: "Hardik is a B.Tech student in the **Class of 2027**, currently in his early 20s. He's been actively building projects and working professionally since his college years.",
      chips: ['Education', 'Work Experience', 'Achievements'],
    };
  }

  return null;
}

const FOLLOW_UP_TRIGGERS = ['more', 'elaborate', 'detail', 'details', 'expand', 'deeper', 'continue', 'further'];
const WHAT_ELSE_TRIGGERS = ['else', 'another', 'other', 'different', 'something'];

const FALLBACK_RESPONSES = [
  "I'm not quite sure about that, but I can tell you about Hardik's **projects**, **skills**, **work experience**, **achievements**, or **education**. What interests you?",
  "That's outside my knowledge scope — I'm Hardik's portfolio assistant! Try asking about his **technical skills**, **projects**, or **hackathon achievements**.",
  "I didn't catch that. I'm best at answering questions about Hardik. Ask about his **work at Coforge**, **projects like SuvidhaAI**, or his **LeetCode journey**!",
];

/** Main answer engine: scores all topics, handles context, multi-intent, and follow-ups */
function getSmartAnswer(
  input: string,
  lastTopicId: string | null,
  topicHistory: string[],
): AnswerResult {
  // 1. Check conversational patterns first (greetings, thanks, etc.)
  const conversational = checkConversationalPatterns(input);
  if (conversational) return { ...conversational, topicId: null };

  // 2. Check for specific skill queries ("does he know React?")
  const skillCheck = checkSpecificSkill(input);
  if (skillCheck) {
    return { answer: skillCheck, chips: ['Technical Skills', 'Projects', 'Work Experience'], topicId: 'skills' };
  }

  // 3. Handle follow-up intents ("tell me more", "what else")
  const tokens = tokenize(input.toLowerCase());

  if (tokens.some(t => FOLLOW_UP_TRIGGERS.includes(t)) && lastTopicId) {
    const lastTopic = KNOWLEDGE_BASE.find(t => t.id === lastTopicId);
    if (lastTopic?.deeperTopics) {
      const unvisited = lastTopic.deeperTopics.filter(id => !topicHistory.includes(id));
      if (unvisited.length > 0) {
        const nextTopic = KNOWLEDGE_BASE.find(t => t.id === unvisited[0]);
        if (nextTopic) {
          return { answer: nextTopic.answer, chips: nextTopic.chips, topicId: nextTopic.id };
        }
      }
    }
    return {
      answer: "I've shared all the details I have on that topic. Would you like to explore something else?",
      chips: ['Projects', 'Technical Skills', 'Achievements', 'Education'],
      topicId: null,
    };
  }

  if (tokens.some(t => WHAT_ELSE_TRIGGERS.includes(t)) && lastTopicId) {
    return {
      answer: "Here are some other things I can tell you about Hardik:",
      chips: ['About Hardik', 'Work Experience', 'Projects', 'Technical Skills', 'Achievements', 'Education'],
      topicId: null,
    };
  }

  // 4. Multi-intent detection ("skills and projects")
  const segments = splitMultiIntent(input);
  if (segments.length > 1) {
    const results: { topic: Topic; score: number }[] = [];
    for (const segment of segments) {
      const segTokens = tokenize(segment);
      let bestScore = 0;
      let bestTopic: Topic | null = null;
      for (const topic of KNOWLEDGE_BASE) {
        const s = scoreTopic(topic, segTokens);
        if (s > bestScore) { bestScore = s; bestTopic = topic; }
      }
      if (bestTopic && bestScore >= 2 && !results.some(r => r.topic.id === bestTopic!.id)) {
        results.push({ topic: bestTopic, score: bestScore });
      }
    }
    if (results.length > 1) {
      const combined = results.map(r => r.topic.answer).join('\n\n---\n\n');
      const allChips = [...new Set(results.flatMap(r => r.topic.chips))].slice(0, 4);
      return { answer: combined, chips: allChips, topicId: results[0].topic.id };
    }
  }

  // 5. Score all topics against tokenized input
  const scored = KNOWLEDGE_BASE
    .map(topic => ({ topic, score: scoreTopic(topic, tokens) }))
    .sort((a, b) => b.score - a.score);

  if (scored[0].score >= 2) {
    return { answer: scored[0].topic.answer, chips: scored[0].topic.chips, topicId: scored[0].topic.id };
  }

  // 6. Last-resort fuzzy match against topic IDs
  const q = input.toLowerCase().replace(/\s/g, '');
  for (const topic of KNOWLEDGE_BASE) {
    if (levenshtein(q, topic.id.replace(/-/g, '')) <= 3) {
      return { answer: topic.answer, chips: topic.chips, topicId: topic.id };
    }
  }

  // 7. Fallback with rotating responses
  return {
    answer: FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)],
    chips: ['About Hardik', 'Work Experience', 'Projects', 'Technical Skills'],
    topicId: null,
  };
}

// ═══════════════════════════════════════════════════════════════
// FORMATTED TEXT COMPONENT (renders **bold**, bullets, hr)
// ═══════════════════════════════════════════════════════════════

function FormattedText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        if (line === '---') {
          return <hr key={i} className="border-current opacity-20 my-2" />;
        }

        // Parse **bold** markers within the line
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold text-accent">{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        });

        // Bullet point lines
        if (line.startsWith('• ')) {
          return (
            <div key={i} className="flex gap-1.5 ml-1 items-start">
              <span className="text-accent mt-px flex-shrink-0 text-[10px]">●</span>
              <span className="flex-1">{rendered.slice(1)}</span>
            </div>
          );
        }

        // Empty lines become spacing
        if (line === '') return <div key={i} className="h-1" />;

        return <div key={i}>{rendered}</div>;
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHATBOT WIDGET COMPONENT
// ═══════════════════════════════════════════════════════════════

export function ChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [currentChips, setCurrentChips] = useState<string[]>([]);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const welcomeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contextRef = useRef<{ lastTopicId: string | null; history: string[] }>({
    lastTopicId: null,
    history: [],
  });

  // ── Auto-scroll to bottom ──
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isExpanded) scrollToBottom();
  }, [messages, isTyping, isStreaming, streamingText, isExpanded, scrollToBottom]);

  // ── Keyboard shortcut: Ctrl+K to toggle chat ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsExpanded(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Focus input when chat opens ──
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isExpanded]);

  // ── Cleanup timeouts on unmount ──
  useEffect(() => {
    return () => {
      if (streamTimeoutRef.current) clearTimeout(streamTimeoutRef.current);
      if (welcomeTimeoutRef.current) clearTimeout(welcomeTimeoutRef.current);
    };
  }, []);

  // ── Stream text character-by-character (ChatGPT-style) ──
  const startStreaming = useCallback((fullText: string, chips: string[], topicId: string | null) => {
    setIsStreaming(true);
    setStreamingText('');
    setCurrentChips([]);
    let idx = 0;

    const tick = () => {
      const chunkSize = 1 + Math.floor(Math.random() * 3);
      idx = Math.min(idx + chunkSize, fullText.length);
      setStreamingText(fullText.slice(0, idx));

      if (idx < fullText.length) {
        streamTimeoutRef.current = setTimeout(tick, 8 + Math.random() * 16);
      } else {
        setMessages(prev => [...prev, { from: 'ai', text: fullText, key: `ai-${Date.now()}` }]);
        setStreamingText('');
        setIsStreaming(false);
        setCurrentChips(chips);
        if (topicId) {
          contextRef.current.lastTopicId = topicId;
          contextRef.current.history.push(topicId);
        }
      }
    };

    tick();
  }, []);

  // ── Welcome message on first open ──
  useEffect(() => {
    if (isExpanded && !hasShownWelcome && messages.length === 0) {
      setHasShownWelcome(true);
      const welcomeText = "Hey! 👋 I'm Hardik's AI assistant. I can tell you about his **work experience**, **projects**, **technical skills**, **achievements**, and more.\n\nWhat would you like to know?";
      const welcomeChips = ['About Hardik', 'Work Experience', 'Projects', 'Technical Skills'];
      welcomeTimeoutRef.current = setTimeout(() => {
        startStreaming(welcomeText, welcomeChips, null);
      }, 400);
    }
  }, [isExpanded, hasShownWelcome, messages.length, startStreaming]);

  // ── Send message handler ──
  const handleSend = (messageText?: string) => {
    const text = (messageText || input).trim();
    if (!text || isStreaming || isTyping) return;

    setMessages(prev => [...prev, { from: 'user', text, key: `user-${Date.now()}` }]);
    if (!messageText) setInput('');
    setCurrentChips([]);

    // Show typing indicator briefly, then stream the answer
    setIsTyping(true);
    const typingDelay = 400 + Math.random() * 500;

    setTimeout(() => {
      setIsTyping(false);
      const result = getSmartAnswer(text, contextRef.current.lastTopicId, contextRef.current.history);
      startStreaming(result.answer, result.chips, result.topicId);
    }, typingDelay);
  };

  // ── Close & reset ──
  const handleClose = () => {
    setIsExpanded(false);
    setMessages([]);
    setCurrentChips([]);
    setStreamingText('');
    setIsStreaming(false);
    setIsTyping(false);
    setHasShownWelcome(false);
    if (streamTimeoutRef.current) clearTimeout(streamTimeoutRef.current);
    if (welcomeTimeoutRef.current) clearTimeout(welcomeTimeoutRef.current);
    contextRef.current = { lastTopicId: null, history: [] };
  };

  const isBusy = isTyping || isStreaming;

  return (
    <>
      {/* ── Floating chat toggle button ── */}
      {!isExpanded && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg flex items-center justify-center group"
          aria-label="Open AI Chat (Ctrl+K)"
        >
          <Bot className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-8 right-0 text-[10px] bg-foreground/80 text-background px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Ctrl+K
          </span>
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
        </motion.button>
      )}

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] bg-background/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-accent/20 flex flex-col chatbot-panel"
          >
            {/* ── Header ── */}
            <div className="px-4 py-3 font-bold border-b border-accent/20 flex justify-between items-center bg-gradient-to-r from-accent to-accent/80 rounded-t-2xl">
              <div className="flex items-center space-x-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-background/20 flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-accent" />
                </div>
                <div>
                  <span className="text-accent-foreground text-sm font-semibold block leading-tight">Hardik&apos;s AI Assistant</span>
                  <span className="text-accent-foreground/70 text-[10px] font-normal">Online • Smart NLP</span>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-accent-foreground/80 hover:text-accent-foreground hover:bg-background/30 transition-all"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* ── Messages area ── */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 chatbot-messages" style={{ maxHeight: 380, minHeight: 200 }}>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.key}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`flex items-start gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.from === 'user' ? 'bg-accent' : 'bg-secondary'
                    }`}>
                      {msg.from === 'user'
                        ? <User className="w-3.5 h-3.5 text-accent-foreground" />
                        : <Sparkles className="w-3.5 h-3.5 text-secondary-foreground" />
                      }
                    </div>
                    <div className={`text-sm rounded-2xl px-3.5 py-2.5 max-w-[82%] leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-accent text-accent-foreground rounded-tr-sm'
                        : 'bg-secondary text-secondary-foreground rounded-tl-sm'
                    }`}>
                      {msg.from === 'ai' ? <FormattedText text={msg.text} /> : msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator (3 bouncing dots) */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-secondary-foreground" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="typing-dots flex gap-1">
                      <span /><span /><span />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Streaming message (character-by-character reveal) */}
              {isStreaming && streamingText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-secondary-foreground" />
                  </div>
                  <div className="text-sm bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[82%] leading-relaxed">
                    <FormattedText text={streamingText} />
                    <span className="streaming-cursor" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick reply chips ── */}
            <AnimatePresence>
              {currentChips.length > 0 && !isBusy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-2 flex flex-wrap gap-1.5 overflow-hidden"
                >
                  {currentChips.map((chip, idx) => (
                    <motion.button
                      key={chip}
                      initial={{ opacity: 0, scale: 0.8, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(chip)}
                      className="text-xs px-3 py-1.5 rounded-full border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer font-medium backdrop-blur-sm"
                    >
                      {chip}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input area ── */}
            <div className="flex items-center border-t border-accent/20 bg-background/50 backdrop-blur-sm rounded-b-2xl">
              <input
                ref={inputRef}
                className="flex-1 px-4 py-3 rounded-bl-2xl bg-transparent outline-none text-sm placeholder:text-muted-foreground/60"
                placeholder={isBusy ? 'Thinking...' : 'Ask about Hardik...'}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(); }}
                disabled={isBusy}
              />
              <motion.button
                whileHover={input.trim() && !isBusy ? { scale: 1.1 } : {}}
                whileTap={input.trim() && !isBusy ? { scale: 0.9 } : {}}
                className={`px-4 py-3 rounded-br-2xl transition-all duration-200 ${
                  input.trim() && !isBusy
                    ? 'text-accent hover:bg-accent hover:text-accent-foreground'
                    : 'text-muted-foreground/30 cursor-not-allowed'
                }`}
                onClick={() => handleSend()}
                disabled={isBusy || !input.trim()}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
