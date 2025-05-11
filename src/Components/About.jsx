'use client'
import React from 'react'

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* About Us Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About Us
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            We are here to simplify and revolutionize your resume management.
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-white shadow-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is to empower professionals by providing them with an easy-to-use platform to create, manage, and share their resumes.
            We aim to simplify the process, offering tools that help users present themselves effectively in their careers.
            Whether you're a student, an experienced professional, or anyone in between, we're here to help you succeed.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="bg-white shadow-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <svg className="h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Simplicity</h3>
                <p className="text-gray-600">We believe in making things simple. Our platform is designed for effortless use.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <svg className="h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 4v1m4-5h1a2 2 0 100-4h-1m-4 4h-1a2 2 0 100-4h1" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Innovation</h3>
                <p className="text-gray-600">We continuously strive to bring new, creative solutions that enhance user experience.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <svg className="h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12H3" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Integrity</h3>
                <p className="text-gray-600">We value transparency and trust, ensuring all your data remains private and secure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="bg-white shadow-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Meet the Team</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="w-64">
              <img className="rounded-full h-32 w-32 mx-auto" src="https://via.placeholder.com/150" alt="Team Member" />
              <h3 className="mt-4 text-lg font-semibold text-indigo-800">John Doe</h3>
              <p className="text-gray-600">Co-Founder & CEO</p>
            </div>
            <div className="w-64">
              <img className="rounded-full h-32 w-32 mx-auto" src="https://via.placeholder.com/150" alt="Team Member" />
              <h3 className="mt-4 text-lg font-semibold text-indigo-800">Jane Smith</h3>
              <p className="text-gray-600">Co-Founder & CTO</p>
            </div>
            <div className="w-64">
              <img className="rounded-full h-32 w-32 mx-auto" src="https://via.placeholder.com/150" alt="Team Member" />
              <h3 className="mt-4 text-lg font-semibold text-indigo-800">Alex Johnson</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="bg-white shadow-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-700">Have questions or want to learn more? Reach out to us!</p>
          <div className="mt-6 text-center">
            <a href="mailto:contact@company.com" className="text-blue-600 underline">contact@company.com</a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutUsPage
