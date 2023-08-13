"use client";
export default function erorr({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error);
  return (
    <div className="m-4 w-[800px] h-[500px] flex-col text-6xl bg-primary-dark rounded-xl bg-opacity-90 flex justify-center items-center">
      <div> Něco se nepovedlo</div>
      <div
        className="m-4 flex p-4 hover:cursor-pointer bg-secondary-dark rounded-xl justify-center items-center"
        onClick={reset}
      >
        Restart
      </div>
    </div>
  );
}
