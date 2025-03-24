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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  Activity,
  BarChart2,
} from "lucide-react";

// Sample data for demonstration
const performanceData = [
  { name: "Term 1", Mathematics: 68, English: 75, Physics: 62, Chemistry: 70, Biology: 72 },
  { name: "Term 2", Mathematics: 72, English: 78, Physics: 65, Chemistry: 74, Biology: 76 },
  { name: "Term 3", Mathematics: 78, English: 80, Physics: 70, Chemistry: 79, Biology: 82 },
  { name: "Term 4", Mathematics: 82, English: 85, Physics: 75, Chemistry: 83, Biology: 86 },
];

const classData = [
  { name: "Form 1", average: 76, students: 45 },
  { name: "Form 2", average: 72, students: 42 },
  { name: "Form 3", average: 68, students: 38 },
  { name: "Form 4", average: 74, students: 40 },
];

const recentActivity = [
  { id: 1, action: "Grades Updated", subject: "Mathematics - Form 3", time: "1 hour ago" },
  { id: 2, action: "Report Generated", subject: "Term 2 Reports - Form 4", time: "3 hours ago" },
  { id: 3, action: "New Student Added", subject: "John Mwangi - Form 1", time: "Yesterday" },
  { id: 4, action: "Exam Scheduled", subject: "End of Term - All Classes", time: "2 days ago" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // This would come from authentication in a real app
  const userRole = "Administrator"; // or "Teacher" or "Student"

  const StatCard = ({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend?: { value: string; positive: boolean } }) => (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs flex items-center mt-1 ${trend.positive ? "text-green-600" : "text-red-600"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value} from last term
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="mb-8 animate-slide-down">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userRole}. Here's what's happening at your school.
            </p>
          </div>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Students"
                  value="537"
                  icon={<Users size={20} />}
                  trend={{ value: "2.5%", positive: true }}
                />
                <StatCard
                  title="Class Average"
                  value="72.3%"
                  icon={<BarChart2 size={20} />}
                  trend={{ value: "3.1%", positive: true }}
                />
                <StatCard
                  title="Subjects"
                  value="12"
                  icon={<BookOpen size={20} />}
                />
                <StatCard
                  title="Teachers"
                  value="32"
                  icon={<GraduationCap size={20} />}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="overflow-hidden col-span-1">
                  <CardHeader>
                    <CardTitle>Academic Performance</CardTitle>
                    <CardDescription>Average grades across all classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={performanceData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(255, 255, 255, 0.8)",
                              border: "none",
                              borderRadius: "0.5rem",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="Mathematics"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="English"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="Physics"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden col-span-1">
                  <CardHeader>
                    <CardTitle>Class Distribution</CardTitle>
                    <CardDescription>Students and performance by form</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={classData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(255, 255, 255, 0.8)",
                              border: "none",
                              borderRadius: "0.5rem",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                          <Legend />
                          <Bar
                            yAxisId="left"
                            dataKey="average"
                            name="Average Score"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            yAxisId="right"
                            dataKey="students"
                            name="Number of Students"
                            fill="#f59e0b"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance</CardTitle>
                  <CardDescription>
                    Detailed view of student performance across all subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[50, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Mathematics"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="English"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Physics"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Chemistry"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Biology"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Download Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest actions and updates in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentActivity.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex gap-4 items-start relative"
                      >
                        <div className="flex-none">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Activity size={18} />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-base font-medium">{item.action}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.subject}
                          </p>
                          <span className="text-xs text-muted-foreground/70">
                            {item.time}
                          </span>
                        </div>

                        {index < recentActivity.length - 1 && (
                          <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-muted h-12" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View All Activity</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Calendar and scheduled activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "End of Term Exams",
                        date: "November 15 - 25, 2023",
                        description: "Final examinations for all classes",
                      },
                      {
                        title: "Teachers Meeting",
                        date: "November 10, 2023",
                        description: "Preparation for end of term examinations",
                      },
                      {
                        title: "Parents Day",
                        date: "December 5, 2023",
                        description: "Term results and performance review with parents",
                      },
                    ].map((event, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex-none">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Calendar size={20} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base font-medium">{event.title}</h4>
                          <p className="text-sm text-primary">{event.date}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Full Calendar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
