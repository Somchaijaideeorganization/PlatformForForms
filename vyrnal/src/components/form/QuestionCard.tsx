import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const QuestionCard = ({
  children,
  title = "Untitled",
  description = "",
  isUToQ = false,
}: {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  isUToQ?: boolean;
}) => {
  return (
    <Card className="p-2 h-fit w-[90vw] md:w-[80vw] lg:w-[65vw] xl:w-[50vw]">
      <CardHeader>
        <CardTitle className="text-lg md:text-3xl">
          {title} {isUToQ && <span className="text-danger">*</span>}
        </CardTitle>
        {description && <CardDescription className="text-sm">{description}</CardDescription>}
      </CardHeader>
      <Separator className="my-6" />
      <CardContent>
        {isUToQ ? (
          <p className="text-danger font-bold p-4">
            ( Unknown Type of Question )
          </p>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
