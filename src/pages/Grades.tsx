
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Save, Download, FileText, Edit2, Filter } from "lucide-react";
import { toast } from "sonner";

// Demo student data
const studentData = [
  {
    id: 1,
    name: "Amina Wanjiku",
    form: "Form 3",
    subjects: {
      Mathematics: { score: 78, grade: "B+", status: "approved" },
      English: { score: 85, grade: "A", status: "approved" },
      Physics: { score: 72, grade: "B", status: "approved" },
      Chemistry: { score: 68, grade: "B-", status: "pending" },
      Biology: { score: 75, grade: "B+", status: "pending" },
    },
  },
  {
    id: 2,
    name: "David Ochieng",
    form: "Form 3",
    subjects: {
      Mathematics: { score: 65, grade: "C+", status: "approved" },
      English: { score: 72, grade: "B", status: "approved" },
      Physics: { score: 68, grade: "B-", status: "approved" },
      Chemistry: { score: 70, grade: "B", status: "pending" },
      Biology: { score: 74, grade: "B", status: "pending" },
    },
  },
  {
    id: 3,
    name: "Faith Muthoni",
    form: "Form 3",
    subjects: {
      Mathematics: { score: 92, grade: "A", status: "approved" },
      English: { score: 88, grade: "A", status: "approved" },
      Physics: { score: 85, grade: "A", status: "approved" },
      Chemistry: { score: 90, grade: "A", status: "pending" },
      Biology: { score: 86, grade: "A", status: "pending" },
    },
  },
  {
    id: 4,
    name: "John Kamau",
    form: "Form 3",
    subjects: {
      Mathematics: { score: 60, grade: "C", status: "approved" },
      English: { score: 65, grade: "C+", status: "approved" },
      Physics: { score: 58, grade: "C-", status: "approved" },
      Chemistry: { score: 62, grade: "C", status: "pending" },
      Biology: { score: 70, grade: "B", status: "pending" },
    },
  },
  {
    id: 5,
    name: "Mary Njeri",
    form: "Form 3",
    subjects: {
      Mathematics: { score: 75, grade: "B+", status: "approved" },
      English: { score: 80, grade: "A-", status: "approved" },
      Physics: { score: 72, grade: "B", status: "approved" },
      Chemistry: { score: 78, grade: "B+", status: "pending" },
      Biology: { score: 82, grade: "A-", status: "pending" },
    },
  },
];

const subjects = ["Mathematics", "English", "Physics", "Chemistry", "Biology"];
const forms = ["Form 1", "Form 2", "Form 3", "Form 4"];
const terms = ["Term 1", "Term 2", "Term 3"];

const Grades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState("Form 3");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTerm, setSelectedTerm] = useState("Term 2");
  const [editMode, setEditMode] = useState(false);
  const [editedGrades, setEditedGrades] = useState({});

  // Calculate average grade for each student
  const calculateAverage = (student) => {
    const scores = Object.values(student.subjects).map((s) => s.score);
    const sum = scores.reduce((total, score) => total + score, 0);
    return (sum / scores.length).toFixed(1);
  };

  // Get letter grade from numerical score
  const getGradeFromScore = (score) => {
    if (score >= 90) return "A";
    if (score >= 80) return "A-";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "B-";
    if (score >= 60) return "C+";
    if (score >= 55) return "C";
    if (score >= 50) return "C-";
    if (score >= 45) return "D+";
    if (score >= 40) return "D";
    return "E";
  };

  // Filter students based on search term and selected form
  const filteredStudents = studentData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedForm === "All Forms" || student.form === selectedForm)
  );

  // Handle grade change in edit mode
  const handleGradeChange = (studentId, subject, value) => {
    const newScore = parseInt(value, 10);
    if (isNaN(newScore) || newScore < 0 || newScore > 100) return;
    
    setEditedGrades({
      ...editedGrades,
      [`${studentId}-${subject}`]: {
        score: newScore,
        grade: getGradeFromScore(newScore),
      },
    });
  };

  // Save edited grades
  const saveGrades = () => {
    // In a real app, this would send a request to the backend
    toast.success("Grades saved successfully");
    setEditMode(false);
    setEditedGrades({});
  };

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="mb-8 animate-slide-down">
            <div className="flex justify-between items-center gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Grade Management</h1>
                <p className="text-muted-foreground">
                  View and manage student grades
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={editMode ? "outline" : "default"}
                  className="gap-2"
                  onClick={() => setEditMode(!editMode)}
                >
                  <Edit2 size={16} />
                  {editMode ? "Cancel Edit" : "Edit Grades"}
                </Button>
                {editMode && (
                  <Button className="gap-2" onClick={saveGrades}>
                    <Save size={16} />
                    Save Changes
                  </Button>
                )}
                <Button variant="outline" className="gap-2">
                  <Download size={16} />
                  Export
                </Button>
              </div>
            </div>
          </div>

          <Card className="overflow-hidden animate-fade-in">
            <CardHeader className="pb-4">
              <CardTitle>Student Grades</CardTitle>
              <CardDescription>
                {selectedTerm} academic performance for {selectedForm}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <div className="relative flex items-center">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-muted-foreground" />
                  <Select
                    value={selectedForm}
                    onValueChange={setSelectedForm}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Form" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Forms">All Forms</SelectItem>
                      {forms.map((form) => (
                        <SelectItem key={form} value={form}>
                          {form}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Subjects">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedTerm}
                  onValueChange={setSelectedTerm}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <FileText size={16} />
                    Generate Reports
                  </Button>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[200px]">Student Name</TableHead>
                      {subjects.map((subject) => (
                        <TableHead key={subject} className="text-center">
                          {subject}
                        </TableHead>
                      ))}
                      <TableHead className="text-center">Average</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.name}
                        </TableCell>
                        {subjects.map((subject) => {
                          const originalGrade = student.subjects[subject];
                          const editedGrade = editedGrades[`${student.id}-${subject}`];
                          const currentGrade = editedGrade || originalGrade;
                          
                          return (
                            <TableCell key={subject} className="text-center">
                              {editMode ? (
                                <div className="flex flex-col items-center gap-1">
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="w-16 text-center"
                                    value={currentGrade.score}
                                    onChange={(e) =>
                                      handleGradeChange(
                                        student.id,
                                        subject,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span className="text-xs font-medium">
                                    {currentGrade.grade}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <span className="font-medium">
                                    {currentGrade.score}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <span
                                      className={`text-xs font-bold ${
                                        currentGrade.grade.startsWith("A")
                                          ? "text-green-600"
                                          : currentGrade.grade.startsWith("B")
                                          ? "text-blue-600"
                                          : currentGrade.grade.startsWith("C")
                                          ? "text-yellow-600"
                                          : "text-red-600"
                                      }`}
                                    >
                                      {currentGrade.grade}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className={`text-[10px] px-1 ${
                                        currentGrade.status === "approved"
                                          ? "bg-green-50 text-green-700 border-green-200"
                                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                      }`}
                                    >
                                      {currentGrade.status}
                                    </Badge>
                                  </div>
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                        <TableCell className="text-center">
                          <div className="font-bold">
                            {calculateAverage(student)}
                          </div>
                          <div className="text-xs font-medium text-muted-foreground">
                            {getGradeFromScore(calculateAverage(student))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t py-4 bg-muted/10">
              <div className="text-sm text-muted-foreground">
                Showing {filteredStudents.length} of {studentData.length} students
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
        </Container>
      </div>
    </div>
  );
};

export default Grades;
