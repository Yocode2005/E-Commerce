import prisma from "@/lib/prisma";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

async function getOrCreateUser(userId) {
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    try {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);
      
      user = await prisma.user.create({
        data: {
          id: userId,
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || "User",
          email: clerkUser.emailAddresses[0].emailAddress,
          image: clerkUser.imageUrl || "",
        },
      });
    } catch (error) {
      console.log("Error fetching from Clerk:", error);
      throw new Error("Failed to create user");
    }
  }

  return user;
}

// update user cart
export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const { cart } = await request.json();

    await getOrCreateUser(userId);

    await prisma.user.update({
      where: { id: userId },
      data: { cart },
    });

    return NextResponse.json({ message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 500 }
    );
  }
}

// get  user cart
export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const user = await getOrCreateUser(userId);

    return NextResponse.json({ cart: user.cart || {} });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 500 }
    );
  }
}