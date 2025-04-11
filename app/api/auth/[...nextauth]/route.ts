import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import { User } from "@/app/db";
const handler = NextAuth({
  providers:[
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials){
        const username=credentials?.username;
        const password=credentials?.password;

        if (!mongoose.connection.readyState) {
          await mongoose.connect(process.env.MONGODB_URI || "", { 
          });
        }
      
        // Find the user in the database
        const user = await User.findOne({ name: username,password });
      
        
        if(user){
          return user;
        }
        else{
          return null;
        }

      }
      

    })
  ],
  callbacks:{
    async jwt({ token, user }){
      if(user){
        token.id=user.id;
        token.name=user.name;
      }return token;
    },
    async session({ session, token }){
      if (token) {
        session.user = session.user || {}; // Ensure session.user exists
       
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        
      }
      return session;
    },
    async redirect({}){
      return "/dashboard"
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  // pages:{
  //   signIn:"/login"
    
  // }

});

export { handler as GET, handler as POST };