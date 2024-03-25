"use client";
import { IP_ADDRESS } from "@/lib/files";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { DeleteIcon } from "./Icons";
export default function RemoveComment({ commentId }: { commentId: string }) {
  const router = useRouter();
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.8 }}
        onClick={async () => {
          await fetch(
            `http://${IP_ADDRESS}/api/comments?commentId=${commentId}`,
            {
              method: "DELETE",
            }
          );
          router.refresh();
        }}
      >
        <DeleteIcon />
      </motion.div>
    </>
  );
}
