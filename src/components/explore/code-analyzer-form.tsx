"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { analyzeCode } from "@/app/explore/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, FileText, Bot, AlertCircle } from "lucide-react";

const initialState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="rounded-full w-full sm:w-auto">
      {pending ? (
        <>
          <Bot className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        "Analyze Code"
      )}
    </Button>
  );
}

export function CodeAnalyzerForm() {
  const [state, formAction] = useActionState(analyzeCode, initialState);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <Textarea
              name="codeSnippet"
              placeholder="Paste your code snippet here..."
              rows={15}
              className="font-code bg-background text-base"
              required
            />
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>

      {state.error && (
        <Alert variant="destructive" className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Analysis Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <FileText /> Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Readability Score</p>
                  <p className="font-bold text-lg text-primary-foreground bg-primary px-3 py-1 rounded-full text-sm">
                    {state.result.readabilityScore}/100
                  </p>
                </div>
                <Progress value={state.result.readabilityScore} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Maintainability Score</p>
                  <p className="font-bold text-lg text-accent-foreground bg-accent px-3 py-1 rounded-full text-sm">
                    {state.result.maintainabilityScore}/100
                  </p>
                </div>
                <Progress value={state.result.maintainabilityScore} className="[&>div]:bg-accent" />
              </div>
            </div>
            <div>
              <h4 className="font-headline text-xl mb-3 flex items-center gap-2"><Lightbulb/> Suggestions for Improvement</h4>
              <Card className="bg-secondary/50 p-4 border-dashed">
                 <p className="whitespace-pre-wrap text-secondary-foreground font-code text-sm">{state.result.suggestions}</p>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
