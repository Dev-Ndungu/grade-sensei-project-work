
import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/LoginForm";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="py-6">
        <Container>
          <div className="flex items-center justify-between">
            <Logo />
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </Container>
      </header>

      <main className="flex-grow">
        <section className="py-12 md:py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-6 animate-slide-up">
                <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700">
                  <span className="font-medium">Kenyan Schools Edition</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Intuitive Grade Management for{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                    Kenyan Secondary Schools
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground md:pr-10">
                  A simple, beautiful, and powerful grade management system designed specifically for Kenyan schools.
                </p>
                <div className="space-y-3">
                  {[
                    "Seamless grade entry & calculation",
                    "Generates student report cards",
                    "Secure role-based access control",
                  ].map((feature, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#learn-more">
                    <Button size="lg" className="gap-2">
                      Learn More <ArrowRight size={16} />
                    </Button>
                  </a>
                  <Link to="/dashboard">
                    <Button variant="outline" size="lg">
                      View Demo
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl blur-xl opacity-70 animate-pulse"></div>
                  <LoginForm />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary" id="learn-more">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16 animate-in-delay-1">
              <h2 className="text-3xl font-bold mb-4">
                Designed for Kenyan Educational Excellence
              </h2>
              <p className="text-lg text-muted-foreground">
                GradeSensei provides educators with the tools they need to focus on what matters most: teaching.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in-delay-2">
              {[
                {
                  title: "For Teachers",
                  description:
                    "Effortlessly input grades, track student progress, and generate comprehensive reports.",
                  delay: "animate-in-delay-1",
                },
                {
                  title: "For Administrators",
                  description:
                    "Manage users, configure system settings, and monitor school-wide academic performance.",
                  delay: "animate-in-delay-2",
                },
                {
                  title: "For Students",
                  description:
                    "Access grades securely, track progress over time, and download personal report cards.",
                  delay: "animate-in-delay-3",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`glass-card p-6 flex flex-col h-full ${feature.delay}`}
                >
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Logo size="sm" />
              <span className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} GradeSensei. All rights reserved.
              </span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                Privacy
              </Button>
              <Button variant="ghost" size="sm">
                Terms
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Index;
