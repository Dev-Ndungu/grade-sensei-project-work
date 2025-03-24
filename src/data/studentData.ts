
import { Student } from "@/types/grades";

export const studentData: Student[] = [
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
