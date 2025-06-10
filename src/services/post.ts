import { supabase } from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

type PostInput = TablesInsert<"posts">;

export const fetchPost = async () => {
  const { data } = await supabase
    .from("posts")
    .select("*,user:profiles(*),replies:posts(count)")
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .throwOnError();
  return data;
};
export const createPost = async (newPost: PostInput) => {
  const { data } = await supabase
    .from("posts")
    .insert(newPost)
    .select("*")
    .throwOnError();
  return data;
};

export const getPostReplies = async (id: string) => {
  const { data } = await supabase
    .from("posts")
    .select("*, user:profiles(*),replies:posts(count)")
    .eq("parent_id", id)
    .throwOnError();
  return data;
};

export const getPostsByUserId = async (userId: string) => {
  const { data } = await supabase
    .from("posts")
    .select("*,user:profiles(*),replies:posts(count)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
};

export const getPostById = async (id: string) => {
  const { data } = await supabase
    .from("posts")
    .select("*, user:profiles(*),replies:posts(count)")
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
};
