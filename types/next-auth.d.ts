import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      userId: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    name: string
    userId: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    userId: string
  }
}
