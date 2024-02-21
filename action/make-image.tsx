'use client'
import { ChangeEvent } from 'react'

interface ImageData {
  files: FileList
  displayUrl: string
}

export async function GetImageData(event: ChangeEvent<HTMLInputElement>): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const dataTransfer = new DataTransfer()

    if (event.target.files) {
      Array.from(event.target.files).forEach(image => dataTransfer.items.add(image))

      const files = dataTransfer.files
      const displayUrl = URL.createObjectURL(event.target.files[0])

      resolve({ files, displayUrl })
    } else {
      reject(new Error('No files found'))
    }
  })
}

export function ImgToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      if (event.target && typeof event.target.result === 'string') {
        const base64String = event.target.result
        resolve(base64String)
      } else {
        reject(new Error('Failed to read the file as base64.'))
      }
    }
    reader.onerror = error => {
      reject(error)
    }
    reader.readAsDataURL(file)
  })
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject(new Error('Failed to convert Blob to base64.'));
      }
    };
    reader.onerror = reject;
  });
}

export async function getImageFile(url: string): Promise<File | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch the image. Status: ${response.status}`)
    }

    const blob = await response.blob()
    const fileName = url.substring(url.lastIndexOf('/') + 1)
    const file = new File([blob], fileName, {
      type: response.headers.get('Content-Type') || 'application/octet-stream'
    })

    return file
  } catch (error) {
    return null
  }
}
