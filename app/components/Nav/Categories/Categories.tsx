"use client"
import React from 'react'
import Container from '../../Container';
import { categories } from '@/app/data/data';
import CategoryBox from '../../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

function Categories() {
  const params=useSearchParams();
  const categoryName=params?.get('category');
  const pathname=usePathname()
  const mainPage=pathname==='/';
  if(!mainPage) return null;
  return (
    <Container>
      <div className="flex justify-between items-center pt-2 overflow-y-auto">
        {
          categories.map(category=><CategoryBox key={category.label} Icon={category.icon} label={category.label} selected={categoryName===category.label} description={category.description}/>)
        }
      </div>
    </Container>
  )
}

export default Categories;