
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
import { Save, Download, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { SubjectGrade } from "@/types/grades";
import { getGradeFromScore } from "@/utils/gradeUtils";
import GradeFilters from "@/components/grades/GradeFilters";
import GradesTable from "@/components/grades/GradesTable";
import { fetchStudents, addOrUpdateGrade, getStudentGradesByTerm } from "@/services/studentService";
import { Student, StudentGrade } from "@/types/student";
import { useAuth } from "@/context/AuthContext";

const Grades = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState("Form 3");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTerm, setSelectedTerm] = useState("Term 2");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [editMode, setEditMode] = useState(false);
  const [editedGrades, setEditedGrades] = useState<Record<string, SubjectGrade>>({});
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch students on component mount
  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error loading students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadStudents();
    }
  }, [user]);

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
      setEditMode(false);
      setEditedGrades({});
    } catch (error) {
      console.error("Error saving grades:", error);
      toast.error("There was an error saving some grades");
    }
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
                  students={filteredStudents}
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
