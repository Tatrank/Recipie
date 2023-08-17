import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
};
export default function Page() {
  return (
    <div className="w-[500px] bg-opacity-60  rounded-lg text-3xl bg-primary-dark h-72 flex justify-center items-center">
      Created by<br></br>Tatranka
    </div>
  );
}
