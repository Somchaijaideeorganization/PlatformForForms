import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import QuestionCard from "../QuestionCard";
import { Choice } from "../../../data/type";

const RadioQuestion = ({
  title = "Untitled",
  description = "",
  defaultValue = "",
  choices = [],
}: {
  title?: string;
  description?: string;
  defaultValue?: string;
  choices: Choice[];
}) => {
  return (
    <QuestionCard description={description} title={title}>
      <RadioGroup defaultValue={defaultValue} className="space-y-2">
        {choices.map((choice) => (
          <div key={choice.value} className="flex items-center space-x-2">
            <RadioGroupItem value={choice.value} id={choice.value} />
            <Label htmlFor={choice.value}>{choice.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </QuestionCard>
  );
};

export default RadioQuestion;
