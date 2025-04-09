
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
import { Button } from "@/components/ui/button";
import { Save, Download, Edit2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { SubjectGrade } from "@/types/grades";
import { getGradeFromScore } from "@/utils/gradeUtils";
import GradeFilters from "@/components/grades/GradeFilters";
import GradesTable from "@/components/grades/GradesTable";
import AddStudentGradeForm from "@/components/grades/AddStudentGradeForm";
import { fetchStudents, addOrUpdateGrade, getStudentGradesByTerm } from "@/services/studentService";
import { Student, StudentGrade } from "@/types/student";
import { useAuth } from "@/context/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Helper function to convert database student to format needed by GradesTable
const mapStudentForGradesTable = (
  student: Student, 
  grades: StudentGrade[]
): {
  id: string;
  name: string;
  form: string;
  subjects: Record<string, SubjectGrade>;
} => {
  const studentSubjects: Record<string, SubjectGrade> = {};
  
  // Initialize with empty values if no grades exist
  grades.forEach(grade => {
    if (grade.student_id === student.id) {
      studentSubjects[grade.subject] = {
        score: grade.score,
        grade: grade.grade,
        status: grade.status as "approved" | "pending" || "pending"
      };
    }
  });
  
  return {
    id: student.id,
    name: student.name,
    form: student.form,
    subjects: studentSubjects
  };
};

const Grades = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState("All Forms");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTerm, setSelectedTerm] = useState("Term 2");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [editMode, setEditMode] = useState(false);
  const [editedGrades, setEditedGrades] = useState<Record<string, SubjectGrade>>({});
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [mappedStudents, setMappedStudents] = useState<{
    id: string;
    name: string;
    form: string;
    subjects: Record<string, SubjectGrade>;
  }[]>([]);
  const [grades, setGrades] = useState<StudentGrade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Function to load data
  const loadData = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching students and grades data...");
      const studentsData = await fetchStudents();
      console.log("Fetched students:", studentsData);
      setStudents(studentsData);
      
      // Fetch grades for the selected term and year
      const gradesData = await getStudentGradesByTerm(selectedTerm, selectedYear);
      console.log("Fetched grades:", gradesData);
      setGrades(gradesData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load students or grades");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch students and grades on component mount and when term/year changes
  useEffect(() => {
    loadData();
  }, [selectedTerm, selectedYear]);

  // Filter students whenever the selectedForm or searchTerm changes
  useEffect(() => {
    let filtered = students;
    
    if (selectedForm !== "All Forms") {
      filtered = filtered.filter(student => student.form === selectedForm);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(
        student => student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredStudents(filtered);
  }, [students, selectedForm, searchTerm]);

  // Map students to the format needed by GradesTable
  useEffect(() => {
    const mapped = filteredStudents.map(student => 
      mapStudentForGradesTable(student, grades)
    );
    setMappedStudents(mapped);
    console.log("Mapped students for grades table:", mapped);
  }, [filteredStudents, grades]);

  const handleGradeChange = (studentId: string, subject: string, value: string) => {
    const newScore = parseInt(value, 10);
    if (isNaN(newScore) || newScore < 0 || newScore > 100) return;
    
    setEditedGrades({
      ...editedGrades,
      [`${studentId}-${subject}`]: {
        score: newScore,
        grade: getGradeFromScore(newScore),
        status: "pending"
      },
    });
  };

  const saveGrades = async () => {
    let savePromises = Object.entries(editedGrades).map(async ([key, gradeData]) => {
      const [studentId, subject] = key.split('-');
      
      return addOrUpdateGrade({
        student_id: studentId,
        subject,
        term: selectedTerm,
        year: selectedYear,
        score: gradeData.score,
        grade: gradeData.grade,
        status: "pending"
      });
    });
    
    try {
      await Promise.all(savePromises);
      toast.success("All grades saved successfully");
      
      // Refresh grades data
      const gradesData = await getStudentGradesByTerm(selectedTerm, selectedYear);
      setGrades(gradesData);
      
      setEditMode(false);
      setEditedGrades({});
    } catch (error) {
      console.error("Error saving grades:", error);
      toast.error("There was an error saving some grades");
    }
  };

  const handleStudentAdded = () => {
    // Reload data after a new student is added
    loadData();
    setShowAddForm(false);
    toast.success("Student added successfully");
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
                <Sheet open={showAddForm} onOpenChange={setShowAddForm}>
                  <SheetTrigger asChild>
                    <Button className="gap-2">
                      <Plus size={16} />
                      Add Student
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full max-w-md sm:max-w-lg overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Add New Student</SheetTitle>
                      <SheetDescription>
                        Add a new student with grades for all subjects
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <AddStudentGradeForm onSuccess={handleStudentAdded} />
                    </div>
                  </SheetContent>
                </Sheet>
                
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
                {selectedTerm} academic performance for {selectedForm === "All Forms" ? "all forms" : selectedForm}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GradeFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedForm={selectedForm}
                setSelectedForm={setSelectedForm}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedTerm={selectedTerm}
                setSelectedTerm={setSelectedTerm}
              />

              {isLoading ? (
                <div className="py-12 text-center text-muted-foreground">
                  Loading students and grades...
                </div>
              ) : (
                <GradesTable 
                  students={mappedStudents}
                  editMode={editMode}
                  editedGrades={editedGrades}
                  onGradeChange={handleGradeChange}
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t py-4 bg-muted/10">
              <div className="text-sm text-muted-foreground">
                Showing {filteredStudents.length} of {students.length} students
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
