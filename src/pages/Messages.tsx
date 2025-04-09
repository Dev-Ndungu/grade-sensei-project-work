
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Mail, Clock, User, Send, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const Messages = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [open, setOpen] = useState(false);

  // Sample data
  const messages = [
    {
      id: 1,
      subject: "Upcoming Math Quiz",
      recipient: "Form 3 Students",
      content: "There will be a math quiz next Monday covering topics from Chapter 5.",
      date: "2025-04-05T10:30:00Z",
      unread: true,
      sender: "You"
    },
    {
      id: 2,
      subject: "Question about Assignment",
      recipient: "Jane Wambui",
      content: "I have a question about the physics assignment due on Friday. Could you provide more clarification on question 3?",
      date: "2025-04-04T14:15:00Z",
      unread: true,
      sender: "John Mwangi"
    },
    {
      id: 3,
      subject: "Parent Meeting Request",
      recipient: "You",
      content: "I would like to schedule a meeting to discuss my child's progress in your class. Please let me know what times would work for you.",
      date: "2025-04-03T09:45:00Z",
      unread: false,
      sender: "Mrs. Ochieng"
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setOpen(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="flex justify-between items-center mb-8 animate-slide-down">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
              <p className="text-muted-foreground">
                Send and receive messages from students and parents
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle size={18} />
                  New Message
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Send Message</DialogTitle>
                  <DialogDescription>
                    Compose a new message to students or parents
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSendMessage}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="recipient">Recipient</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="form1">Form 1 (All)</SelectItem>
                          <SelectItem value="form2">Form 2 (All)</SelectItem>
                          <SelectItem value="form3">Form 3 (All)</SelectItem>
                          <SelectItem value="form4">Form 4 (All)</SelectItem>
                          <SelectItem value="parents">All Parents</SelectItem>
                          <SelectItem value="individual">Individual Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Message subject" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message here"
                        rows={5}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="gap-2">
                      <Send size={16} />
                      Send Message
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs
            defaultValue="inbox"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 gap-2">
              <TabsTrigger value="inbox">
                Inbox
                <span className="ml-1.5 bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-xs">
                  2
                </span>
              </TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

            <TabsContent value="inbox" className="animate-fade-in">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {messages.filter(m => m.sender !== "You").map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex flex-col p-4 hover:bg-muted/30 cursor-pointer transition-colors ${message.unread ? 'bg-primary/5' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              <User size={14} />
                            </div>
                            <div>
                              <h3 className="font-medium">{message.sender}</h3>
                              <p className="text-xs text-muted-foreground">
                                {new Date(message.date).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {message.unread && (
                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                          )}
                        </div>
                        <h4 className="font-medium mb-1">{message.subject}</h4>
                        <p className="text-sm line-clamp-2 text-muted-foreground mb-2">
                          {message.content}
                        </p>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="gap-1">
                            Reply <ChevronRight size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sent" className="animate-fade-in">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {messages.filter(m => m.sender === "You").map((message) => (
                      <div 
                        key={message.id} 
                        className="flex flex-col p-4 hover:bg-muted/30 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-primary" />
                            <div>
                              <h3 className="font-medium">To: {message.recipient}</h3>
                              <p className="text-xs text-muted-foreground">
                                {new Date(message.date).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium mb-1">{message.subject}</h4>
                        <p className="text-sm line-clamp-2 text-muted-foreground">
                          {message.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="archived" className="animate-fade-in">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="rounded-full p-3 bg-muted mb-4">
                    <Mail size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No archived messages</h3>
                  <p className="text-muted-foreground">
                    Archived messages will appear here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </div>
  );
};

export default Messages;
