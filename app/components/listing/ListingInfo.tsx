import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react'
import { IconType } from 'react-icons';
import Avatar from '../Nav/Avatar/Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map=dynamic(()=>import('../Map'),{
    ssr:false
})

interface ListingInfoProps {
    user?: SafeUser | null;
    category: {
        label: string;
        icon: IconType;
        description: string;
    } | undefined
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
}
function ListingInfo({
    user,
    category,
    description,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue }: ListingInfoProps) {

    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlan;
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center text-xl gap-2 font-semibold">
                    <h4 className="">Hosted by {user?.name}</h4>
                    <Avatar image={user?.image} />
                </div>
                <div className="flex items-center gap-4 text-neutral-500">
                    <p>{guestCount} guests</p>
                    <p>{roomCount} rooms</p>
                    <p>{bathroomCount} bathrooms</p>
                </div>
            </div>
            <hr />
            {
                category && (
                    <ListingCategory
                     icon={category.icon}
                     label={category.label}
                     description={category.description}
                    />
                )
            }
            <hr />
            <p className="text-lg font-light text-neutral-500">{description}</p>
            <hr />
            <Map center={coordinates}/>
        </div>
    )
}

export default ListingInfo;