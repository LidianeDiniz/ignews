import {query as q} from 'faunadb'

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers';
import GitHubProvider from "next-auth/providers/github";
import { signIn } from 'next-auth/react';

import { fauna } from '../../../services/fauna'




export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      
      authorization: {
        params: {
          scope: "read:user",
        },
      }
    })
    
  ],

  callbacks:{
    async session( data ){
     try{

      data.user.email
      const userActiveSubscription = await fauna.query(
        q.Get(
          q.Intersection([
            q.Match(
              q.Index('subscription_by_user_ref'),
              q.Select(
                "ref",
                q.Get(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(data.user.email)
                  )
                )
              )
            ),
            q.Match(
              q.Index('subscription_by_status'),
              'active'
            )
             ] )
        )
      )
      return {
        ...data.session, userActiveSubscription
      }
     } catch{
      return {
        ...data.session, activeSubscription: null
      }
     }
    },

    async signIn({user, account, profile}){
      const {email} = user 
      
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email)),
              ),
            ),

            q.Create(q.Collection('users'), {
              data: {
                email,
              },
            }),
            q.Get(
              q.Match(
                q.Index('user_by_email'), 
                q.Casefold(user.email))),
          ),
        );

        return true;
      } catch {
        return false;
      }
    },
  },


  })