import React from "react";
import { Radio, RadioGroup } from "@heroui/react";
import QuestionCard from "../components/QuestionCard";

const RadioQuestion = ({
  title = "Untitled",
  description = "",
  defaultValue = "",
  choices = [],
}) => {
  return (
    <QuestionCard title={title} description={description}>
      <RadioGroup defaultValue={defaultValue}>
        {choices.map((choice) => (
          <Radio
            key={choice.value}
            value={choice.value}
            className="my-[-0.5rem]"
          >
            {choice.label}
          </Radio>
        ))}
      </RadioGroup>
    </QuestionCard>
  );
};

export default RadioQuestion;
