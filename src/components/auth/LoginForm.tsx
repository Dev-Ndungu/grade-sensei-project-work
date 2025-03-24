
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is where we would normally connect to a real backend
    // For now, let's simulate a login after a short delay
    setTimeout(() => {
      // Simple validation
      if (!email || !password) {
        toast.error("Please enter both email and password");
        setIsLoading(false);
        return;
      }

      // For demo purposes, let's use some hardcoded credentials
      if (email === "admin@example.com" && password === "password") {
        toast.success("Welcome back, Administrator!");
        navigate("/dashboard");
      } else if (email === "teacher@example.com" && password === "password") {
        toast.success("Welcome back, Teacher!");
        navigate("/dashboard");
      } else if (email === "student@example.com" && password === "password") {
        toast.success("Welcome back, Student!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md glass-card overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl" />
      <CardHeader className="relative space-y-1">
        <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
        <CardDescription>
          Access your GradeSensei account
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="example@school.edu"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-sm text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Password reset functionality coming soon!");
                }}
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-10 w-10 px-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="relative flex flex-col space-y-4 border-t px-6 py-4 bg-muted/30">
        <div className="text-center w-full">
          <p className="text-sm text-muted-foreground mb-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          For demo purposes, use:
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
          <div>
            <div className="font-semibold">Admin</div>
            <div>admin@example.com</div>
          </div>
          <div>
            <div className="font-semibold">Teacher</div>
            <div>teacher@example.com</div>
          </div>
          <div>
            <div className="font-semibold">Student</div>
            <div>student@example.com</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export { LoginForm };
