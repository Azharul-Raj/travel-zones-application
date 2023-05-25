import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface InputParams {
  params: {
    listingId?: string;
  };
}

export async function POST(request: Request, { params }: InputParams) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
    }

    let favoriteIds=[...(currentUser.favoriteIds) || []]
    favoriteIds.push(listingId);
    
    const user= await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
  }
}
// delete favorite function
export async function DELETE(request: Request, { params }: InputParams) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
    }
    
    let favoriteIds=[...(currentUser.favoriteIds) || []]
    const updatedIds=favoriteIds.filter(id=> id!==listingId)
    const user= await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds:updatedIds
        }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
  }
}
