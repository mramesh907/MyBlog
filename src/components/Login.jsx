import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from "../store/authSlice.js"
import { Button, Input, Logo } from "./index.js"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth.js"
import { useForm } from "react-hook-form"
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (!session) throw new Error("User not found")
      const userData = await authService.getUser()
      if (!userData) throw new Error("User not found")
      dispatch(authLogin({ userData }))
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div
        className={`mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="mb-2 flex justify-center">
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Sign in to your account
          </h3>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
          </p>

          <Link
            to="/signup"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign up
          </Link>
          {error && (
            <p className="text-sm font-light text-red-500 dark:text-gray-400">
              {error}
            </p>
          )}
          <form action="" onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-4">
              <Input 
                placeholder="Enter your Email"
                label="Email" 
                type='email'
                {...register("email",{required:true,
                    validate: (value) => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return emailRegex.test(value) || "Invalid email format";
                    }
                })} />
                <Input 
                placeholder="Enter your Password"
                label="Password" 
                type='password'
                {...register("password",{required:true})} />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
