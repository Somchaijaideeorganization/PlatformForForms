"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { getFormBody } from "@/components/form/renderer";

// Import ShadCN UI components (โปรดตรวจสอบ path ให้ตรงกับโปรเจกต์ของคุณ)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Chip } from "@/components/ui/chip";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Code } from "@/components/ui/code";
import { Question, FormJSON } from "@/data/type";
import "../globals.css";
import { Plus, Trash2, Send } from "lucide-react";

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
      value: " ",
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
    if (field === "value" && value === "") {
      updatedQuestions[questionIndex].choices[choiceIndex][field] = " ";
    } else updatedQuestions[questionIndex].choices[choiceIndex][field] = value;

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
    if (
      !formData.name ||
      !formData.subtitle ||
      !formData.questions.length ||
      !formData.author
    ) {
      setPostedLabel("Please fill in all required fields.");
    } else {
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
    }
  };

  return (
    <div className="min-h-screen bg-content1 p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Card สำหรับ Form Generator */}
        <Card className="p-6">
          <h2 className="mb-6 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Vyrnal Form Generator</h2>

          <div className="space-y-4">
            {/* Input สำหรับ Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Input สำหรับ Subtitle */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                placeholder="Enter subtitle"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
              />
            </div>

            {/* Input สำหรับ Author */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Author</label>
              <Input
                placeholder="Enter author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="w-full">
                  <label className="text-sm font-medium">Tags</label>
                  <Input
                    placeholder="Add a tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                  />
                </div>
                <Button onClick={addTag} className="h-full self-end">
                  <Plus />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Chip key={tag} onClose={() => removeTag(tag)}>
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Questions</h2>
                <Button
                  onClick={addQuestion}
                  className="flex items-center gap-2"
                >
                  <Plus />
                  Add Question
                </Button>
              </div>

              <Accordion type="multiple">
                {formData.questions.map((question, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`item-${questionIndex}`}
                  >
                    <AccordionTrigger>
                      <div className="flex w-full items-center justify-between">
                        <span>
                          {question.title || `Question ${questionIndex + 1}`}
                        </span>
                        <Button
                          className="text-destructive hover:opacity-80"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQuestion(questionIndex);
                          }}
                          asChild
                        >
                          Remove
                        </Button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4">
                        {/* Question Title */}
                        <div className="space-y-1">
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            placeholder="Question title"
                            value={question.title}
                            onChange={(e) =>
                              updateQuestion(
                                questionIndex,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Question Description */}
                        <div className="space-y-1">
                          <label className="text-sm font-medium">
                            Description
                          </label>
                          <Input
                            placeholder="Question description"
                            value={question.description}
                            onChange={(e) =>
                              updateQuestion(
                                questionIndex,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Select สำหรับ Question Type */}
                        <div className="space-y-1">
                          <Select
                            value={question.type}
                            onValueChange={(value) =>
                              updateQuestion(questionIndex, "type", value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Question type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="radio">Radio</SelectItem>
                              {/* Additional SelectItem components */}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Choices */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Choices</h3>
                            <Button
                              variant="outline"
                              onClick={() => addChoice(questionIndex)}
                              className="flex items-center gap-2"
                              asChild
                            >
                              <div>
                                <Plus />
                                Add Choice
                              </div>
                            </Button>
                          </div>

                          {question.choices.map((choice, choiceIndex) => (
                            <div
                              key={choiceIndex}
                              className="flex gap-2 items-center"
                            >
                              <Input
                                placeholder="Value"
                                value={choice.value}
                                onChange={(e) =>
                                  updateChoice(
                                    questionIndex,
                                    choiceIndex,
                                    "value",
                                    e.target.value
                                  )
                                }
                              />
                              <Input
                                placeholder="Label"
                                value={choice.label}
                                onChange={(e) =>
                                  updateChoice(
                                    questionIndex,
                                    choiceIndex,
                                    "label",
                                    e.target.value
                                  )
                                }
                              />
                              <Button
                                className="p-2 text-destructive hover:opacity-80"
                                onClick={() =>
                                  removeChoice(questionIndex, choiceIndex)
                                }
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Separator />
                        {/* Select สำหรับ Default Value */}
                        <div className="space-y-1">
                          <Select
                            value={question.defaultValue}
                            onValueChange={(value) =>
                              updateQuestion(
                                questionIndex,
                                "defaultValue",
                                value
                              )
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select default value" />
                            </SelectTrigger>
                            <SelectContent>
                              {question.choices.map((choice) => (
                                <SelectItem
                                  key={choice.value}
                                  value={choice.value}
                                >
                                  {choice.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Card>

        {/* Card สำหรับแสดง JSON และ Post Form */}
        <Card className="p-6">
          <Code className="whitespace-pre-wrap text-sm p-3">
            {JSON.stringify(formData, null, 2)}
          </Code>
        </Card>
        <h3 className="text-center scroll-m-20 text-2xl font-semibold tracking-tight">Questions Preview</h3>
        {getFormBody(formData)}
        <div className="flex flex-col items-end mt-6 gap-4">
          <Button
            variant="secondary"
            onClick={PostForm}
            className="flex items-center gap-2"
            disabled={isPosting}
          >
            <Send />
            Post Form
          </Button>
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">{postedLabel}</h3>
        </div>
      </div>
    </div>
  );
}
