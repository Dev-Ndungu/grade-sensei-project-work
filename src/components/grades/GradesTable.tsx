
import React, { useState } from "react";
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
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GradesTableProps {
  students: Student[];
  editMode: boolean;
  editedGrades: Record<string, any>;
  onGradeChange: (studentId: number, subject: string, value: string) => void;
}

type SortField = "name" | typeof subjects[number] | "average";
type SortDirection = "asc" | "desc";

const GradesTable: React.FC<GradesTableProps> = ({
  students,
  editMode,
  editedGrades,
  onGradeChange,
}) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (!sortField) return 0;

    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === "average") {
      const avgA = parseFloat(calculateAverage(a.subjects));
      const avgB = parseFloat(calculateAverage(b.subjects));
      return sortDirection === "asc" ? avgA - avgB : avgB - avgA;
    } else {
      // Sort by subject score
      const scoreA = a.subjects[sortField]?.score || 0;
      const scoreB = b.subjects[sortField]?.score || 0;
      return sortDirection === "asc" ? scoreA - scoreB : scoreB - scoreA;
    }
  });

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[200px]">
              <Button 
                variant="ghost" 
                className="p-0 h-auto font-medium hover:bg-transparent flex items-center gap-1"
                onClick={() => handleSort("name")}
              >
                Student Name
                {sortField === "name" && (
                  sortDirection === "asc" 
                    ? <ArrowUpAZ className="h-4 w-4 ml-1" /> 
                    : <ArrowDownAZ className="h-4 w-4 ml-1" />
                )}
              </Button>
            </TableHead>
            {subjects.map((subject) => (
              <TableHead key={subject} className="text-center">
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-medium hover:bg-transparent flex items-center justify-center gap-1 w-full"
                  onClick={() => handleSort(subject)}
                >
                  {subject}
                  {sortField === subject && (
                    sortDirection === "asc" 
                      ? <ArrowUpAZ className="h-4 w-4 ml-1" /> 
                      : <ArrowDownAZ className="h-4 w-4 ml-1" />
                  )}
                </Button>
              </TableHead>
            ))}
            <TableHead className="text-center">
              <Button 
                variant="ghost" 
                className="p-0 h-auto font-medium hover:bg-transparent flex items-center justify-center gap-1 w-full"
                onClick={() => handleSort("average")}
              >
                Average
                {sortField === "average" && (
                  sortDirection === "asc" 
                    ? <ArrowUpAZ className="h-4 w-4 ml-1" /> 
                    : <ArrowDownAZ className="h-4 w-4 ml-1" />
                )}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStudents.map((student) => (
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
