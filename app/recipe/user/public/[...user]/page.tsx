import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import CryptoJS from "@/lib/encryption";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Uživatel",
};
export default async function Page({ params }: { params: { user: string[] } }) {
  const fullUrl = decodeURIComponent(params.user.toString()).replace(",", "/");
  const bytes = CryptoJS.AES.decrypt(fullUrl, "secret key 123");
  const originalMail = bytes.toString(CryptoJS.enc.Utf8);

  const data = await fetch(
    `http://localhost:3000/api/userRecipe?userEmail=${originalMail}`
  );
  const json: FullRecepi[] = await data.json();
  return (
    <div className="flex flex-wrap justify-center h-fit w-9/10">
      <div className="w-full flex justify-center text-7xl">
        Recepty uživatele: {json[0].user.name}{" "}
      </div>
      {json.map((item: FullRecepi) => (
        <div key={item.id} className="w-fit  m-20 h-fit">
          <div className="flex flex-col items-center justify-between ">
            <Link
              href={`http://localhost:3000/recipe/${item.categories[0].name}/${item.name}/${item.id}`}
            >
              <RecepiCard data={item}></RecepiCard>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
