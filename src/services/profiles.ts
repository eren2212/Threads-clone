import { supabase } from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

export const getProfileById = async (id: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
};

export const updateProfile = async (
  id: string,
  uopdateProfile: TablesInsert<"profiles">
) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(uopdateProfile)
    .eq("id", id)
    .select()
    .single()
    .throwOnError();

  return data;
};
