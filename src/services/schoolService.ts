
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type SchoolInfo = {
  id: string;
  name: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  motto?: string;
  principal_name?: string;
  created_at: string;
  updated_at: string;
}

export type SchoolInfoUpdate = Partial<Omit<SchoolInfo, 'id' | 'created_at' | 'updated_at'>>;

export async function fetchSchoolInfo(): Promise<SchoolInfo | null> {
  try {
    console.log("Fetching school information from database...");
    
    const { data, error } = await supabase
      .from('school_info')
      .select('*')
      .single();

    if (error) {
      console.error("Error fetching school info:", error);
      throw error;
    }

    console.log("Successfully fetched school info:", data);
    return data as SchoolInfo;
  } catch (error: any) {
    console.error("Error in fetchSchoolInfo:", error);
    toast.error(`Error fetching school information: ${error.message}`);
    return null;
  }
}

export async function updateSchoolInfo(id: string, updates: SchoolInfoUpdate): Promise<SchoolInfo | null> {
  try {
    const { data, error } = await supabase
      .from('school_info')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("School information updated successfully");
    return data as SchoolInfo;
  } catch (error: any) {
    toast.error(`Error updating school information: ${error.message}`);
    return null;
  }
}
