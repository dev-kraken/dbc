'use client'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { AddSocialMedia } from '@/components/cards/social-media/add-social-media'
import { AllSocialMediaInputs, UserSelectedSocialMedia } from '@/types/card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CardSocialMediaForm } from '@/components/cards/social-media/card-social-media-form'

interface CardSocialMediaListProps {
  allSocialMediaInputs: AllSocialMediaInputs[]
  userSelectedSocialMedia: UserSelectedSocialMedia[]
}

export const CardSocialMediaList = ({ allSocialMediaInputs, userSelectedSocialMedia }: CardSocialMediaListProps) => {
  const [newSocialMediaInput, setNewSocialMediaInput] = useState<UserSelectedSocialMedia[] | []>(
    userSelectedSocialMedia
  )

  const addNewSocialMediaInput = (socialMediaInput: AllSocialMediaInputs) => {
    console.log(socialMediaInput)
  }

  return (
    <div className='grid grid-cols-3 gap-3'>
      <div className='col-span-2'>
        <Card className='w-full shadow-sm'>
          <CardHeader>
            <CardTitle>Selected Social Media</CardTitle>
            <CardDescription>Add Social Media Link to provided inputs</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-wrap gap-2 justify-center items-center'>
            <DragDropContext onDragEnd={() => {}}>
              <Droppable droppableId='indexNumber'>
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className='space-y-4 w-full'>
                    <CardSocialMediaForm />
                    {/*{[...Array(8)].map((_, index) => (*/}
                    {/*  <Draggable key={index} draggableId={index + 'asds'} index={index}>*/}
                    {/*    {provided => (*/}
                    {/*      <div*/}
                    {/*        className='p-2 border'*/}
                    {/*        {...provided.draggableProps}*/}
                    {/*        {...provided.dragHandleProps}*/}
                    {/*        ref={provided.innerRef}*/}
                    {/*      >*/}
                    {/*        <h1>jack {index}</h1>*/}
                    {/*      </div>*/}
                    {/*    )}*/}
                    {/*  </Draggable>*/}
                    {/*))}*/}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>
      </div>
      <AddSocialMedia allSocialMediaInputs={allSocialMediaInputs} addNewSocialMediaInput={addNewSocialMediaInput} />
    </div>
  )
}
