import React from "react";
import { useTransform, useScroll } from "motion/react";
import { ThemeSwitcher } from "./components/theme-switcher";
import AIModal from "./components/ai-modal";
import { getSectionElements } from "./components/QuestionInterpreter";

export default function App() {
  const { scrollYProgress } = useScroll();

  const titleOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bodyOpacity = useTransform(scrollYProgress, [0.25, 1], [0, 1]);

  const questions = getSectionElements([titleOpacity, bodyOpacity]);

  return (
    <>
      <ThemeSwitcher />
      <main className="h-[200vh]">
        <ThemeSwitcher />
        <AIModal />
        {questions}
      </main>
    </>
  );
}
