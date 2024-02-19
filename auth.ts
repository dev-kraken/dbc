import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  callbacks: {
    async session({ token, session }) {
      if (token && token.accessToken) {
        session.user.accessToken = token.accessToken
      }
      if (token && token.expSub) {
        session.user.expSub = token.expSub as Date
      }
      return session
    },
    async jwt({ token, user }) {
      if (user && user.accessToken) {
        token.accessToken = user.accessToken
      }
      if (user && user.expSub) {
        token.expSub = user.expSub
      }
      return token
    }
  },
  session: { strategy: 'jwt' },
  ...authConfig
})
