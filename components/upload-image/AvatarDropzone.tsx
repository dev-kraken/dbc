import React from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'
import { IoIosCloudUpload } from 'react-icons/io'
import { Button } from '@/components/ui/button'
import { FaBoxOpen } from 'react-icons/fa'
import { DropZoneError } from '@/components/upload-image/DropZoneError'

interface OnDropProps {
  onDrop: (acceptedFiles: File[]) => void
}

export const AvatarDropzone = ({ onDrop }: OnDropProps) => {
  const maxSize = 5 * 1024 * 1024

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, open } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp']
    },
    maxSize: maxSize,
    noClick: true,
    noKeyboard: true,
    onDrop: onDrop,
    maxFiles: 1,
    multiple: false
  })

  const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize

  return (
    <section className='m-4 space-y-2'>
      <div
        {...getRootProps()}
        className={cn(
          'w-72 flex flex-col justify-center items-center p-5 border-2 border-dashed rounded-lg cursor-pointer',
          isDragActive ? 'bg-purple-400/10 text-purple-600 animate-pulse' : 'bg-purple-300/10 text-purple-400'
        )}
      >
        <input {...getInputProps()} />
        {!isDragActive && (
          <div className='space-y-2 w-full text-center'>
            <IoIosCloudUpload className='animate-in text-purple-600 w-full' size={35} />
            <p className='text-md font-semibold'>DRAG FILE HERE</p>
            <p className='text-xs text-muted-foreground'>Drag and drop a file here, or browse your computer.</p>
            <Button type='button' onClick={open} variant='default' size='sm'>
              Browse File
            </Button>
          </div>
        )}
        {isDragActive && !isDragReject && (
          <div className='space-y-2 w-full text-center'>
            <FaBoxOpen className='animate-in text-purple-600 w-full' size={50} />
            <p className='text-sm font-semibold'>DRAG FILE HERE</p>
          </div>
        )}
      </div>
      {isDragReject && <DropZoneError message='File type not accepted, please try again' />}
      {isFileTooLarge && <DropZoneError message='Only files smaller than 5MB are accepted' />}
      {fileRejections.length > 0 && <DropZoneError message='Only JPEG, PNG, WEBP files are accepted.' />}
    </section>
  )
}
