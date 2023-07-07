import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google"
import jsonwebtoken from "jsonwebtoken"
import { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSectret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    jwt: {
        encode: ({secret,token})=>{

        },
        decode: ({secret,token})=>{

        }
    },
    theme: {
        colorScheme: 'light',
        logo: '/logo.png',
    },
    callbacks: {
        async session({session}){
            
        },
        async signIn({user}){

        }
    }
}