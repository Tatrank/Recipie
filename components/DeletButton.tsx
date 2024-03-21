"use client";

import { IP_ADDRESS } from "@/lib/files";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <div className="w-3/4 h-16 m-8 ">
      <div
        className="text-5xl flex justify-center items-center h-full w-full rounded-lg bg-accent-light hover:cursor-pointer"
        onClick={async () => {
          const deletes = await fetch(
            `http://${IP_ADDRESS}/api/userRecipe?id=${id}`,
            {
              method: "DELETE",
            }
          );

          if (deletes.status == 200) {
            router.refresh();
          }
        }}
      >
        Smazat
      </div>
    </div>
  );
}
