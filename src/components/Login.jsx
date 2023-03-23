import { LockClosedIcon } from '@heroicons/react/20/solid'
import {NextAuth} from "../pages/api/auth/[...nextauth]"
import {signIn} from "next-auth/react"
import { useState } from 'react'
import { useRouter } from 'next/router'


export default function Login() {
  const [userInfo, setUserInfo] = useState({email: "", password: ""})
  const Router = useRouter()
  const handleSubmit = async(e)=>{
    e.preventDefault()

    const res = await signIn('credentials', {
      redirect: false, 
      email: userInfo.email, 
      password: userInfo.password
    })
    console.log(res)
    console.log(res.email)
    if(res.ok){
      Router.push("/system")
    } else {
      console.log(res?.error)
    }
  }
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Logar
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:px-4 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email"
                  value={userInfo.email}
                  onChange={({target})=>{
                    setUserInfo({ ...userInfo, email: target.value})
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:px-4 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Senha"
                  value={userInfo.password}
                  onChange={({target})=>{
                    setUserInfo({ ...userInfo, password: target.value})
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Logar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
