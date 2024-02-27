import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserSelectedSocialMedia } from '@/types/card'
import { MdDeleteOutline } from 'react-icons/md'
import { SocialMedia } from '@/schemas/social-media-schema'
import { UseFormReturn } from 'react-hook-form'
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd'

interface CardSocialMediaFormProps {
  inputs: UserSelectedSocialMedia[]
  deleteSocialMediaInput: (socialMediaInput: UserSelectedSocialMedia) => void
  form: UseFormReturn
  onDragEnd: (result: DropResult) => void
}

export const CardSocialMediaFormInputs = ({
  form,
  inputs,
  deleteSocialMediaInput,
  onDragEnd
}: CardSocialMediaFormProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='indexNumber'>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef} className='space-y-4 w-full'>
            {inputs.map((input, index) => {
              return (
                <Draggable key={`social-media-${index}`} draggableId={`social-media-${index}`} index={index}>
                  {provided => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className='w-full border px-4 py-3 rounded-md bg-white'
                    >
                      <FormField
                        control={form.control}
                        name={input.label as keyof z.infer<typeof SocialMedia>}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex justify-between items-center mb-4 w-full'>
                              <FormLabel>{input.label}</FormLabel>
                              <MdDeleteOutline
                                onClick={() => {
                                  form.unregister(input.value)
                                  deleteSocialMediaInput(input)
                                }}
                                className='cursor-pointer text-destructive'
                                size={20}
                              />
                            </div>
                            <FormControl>
                              <Input placeholder={input.label} {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
