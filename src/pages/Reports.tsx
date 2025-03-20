
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Printer,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Book,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";

// Sample data for demonstration
const classPerformance = [
  { name: "Form 1", average: 76 },
  { name: "Form 2", average: 72 },
  { name: "Form 3", average: 68 },
  { name: "Form 4", average: 74 },
];

const subjectPerformance = [
  { name: "Mathematics", average: 65 },
  { name: "English", average: 72 },
  { name: "Physics", average: 68 },
  { name: "Chemistry", average: 70 },
  { name: "Biology", average: 74 },
  { name: "History", average: 78 },
  { name: "Geography", average: 73 },
  { name: "Computer Studies", average: 82 },
];

const gradeDistribution = [
  { name: "A", value: 15, color: "#10b981" },
  { name: "B", value: 30, color: "#3b82f6" },
  { name: "C", value: 40, color: "#f59e0b" },
  { name: "D", value: 10, color: "#ef4444" },
  { name: "E", value: 5, color: "#6b7280" },
];

const reports = [
  {
    id: 1,
    title: "End of Term 2 Report",
    type: "Individual",
    target: "Amina Wanjiku",
    date: "July 15, 2023",
    status: "complete",
  },
  {
    id: 2,
    title: "Form 4 Physics Performance",
    type: "Subject",
    target: "Form 4",
    date: "July 12, 2023",
    status: "complete",
  },
  {
    id: 3,
    title: "School Performance Analysis",
    type: "School",
    target: "All Classes",
    date: "July 10, 2023",
    status: "complete",
  },
  {
    id: 4,
    title: "Mid-Term Progress Report",
    type: "Individual",
    target: "David Ochieng",
    date: "June 28, 2023",
    status: "complete",
  },
  {
    id: 5,
    title: "Form 3 Class Analysis",
    type: "Class",
    target: "Form 3",
    date: "June 25, 2023",
    status: "complete",
  },
];

const Reports = () => {
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedPeriod, setSelectedPeriod] = useState("Term 2, 2023");

  const handleGenerateReport = () => {
    toast.success("Report generation started. You will be notified when it's ready.");
  };

  const handleDownloadReport = (id: number) => {
    toast.success("Report downloaded successfully");
  };

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="mb-8 animate-slide-down">
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Generate, view, and download academic reports
            </p>
          </div>

          <Tabs defaultValue="generate" className="space-y-8 animate-fade-in">
            <TabsList className="grid w-full md:w-auto grid-cols-2 gap-2">
              <TabsTrigger value="generate">Generate Reports</TabsTrigger>
              <TabsTrigger value="history">Report History</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Generate New Report</CardTitle>
                  <CardDescription>
                    Create detailed reports for students, classes, or the entire school
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Type</label>
                      <Select defaultValue="individual">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual Student</SelectItem>
                          <SelectItem value="class">Class Report</SelectItem>
                          <SelectItem value="subject">Subject Analysis</SelectItem>
                          <SelectItem value="school">School Overview</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Class</label>
                      <Select defaultValue="form3">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="form1">Form 1</SelectItem>
                          <SelectItem value="form2">Form 2</SelectItem>
                          <SelectItem value="form3">Form 3</SelectItem>
                          <SelectItem value="form4">Form 4</SelectItem>
                          <SelectItem value="all">All Classes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Period</label>
                      <Select defaultValue="term2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="term1">Term 1, 2023</SelectItem>
                          <SelectItem value="term2">Term 2, 2023</SelectItem>
                          <SelectItem value="term3">Term 3, 2023</SelectItem>
                          <SelectItem value="year">Full Year 2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => toast("Report preview not available in demo")}
                    >
                      <FileText size={16} />
                      Preview
                    </Button>
                    <Button className="gap-2" onClick={handleGenerateReport}>
                      <Download size={16} />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <BarChart3 className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle>Class Performance</CardTitle>
                      <CardDescription>
                        Average grades by class for Term 2, 2023
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={classPerformance}
                          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar
                            dataKey="average"
                            name="Average Score"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 border-t">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Printer size={14} />
                      Print Report
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <PieChart className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle>Grade Distribution</CardTitle>
                      <CardDescription>
                        Overall grade distribution for Term 2, 2023
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 flex justify-center items-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={gradeDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            innerRadius={40}
                            dataKey="value"
                            label={({
                              cx,
                              cy,
                              midAngle,
                              innerRadius,
                              outerRadius,
                              percent,
                              name,
                            }) => {
                              const radius =
                                innerRadius + (outerRadius - innerRadius) * 1.4;
                              const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  fill="#000"
                                  textAnchor={x > cx ? "start" : "end"}
                                  dominantBaseline="central"
                                  fontSize={12}
                                  fontWeight={600}
                                >
                                  {`${name}: ${(percent * 100).toFixed(0)}%`}
                                </text>
                              );
                            }}
                          >
                            {gradeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 border-t">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Printer size={14} />
                      Print Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Subject Performance Analysis</CardTitle>
                  <CardDescription>
                    Average scores by subject across all classes for Term 2, 2023
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={subjectPerformance}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={120} />
                        <Tooltip />
                        <Bar
                          dataKey="average"
                          name="Average Score"
                          fill="#3b82f6"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/10 border-t flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Data updated on July 15, 2023
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download size={14} />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="animate-fade-in">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Generated Reports</CardTitle>
                      <CardDescription>
                        Previously generated reports and analyses
                      </CardDescription>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <Filter size={14} className="text-muted-foreground" />
                        <Select
                          value={selectedType}
                          onValueChange={setSelectedType}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Types">All Types</SelectItem>
                            <SelectItem value="Individual">Individual</SelectItem>
                            <SelectItem value="Class">Class</SelectItem>
                            <SelectItem value="Subject">Subject</SelectItem>
                            <SelectItem value="School">School</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Select
                        value={selectedPeriod}
                        onValueChange={setSelectedPeriod}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Term 1, 2023">Term 1, 2023</SelectItem>
                          <SelectItem value="Term 2, 2023">Term 2, 2023</SelectItem>
                          <SelectItem value="Term 3, 2023">Term 3, 2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left py-3 px-4 font-medium">Report Name</th>
                          <th className="text-left py-3 px-4 font-medium">Type</th>
                          <th className="text-left py-3 px-4 font-medium">Target</th>
                          <th className="text-left py-3 px-4 font-medium">Date</th>
                          <th className="text-left py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.map((report) => (
                          <tr key={report.id} className="border-t hover:bg-muted/20">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <FileText
                                  size={16}
                                  className="text-primary"
                                />
                                {report.title}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {report.type}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {report.target}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {report.date}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleDownloadReport(report.id)}
                                >
                                  <Download size={16} />
                                  <span className="sr-only">Download</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                  onClick={() => 
                                    toast("Print functionality not available in demo")
                                  }
                                >
                                  <Printer size={16} />
                                  <span className="sr-only">Print</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="border-t mt-3 flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 24 reports
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </div>
  );
};

export default Reports;
