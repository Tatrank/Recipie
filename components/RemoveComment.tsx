"use client";
export default function RemoveComment({ commentId }: { commentId: string }) {
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
        }}
      >
        Smazat komment
      </div>
    </>
  );
}
