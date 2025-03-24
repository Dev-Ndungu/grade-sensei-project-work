
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student, subjects } from "@/types/grades";
import GradeCell from "./GradeCell";
import { calculateAverage, getGradeFromScore } from "@/utils/gradeUtils";

interface GradesTableProps {
  students: Student[];
  editMode: boolean;
  editedGrades: Record<string, any>;
  onGradeChange: (studentId: number, subject: string, value: string) => void;
}

const GradesTable: React.FC<GradesTableProps> = ({
  students,
  editMode,
  editedGrades,
  onGradeChange,
}) => {
  return (
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
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                {student.name}
              </TableCell>
              {subjects.map((subject) => {
                const originalGrade = student.subjects[subject];
                const editedGrade = editedGrades[`${student.id}-${subject}`];
                const currentGrade = editedGrade || originalGrade;
                
                return (
                  <TableCell key={subject}>
                    <GradeCell 
                      grade={currentGrade} 
                      editMode={editMode}
                      onChange={(value) => 
                        onGradeChange(student.id, subject, value)
                      }
                    />
                  </TableCell>
                );
              })}
              <TableCell className="text-center">
                <div className="font-bold">
                  {calculateAverage(student.subjects)}
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  {getGradeFromScore(calculateAverage(student.subjects))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GradesTable;
