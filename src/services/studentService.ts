
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Student, StudentInsert, StudentGrade, StudentGradeInsert } from "@/types/student";

export async function fetchStudents(): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from('students' as any)
      .select('*')
      .order('name');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    toast.error(`Error fetching students: ${error.message}`);
    return [];
  }
}

export async function fetchStudent(id: string): Promise<Student | null> {
  try {
    const { data, error } = await supabase
      .from('students' as any)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    toast.error(`Error fetching student: ${error.message}`);
    return null;
  }
}

export async function fetchStudentGrades(studentId: string): Promise<StudentGrade[]> {
  try {
    const { data, error } = await supabase
      .from('student_grades' as any)
      .select('*')
      .eq('student_id', studentId)
      .order('subject');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    toast.error(`Error fetching student grades: ${error.message}`);
    return [];
  }
}

export async function addStudent(student: StudentInsert): Promise<Student | null> {
  try {
    const { data, error } = await supabase
      .from('students' as any)
      .insert([student])
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Student added successfully");
    return data;
  } catch (error: any) {
    toast.error(`Error adding student: ${error.message}`);
    return null;
  }
}

export async function updateStudent(id: string, updates: StudentInsert): Promise<Student | null> {
  try {
    const { data, error } = await supabase
      .from('students' as any)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Student updated successfully");
    return data;
  } catch (error: any) {
    toast.error(`Error updating student: ${error.message}`);
    return null;
  }
}

export async function deleteStudent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('students' as any)
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    toast.success("Student deleted successfully");
    return true;
  } catch (error: any) {
    toast.error(`Error deleting student: ${error.message}`);
    return false;
  }
}

export async function addOrUpdateGrade(grade: StudentGradeInsert): Promise<StudentGrade | null> {
  try {
    // Check if grade exists
    const { data: existing } = await supabase
      .from('student_grades' as any)
      .select('*')
      .eq('student_id', grade.student_id)
      .eq('subject', grade.subject)
      .eq('term', grade.term)
      .eq('year', grade.year)
      .maybeSingle();

    let result;
    
    if (existing) {
      // Update existing grade
      const { data, error } = await supabase
        .from('student_grades' as any)
        .update(grade)
        .eq('id', existing.id)
        .select()
        .single();
        
      if (error) throw error;
      result = data;
      toast.success("Grade updated successfully");
    } else {
      // Insert new grade
      const { data, error } = await supabase
        .from('student_grades' as any)
        .insert([grade])
        .select()
        .single();
        
      if (error) throw error;
      result = data;
      toast.success("Grade added successfully");
    }

    return result;
  } catch (error: any) {
    toast.error(`Error saving grade: ${error.message}`);
    return null;
  }
}

export async function getStudentsByForm(form: string): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from('students' as any)
      .select('*')
      .eq('form', form)
      .order('name');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    toast.error(`Error fetching students by form: ${error.message}`);
    return [];
  }
}

export async function getStudentGradesByTerm(term: string, year: number): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('student_grades' as any)
      .select('*, students(name, form)')
      .eq('term', term)
      .eq('year', year);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    toast.error(`Error fetching grades by term: ${error.message}`);
    return [];
  }
}
