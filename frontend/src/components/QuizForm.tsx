import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuiz } from "../../shared/schema";
// import  { createQuizSchema }  from "../../shared/schema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Plus, Trash2 } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";

interface QuizFormProps {
  onSuccess?: () => void;
}

export default function QuizForm({ onSuccess }: QuizFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CreateQuiz>({
    // resolver: zodResolver(createQuizSchema),

    defaultValues: {
      title: "",
      category: "Science",
      difficulty: "medium",
      questions: [
        {
          text: "",
          options: ["", "", "", ""],
          correctOption: 0,
        }
      ],
    },
  });

  const createQuizMutation = useMutation({
    mutationFn: async (data: CreateQuiz) => {
      const response = await apiRequest("POST", "/api/quizzes", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes"] });
      toast({ title: "Success", description: "Quiz created successfully!" });
      form.reset();
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create quiz",
        variant: "destructive"
      });
    },
  });

  const addQuestion = () => {
    const currentQuestions = form.getValues("questions");
    form.setValue("questions", [
      ...currentQuestions,
      {
        text: "",
        options: ["", "", "", ""],
        correctOption: 0,
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    const currentQuestions = form.getValues("questions");
    if (currentQuestions.length > 1) {
      form.setValue("questions", currentQuestions.filter((_, i) => i !== index));
    }
  };

  const onSubmit = (data: CreateQuiz) => {
    createQuizMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">Create New Quiz</h2>
        <p className="text-muted-foreground">Add questions and options to build your quiz</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Quiz Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quiz Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter quiz title..."
                          {...field}
                          data-testid="quiz-title-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="quiz-category-select">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Geography">Geography</SelectItem>
                          <SelectItem value="Astronomy">Astronomy</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-48" data-testid="quiz-difficulty-select">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Questions Section */}
              <div className="border-t border-border pt-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-foreground">Questions</h3>
                  <Button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center gap-2"
                    data-testid="add-question-button"
                  >
                    <Plus className="w-5 h-5" />
                    Add Question
                  </Button>
                </div>

                <div className="space-y-8">
                  {form.watch("questions").map((_, questionIndex) => (
                    <Card key={questionIndex} className="bg-muted/50">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                          {form.watch("questions").length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeQuestion(questionIndex)}
                              className="text-destructive hover:bg-destructive/10"
                              data-testid={`remove-question-${questionIndex}`}
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`questions.${questionIndex}.text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question Text *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter your question..."
                                  className="resize-none"
                                  rows={2}
                                  {...field}
                                  data-testid={`question-text-${questionIndex}`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Options */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">
                            Options (Select the correct answer)
                          </Label>

                          <FormField
                            control={form.control}
                            name={`questions.${questionIndex}.correctOption`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    value={field.value.toString()}
                                    onValueChange={(value) => field.onChange(parseInt(value))}
                                    className="space-y-3"
                                  >
                                    {[0, 1, 2, 3].map((optionIndex) => (
                                      <div key={optionIndex} className="flex items-center gap-3">
                                        <RadioGroupItem
                                          value={optionIndex.toString()}
                                          id={`q${questionIndex}-option${optionIndex}`}
                                          data-testid={`question-${questionIndex}-correct-${optionIndex}`}
                                        />
                                        <FormField
                                          control={form.control}
                                          name={`questions.${questionIndex}.options.${optionIndex}`}
                                          render={({ field }) => (
                                            <FormItem className="flex-1">
                                              <FormControl>
                                                <Input
                                                  placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                                  {...field}
                                                  data-testid={`question-${questionIndex}-option-${optionIndex}`}
                                                />
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-border">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={createQuizMutation.isPending}
                  data-testid="save-quiz-button"
                >
                  {createQuizMutation.isPending ? "Saving..." : "Save Quiz"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  data-testid="reset-form-button"
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}