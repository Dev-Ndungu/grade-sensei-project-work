
// Define the types manually since we can't use the generated types
export interface Student {
  id: string;
  user_id: string;
  name: string;
  form: string;
  admission_number?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface StudentInsert {
  id?: string;
  user_id: string;
  name: string;
  form: string;
  admission_number?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface StudentUpdate {
  id?: string;
  user_id?: string;
  name?: string;
  form?: string;
  admission_number?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface StudentGrade {
  id: string;
  student_id: string;
  subject: string;
  term: string;
  year: number;
  score: number;
  grade: string;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface StudentGradeInsert {
  id?: string;
  student_id: string;
  subject: string;
  term: string;
  year: number;
  score: number;
  grade: string;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface StudentGradeUpdate {
  id?: string;
  student_id?: string;
  subject?: string;
  term?: string;
  year?: number;
  score?: number;
  grade?: string;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
