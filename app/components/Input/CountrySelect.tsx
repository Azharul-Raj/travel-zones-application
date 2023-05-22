"use client"
import React from 'react'
import Select from 'react-select';
import useCountries from '@/app/hooks/useCountries';

interface CountrySelectValue{
  flag:string;
  label:string;
  latlan:number[];
  region:string;
  value:string;
}

interface CountrySelectProps{
  value?:CountrySelectValue;
  onChange:(value:CountrySelectValue)=>void
}
function CountrySelect({value,onChange}:CountrySelectProps) {
  const {getAll}=useCountries()
  return (
    <div>
      <Select      
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value=>onChange(value as CountrySelectValue))}
        formatOptionLabel={(option:any)=>(
          <div className='flex flex-row items-center gap-3'>
            <div className="">
              {
                option.flag
              }
            </div>
              <div className="">
                {
                  option.label
                },
                <span className='text-neutral-500 ml-1 text-sm'>{option.region}</span>
              </div>
          </div>
        )}
      />
    </div>
  )
}

export default CountrySelect;