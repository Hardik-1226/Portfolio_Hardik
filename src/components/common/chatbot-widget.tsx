"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, X } from 'lucide-react';

const QAPairs = [
  {
    q: ["name", "who are you", "your name", "tell me about yourself", "introduce yourself", "tell me about hardik", "who is hardik", "about hardik", "about you"],
    a: "I'm Hardik Varshney, a B.Tech Computer Science (AIML) student at GL Bajaj Institute. I have hands-on experience in full-stack development, hackathons, and technical leadership. I'm skilled in Java, Python, React, and modern web technologies, with a passion for building scalable real-world applications."
  },
  {
    q: ["contact", "email", "phone", "number", "reach", "connect", "how to contact", "contact details"],
    a: "You can reach me via email at hardikvarshney5@gmail.com or by phone at 7668850124. You can also find me on LinkedIn (hardik-varshney) and GitHub (Hardik-1226)."
  },
  {
    q: ["education", "studies", "academic", "college", "where do you study", "institute", "university", "school", "qualification", "cgpa"],
    a: "I am currently pursuing a B.Tech in Computer Science (AIML) at GL Bajaj Institute of Technology and Management (2023-2027), with a current CGPA of 7.76. Before that, I graduated from Rajni Public School, scoring 86% in Class XII and 90% in Class X."
  },
  {
    q: ["experience", "club", "abhyudaya"],
    a: "I am the PR Lead for the Abhyudaya Club at GL Bajaj Institute, starting from July 2025. My role involves leading PR initiatives, organizing events like the 'Supernova' hackathon with 200+ participants, and building production-level projects."
  },
  {
    q: ["projects", "project", "work", "what have you built", "gestureguy", "shesecure", "schemeease"],
    a: "I've built several projects, including 'GestureGuy,' a gesture-controlled interface using MediaPipe; 'SheSecure,' a women's safety app with AI and real-time alerts; and 'SchemeEase,' an AI-powered government scheme recommender using FastAPI and Supabase."
  },
  {
    q: ["skills", "technical skills", "programming", "languages", "tools", "technologies", "what do you know"],
    a: "My technical skills include: Programming in Java, Python, and C; SQL for queries; Frontend with React and Next.js; Backend with Node.js, FastAPI, and Supabase; and tools like Git, OpenCV, and MediaPipe. I have a strong foundation in Data Structures, Algorithms, and OOP."
  },
  {
    q: ["achievements", "accomplishments", "awards", "hackathon", "leetcode"],
    a: "I was a winner at the IIIT Delhi Hackathon (Infronix'25), I've solved over 150+ DSA problems on LeetCode, and I also organized my college's hackathon, 'Supernova'."
  },
  {
    q: ["certifications", "certified"],
    a: "I have an Oracle Generative AI Certification and a Diploma in Office Automation & Publishing (SEO)."
  },
  {
    q: ["gender", "are you male", "are you female", "what is your gender", "are you a boy", "are you a girl"],
    a: "I am male."
  },
  {
    q: ["location", "where do you live", "your city", "your state", "your address", "where are you from"],
    a: "I am from Greater Noida, Uttar Pradesh, India."
  },
  {
    q: ["interests", "areas", "what interests you", "passion", "hobbies", "what do you like"],
    a: "I'm passionate about blending hardware and software to build real-world tech that feels intuitive and futuristic. I enjoy exploring AI, embedded systems, and creating impactful solutions."
  },
  {
    q: ["future", "goals", "aim", "dream", "plans", "career", "aspirations"],
    a: "My goal is to work on cutting-edge projects in AI and embedded technology, contribute to open-source communities, and build smart, intuitive software that enhances user experience."
  }
];

function getAIAnswer(question: string) {
  const q = question.toLowerCase();

  const compliments = [
    "good", "great", "awesome", "amazing", "excellent", "wonderful", "fantastic", "brilliant",
    "impressive", "nice", "cool", "perfect", "best", "outstanding", "incredible", "superb",
    "marvelous", "exceptional", "terrific", "fabulous", "splendid", "magnificent", "phenomenal",
    "beautiful", "lovely", "handsome", "smart", "intelligent", "talented", "skilled", "gifted",
    "genius", "pro", "expert", "master", "champion", "winner", "successful", "achiever"
  ];

  if (compliments.some(word => q.includes(word))) {
    return "Thank you for your kind words! I'm glad you think so. Is there anything specific you'd like to know about me?";
  }

  const greetings = ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"];
  if (greetings.some(word => q.includes(word))) {
    return "Hello! I'm here to tell you about Hardik. What would you like to know?";
  }

  if (q.includes("thank") || q.includes("thanks")) {
    return "You're welcome! Feel free to ask if you have any other questions about Hardik.";
  }

  const goodbyes = ["bye", "goodbye", "see you", "farewell"];
  if (goodbyes.some(word => q.includes(word))) {
    return "Goodbye! Feel free to come back if you have more questions about Hardik.";
  }

  const generalQuestions = [
    "how are you", "how's it going", "what's up", "how do you do",
    "what's new", "how's your day", "how's everything"
  ];
  if (generalQuestions.some(phrase => q.includes(phrase))) {
    return "I'm doing well, thank you for asking! I'm here to tell you about Hardik. What would you like to know about him?";
  }

  if (q.includes("who made you") || q.includes("who created you") || q.includes("what are you")) {
    return "I'm an AI chatbot created to tell you about Hardik Varshney. I can answer questions about his education, projects, skills, and more!";
  }

  for (const pair of QAPairs) {
    if (pair.q.some(keyword => q.includes(keyword))) {
      return pair.a;
    }
  }

  return "I'm not sure about that. You can ask me about Hardik's education, projects, skills, hackathons, or future goals!";
}

export function ChatbotWidget() {
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string; key: string }[]>([]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
    }
  }, [messages, isTyping, isExpanded]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const currentInput = input;
    setMessages(msgs => [...msgs, { from: 'user', text: currentInput, key: `user-${msgs.length}` }]);
    setInput('');
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'ai', text: getAIAnswer(currentInput), key: `ai-${msgs.length}` }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {!isExpanded && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg flex items-center justify-center text-2xl overflow-hidden"
          aria-label="Open AI Chat"
        >
          <Bot className="w-8 h-8" />
        </motion.button>
      )}
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-background rounded-xl shadow-2xl border border-accent/30 flex flex-col"
          >
            <div className="px-4 py-3 font-bold border-b border-accent/20 flex justify-between items-center bg-accent rounded-t-xl">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center overflow-hidden">
                  <Bot className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="text-accent-foreground">Ask About Hardik</span>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsExpanded(false);
                  setMessages([]);
                }}
                className="w-8 h-8 rounded-full bg-background/80 border border-accent font-bold flex items-center justify-center z-[100] shadow-lg hover:bg-accent hover:text-accent-foreground text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-background/70" style={{ maxHeight: 320 }}>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start space-x-2 ${
                      msg.from === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.from === 'user' ? 'bg-accent' : 'bg-secondary'
                    }`}>
                      {msg.from === 'user' ? <User className="text-accent-foreground text-xs" /> : <Bot className="w-4 h-4 text-secondary-foreground" />}
                    </div>
                    <div className={`text-sm rounded-lg px-3 py-2 max-w-[80%] ${
                      msg.from === 'user' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div
                  key="typing-indicator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start space-x-2"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2">
                    <span className="typing-indicator"></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex border-t border-accent/20 bg-background rounded-b-xl">
              <input
                className="flex-1 px-3 py-2 rounded-bl-xl bg-transparent outline-none text-sm"
                placeholder="Ask me anything about Hardik..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-accent font-bold hover:bg-accent hover:text-accent-foreground rounded-br-xl transition-colors"
                onClick={handleSend}
              >
                <Send />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
