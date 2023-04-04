import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    jwt: {
      signingKey: process.env.JWT_SIGNIN_PRIVATE_KEY
    },
    secret: process.env.NEXT_AUTH_SECRET,
    session :{
      jwt: true,
      maxAge: 7*24*60*60
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {},
          async authorize(credentials){
            if(!credentials.email || !credentials.password) return null
            try {
                const {email, password} = credentials
                const URL = process.env.NEXT_PUBLIC_API_URL
                const URI = process.env.NEXT_PUBLIC_LOGIN_URI
                return await fetch(`${URL}${URI}`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                })
                .then((response)=>response.json())
                .then((res)=>{
                    const login = {token: res.token, id: res._id, username: res.username, name: res.name, email: res.email, image: res.profileImage}
                    const {token, id, username, name, email, image} = login
                    if(!token || !id || !username || !name || !email){
                      throw new Error("Usuário ou senha inválidos")
                    }
                    return {
                       token,
                       id, 
                       name, 
                       username,
                       email,
                       image
                    }
                })
                
            } catch(error){
                // console.log(error)
                return null
            }
          }
        })
      ],
      callbacks: {
        jwt: async(token, user) =>{
          user = token.user
          token = token.token
          const isSignIn = !!user
          const actualDate = Math.floor(Date.now()/1000)
          const tokenExpires = Math.floor(7*24*60*60)

          if(isSignIn){
            if(!user || !user.token || !user.name || !user.username || !user.email || !user.id){
              return Promise.resolve({})
            }

            token.token = user.token
            token.id = user.id
            token.name = user.name
            token.username = user.username
            token.email = user.email

            token.expiration = Math.floor(
              actualDate + tokenExpires
            )
          } else {
            if(!token?.expiration){
              return Promise.resolve({})
            }

            if(actualDate > token.expiration){
              return Promise.resolve({})
            }
          }
          return Promise.resolve(token)
        },
        session: async(session, token)=>{
          token = session.token
          session = session.session
          if(!token.token || !token.id || !token.name || !token.username || !token.email || !token.expiration ){
            return null
          }

          session.accessToken = token.token
          session.user = {
            id: token.id,
            name: token.name,
            username: token.username,
            email: token.email
          }

          return {...session}
        }
      }
})