
import React from "react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/Logo";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";

const Register = () => {
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
            <RegisterForm />
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

export default Register;
