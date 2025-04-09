
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Student, StudentInsert, StudentGrade, StudentGradeInsert } from "@/types/student";

export async function fetchStudents(): Promise<Student[]> {
  try {
    console.log("Fetching students from database...");
    
    // First try to fetch without auth, as we've now added RLS policies that allow access
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('name');

    if (error) {
      console.error("Error fetching students:", error);
      throw error;
    }

    console.log("Successfully fetched students:", data);
    return data as Student[] || [];
  } catch (error: any) {
    console.error("Error in fetchStudents:", error);
    toast.error(`Error fetching students: ${error.message}`);
    return [];
  }
}

export async function fetchStudent(id: string): Promise<Student | null> {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Student;
  } catch (error: any) {
    toast.error(`Error fetching student: ${error.message}`);
    return null;
  }
}

export async function fetchStudentGrades(studentId: string): Promise<StudentGrade[]> {
  try {
    const { data, error } = await supabase
      .from('student_grades')
      .select('*')
      .eq('student_id', studentId)
      .order('subject');

    if (error) {
      throw error;
    }

    return data as StudentGrade[] || [];
  } catch (error: any) {
    toast.error(`Error fetching student grades: ${error.message}`);
    return [];
  }
}

export async function addStudent(student: StudentInsert): Promise<Student | null> {
  try {
    console.log("Adding student:", student);
    
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select();

    if (error) {
      console.error("Error from Supabase when adding student:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error("No data returned from student insert");
    }

    console.log("Student added successfully:", data[0]);
    return data[0] as Student;
  } catch (error: any) {
    console.error("Error in addStudent function:", error);
    toast.error(`Error adding student: ${error.message}`);
    return null;
  }
}

export async function updateStudent(id: string, updates: StudentInsert): Promise<Student | null> {
  try {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Student updated successfully");
    return data as Student;
  } catch (error: any) {
    toast.error(`Error updating student: ${error.message}`);
    return null;
  }
}

export async function deleteStudent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('students')
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
    console.log("Adding/updating grade:", grade);
    
    // Check if grade exists
    const { data: existing } = await supabase
      .from('student_grades')
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
        .from('student_grades')
        .update(grade)
        .eq('id', (existing as StudentGrade).id)
        .select()
        .single();
        
      if (error) {
        console.error("Error updating grade:", error);
        throw error;
      }
      result = data;
      console.log("Grade updated successfully:", result);
    } else {
      // Insert new grade
      const { data, error } = await supabase
        .from('student_grades')
        .insert([grade])
        .select()
        .single();
        
      if (error) {
        console.error("Error inserting grade:", error);
        throw error;
      }
      result = data;
      console.log("Grade added successfully:", result);
    }

    return result as StudentGrade;
  } catch (error: any) {
    console.error("Error in addOrUpdateGrade function:", error);
    toast.error(`Error saving grade: ${error.message}`);
    return null;
  }
}

export async function getStudentsByForm(form: string): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('form', form)
      .order('name');

    if (error) {
      throw error;
    }

    return data as Student[] || [];
  } catch (error: any) {
    toast.error(`Error fetching students by form: ${error.message}`);
    return [];
  }
}

export async function getStudentGradesByTerm(term: string, year: number): Promise<StudentGrade[]> {
  try {
    console.log(`Fetching grades for term: ${term}, year: ${year}`);
    
    const { data, error } = await supabase
      .from('student_grades')
      .select('*')
      .eq('term', term)
      .eq('year', year);

    if (error) {
      console.error("Error fetching grades by term:", error);
      throw error;
    }

    console.log(`Successfully fetched ${data?.length || 0} grades`);
    return data as StudentGrade[] || [];
  } catch (error: any) {
    console.error("Error in getStudentGradesByTerm:", error);
    toast.error(`Error fetching grades by term: ${error.message}`);
    return [];
  }
}
