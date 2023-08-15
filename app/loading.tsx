import { LoadingAnimated } from "@/components/LoadingAnimated";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex m-[-2.5rem] justify-center items-center  w-[100vw] min-h-[1440px] h-[100vh] bg-black bg-opacity-40 sticky top-0 left-0">
      <div className="flex justify-center  w-full h-[100vh] ">
        <LoadingAnimated></LoadingAnimated>
      </div>
    </div>
  );
}
