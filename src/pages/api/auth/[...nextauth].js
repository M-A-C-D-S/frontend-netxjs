import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: {label: "Email", placeholder: "Email"},
            password: {label: "Password", type: "password"}
          },
          async authorize(credentials){
            try {
                const {email, password} = credentials
                return await fetch("http://localhost:5000/users/login",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                })
                .then((response)=>response.json())
                .then((res)=>{
                    const auth = {token: res.token}
                    console.log(auth)
                    return auth
                })

            } catch(error){
                console.log(error)
                return null
            }
          }
        })
      ],
})