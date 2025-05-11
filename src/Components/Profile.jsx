'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProfilePage = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' })
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('personal')

  useEffect(() => {
    const name = localStorage.getItem('name')
    const email = localStorage.getItem('email')
    const phone = localStorage.getItem('contact') || ""
    setUser({ name, email, phone })

    if (email) {
      setLoading(true)
      axios.get(`http://localhost:5000/resume/${email}`)
        .then(res => {
          setResume(res.data)
          setLoading(false)
        })
        .catch(() => {
          setResume(null)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-indigo-700 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header with Avatar */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8">
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="h-24 w-24 rounded-full bg-white p-1 shadow-xl">
                <div className="h-full w-full rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-indigo-600">
                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center px-6 pb-6">
            <h1 className="text-3xl font-bold text-gray-900">{user.name || 'Your Profile'}</h1>
            <p className="text-indigo-600 mt-1">{user.email || 'Email not available'}</p>
            <p className="text-gray-500 mt-1">{user.phone || 'Phone not available'}</p>
          </div>
        </div>

        {/* Resume Content Tab Navigation */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8">
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab('personal')}
              className={`flex-1 text-center py-4 font-medium ${activeTab === 'personal' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
            >
              Personal Info
            </button>
            <button 
              onClick={() => setActiveTab('skills')}
              className={`flex-1 text-center py-4 font-medium ${activeTab === 'skills' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
              disabled={!resume}
            >
              Skills
            </button>
            <button 
              onClick={() => setActiveTab('education')}
              className={`flex-1 text-center py-4 font-medium ${activeTab === 'education' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
              disabled={!resume}
            >
              Education
            </button>
            <button 
              onClick={() => setActiveTab('experience')}
              className={`flex-1 text-center py-4 font-medium ${activeTab === 'experience' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
              disabled={!resume}
            >
              Experience
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {!resume && activeTab !== 'personal' ? (
              <div className="text-center py-10">
                <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No Resume Data Available</h3>
                <p className="mt-2 text-gray-500">We couldn't find any resume information linked to your profile.</p>
                <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Upload Resume
                </button>
              </div>
            ) : (
              <>
                {/* Personal Info Tab */}
                {activeTab === 'personal' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <svg className="h-6 w-6 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Contact Information
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resume?.personalInfo ? (
                          <>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Full Name</p>
                              <p className="text-lg text-gray-900">{resume.personalInfo.name || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email Address</p>
                              <p className="text-lg text-gray-900">{resume.personalInfo.email || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone Number</p>
                              <p className="text-lg text-gray-900">{resume.personalInfo.phone || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Location</p>
                              <p className="text-lg text-gray-900">{resume.personalInfo.address || 'N/A'}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Full Name</p>
                              <p className="text-lg text-gray-900">{user.name || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email Address</p>
                              <p className="text-lg text-gray-900">{user.email || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone Number</p>
                              <p className="text-lg text-gray-900">{user.phone || 'N/A'}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {resume?.personalInfo && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <svg className="h-6 w-6 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                          </svg>
                          Online Profiles
                        </h2>
                        <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 gap-4">
                          {resume.personalInfo.linkedIn && (
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">LinkedIn</p>
                                <a 
                                  href={resume.personalInfo.linkedIn} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800 hover:underline"
                                >
                                  {resume.personalInfo.linkedIn}
                                </a>
                              </div>
                            </div>
                          )}
                          
                          {resume.personalInfo.github && (
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 mr-3">
                                <svg className="h-6 w-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">GitHub</p>
                                <a 
                                  href={resume.personalInfo.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800 hover:underline"
                                >
                                  {resume.personalInfo.github}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === 'skills' && resume && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="h-6 w-6 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Professional Skills
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {resume.skills.map((skill, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">{skill.skill}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              skill.level === 'Expert' ? 'bg-green-100 text-green-800' : 
                              skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' : 
                              skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {skill.level}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ 
                                width: `${
                                  skill.level === 'Expert' ? '95%' : 
                                  skill.level === 'Advanced' ? '80%' : 
                                  skill.level === 'Intermediate' ? '60%' : 
                                  skill.level === 'Beginner' ? '40%' : '25%'
                                }` 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education Tab */}
                {activeTab === 'education' && resume && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="h-6 w-6 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                      </svg>
                      Educational Background
                    </h2>
                    <div className="space-y-6">
                      {resume.education.map((edu, index) => (
                        <div key={index} className="relative pl-8 pb-4">
                          {index !== resume.education.length - 1 && (
                            <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                          )}
                          <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-indigo-500 bg-white flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                          </div>
                          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                            <div className="flex flex-wrap justify-between items-start mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                              <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                                {edu.startDate} - {edu.endDate}
                              </span>
                            </div>
                            <p className="text-indigo-600 font-medium mb-1">{edu.institution}</p>
                            <p className="text-gray-500 text-sm mb-2">{edu.location}</p>
                            {edu.description && (
                              <p className="text-gray-600 text-sm">{edu.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience Tab */}
                {activeTab === 'experience' && resume && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="h-6 w-6 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                      </svg>
                      Work Experience
                    </h2>
                    <div className="space-y-6">
                      {resume.experience.map((exp, index) => (
                        <div key={index} className="relative pl-8 pb-4">
                          {index !== resume.experience.length - 1 && (
                            <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                          )}
                          <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-indigo-500 bg-white flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                          </div>
                          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                            <div className="flex flex-wrap justify-between items-start mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{exp.position || exp.role}</h3>
                              <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                            <p className="text-indigo-600 font-medium mb-1">{exp.company}</p>
                            <p className="text-gray-500 text-sm mb-2">{exp.location}</p>
                            {exp.description && (
                              <p className="text-gray-600 text-sm">{exp.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
       
      </div>
    </div>
  )
}

export default ProfilePage