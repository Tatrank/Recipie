import { FullRecepi } from "@/types";
import { get } from "http";
import Link from "next/link";
import RemoveComment from "@/components/RemoveComment";
import AddComment from "@/components/AddComment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LikeButton from "@/components/LikeButton";
/* export async function generateStaticParams() {
  const category: { id: string }[] = await fetch(
    "http://localhost:3000/api/getStaticParams/getRecipeIDs"
  ).then((res) => res.json());

  return category.map((item) => ({
    id: item.id,
  }));
}
 */
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
  console.log(json);
  return (
    <div
      className="m-[-2.5rem] sticky top-0 left-0 mt-[-7.5rem] w-[100vw] min-h-[1440px] "
      style={{
        backgroundImage: `url(${json.image_url})`,
        backgroundSize: "cover",
      }}
    >
      {session && (
        <LikeButton
          NumberLikes={2}
          RecipeID={json.id}
          UserID={session?.user?.email!}
        ></LikeButton>
      )}
      <div className=" h-full flex justify-center items-center flex-col w-full px-3 py-[20rem]  bg-black backdrop-filter backdrop-blur-xl bg-opacity-60  ">
        <div className="w-[1300px] flex flex-col items-center   text-text-dark bg-background-dark rounded-3xl p-7 bg-opacity-40 border-2  border-secondary-dark">
          <div className="flex justify-center items-center text-8xl">
            {json.name}
          </div>
          <div className="flex flex-wrap  justify-between justify-items-center items-center w-full h-52 my-10 ">
            <div className="bg-primary-light h-20 flex justify-between rounded-full w-[600px]">
              <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-3xl">
                Přidal
              </div>
              <div className="flex justify-center items-center px-5 text-3xl">
                {json.user.name}
              </div>
            </div>
            <div className="bg-primary-light h-20 flex justify-between rounded-full w-[600px]">
              <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-3xl">
                Publikováno
              </div>
              <div className="flex justify-center items-center px-5 text-3xl">
                {json.published}
              </div>
            </div>
            <div className="bg-primary-light h-20 flex justify-between rounded-full w-[600px]">
              <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-3xl">
                Obtížnost
              </div>
              <div className="flex justify-center items-center px-5 text-3xl">
                {json.difficulty}
              </div>
            </div>
            <div className="bg-primary-light h-20 flex justify-between rounded-full w-[600px]">
              <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-3xl">
                Likes
              </div>
              <div className="flex justify-center items-center px-5 text-3xl">
                {json.likes.length}
              </div>
            </div>
          </div>
          <div className="bg-primary-light h-20 flex justify-between rounded-full w-full">
            <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-full rounded-full bg-background-dark text-3xl">
              Kategorie
            </div>
            <div className="flex justify-center items-center px-5 text-3xl">
              {json.categories.map((item) => {
                return <>{item.name} </>;
              })}
            </div>
          </div>
          <div className="w-2/3 h-fit m-10 p-8 flex items-center flex-col  bg-primary-dark rounded-3xl">
            <div className="px-4 flex justify-center items-center w-fit min-w-[8rem] h-24 mb-10 rounded-full bg-background-dark text-3xl">
              Ingredience
            </div>
            <div className="text-xl w-full p-8 h-2/3 flex justify-center ">
              <div className="w-2/5 flex justify-end items-center h-full text-xl pr-3  border-r-2">
                <div>
                  {json.groceries_measueres.map((item) => {
                    return <div> {item.grocery.name}</div>;
                  })}
                </div>
              </div>
              <div className="w-2/5 h-full text-xl flex items-center  pl-3">
                <div>
                  {json.groceries_measueres.map((item) => {
                    return <div> {item.measure.value}</div>;
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
        <div className="w-[1300px] my-8 flex flex-col items-center justify-evenly  text-text-dark bg-background-dark rounded-3xl p-7 bg-opacity-40 border-2  border-secondary-dark">
          {session && (
            <AddComment
              recipe={json.id}
              user={session?.user?.email!}
              userName={session.user?.name!}
              userImage={session.user?.image!}
            ></AddComment>
          )}
          {json.comments.map((item) => {
            return (
              <div className="flex my-4 flex-wrap bg-primary-dark w-full p-5 h-fit rounded-3xl">
                <div className="flex mb-3 w-full justify-between items-center">
                  <div className=" flex justify-between justify-items-center items-center h-14 w-[14rem] overflow-hidden">
                    <div></div>
                    <div className="border absolute z-10 rounded-full border-secondary-dark">
                      <img
                        className="w-12 h-12 rounded-full "
                        src={item.User.image!}
                      ></img>
                    </div>
                    <div className="w-[13rem]  h-9 flex justify-end p-3 rounded-2xl z-0 text-lg items-center bg-background-dark">
                      {item.User.name}
                    </div>
                  </div>
                  {session?.user?.email == item.User.email ? (
                    <div className="p-4 bg-background-dark rounded-3xl text-3xl hover:cursor-pointer">
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
    /*     <h1>
      {json.name}
      <Link href={`/recipe/${json.categories[0].name}`}>
        {json.categories[0].name}
      </Link>{" "}
      {session && (
        <AddComment recipe={json.id} user={session?.user?.email!}></AddComment>
      )}
      <div>
        {json.comments.map((item) => {
          return (
            <>
              {session?.user?.email == item.User.email && (
                <div>
                  <RemoveComment commentId={item.id}></RemoveComment>
                </div>
              )}

              {item.text}
            </>
          );
        })}
      </div>
    </h1> */
  );
}
