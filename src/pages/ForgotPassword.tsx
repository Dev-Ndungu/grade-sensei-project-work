
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast.success("Password reset email sent successfully");
    } catch (error: any) {
      toast.error(error.message || "Error sending reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6">
        <Container>
          <div className="flex items-center justify-between">
            <Logo />
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              Back to Login
            </Link>
          </div>
        </Container>
      </header>

      <main className="flex-grow flex items-center justify-center py-12">
        <Container>
          <div className="max-w-md mx-auto">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                  Enter your email address and we'll send you a link to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center p-4">
                    <div className="mb-4 text-green-500 bg-green-50 p-3 rounded-md">
                      We've sent you an email with instructions to reset your password.
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please check your inbox and follow the link in the email.
                    </p>
                    <Link to="/" className="text-primary hover:underline">
                      Return to login
                    </Link>
                  </div>
                ) : (
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
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </form>
                )}
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link to="/" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </main>

      <footer className="py-6 border-t">
        <Container>
          <div className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} GradeSensei. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default ForgotPassword;
