import { FullRecepi } from "@/types";
import { get } from "http";
import Link from "next/link";
import RemoveComment from "@/components/RemoveComment";
import AddComment from "@/components/AddComment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LikeButton from "@/components/LikeButton";
import CryptoJS from "@/lib/encryption";

import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { category: String; recipe: String; id: String };
}) {
  // read route params

  // fetch data

  return {
    title: params.recipe,
  };
}

export default async function page({
  params,
}: {
  params: { category: String; recipe: String; id: String };
}) {
  const data = await fetch(
    `http://localhost:3000/api/recipeBigDetail?id=${params.id}`,
    {
      cache: "no-store",
    }
  );
  const session = await getServerSession(authOptions);
  const json: FullRecepi = await data.json();
  const mail = CryptoJS.AES.encrypt(
    json.user.email,
    "secret key 123"
  ).toString();
  return (
    <div
      className="m-[-2.5rem] mb-[-9rem] sticky top-0 left-0 mt-[-7.5rem] w-[100vw] min-h-[1440px] "
      style={{
        backgroundImage: `url(${json.image_url})`,
        backgroundSize: "cover",
      }}
    >
      <div className=" h-full flex justify-center items-center flex-col w-full px-3 py-[20rem]  bg-black backdrop-filter backdrop-blur-xl bg-opacity-60  ">
        <div className="md:w-[1300px] w-full flex flex-col items-center   text-text-dark bg-background-dark rounded-3xl p-7 bg-opacity-40 border-2  border-secondary-dark">
          <div className="flex justify-center items-center text-6xl md:text-8xl">
            {json.name}
            {session && (
              <LikeButton
                NumberLikes={2}
                RecipeID={json.id}
                UserID={session?.user?.email!}
              ></LikeButton>
            )}
          </div>
          <div className="flex flex-wrap  justify-between justify-items-center items-center w-full h-fit md:h-52 my-10 ">
            <div className="bg-primary-dark h-10 md:h-20 my-4 md:my-0 flex justify-between rounded-full w-[600px]">
              <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-xl md:text-3xl">
                Přidal
              </div>
              <div className="flex justify-center items-center px-5  text-xl md:text-3xl">
                <Link href={`/recipe/user/public/${mail}`}>
                  {" "}
                  {json.user.name}
                </Link>
              </div>
            </div>
            <div className="bg-primary-dark h-10 md:h-20 my-4 md:my-0 flex justify-between rounded-full w-[600px]">
              <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-xl md:text-3xl">
                Publikováno
              </div>
              <div className="flex justify-center items-center px-5  text-xl md:text-3xl">
                {json.published.substring(0, 10)}
              </div>
            </div>
            <div className="bg-primary-dark h-10 md:h-20 my-4 md:my-0 flex justify-between rounded-full w-[600px]">
              <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-xl md:text-3xl">
                Obtížnost
              </div>
              <div className="flex justify-center items-center px-5  text-xl md:text-3xl">
                {json.difficulty}
              </div>
            </div>
            <div className="bg-primary-dark h-10 md:h-20 my-4 md:my-0 flex justify-between rounded-full w-[600px]">
              <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-xl md:text-3xl">
                Likes
              </div>
              <div className="flex justify-center items-center px-5  text-xl md:text-3xl">
                {json.likes.length}
              </div>
            </div>
          </div>
          <div className="bg-primary-dark min-h-[10] md:h-20 flex justify-between rounded-full w-full">
            <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-xl md:text-3xl">
              Kategorie
            </div>
            <div className="flex justify-center items-center px-5 text-3xl">
              {json.categories.map((item) => {
                return <>{item.name} </>;
              })}
            </div>
          </div>
          <div className="md:w-2/3 w-full h-fit m-10 p-8 flex items-center flex-col  bg-primary-dark rounded-3xl">
            <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-24 mb-10 rounded-full bg-background-dark text-3xl">
              Ingredience
            </div>
            <div className="text-xl w-full p-8 h-2/3 flex justify-center ">
              <div className="w-2/5 flex justify-end items-center h-full text-xl pr-3  border-r-2">
                <div>
                  {json.groceries_measueres.map((item) => {
                    return <div key={item.id}> {item.grocery.name}</div>;
                  })}
                </div>
              </div>
              <div className="w-2/5 h-full text-xl flex items-center  pl-3">
                <div>
                  {json.groceries_measueres.map((item) => {
                    return <div key={item.id}> {item.measure.value}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit p-8 m-10 flex items-center flex-col  bg-primary-dark rounded-3xl">
            <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-16 mb-10 rounded-full bg-background-dark text-3xl">
              Příprava
            </div>
            <div className="text-xl w-full flex justify-start">
              {json.disclaimer}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[1300px] my-8 flex flex-col items-center justify-evenly  text-text-dark bg-background-dark rounded-3xl p-7 bg-opacity-40 border-2  border-secondary-dark">
          {session && (
            <AddComment
              recipe={json.id}
              user={session?.user?.email!}
              userName={session.user?.name!}
              userImage={session.user?.image!}
            ></AddComment>
          )}
          {json.comments.map((item) => {
            let mailComment = CryptoJS.AES.encrypt(
              item.User.email,
              "secret key 123"
            ).toString();
            return (
              <div
                key={item.id}
                className="flex my-4 flex-wrap bg-primary-dark w-full p-5 h-fit rounded-3xl"
              >
                <div className="flex mb-3 w-full justify-between items-center">
                  <div className=" flex justify-between justify-items-center items-center h-14 w-[14rem] overflow-hidden">
                    <div></div>
                    <div className="border absolute z-10 rounded-full border-secondary-dark">
                      <img
                        className="w-12 h-12 rounded-full "
                        src={item.User.image!}
                      ></img>
                    </div>
                    <Link href={`/recipe/user/public/${mailComment}`}>
                      <div className="w-[13rem]  h-9 flex justify-end p-3 rounded-2xl z-0 text-lg items-center bg-background-dark">
                        {item.User.name}
                      </div>
                    </Link>
                  </div>
                  {session?.user?.email == item.User.email ? (
                    <div className="md:p-4 p-2 bg-background-dark rounded-3xl text-xl md:text-3xl hover:cursor-pointer">
                      <RemoveComment commentId={item.id}></RemoveComment>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div
                  className="w-full min-h-[6 rem] rounded-lg text-3xl h-fit p-7 bg-background-dark "
                  id="comment"
                >
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
