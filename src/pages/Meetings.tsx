
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { PlusCircle, CalendarIcon, Clock, User, Video, Calendar } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Meetings = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  // Sample data
  const meetings = [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      date: "2025-04-15T14:00:00Z",
      duration: "30 minutes",
      attendees: ["Jane Wambui's Parent", "John Mwangi's Parent"],
      location: "Virtual (Zoom)"
    },
    {
      id: 2,
      title: "Class Progress Review",
      date: "2025-04-18T10:00:00Z",
      duration: "45 minutes",
      attendees: ["Form 3 Teachers", "Principal"],
      location: "Staff Room"
    },
    {
      id: 3,
      title: "Math Competition Prep",
      date: "2025-04-20T15:30:00Z",
      duration: "60 minutes",
      attendees: ["Selected Students (Form 3, Form 4)"],
      location: "Classroom B2"
    }
  ];

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Meeting scheduled successfully!");
    setOpen(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="flex justify-between items-center mb-8 animate-slide-down">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
              <p className="text-muted-foreground">
                Schedule and manage meetings with students, parents and colleagues
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle size={18} />
                  Schedule Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Schedule Meeting</DialogTitle>
                  <DialogDescription>
                    Create a new meeting with students or parents
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleScheduleMeeting}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Meeting Title</Label>
                      <Input id="title" placeholder="Enter meeting title" required />
                    </div>
                    <div className="grid gap-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="time">Time</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="13:00">1:00 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                            <SelectItem value="17:00">5:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="90">1.5 hours</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="attendees">Attendees</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select attendees" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="form1">Form 1 Students</SelectItem>
                          <SelectItem value="form2">Form 2 Students</SelectItem>
                          <SelectItem value="form3">Form 3 Students</SelectItem>
                          <SelectItem value="form4">Form 4 Students</SelectItem>
                          <SelectItem value="parents">Parents</SelectItem>
                          <SelectItem value="individual">Individual Student</SelectItem>
                          <SelectItem value="teachers">Teachers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Room number or virtual link" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Schedule Meeting</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-1">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar size={18} className="text-primary" />
                      <span>{meeting.title}</span>
                    </CardTitle>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>
                        {new Date(meeting.date).toLocaleDateString()} at {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Clock size={16} className="text-muted-foreground mt-0.5" />
                      <span>{meeting.duration}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <User size={16} className="text-muted-foreground mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">Attendees:</span>
                        <span className="text-sm text-muted-foreground">
                          {meeting.attendees.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      {meeting.location.includes("Virtual") ? (
                        <Video size={16} className="text-muted-foreground mt-0.5" />
                      ) : (
                        <span className="i-lucide-map-pin text-muted-foreground" />
                      )}
                      <span>{meeting.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <Button variant="ghost" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Send Reminder
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

export default Meetings;
