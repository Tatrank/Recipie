import { db } from "@/lib/db";
import { NextResponse } from "next/server";
/* export async function GET() {
  const eamil = "dousa.vaclav@post.cz";
  let UserId = await db.user.findUnique({
    where: { email: eamil },
    select: { id: true },
  });

  let measuereid = await db.groceries_mesaure.findFirst({
    where: {
      AND: [{ grocery: { name: "mléko" } }, { measure: { value: "100 ml" } }],
    },
    select: { id: true },
  });

  let create = await db.groceries_mesaure.create({
    data: {
      grocery: {
        connectOrCreate: {
          where: { name: "mléko" },
          create: {
            name: "mléko",
          },
        },
      },
      measure: {
        connectOrCreate: {
          where: { value: "100 ml" },
          create: {
            value: "100 ml",
          },
        },
      },
    },
    select: { id: true },
  });

  const data = await db.recipe.create({
    data: {
      name: "koprovka",
      disclaimer: "lorem honem za chvíli tam budem",
      user: { connect: { id: UserId?.id } },
      categories: { connect: { id: "64552bf1-a0cd-4efa-b2e8-318388184b06" } },
      groceries_measueres: {
        connect: { id: "1a97442b-b589-4644-a32f-e2f33f233a07" },
      },
    },
  });
  return NextResponse.json(create);
} */

export async function POST(req: Request) {
  const data = await req.json();
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
