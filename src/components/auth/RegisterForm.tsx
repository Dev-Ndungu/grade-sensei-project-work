
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";
import { registerSchema, RegisterFormValues } from "./RegisterSchema";

const RegisterForm = () => {
  const { signUp, isLoading } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await signUp(values.email, values.password, values.fullName);
  };

  return (
    <Card className="w-full max-w-md glass-card overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl" />
      <CardHeader className="relative space-y-1">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Join GradeSensei and start managing your grades
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput 
              form={form}
              name="fullName"
              label="Full Name"
              placeholder="John Doe"
              icon={User}
            />

            <TextInput 
              form={form}
              name="email"
              label="Email"
              placeholder="example@school.edu"
              icon={Mail}
              type="email"
            />

            <PasswordInput 
              form={form}
              name="password"
              label="Password"
              description="Must be at least 8 characters"
            />

            <PasswordInput 
              form={form}
              name="confirmPassword"
              label="Confirm Password"
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="relative flex justify-center border-t px-6 py-4 bg-muted/30">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export { RegisterForm };
