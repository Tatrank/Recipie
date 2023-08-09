"use client";
export default function erorr({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <>{error.message}</>;
}
