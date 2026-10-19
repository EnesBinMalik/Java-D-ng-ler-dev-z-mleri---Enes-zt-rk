export type ActiveTab = 'homework' | 'even_numbers' | 'code_terminal' | 'analysis' | 'quiz';

export interface LoopStep {
  stepIndex: number;
  i: number;
  divBy3: boolean;
  divBy4: boolean;
  isMatch: boolean;
  sum: number;
  count: number;
  currentAvg: number;
  note: string;
}

export interface HomeworkResult {
  number: number;
  includeZero: boolean;
  matchedNumbers: number[];
  sum: number;
  count: number;
  average: number;
  steps: LoopStep[];
}

export interface EvenNumbersResult {
  number: number;
  includeZero: boolean;
  evens: number[];
  count: number;
  sum: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
