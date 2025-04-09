
import React from "react";
import { NavBar } from "@/components/NavBar";
import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Calendar, MessageSquareHeart } from "lucide-react";

const Communications = () => {
  const communications = [
    {
      title: "Send Messages",
      description: "Communicate with students and parents",
      icon: <MessageSquare size={24} className="text-primary" />,
      path: "/messages",
      count: 12
    },
    {
      title: "Schedule Meetings",
      description: "Set up parent-teacher conferences",
      icon: <Calendar size={24} className="text-primary" />,
      path: "/meetings",
      count: 3
    },
    {
      title: "Student Feedback",
      description: "View and respond to student questions",
      icon: <MessageSquareHeart size={24} className="text-primary" />,
      path: "/feedback",
      count: 5
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="mb-8 animate-slide-down">
            <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
            <p className="text-muted-foreground">
              Connect with students and parents through various channels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communications.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {item.count > 0 ? (
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 bg-primary rounded-full"></span>
                          <span>
                            {item.count} new {item.count === 1 ? "item" : "items"}
                          </span>
                        </span>
                      ) : (
                        <span>No new items</span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={item.path} className="w-full">
                    <Button className="w-full">Open</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Communications;
