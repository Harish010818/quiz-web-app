import { createContext, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuizSchema, type CreateQuiz } from "../../shared/schema";
import { useForm, type UseFormReturn } from "react-hook-form";

// ✅ Correct context type
const FormContext = createContext<{ form: UseFormReturn<CreateQuiz> } | null>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<CreateQuiz>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: "",
      category: "",
      difficulty: "easy",
      questions: [{ 
        text: "", 
        options: ["", "", "", ""], 
        correctOption: 0 
    }],
    },
  });

  return (
    <FormContext.Provider value={{ form }}>{children}</FormContext.Provider>
  );
};

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context; // returns { form }
}
