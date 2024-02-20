import { useCallback, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import getCroppedImg from '@/action/crop-image'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface AvatarResizeProps {
  image: string
  setPreview: (preview: string | null) => void
  setImage: (image: string | null) => void
}

export const AvatarResize = ({ image, setPreview, setImage }: AvatarResizeProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: string | null = await getCroppedImg(image, croppedAreaPixels as Area, rotation)
      setPreview(croppedImage || '')
      setImage(croppedImage || '')
    } catch (e) {
      console.error(e)
    }
  }, [image, croppedAreaPixels, rotation, setPreview, setImage])

  const onClose = useCallback(() => {
    setPreview(null)
    setImage(null)
  }, [setImage, setPreview])

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
          onZoomChange={setZoom}
          onRotationChange={setRotation}
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
            onValueChange={zoom => {
              setZoom(zoom[0])
            }}
          />
        </div>
        <div className='w-full space-y-2'>
          <p className='text-sm text-start w-full'>Rotate</p>
          <Slider
            defaultValue={[0]}
            min={0}
            max={360}
            step={1}
            aria-labelledby='Rotation'
            onValueChange={rotation => {
              setRotation(rotation[0])
            }}
          />
        </div>
      </div>
      <div className='py-2 w-full text-end space-x-2'>
        <Button onClick={onClose} type='button' size='sm' variant='destructive'>
          Close
        </Button>
        <Button onClick={showCroppedImage} type='button' size='sm'>
          Set Profile
        </Button>
      </div>
    </div>
  )
}
