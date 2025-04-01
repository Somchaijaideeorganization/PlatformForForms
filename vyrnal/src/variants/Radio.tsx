import React from "react";
import { Radio, RadioGroup } from "@heroui/react";

import QuestionCard from "../components/QuestionCard";
import { Choice } from "../data/type";

const RadioQuestion = ({
  title = "Untitled",
  description = "",
  defaultValue = "",
  choices = [],
}: {
  title: string;
  description: string;
  defaultValue: string;
  choices: Choice[];
}) => {
  return (
    <QuestionCard description={description} title={title}>
      <RadioGroup defaultValue={defaultValue}>
        {choices.map((choice) => (
          <Radio
            key={choice.value}
            className="my-[-0.5rem]"
            value={choice.value}
          >
            {choice.label}
          </Radio>
        ))}
      </RadioGroup>
    </QuestionCard>
  );
};

export default RadioQuestion;
