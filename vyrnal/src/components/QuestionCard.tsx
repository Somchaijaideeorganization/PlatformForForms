import { Card, Divider } from "@heroui/react";
import React from "react";

const QuestionCard = ({
  children,
  title = "Untitled",
  description = "",
  isUToQ = false,
  ...props
}: {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  isUToQ?: boolean;
  [key: string]: unknown;
}) => {
  return (
    <Card
      className={"p-8 h-fit w-[90vw] md:w-[80vw] lg:w-[65vw] xl:w-[50vw]"}
      {...props}
    >
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold w-full whitespace-nowrap overflow-auto">
        {(title || "Untitled Question") + " "}
        <span className="text-danger">
          {isUToQ ? "*" : null}
        </span>
      </h1>
      <h2 className="text-sm md:text-base lg:text-lg mt-4 w-full whitespace-nowrap overflow-auto">
        {description}
      </h2>
      <Divider className="my-6" />
      {isUToQ ? (
        <p className="text-danger font-bold p-4">
          ( Unknown Type of Question )
        </p>
      ) : (
        children
      )}
    </Card>
  );
};

export default QuestionCard;
