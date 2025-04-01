export interface Choice {
  value: string;
  label: string;
}

export interface Question {
  title: string;
  description: string;
  type: string;
  defaultValue?: string;
  choices: Choice[];
}

export type Form = {
  name: string;
  subtitle: string;
  questions: Question[];
  author: string;
  tags: string[];
} | null;
export interface FormJSON {
  name: string;
  subtitle: string;
  questions: Question[];
  author: string;
  tags: string[];
}
