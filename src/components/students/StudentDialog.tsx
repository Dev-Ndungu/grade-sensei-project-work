
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StudentForm from "./StudentForm";
import { Student } from "@/types/student";

interface StudentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student;
  onSubmit: (values: any) => void;
  isLoading: boolean;
  title: string;
}

const StudentDialog: React.FC<StudentDialogProps> = ({
  isOpen,
  onOpenChange,
  student,
  onSubmit,
  isLoading,
  title,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <StudentForm
          student={student}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentDialog;
