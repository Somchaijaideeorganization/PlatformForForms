"use client";

import { Divider, Button, Chip } from "@heroui/react";
import { motion, AnimatePresence } from "motion/react";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { Icon } from "@iconify/react";

import RadioQuestion from "../variants/Radio";

import QuestionCard from "./QuestionCard";
import Section from "./Section";
import { Form } from "@/data/type";

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
                : "bg-default-200 w-2"
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
                    filter: isCurrent ? "blur(0px)" : "blur(2px)",
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
            isIconOnly
            className="bg-primary text-white shadow-md hover:bg-primary/90 transition-all"
            radius="full"
            size="lg"
            onPress={handlePrev}
          >
            <Icon
              icon={"material-symbols:arrow-back-rounded"}
              className="text-xl"
            />
          </Button>
          <Button
            isIconOnly
            className="bg-primary text-white shadow-md hover:bg-primary/90 transition-all"
            radius="full"
            size="lg"
            onPress={handleNext}
          >
            <Icon
              icon={"material-symbols:arrow-forward-rounded"}
              className="text-xl"
            />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function getSectionElements(data: Form) {
  if (!data) return <h1>NO DATA INPUT</h1>;

  const questionElements = [
    <Section key={0}>
      <div className="flex flex-col gap-8 text-center mx-auto max-w-3xl">
        {/* Title & Subtitle */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {data.name}
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-foreground/80 font-light">
            {data.subtitle}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Chip
            size="sm"
            variant="flat"
            color="primary"
            className="font-medium"
          >
            By {data.author}
          </Chip>

          <div className="flex flex-wrap gap-2 justify-center">
            {data.tags &&
              data.tags.map((tag, index) => (
                <Chip
                  key={index}
                  size="sm"
                  variant="dot"
                  color="secondary"
                  className="font-medium"
                >
                  {tag}
                </Chip>
              ))}
          </div>
        </div>

        <Divider className="my-2 w-[40%] mx-auto opacity-50" />

        <Button
          className="w-[15vw] min-w-[10rem] mx-auto font-bold text-white"
          color="primary"
          radius="full"
          size="lg"
          onPress={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          Start Now
        </Button>
      </div>
    </Section>,
  ];

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

  questionElements.push(<Carousel key={1} items={bodyElements} />);

  return questionElements;
}
