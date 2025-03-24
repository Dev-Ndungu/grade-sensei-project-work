
import React from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SubjectGrade } from "@/types/grades";

interface GradeCellProps {
  grade: SubjectGrade;
  editMode: boolean;
  onChange?: (value: string) => void;
}

const GradeCell: React.FC<GradeCellProps> = ({ 
  grade, 
  editMode, 
  onChange 
}) => {
  return (
    <div className="text-center">
      {editMode ? (
        <div className="flex flex-col items-center gap-1">
          <Input
            type="number"
            min="0"
            max="100"
            className="w-16 text-center"
            value={grade.score}
            onChange={(e) => onChange && onChange(e.target.value)}
          />
          <span className="text-xs font-medium">
            {grade.grade}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <span className="font-medium">
            {grade.score}
          </span>
          <div className="flex items-center gap-1">
            <span
              className={`text-xs font-bold ${
                grade.grade.startsWith("A")
                  ? "text-green-600"
                  : grade.grade.startsWith("B")
                  ? "text-blue-600"
                  : grade.grade.startsWith("C")
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {grade.grade}
            </span>
            <Badge
              variant="outline"
              className={`text-[10px] px-1 ${
                grade.status === "approved"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }`}
            >
              {grade.status}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeCell;
