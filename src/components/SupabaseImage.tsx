import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const downloadImage = async (bucket: string, path: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    if (error) {
      return reject(error);
    }
    const fr = new FileReader();
    fr.readAsDataURL(data);
    fr.onload = () => {
      resolve(fr.result as string);
    };
  });
};

export default function SupabaseImage({
  bucket,
  path,
  className,
}: {
  bucket: string;
  path: string;
  className: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["supabaseImage", { bucket, path }],
    queryFn: () => downloadImage(bucket, path),
    staleTime: 1000 * 60 * 60 * 24,
  });

  // if (error) return <Text className='text-white'>Error: {error.message}</Text>;

  return (
    <View>
      {data ? (
        <Image
          source={{
            uri: data || undefined,
          }}
          className={`${className} bg-neutral-900`}
        />
      ) : (
        <FontAwesome5 name="user" size={28} color="white" />
      )}
    </View>
  );
}
