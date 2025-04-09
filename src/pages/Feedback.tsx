
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquareHeart, Search, Send, User } from "lucide-react";
import { toast } from "sonner";

const Feedback = () => {
  // Sample data
  const feedbacks = [
    {
      id: 1,
      student: "John Mwangi",
      avatar: "",
      message: "I'm struggling to understand the algebraic expressions section. Could you provide additional examples?",
      date: "2025-04-07T09:15:00Z",
      subject: "Mathematics",
      replied: false
    },
    {
      id: 2,
      student: "Jane Wambui",
      avatar: "",
      message: "Thank you for the extra help on the chemistry lab report. It really helped me understand the concepts better.",
      date: "2025-04-06T14:30:00Z",
      subject: "Chemistry",
      replied: true
    },
    {
      id: 3,
      student: "David Omondi",
      avatar: "",
      message: "I found the group assignment challenging but very engaging. Could we have more collaborative projects like this?",
      date: "2025-04-05T11:45:00Z",
      subject: "English",
      replied: false
    },
    {
      id: 4,
      student: "Sarah Njeri",
      avatar: "",
      message: "The online resources you shared were very helpful for preparing for the physics exam. Could you recommend more practice problems?",
      date: "2025-04-04T16:20:00Z",
      subject: "Physics",
      replied: true
    }
  ];

  const handleReply = (id: number) => {
    toast.success("Reply sent successfully!");
  };

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="mb-8 animate-slide-down">
            <h1 className="text-3xl font-bold tracking-tight">Student Feedback</h1>
            <p className="text-muted-foreground">
              View and respond to student questions and feedback
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search feedback by student or subject..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                All
              </Button>
              <Button variant="outline">
                Unread
              </Button>
              <Button variant="outline">
                Replied
              </Button>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in">
            {feedbacks.map((feedback) => (
              <Card key={feedback.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {feedback.avatar ? (
                          <AvatarImage src={feedback.avatar} alt={feedback.student} />
                        ) : (
                          <AvatarFallback>
                            <User size={18} />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{feedback.student}</CardTitle>
                        <CardDescription>
                          {new Date(feedback.date).toLocaleDateString()},{" "}
                          {new Date(feedback.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={feedback.replied ? "outline" : "default"}>
                      {feedback.subject}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex gap-3">
                    <div className="w-8 flex justify-center">
                      <MessageSquareHeart size={18} className="text-primary" />
                    </div>
                    <p className="flex-1">{feedback.message}</p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  {feedback.replied ? (
                    <p className="text-sm text-muted-foreground">
                      You've already replied to this feedback
                    </p>
                  ) : (
                    <div className="flex gap-3 w-full">
                      <div className="w-8 flex justify-center">
                        <Send size={16} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 flex gap-2">
                        <Textarea 
                          placeholder="Type your response..."
                          className="flex-1"
                          rows={1}
                        />
                        <Button onClick={() => handleReply(feedback.id)}>
                          Send
                        </Button>
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Feedback;
