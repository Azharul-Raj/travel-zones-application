import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<
  Listing,
  "createdAt" 
> & {
  createdAt: string;
};
// safe reservation
export type SafeReservation=Omit<
Reservation,
SafeListing,
"createdAt" | 'startDate' | 'endDate'
> &{
  createdAt:string;
  startDate:string;
  endDate:string;
}




// normal type def
export interface ListingProps{
    userId?:string;
    guestCount?:number;
    bathroomCount?:number;
    roomCount?:number;
    startDate?:string;
    endDate?:string;
    locationValue?:string;
    category?:string;
}

export interface CountrySelectValue{
  flag:string;
  label:string;
  latlan:number[];
  region:string;
  value:string;
}