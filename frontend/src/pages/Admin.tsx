import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import QuizForm from "../components/QuizForm";
import QuizList from "../components/QuizList";
import type { Quiz } from "../../shared/schema";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "../components/ui/alert-dialog";

export default function Admin() {
  const [deleteQuizId, setDeleteQuizId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("create");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const initSampleDataMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/init-sample-data");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes"] });
      toast({ 
        title: "Success", 
        description: "Sample quizzes have been added!" 
      });
    },
    onError: (error: Error) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to initialize sample data",
        variant: "destructive" 
      });
    },
  });

  const deleteQuizMutation = useMutation({
    mutationFn: async (quizId: string) => {
      await apiRequest("DELETE", `/api/quizzes/${quizId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes"] });
      toast({ 
        title: "Success", 
        description: "Quiz deleted successfully!" 
      });
      setDeleteQuizId(null);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to delete quiz",
        variant: "destructive" 
      });
    },
  });

  const handleEdit = (quiz: Quiz) => {
    // For now, just switch to create tab
    // In a full implementation, we'd populate the form with quiz data
    console.log(quiz);
    
    setActiveTab("create");
    toast({ 
      title: "Edit Quiz", 
      description: "Quiz editing is not yet implemented. Please create a new quiz instead.",
    });
  };

  const handleDelete = (quizId: string) => {
    setDeleteQuizId(quizId);
  };

  const confirmDelete = () => {
    if (deleteQuizId) {
      deleteQuizMutation.mutate(deleteQuizId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Administration</h1>
            <p className="text-muted-foreground">Create and manage your quizzes</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-2" data-testid="admin-tabs">
                <TabsTrigger value="create" data-testid="create-tab">Create Quiz</TabsTrigger>
                <TabsTrigger value="manage" data-testid="manage-tab">Manage Quizzes</TabsTrigger>
              </TabsList>
              
              <Button
                onClick={() => initSampleDataMutation.mutate()}
                disabled={initSampleDataMutation.isPending}
                variant="outline"
                data-testid="init-sample-data"
              >
                {initSampleDataMutation.isPending ? "Loading..." : "Load Sample Quizzes"}
              </Button>
            </div>

            <TabsContent value="create" className="space-y-6">
              <QuizForm onSuccess={() => setActiveTab("manage")} />
            </TabsContent>

            <TabsContent value="manage" className="space-y-6">
              <QuizList 
                showAdminActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteQuizId} onOpenChange={() => setDeleteQuizId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the quiz and all related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
