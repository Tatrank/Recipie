import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  if (
    data.name.length >= 25 ||
    data.difficulty.length >= 25 ||
    data.description.length >= 200 ||
    data.time_difficulty.length >= 20 ||
    data.stepByStep.length >= 1000 ||
    data.category.length >= 6 ||
    data.groceries_measueres.length >= 30
  ) {
    return NextResponse.json("unluko, jsem si se neměl dostat");
  }

  const userID = await db.user.findUnique({
    where: { email: data.email },
    select: { id: true },
  });
  const findmeasuerIDsPromises = data.groceries_measueres.map(
    async (item: string[]) => {
      const findFunctionID = async () => {
        let id = await db.groceries_mesaure.findFirst({
          where: {
            AND: [
              { grocery: { name: item[0] } },
              { measure: { value: item[1] } },
            ],
          },
          select: { id: true },
        });

        if (!id) {
          id = await db.groceries_mesaure.create({
            data: {
              grocery: {
                connectOrCreate: {
                  where: { name: item[0] },
                  create: {
                    name: item[0],
                  },
                },
              },
              measure: {
                connectOrCreate: {
                  where: { value: item[1] },
                  create: {
                    value: item[1],
                  },
                },
              },
            },
            select: { id: true },
          });
        }
        return id;
      };
      return findFunctionID();
    }
  );

  // Wait for all promises to resolve
  const findmeasuerIDs = await Promise.all(findmeasuerIDsPromises);

  const findCategoryIDs = data.category
    .filter((str: string) => str !== "")
    .map(async (item: string) => {
      let categoryID = await db.category.findUnique({
        where: { name: item },
        select: { id: true },
      });
      if (!categoryID) {
        categoryID = await db.category.create({
          data: { name: item },
          select: { id: true },
        });
      }
      return categoryID;
    });

  const categoryIDs = await Promise.all(findCategoryIDs);

  const recipe = await db.recipe.create({
    data: {
      disclaimer: data.stepByStep,
      name: data.name,
      description: data.description,
      time_difficulty: data.time_difficulty,
      image_key: data.image_key,
      image_url: data.image_url,
      categories: { connect: categoryIDs },
      difficulty: data.difficulty,
      groceries_measueres: { connect: findmeasuerIDs },
      user: { connect: { id: userID?.id } },
    },
    include: {
      categories: true,
      groceries_measueres: { include: { grocery: true, measure: true } },
    },
  });
  return NextResponse.json(recipe);
}
