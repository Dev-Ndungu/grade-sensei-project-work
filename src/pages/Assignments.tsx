
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, FileText, Clock, BookText, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const Assignments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  // Sample data - would come from API in a real application
  const assignments = [
    {
      id: 1,
      title: "Mathematics Quiz",
      subject: "Mathematics",
      dueDate: "2025-04-15",
      description: "Complete quiz on algebraic expressions",
      class: "Form 3"
    },
    {
      id: 2,
      title: "English Essay",
      subject: "English",
      dueDate: "2025-04-20",
      description: "Write a 500-word essay on climate change",
      class: "Form 4"
    },
    {
      id: 3,
      title: "Chemistry Lab Report",
      subject: "Chemistry",
      dueDate: "2025-04-18",
      description: "Complete lab report for acid-base titration experiment",
      class: "Form 3"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Assignment created successfully!");
    setOpen(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="flex justify-between items-center mb-8 animate-slide-down">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
              <p className="text-muted-foreground">
                Create and manage assignments for your students
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle size={18} />
                  Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Add details for the new assignment. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Assignment Title</Label>
                      <Input id="title" placeholder="Enter assignment title" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="class">Class</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="form1">Form 1</SelectItem>
                            <SelectItem value="form2">Form 2</SelectItem>
                            <SelectItem value="form3">Form 3</SelectItem>
                            <SelectItem value="form4">Form 4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter assignment description and requirements"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Assignment</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-primary" />
                      <span>{assignment.title}</span>
                    </div>
                    <span className="text-sm font-normal px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {assignment.subject}
                    </span>
                  </CardTitle>
                  <CardDescription>For {assignment.class} students</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm line-clamp-2 mb-3">{assignment.description}</p>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock size={14} />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    View Details <ChevronRight size={14} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Assignments;
