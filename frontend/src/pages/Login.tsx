import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import type { InsertUser } from "../../shared/schema";
import { navigate } from "wouter/use-browser-location";
import { useAuth } from "../contexts/AuthUserContext";

export default function Login() {
 
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
   
  const { fetchUser } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUserMutation = useMutation({
    mutationFn: async (data: Omit<InsertUser, "username">) => {
      const response = await apiRequest("POST", "/api/v1/user/login", data);
      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      toast({ title: "Success", description: "Quiz created successfully!" });
      //onSuccess?.();
      fetchUser();
      navigate("/");
    },

    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create quiz",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email: form.email,
      password: form.password,
    };

    console.log("payload ready:", payload);
    loginUserMutation.mutate(payload);
  };

  const handleGoogle = () => {
    console.log("Google Auth");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[-100px] right-[-60px] w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px] w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary-foreground"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm mt-1 text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-primary hover:underline underline-offset-2"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-muted border border-border text-foreground text-sm font-medium hover:opacity-80 active:scale-95 transition-all duration-200 mb-6 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-medium">
            or sign in with email
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl px-4 py-2.5 text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-foreground">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs font-medium text-primary hover:underline underline-offset-2"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full rounded-xl px-4 py-2.5 pr-11 text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/30 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center mt-4 text-muted-foreground">
          Protected by reCAPTCHA · Subject to our{" "}
          <a
            href="/privacy"
            className="text-primary hover:underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}