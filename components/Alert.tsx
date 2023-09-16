import { motion } from "framer-motion";

export default function Alert({
  text,
  visibility,
}: {
  text: string;
  visibility: boolean;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{
        scaleX: visibility ? 1 : 0,
      }}
      className="bg-primary-dark cursor-pointer  origin-left border-l-4 border-secondary-dark  p-4"
      role="alert"
    >
      <p className="font-bold text-3xl">Varování</p>
      <p className="text-xl">{text}</p>
    </motion.div>
  );
}
