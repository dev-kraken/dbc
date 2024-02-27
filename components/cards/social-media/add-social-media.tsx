import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AllSocialMediaInputs } from '@/types/card'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSkype,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube
} from 'react-icons/fa6'
import { BiLogoGmail, BiLogoTelegram } from 'react-icons/bi'
import { BsPhoneFill } from 'react-icons/bs'
import { AiOutlineGlobal } from 'react-icons/ai'
import { SiZillow } from 'react-icons/si'

const getIconComponent = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Facebook':
      return <FaFacebookF className={className} />
    case 'Instagram':
      return <FaInstagram className={className} />
    case 'Linkedin':
      return <FaLinkedinIn className={className} />
    case 'mail':
      return <BiLogoGmail className={className} />
    case 'X':
      return <FaXTwitter className={className} />
    case 'Phone':
      return <BsPhoneFill className={className} />
    case 'Website':
      return <AiOutlineGlobal className={className} />
    case 'Zillow':
      return <SiZillow className={className} />
    case 'WhatsApp':
      return <FaWhatsapp className={className} />
    case 'Telegram':
      return <BiLogoTelegram className={className} />
    case 'TikTok':
      return <FaTiktok className={className} />
    case 'YouTube':
      return <FaYoutube className={className} />
    case 'Skype':
      return <FaSkype className={className} />
    default:
      return null
  }
}

interface AddSocialMediaProps {
  allSocialMediaInputs: AllSocialMediaInputs[]
  addNewSocialMediaInput: (newSocialMediaInput: AllSocialMediaInputs) => void
}

export const AddSocialMedia = ({ allSocialMediaInputs, addNewSocialMediaInput }: AddSocialMediaProps) => {
  return (
    <Card className='w-full shadow-sm'>
      <CardHeader>
        <CardTitle>Select Media</CardTitle>
        <CardDescription>What would you like to show in card?</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-wrap gap-2 justify-center items-center'>
        {allSocialMediaInputs.map((socialMediaInput, index) => (
          <Button
            key={index}
            variant='purpleButton'
            className='w-32 gap-2 disabled:pointer-events-auto disabled:cursor-not-allowed'
            disabled={socialMediaInput.disable}
            onClick={() => {
              const newSocialMediaInput = {
                ...socialMediaInput,
                disable: true,
                value: ''
              }
              addNewSocialMediaInput(newSocialMediaInput)
            }}
          >
            {getIconComponent(socialMediaInput.icon, 'size-4')}
            {socialMediaInput.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
