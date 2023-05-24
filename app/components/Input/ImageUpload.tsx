"use client"
import React,{useCallback} from 'react'
import {CldUploadWidget} from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';

declare global{
  var cloudinary:any;  
}

interface ImageUploadProps{
  onChange:(value:string)=>void;
  value:string
}
function ImageUpload({onChange,value}:ImageUploadProps) {
  const handleUpload=useCallback((result:any)=>{
    onChange(result.info.secure_url);
  },[onChange])

  return (
    <CldUploadWidget
    onUpload={handleUpload}
      uploadPreset='x9nwzddy'
      options={{maxFiles:1}}
    >
      {({open})=>{
        return(
          <div onClick={()=>open?.()} className="flex flex-col justify-center items-center transition relative cursor-pointer hover:opacity-70 border-dashed border-neutral-300 border-2 p-20 text-gray-600">

            <TbPhotoPlus size={50}/>
            <div className="text-semibold text-lg">
              Click to upload
            </div>
            {
              value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                  alt='upload'
                  fill
                  src={value}
                  style={{objectFit:"cover"}}
                  />
                </div>
              )
            }
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload;