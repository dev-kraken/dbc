import React, { useCallback, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import getCroppedImg from '@/action/crop-image'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import toast from 'react-hot-toast'

interface AvatarResizeProps {
  image: string
  setPreview: (preview: string | null) => void
  setImage: (image: string | null) => void
  setError: (error: string | undefined) => void
}

const AvatarResize: React.FC<AvatarResizeProps> = ({ image, setPreview, setImage, setError }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleZoomChange = useCallback((zoom: number) => {
    // Change here
    setZoom(zoom)
  }, [])

  const handleRotationChange = useCallback((rotation: number) => {
    // Change here
    setRotation(rotation)
    return rotation
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: string | null = await getCroppedImg(image, croppedAreaPixels!, rotation)
      setError('')
      setPreview(croppedImage || '')
      setImage(croppedImage || '')
    } catch (error) {
      toast.error(error as string)
    }
  }, [image, croppedAreaPixels, rotation, setError, setPreview, setImage])

  const handleClose = useCallback(() => {
    setPreview(null)
    setImage(null)
    setError('')
  }, [setPreview, setImage, setError])

  return (
    <div className='space-y-1'>
      <div className='relative w-80 h-48'>
        <Cropper
          image={image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          zoomSpeed={1}
          maxZoom={3}
          zoomWithScroll={true}
          showGrid={true}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={handleZoomChange}
          onRotationChange={handleRotationChange}
          cropShape='round'
          cropSize={{ width: 170, height: 170 }}
        />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div className='w-full space-y-2'>
          <p className='text-sm text-start w-full'>Zoom</p>
          <Slider
            defaultValue={[zoom]}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='Zoom'
            onValueChange={(value: number[]) => handleZoomChange(value[0])}
          />
        </div>
        <div className='w-full space-y-2'>
          <p className='text-sm text-start w-full'>Rotate</p>
          <Slider
            defaultValue={[rotation]}
            min={0}
            max={360}
            step={1}
            aria-labelledby='Rotation'
            onValueChange={(value: number[]) => handleRotationChange(value[0])}
          />
        </div>
      </div>
      <div className='py-2 w-full text-end space-x-2'>
        <Button onClick={handleClose} type='button' size='sm' variant='destructive'>
          Close
        </Button>
        <Button onClick={showCroppedImage} type='button' size='sm'>
          Set Profile
        </Button>
      </div>
    </div>
  )
}

export default AvatarResize
