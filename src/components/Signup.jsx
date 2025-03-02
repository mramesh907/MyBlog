import React, { useState } from "react"
import authService from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"
import { Button, Input, Logo } from "./index.js"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const createAccount = async (data) => {
    setError("")
    try {
      const session = await authService.createAccount(data)
      if (!session) throw new Error("User not found")
      const userData = await authService.getUser()
      if (!userData) throw new Error("User not found")
      dispatch(login({ userData }))
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-2 flex justify-center">
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Create Account
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(createAccount)}>
              <Input label="Name"
              placeholder="Enter your Name"
              {...register("name", { required: true })} />
              <Input
                placeholder="Enter your Email"
                label="Email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: (value) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    return emailRegex.test(value) || "Invalid email format"
                  },
                })}
              />
              <Input
                label="Password"
                placeholder="Enter your Password"
                type="password"
                {...register("password", { required: true })}
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit">Sign Up</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
