import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { getUser } from '@/lib/database/mysql';
 
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // console.log('checking credentials', credentials)
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await getUser(credentials.email);
                if (!user || !await bcrypt.compare(credentials.password, user.password)) {
                    return null;
                }
                
                return user;
            }
        })
    ],
    callbacks: {
        session: ({session, token}) => {
            // console.log('session cb', session, token);
            return {
                ...session,
                user: {
                    id: token.id,
                    name: token.name,
                    username: token.name,
                    email: token.email
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
              const u = user as unknown as any;
            //   console.log('jwt cb', u, token);
              return {
                ...token,
                id: u.id,
                name: u.username,
                username: u.username
              };
            }
            return token;
        },
    }
};