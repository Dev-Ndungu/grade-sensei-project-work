
export type SubjectGrade = {
  score: number;
  grade: string;
  status: "approved" | "pending";
};

export type StudentSubjects = {
  [key: string]: SubjectGrade;
};

export type Student = {
  id: number;
  name: string;
  form: string;
  subjects: StudentSubjects;
};

export const subjects = ["Mathematics", "English", "Physics", "Chemistry", "Biology"];
export const forms = ["Form 1", "Form 2", "Form 3", "Form 4"];
export const terms = ["Term 1", "Term 2", "Term 3"];
