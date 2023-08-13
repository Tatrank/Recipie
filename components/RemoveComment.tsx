"use client";
import { useRouter } from "next/navigation";
export default function RemoveComment({ commentId }: { commentId: string }) {
  const router = useRouter();
  return (
    <>
      <div
        onClick={async () => {
          await fetch(
            `http://localhost:3000/api/comments?commentId=${commentId}`,
            {
              method: "DELETE",
            }
          );
          router.refresh();
        }}
      >
        Smazat komentář
      </div>
    </>
  );
}
