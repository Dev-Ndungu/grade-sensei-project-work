
import { Database } from "@/integrations/supabase/types";

export type Student = Database['public']['Tables']['students']['Row'];
export type StudentInsert = Database['public']['Tables']['students']['Insert'];
export type StudentUpdate = Database['public']['Tables']['students']['Update'];

export type StudentGrade = Database['public']['Tables']['student_grades']['Row'];
export type StudentGradeInsert = Database['public']['Tables']['student_grades']['Insert'];
export type StudentGradeUpdate = Database['public']['Tables']['student_grades']['Update'];
