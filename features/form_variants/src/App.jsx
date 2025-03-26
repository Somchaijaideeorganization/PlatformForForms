import React from "react";
import Section from "./components/Section";
import { useTransform, useScroll } from "motion/react";
import { ThemeSwitcher } from "./components/theme-switcher";
import { getQuestionElements } from "./components/QuestionInterpreter";

import RadioQuestion from "./variants/Radio";

export default function App() {
  const { scrollYProgress } = useScroll();

  const titleOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bodyOpacity = useTransform(scrollYProgress, [0.25, 1], [0, 1]);

  const questions = getQuestionElements([titleOpacity, bodyOpacity]);

  return (
    <>
      <ThemeSwitcher />
      <main className="h-[200vh]">
        <ThemeSwitcher />
        {questions}
      </main>
    </>
  );
}
