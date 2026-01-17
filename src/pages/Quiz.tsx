import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QUIZ_QUESTIONS, SKILL_CATEGORIES } from '@/data/skills';

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResults(true);
    }
  };

  const score = answers.reduce((acc, ans, i) => acc + (ans === QUIZ_QUESTIONS[i].correctAnswer ? 1 : 0), 0);
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  const reset = () => { setStarted(false); setCurrent(0); setAnswers([]); setShowResults(false); };

  if (!started) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
            <ClipboardCheck className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Healthcare Skill Assessment</h1>
          <p className="text-muted-foreground mb-8">{QUIZ_QUESTIONS.length} questions to evaluate your healthcare knowledge</p>
          <Button onClick={() => setStarted(true)} className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 px-8">
            Start Quiz
          </Button>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${percentage >= 70 ? 'bg-healthcare-green/20' : 'bg-destructive/20'}`}>
            <span className={`text-4xl font-bold ${percentage >= 70 ? 'text-healthcare-green' : 'text-destructive'}`}>{percentage}%</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{percentage >= 70 ? '🎉 Great Job!' : '📚 Keep Learning!'}</h2>
          <p className="text-muted-foreground">You scored {score} out of {QUIZ_QUESTIONS.length}</p>
        </motion.div>

        <Card className="border shadow-card">
          <CardContent className="p-6 space-y-4">
            {QUIZ_QUESTIONS.map((q, i) => (
              <div key={q.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                {answers[i] === q.correctAnswer ? <CheckCircle className="w-5 h-5 text-healthcare-green" /> : <XCircle className="w-5 h-5 text-destructive" />}
                <span className="text-sm text-foreground">{q.question}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={reset} variant="outline" className="gap-2"><RotateCcw className="w-4 h-4" /> Retake Quiz</Button>
        </div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[current];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Question {current + 1} of {QUIZ_QUESTIONS.length}</span>
        <span className="text-sm text-primary">{SKILL_CATEGORIES[question.skillCategory].name}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full gradient-primary" animate={{ width: `${((current + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
      </div>

      <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="border shadow-card">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">{question.question}</h2>
            <div className="space-y-3">
              {question.options.map((option, i) => (
                <button key={i} onClick={() => handleAnswer(i)} className="w-full p-4 text-left rounded-xl border bg-card hover:border-primary hover:bg-primary/5 transition-all text-card-foreground">
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
