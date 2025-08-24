"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { motion } from "framer-motion"

export default function Home() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  // Email signup
  const handleSignup = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMessage("❌ " + error.message)
    } else {
      setMessage("✅ Check your inbox for confirmation!")
      setEmail("")
    }
  }

  // Google signup
  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    })
    if (error) setMessage("❌ " + error.message)
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-grow px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-4"
        >
          🚀 Welcome to <span className="text-blue-500">Codeveen</span>
        </motion.h1>

        <p className="max-w-2xl text-lg text-gray-300 mb-6">
          A hub for <span className="font-semibold text-white">Problem Solving</span>, 
          <span className="font-semibold text-white"> Project-Based Learning</span>, 
          <span className="font-semibold text-white"> Community</span>, 
          and <span className="font-semibold text-white"> Blogs</span>.  
          <br />Join early and be part of the movement before launch!
        </p>

        {/* Email Signup Form */}
        <form
          onSubmit={handleSignup}
          className="flex flex-col sm:flex-row gap-3 bg-gray-800 p-4 rounded-xl shadow-lg w-full max-w-lg"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow px-4 py-2 rounded-md text-black"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold transition"
          >
            Join Early Access
          </button>
        </form>

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          className="mt-4 bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md font-semibold transition"
        >
          Continue with Google
        </button>

        {message && (
          <p className="mt-4 text-green-400 font-medium">{message}</p>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-950 px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Why Codeveen?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">💡 Problem Hub</h3>
            <p className="text-gray-400">Sharpen your skills with real-world coding challenges.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">⚡ Project Learning</h3>
            <p className="text-gray-400">Learn by building actual projects step-by-step.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🌍 Community</h3>
            <p className="text-gray-400">Connect, collaborate, and grow with fellow coders.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500 text-sm">
        © {new Date().getFullYear()} Codeveen — Built for learners, creators & problem solvers.
      </footer>
    </main>
  )
}
