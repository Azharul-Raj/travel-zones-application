import prisma from '@/app/libs/prismadb';
import { ListingProps } from '../types';



export async function getListings(params:ListingProps){
   try {
    const {userId,bathroomCount,category,endDate,startDate,roomCount,guestCount,locationValue}=params;
    let query:any={};
    if(userId){
        query.userId=userId;
    }
    if(guestCount){
        query.guestCount={
            gte:+guestCount
        }
    }

    if(roomCount){
        query.roomCount={
            gte:+roomCount
        }
    }
    if(bathroomCount){
        query.bathroomCount={
            gte:+bathroomCount
        }
    }
    if(category){
        query.category=category;
    }
    if (locationValue) {
        query.locationValue = locationValue;
      }

    if(startDate && endDate){
        query.NOT={
            resarvations:{
                some:{
                    OR:[
                         {
                        endDate:{gte:startDate},
                        startDate:{lte:endDate}
                    },
                    {
                        startDate:{lte:endDate},
                        endDate:{gte:startDate}
                    }
                ]
                }
            }
        }
    }
    

    const listings= await prisma.listing.findMany({
        where:query,
        orderBy:{
            createdAt:"desc"
        }
    }) 
    return listings.map(listing=>({...listing,createdAt:listing.createdAt.toISOString()}))
       
    
   } catch (error:any) {
    throw new Error(error)
   }
}