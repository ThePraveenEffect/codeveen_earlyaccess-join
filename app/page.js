"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { motion } from "framer-motion"
import { Mail, Rocket, Lightbulb, Code, Users, BookOpen } from "lucide-react"

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
      // Save email to waitlist
      const { error: insertError } = await supabase.from("waitlist").insert([{ email }])
      if (insertError) {
        setMessage("⚠️ Error saving email")
      } else {
        setMessage("✅ You're on the waitlist! Check your inbox.")
        setEmail("")
      }
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-grow px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 leading-tight">
            Welcome to <span className="text-blue-500">Codeveen</span>
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-gray-300 mb-10">
            Learn by solving problems, building real-world projects, and connecting with an amazing coding community.
            <br />Join our early waitlist and be part of the launch!
          </p>
        </motion.div>

        {/* Email Signup Form */}
        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 bg-gray-800/60 backdrop-blur-md p-4 rounded-2xl shadow-xl w-full max-w-lg border border-gray-700"
        >
          <div className="flex items-center w-full bg-gray-900 rounded-lg px-3">
            <Mail className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-2 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
          >
            Join Waitlist
          </button>
        </motion.form>

        {message && (
          <p className="mt-4 text-green-400 font-medium">{message}</p>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-950 px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">Why Join Codeveen?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
            <Lightbulb className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Problem Hub</h3>
            <p className="text-gray-400">Sharpen your skills with real-world coding challenges curated for all levels.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
            <Code className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Project Learning</h3>
            <p className="text-gray-400">Learn step-by-step by building real projects that showcase your skills.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
            <Users className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Community</h3>
            <p className="text-gray-400">Collaborate, share knowledge, and grow with like-minded developers worldwide.</p>
          </motion.div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="px-6 py-16 text-center">
        <Rocket className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Built for Learners & Creators</h2>
   <p className="max-w-2xl mx-auto text-gray-400">
  Codeveen is where makers build together — from solving coding challenges 
  to creating real projects, sharing tools, and collaborating with a community 
  that turns ideas into reality.
</p>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500 text-sm">
        © {new Date().getFullYear()} Codeveen • Made with passion for coders
      </footer>
    </main>
  )
}
