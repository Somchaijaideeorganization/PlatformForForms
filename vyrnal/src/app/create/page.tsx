"use client";
import React, { useEffect } from "react";
import {
  Button,
  Card,
  Input,
  Accordion,
  AccordionItem,
  Chip,
  Select,
  SelectItem,
  Code,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Question, FormJSON } from "@/data/type";
import "../globals.css";

import axios from "axios";

export default function App() {
  const [isPosting, setIsPosting] = React.useState(false);
  const [postedLabel, setPostedLabel] = React.useState("");

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [formData, setFormData] = React.useState<FormJSON>({
    name: "",
    subtitle: "",
    author: "",
    tags: [],
    questions: [],
  });

  const [currentTag, setCurrentTag] = React.useState("");

  const addTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag],
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          title: `Question ${formData.questions.length + 1}`,
          description: "",
          type: "text",
          defaultValue: "",
          choices: [],
        },
      ],
    });
  };

  const updateQuestion = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const addChoice = (questionIndex: number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].choices.push({
      value: "",
      label: "",
    });
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const updateChoice = (
    questionIndex: number,
    choiceIndex: number,
    field: "value" | "label",
    value: string
  ) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].choices[choiceIndex][field] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const removeChoice = (questionIndex: number, choiceIndex: number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].choices.splice(choiceIndex, 1);
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const removeQuestion = (index: number) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
  };

  const PostForm = async () => {
    setIsPosting(true);
    setPostedLabel("Posting...");
    try {
      const response = await axios.post(
        "https://vyrnal-db-api.vercel.app/addForm",
        {
          data: formData,
          author: formData.author,
          tags: formData.tags,
        }
      );
      setPostedLabel(`Form Posted! ID | ${response.data.record.id}`);
    } catch (error) {
      setPostedLabel("Error | See in console");
      console.error(error);
    }
    setIsPosting(false);
  };

  return (
    <div className="min-h-screen bg-content1 p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <Card className="p-6">
          <h1 className="mb-6 text-2xl font-bold">Vyrnal Form Generator</h1>

          <div className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter name"
              value={formData.name}
              onValueChange={(value) =>
                setFormData({ ...formData, name: value })
              }
            />

            <Input
              label="Subtitle"
              placeholder="Enter subtitle"
              value={formData.subtitle}
              onValueChange={(value) =>
                setFormData({ ...formData, subtitle: value })
              }
            />

            <Input
              label="Author"
              placeholder="Enter author"
              value={formData.author}
              onValueChange={(value) =>
                setFormData({ ...formData, author: value })
              }
            />

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  label="Tags"
                  placeholder="Add a tag"
                  value={currentTag}
                  onValueChange={setCurrentTag}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                />
                <Button
                  color="primary"
                  isIconOnly
                  onPress={addTag}
                  className="self-end"
                >
                  <Icon icon="lucide:plus" className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Chip key={tag} onClose={() => removeTag(tag)} variant="flat">
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Questions</h2>
                <Button
                  color="primary"
                  onPress={addQuestion}
                  startContent={<Icon icon="lucide:plus" className="h-4 w-4" />}
                >
                  Add Question
                </Button>
              </div>

              <Accordion>
                {formData.questions.map((question, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    title={
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {question.title || `Question ${questionIndex + 1}`}
                        </span>
                        <div
                          className="p-2 text-danger cursor-pointer hover:opacity-80"
                          onClick={() => removeQuestion(questionIndex)}
                        >
                          Remove
                        </div>
                      </div>
                    }
                  >
                    <div className="space-y-4 p-4">
                      <Input
                        label="Title"
                        placeholder="Question title"
                        value={question.title}
                        onValueChange={(value) =>
                          updateQuestion(questionIndex, "title", value)
                        }
                      />

                      <Input
                        label="Description"
                        placeholder="Question description"
                        value={question.description}
                        onValueChange={(value) =>
                          updateQuestion(questionIndex, "description", value)
                        }
                      />

                      <Select
                        label="Type"
                        selectedKeys={[question.type]}
                        onChange={(e) =>
                          updateQuestion(questionIndex, "type", e.target.value)
                        }
                      >
                        <SelectItem key="radio">Radio</SelectItem>
                      </Select>

                      <Select
                        label="Default Value"
                        value={question.defaultValue}
                        onChange={(e) =>
                          updateQuestion(
                            questionIndex,
                            "defaultValue",
                            e.target.value
                          )
                        }
                      >
                        {question.choices.map((choice) => (
                          <SelectItem key={choice.value}>
                            {choice.label}
                          </SelectItem>
                        ))}
                      </Select>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Choices</h3>
                          <div
                            className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover"
                            onClick={() => addChoice(questionIndex)}
                          >
                            <Icon icon="lucide:plus" className="h-4 w-4" />
                            Add Choice
                          </div>
                        </div>

                        {question.choices.map((choice, choiceIndex) => (
                          <div key={choiceIndex} className="flex gap-2">
                            <Input
                              placeholder="Value"
                              size="sm"
                              value={choice.value}
                              onValueChange={(value) =>
                                updateChoice(
                                  questionIndex,
                                  choiceIndex,
                                  "value",
                                  value
                                )
                              }
                            />
                            <Input
                              placeholder="Label"
                              size="sm"
                              value={choice.label}
                              onValueChange={(value) =>
                                updateChoice(
                                  questionIndex,
                                  choiceIndex,
                                  "label",
                                  value
                                )
                              }
                            />
                            <div
                              className="p-2 text-danger cursor-pointer hover:opacity-80 bg-transparent"
                              onClick={() =>
                                removeChoice(questionIndex, choiceIndex)
                              }
                            >
                              <Icon icon="lucide:trash" className="h-4 w-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <Code className="whitespace-pre-wrap text-sm p-3">
            {JSON.stringify(formData, null, 2)}
          </Code>
          <div className="flex flex-col items-end mt-6">
            <Button
              color="primary"
              onPress={PostForm}
              startContent={
                <Icon icon="material-symbols:post-add" className="h-4 w-4" />
              }
              disabled={isPosting}
            >
              Post Form
            </Button>
            <h1 className="mt-6">{postedLabel}</h1>
          </div>
        </Card>
      </div>
    </div>
  );
}
