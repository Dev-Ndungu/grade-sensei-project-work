
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { forms, subjects, terms } from "@/types/grades";
import { getGradeFromScore } from "@/utils/gradeUtils";
import { addStudent, addOrUpdateGrade } from "@/services/studentService";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  form: z.string().min(1, "Form is required"),
  admission_number: z.string().optional(),
  term: z.string().min(1, "Term is required"),
  year: z.coerce.number().int().positive(),
});

interface SubjectScore {
  [key: string]: number;
}

interface AddStudentGradeFormProps {
  onSuccess: () => void;
}

const AddStudentGradeForm: React.FC<AddStudentGradeFormProps> = ({ onSuccess }) => {
  const [subjectScores, setSubjectScores] = useState<SubjectScore>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      form: forms[0],
      admission_number: "",
      term: "Term 2",
      year: 2025,
    },
  });

  const handleScoreChange = (subject: string, value: string) => {
    const score = parseInt(value);
    if (!isNaN(score) && score >= 0 && score <= 100) {
      setSubjectScores((prev) => ({
        ...prev,
        [subject]: score,
      }));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      // Check if at least one subject has a score
      if (Object.keys(subjectScores).length === 0) {
        toast.error("Please add at least one subject grade");
        setIsSubmitting(false);
        return;
      }

      // Step 1: Add the student
      const studentResult = await addStudent({
        name: values.name,
        form: values.form,
        admission_number: values.admission_number || null,
        user_id: null, // Make this explicitly null
      });

      if (!studentResult) {
        toast.error("Failed to add student");
        setIsSubmitting(false);
        return;
      }

      console.log("Student added:", studentResult);

      // Step 2: Add grades for each subject
      const gradePromises = Object.entries(subjectScores).map(([subject, score]) => {
        return addOrUpdateGrade({
          student_id: studentResult.id,
          subject,
          term: values.term,
          year: values.year,
          score,
          grade: getGradeFromScore(score),
          status: "pending",
        });
      });

      await Promise.all(gradePromises);
      console.log("Grades added successfully");
      
      // Reset form and notify success
      form.reset();
      setSubjectScores({});
      toast.success("Student and grades added successfully");
      onSuccess();
    } catch (error: any) {
      console.error("Error adding student and grades:", error);
      toast.error("An error occurred while adding student and grades");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Group subjects into rows of 4 for better layout
  const subjectRows = [];
  for (let i = 0; i < subjects.length; i += 4) {
    subjectRows.push(subjects.slice(i, i + 4));
  }

  return (
    <div className="space-y-6 p-6 border rounded-lg bg-background">
      <h3 className="text-lg font-semibold">Add New Student with Grades</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="form"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form/Class</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select form" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {forms.map((form) => (
                        <SelectItem key={form} value={form}>
                          {form}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="admission_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. ADM123" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {terms.map((term) => (
                          <SelectItem key={term} value={term}>
                            {term}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-3">Subject Grades</h4>
            {subjectRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {row.map((subject) => (
                  <div key={subject} className="space-y-2">
                    <label className="text-sm font-medium">{subject}</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Score"
                      value={subjectScores[subject] || ""}
                      onChange={(e) => handleScoreChange(subject, e.target.value)}
                      className="w-full"
                    />
                    {subjectScores[subject] !== undefined && (
                      <div className="text-xs font-medium text-muted-foreground">
                        Grade: {getGradeFromScore(subjectScores[subject])}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Student with Grades"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddStudentGradeForm;
