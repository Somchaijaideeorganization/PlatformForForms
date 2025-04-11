"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSwipeable } from "react-swipeable";

// Replace HeroUI components with Shadcn components:
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // using Badge as a stand-in for Chip

// Imports for your own components:
import RadioQuestion from "./variants/Radio";
import QuestionCard from "./QuestionCard";
import Section from "./Section";
import { Form } from "@/data/type"

import { MoveLeft, MoveRight } from "lucide-react";
import { Separator } from "../ui/separator";

export function Carousel({ items }: { items: React.ReactNode[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <motion.div
      className="overflow-hidden w-full min-h-[100vh] flex flex-col gap-4 justify-center items-center bg-gradient-to-b from-background to-background/80"
      {...handlers}
    >
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 opacity-0 md:opacity-100">
        {items.map((_, index) => (
          <motion.div
            key={`indicator-${index}`}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-primary via-purple-500 to-secondary w-8"
                : "w-2 bg-foreground opacity-10"
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Carousel Items */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="relative flex flex-col items-center justify-center w-full h-[75vh]">
          <AnimatePresence mode="wait">
            {items.map((item, index) => {
              const isCurrent = index === currentIndex;
              const isPrev =
                index === (currentIndex - 1 + items.length) % items.length;
              const isNext = index === (currentIndex + 1) % items.length;

              return (
                <motion.div
                  key={index}
                  animate={{
                    opacity: isCurrent ? 1 : isPrev || isNext ? 0.5 : 0,
                    x: isPrev ? -100 : isNext ? 100 : 0,
                    scale: isCurrent ? 1 : 0.9,
                    zIndex: isCurrent ? 10 : isPrev || isNext ? 9 : 8,
                    filter: isCurrent ? "blur(0px)" : "blur(1px)",
                  }}
                  className="absolute flex items-center justify-center w-full h-full px-4"
                  exit={{
                    opacity: 0,
                    x: 0,
                    scale: 0.8,
                    zIndex: 0,
                  }}
                  initial={{
                    opacity: 0,
                    x: isPrev ? -100 : isNext ? 100 : 0,
                    scale: isCurrent ? 1 : 0.9,
                    zIndex: isCurrent ? 10 : isPrev || isNext ? 9 : 8,
                  }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                    opacity: { duration: 0.4 },
                    x: { type: "spring", damping: 30, stiffness: 250 },
                  }}
                >
                  {item}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="flex gap-6 mb-8">
          <Button
            // Use Shadcn Button with a variant for icon-only usage
            variant="secondary"
            size="icon"
            onClick={handlePrev}
          >
            <MoveLeft />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleNext}>
            <MoveRight />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function getFormBody(data: Form) {
  if (!data) return <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">NO DATA INPUT</h2>;

  const bodyElements: React.ReactNode[] = [];

  data.questions.forEach((question) => {
    switch (question.type) {
      case "radio":
        bodyElements.push(
          <RadioQuestion
            choices={question.choices}
            defaultValue={question.defaultValue as string}
            description={question.description}
            title={question.title}
          />
        );
        break;
      default:
        bodyElements.push(
          <QuestionCard
            description={question.description}
            isUToQ={true}
            title={question.title}
          />
        );
    }
  });

  return <Carousel items={bodyElements} />;
}

export function getFormHeader(data: Form) {
  if (!data) return <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">NO DATA INPUT</h2>;
  return (
    <Section key={0}>
      <div className="flex flex-col gap-8 text-center mx-auto max-w-3xl">
        {/* Title & Subtitle */}
        <div className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {data.name}
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {data.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Replace Chip with a Badge acting as a chip-like element */}
          <Badge variant="outline" className="font-medium">
            By {data.author}
          </Badge>

          <div className="flex flex-wrap gap-2 justify-center">
            {data.tags &&
              data.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="font-medium">
                  {tag}
                </Badge>
              ))}
          </div>
        </div>

        <Separator />

        <Button
          className="w-[15vw] min-w-[10rem] mx-auto font-bold text-white"
          variant="default"
          onClick={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          Start Now
        </Button>
      </div>
    </Section>
  );
}
