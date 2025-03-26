/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import data from "../data/data.json";
import { Divider, Button } from "@heroui/react";
import { motion, AnimatePresence } from "motion/react";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { Icon } from "@iconify/react";

import QuestionCard from "./QuestionCard";
import RadioQuestion from "../variants/Radio";
import Section from "./Section";

export function Carousel({ items, style }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
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
    <div
      className="overflow-hidden w-full h-[100vh] fixed top-0 flex flex-col gap-8 justify-center items-center"
      style={style}
      {...handlers}
    >
      {/* Carousel Items */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="relative flex flex-col items-center justify-center w-full h-[80vh]">
          <AnimatePresence>
            {items.map((item, index) => {
              const isCurrent = index === currentIndex;
              const isPrev =
                index === (currentIndex - 1 + items.length) % items.length;
              const isNext = index === (currentIndex + 1) % items.length;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: isPrev ? -200 : isNext ? 200 : 0,
                    scale: isCurrent ? 1 : 0.8,
                    zIndex: isCurrent ? 100 : isPrev || isNext ? 50 : 10,
                  }}
                  animate={{
                    opacity: 1,
                    x: isPrev ? -200 : isNext ? 200 : 0,
                    scale: isCurrent ? 1 : 0.8,
                    zIndex: isCurrent ? 100 : isPrev || isNext ? 50 : 10,
                  }}
                  exit={{
                    zIndex: 1,
                    opacity: 0,
                    x: 0,
                    scale: 0.8,
                  }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                    opacity: { duration: 0.5 },
                    x: { type: "spring", damping: 25, stiffness: 200 },
                  }}
                  className="absolute flex items-center justify-center w-full h-full"
                >
                  {item}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="flex gap-4">
          <Button
            isIconOnly
            radius="full"
            size="lg"
            className="bg-primary-100"
            onPress={handlePrev}
          >
            <Icon icon={"material-symbols:arrow-back-rounded"} />
          </Button>
          <Button
            isIconOnly
            radius="full"
            size="lg"
            className="bg-primary-100"
            onPress={handleNext}
          >
            <Icon icon={"material-symbols:arrow-forward-rounded"} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function getQuestionElements(opacityTransforms) {
  const questionElements = [
    <Section opacityTransform={opacityTransforms[0]}>
      <div className="flex flex-col gap-6 text-center w-[70vw]">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold w-full whitespace-nowrap overflow-hidden text-clip text-primary">
          {data.name}
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl mt-4 w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {data.subtitle}
        </h2>
        <Divider className="my-4" />
      </div>
    </Section>,
  ];

  const bodyElements = [];

  data.questions.forEach((question) => {
    switch (question.type) {
      case "radio":
        bodyElements.push(
          <RadioQuestion
            title={question.title}
            description={question.description}
            defaultValue={question.defaultValue}
            choices={question.choices}
          />
        );
        break;
      default:
        bodyElements.push(
          <QuestionCard
            title={question.title}
            description={question.description}
          >
            <p className="text-red-600 font-bold p-4">
              Unknown Type of Question
            </p>
          </QuestionCard>
        );
    }
  });

  questionElements.push(
    <Carousel style={{ opacity: opacityTransforms[1] }} items={bodyElements} />
  );
  return questionElements;
}
