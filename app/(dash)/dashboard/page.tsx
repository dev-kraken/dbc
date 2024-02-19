import React from 'react'
import { signOut } from '@/auth'

const Dashboard = async () => {
  return (
    <div>

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
