import React from 'react'
import {  signOut } from '@/auth'
import { getAllCards } from '@/action/card-action'

const Dashboard = async () => {
  const allCards = await getAllCards()
  return (
    <div>
      <h1>{JSON.stringify(allCards)}</h1>

      <form
        action={async () => {
          'use server'

          await signOut()
        }}
      >
        <button type='submit'>SignOut</button>
      </form>
    </div>
  )
}

export default Dashboard
