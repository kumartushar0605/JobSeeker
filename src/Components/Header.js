'use client'
import React, { useEffect, useState } from 'react'

export const Header = () => {
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem('name')
    const email = localStorage.getItem('email') 
    if (name && email) {
      setUser({ name, email })
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <>
      <nav className="py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">JobSeeker</span>
          </div>
          <div className="flex space-x-4 items-center relative">
            <a href="/" className="text-gray-600 hover:text-indigo-600">Home</a>
            <a href="/jobs" className="text-gray-600 hover:text-indigo-600">Recommendation</a>
            <a href="/resume" className="text-gray-600 hover:text-indigo-600">Resume</a>
            <a href="/about" className="text-gray-600 hover:text-indigo-600">About Us</a>

            {!user ? (
              <a href="/login" className="text-gray-600 hover:text-indigo-600">Login</a>
            ) : (
              <div className="relative">
                <div 
                  className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user.name[0].toUpperCase()}
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold text-black">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <a href="/profile" className="block text-black px-4 py-2 hover:bg-gray-100">Your Profile</a>
                    <button onClick={handleLogout} className="w-full text-black text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
