"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): JSX.Element {
  return (
    <>
      {error} <div onClick={reset}>reset</div>
    </>
  );
}
