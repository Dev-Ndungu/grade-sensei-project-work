
import React, { useState, useEffect } from "react";
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
  CalendarIcon,
  Filter,
  Book,
  PlusCircle,
  FileCheck,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import StudentDialog from "@/components/students/StudentDialog";
import { addStudent, fetchStudents, getStudentsByForm, updateStudent } from "@/services/studentService";
import { Student, StudentGrade } from "@/types/student";
import { forms, terms } from "@/types/grades";
import { generateClassReport, generateStudentReport } from "@/services/reportService";
import { useAuth } from "@/context/AuthContext";

// Sample data for demonstration
const gradeDistribution = [
  { name: "A", value: 15, color: "#10b981" },
  { name: "B", value: 30, color: "#3b82f6" },
  { name: "C", value: 40, color: "#f59e0b" },
  { name: "D", value: 10, color: "#ef4444" },
  { name: "E", value: 5, color: "#6b7280" },
];

const Reports = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState("Form 3");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedPeriod, setSelectedPeriod] = useState("Term 2");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Load student data
  useEffect(() => {
    const loadStudents = async () => {
      setIsDataLoading(true);
      try {
        const data = await fetchStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Error loading students:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    if (user) {
      loadStudents();
    }
  }, [user]);

  // Filter students by form/class
  useEffect(() => {
    const filterStudents = async () => {
      if (selectedClass === "All Forms") {
        setFilteredStudents(students);
      } else {
        const filteredByForm = students.filter(student => student.form === selectedClass);
        setFilteredStudents(filteredByForm);
      }
    };

    filterStudents();
  }, [selectedClass, students]);

  // Handle student form submission
  const handleStudentSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      if (selectedStudent) {
        // Update existing student
        await updateStudent(selectedStudent.id, {
          ...values,
          user_id: user!.id,
        });
      } else {
        // Add new student
        await addStudent({
          ...values,
          user_id: user!.id,
        });
      }
      
      // Reload students
      const updatedStudents = await fetchStudents();
      setStudents(updatedStudents);
      
      // Close dialog
      setIsStudentDialogOpen(false);
      setSelectedStudent(undefined);
    } catch (error) {
      console.error("Error saving student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    if (!value.trim()) {
      setFilteredStudents(students.filter(s => s.form === selectedClass || selectedClass === "All Forms"));
      return;
    }
    
    const filtered = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(value.toLowerCase()) || 
                            (student.admission_number && student.admission_number.toLowerCase().includes(value.toLowerCase()));
      const matchesClass = student.form === selectedClass || selectedClass === "All Forms";
      return matchesSearch && matchesClass;
    });
    
    setFilteredStudents(filtered);
  };

  // Handle generate report
  const handleGenerateReport = () => {
    if (selectedClass === "All Forms") {
      toast.error("Please select a specific class for report generation");
      return;
    }
    
    toast.success("Report generation started. You will be notified when it's ready.");
    
    // In a real application, you would fetch actual data from the database
    // and generate the report using the reportService
    setTimeout(() => {
      toast.success("Report generated successfully");
    }, 2000);
  };

  // Generate and download student report
  const handleGenerateStudentReport = async (student: Student) => {
    toast.loading("Generating student report...");
    
    try {
      // In a real application, you would fetch actual grades from the database
      // For now, we'll use sample data
      const sampleGrades: StudentGrade[] = [
        { id: '1', student_id: student.id, subject: 'Mathematics', term: selectedPeriod, year: selectedYear, score: 85, grade: 'A-', status: 'approved', created_at: '', updated_at: '' },
        { id: '2', student_id: student.id, subject: 'English', term: selectedPeriod, year: selectedYear, score: 76, grade: 'B+', status: 'approved', created_at: '', updated_at: '' },
        { id: '3', student_id: student.id, subject: 'Physics', term: selectedPeriod, year: selectedYear, score: 68, grade: 'B-', status: 'approved', created_at: '', updated_at: '' },
        { id: '4', student_id: student.id, subject: 'Chemistry', term: selectedPeriod, year: selectedYear, score: 72, grade: 'B+', status: 'approved', created_at: '', updated_at: '' },
        { id: '5', student_id: student.id, subject: 'Biology', term: selectedPeriod, year: selectedYear, score: 65, grade: 'C+', status: 'approved', created_at: '', updated_at: '' },
      ];
      
      const doc = generateStudentReport(student, sampleGrades, selectedPeriod, selectedYear);
      
      // Download the PDF
      doc.save(`${student.name}_${selectedPeriod}_${selectedYear}_Report.pdf`);
      toast.dismiss();
      toast.success("Student report downloaded successfully");
    } catch (error) {
      toast.dismiss();
      toast.error("Error generating report");
      console.error("Error generating report:", error);
    }
  };

  // Generate and download class report
  const handleGenerateClassReport = async () => {
    if (selectedClass === "All Forms") {
      toast.error("Please select a specific class for report generation");
      return;
    }
    
    toast.loading("Generating class report...");
    
    try {
      // Get students for the selected class
      const classStudents = await getStudentsByForm(selectedClass);
      
      // In a real application, you would fetch actual grades from the database
      // For now, we'll use sample data
      const sampleGrades: StudentGrade[] = [];
      
      // Generate random grades for each student
      classStudents.forEach(student => {
        const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'];
        subjects.forEach(subject => {
          sampleGrades.push({
            id: `${student.id}-${subject}`,
            student_id: student.id,
            subject,
            term: selectedPeriod,
            year: selectedYear,
            score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
            grade: '',  // This will be calculated by the report generator
            status: 'approved',
            created_at: '',
            updated_at: ''
          });
        });
      });
      
      const doc = generateClassReport(selectedClass, classStudents, sampleGrades, selectedPeriod, selectedYear);
      
      // Download the PDF
      doc.save(`${selectedClass}_${selectedPeriod}_${selectedYear}_Report.pdf`);
      toast.dismiss();
      toast.success("Class report downloaded successfully");
    } catch (error) {
      toast.dismiss();
      toast.error("Error generating report");
      console.error("Error generating report:", error);
    }
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
              <TabsTrigger value="students">Manage Students</TabsTrigger>
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
                      <Select defaultValue="class">
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
                      <Select 
                        value={selectedClass}
                        onValueChange={setSelectedClass}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {forms.map(form => (
                            <SelectItem key={form} value={form}>{form}</SelectItem>
                          ))}
                          <SelectItem value="All Forms">All Classes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Period</label>
                      <Select 
                        value={selectedPeriod}
                        onValueChange={setSelectedPeriod}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Period" />
                        </SelectTrigger>
                        <SelectContent>
                          {terms.map(term => (
                            <SelectItem key={term} value={term}>{`${term}, ${selectedYear}`}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={handleGenerateClassReport}
                    >
                      <FileText size={16} />
                      Generate Class Report
                    </Button>
                    <Button 
                      className="gap-2" 
                      onClick={handleGenerateReport}
                    >
                      <Download size={16} />
                      Generate School Report
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
                        Average grades by class for {selectedPeriod}, {selectedYear}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={forms.map(form => ({
                            name: form,
                            average: Math.floor(Math.random() * 20) + 60 // Random data for demo
                          }))}
                          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <RechartsTooltip />
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
                        Overall grade distribution for {selectedPeriod}, {selectedYear}
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
            </TabsContent>

            <TabsContent value="students" className="animate-fade-in">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Student Management</CardTitle>
                      <CardDescription>
                        Add, edit, and generate reports for students
                      </CardDescription>
                    </div>
                    <Button 
                      className="gap-2"
                      onClick={() => {
                        setSelectedStudent(undefined);
                        setIsStudentDialogOpen(true);
                      }}
                    >
                      <PlusCircle size={16} />
                      Add Student
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="relative flex items-center col-span-1">
                      <Input
                        placeholder="Search students by name or admission number..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="pl-9"
                      />
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={selectedClass} 
                        onValueChange={setSelectedClass}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {forms.map(form => (
                            <SelectItem key={form} value={form}>{form}</SelectItem>
                          ))}
                          <SelectItem value="All Forms">All Classes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Admission Number</TableHead>
                          <TableHead>Form</TableHead>
                          <TableHead>Gender</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isDataLoading ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">
                              Loading students...
                            </TableCell>
                          </TableRow>
                        ) : filteredStudents.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">
                              {searchTerm ? "No students match your search" : "No students found"}
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredStudents.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.admission_number || "—"}</TableCell>
                              <TableCell>{student.form}</TableCell>
                              <TableCell>{student.gender || "—"}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedStudent(student);
                                      setIsStudentDialogOpen(true);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleGenerateStudentReport(student)}
                                  >
                                    Report
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="border-t py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredStudents.length} of {students.length} students
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <StudentDialog
            isOpen={isStudentDialogOpen}
            onOpenChange={setIsStudentDialogOpen}
            student={selectedStudent}
            onSubmit={handleStudentSubmit}
            isLoading={isLoading}
            title={selectedStudent ? "Edit Student" : "Add New Student"}
          />
        </Container>
      </div>
    </div>
  );
};

export default Reports;
