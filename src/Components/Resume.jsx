'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import React from 'react';
import { Header } from './Header';



const ResumePage = () =>   {
  const router = useRouter();
  
  // Personal information
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedIn: '',
    github: ''
  });
  
  // Education
  const [education, setEducation] = useState([
    { id: 1, degree: '', institution: '', location: '', startDate: '', endDate: '', description: '' }
  ]);
  
  // Experience
  const [experience, setExperience] = useState([
    { id: 1, position: '', company: '', location: '', startDate: '', endDate: '', description: '' }
  ]);
  
  // Skills
  const [skills, setSkills] = useState([
    { id: 1, skill: '', level: 'Beginner' }
  ]);
  
  // Form Status
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  // Load saved name and email from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem('resumeName');
    const savedEmail = localStorage.getItem('resumeEmail');
    
    if (savedName || savedEmail) {
      setPersonalInfo(prev => ({
        ...prev,
        name: savedName || '',
        email: savedEmail || ''
      }));
    }
  }, []);
  
  // Handle form input changes for personal information
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };
  
  // Handle education changes
  const handleEducationChange = (id, field, value) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };
  
  // Add new education field
  const addEducation = () => {
    const newId = education.length > 0 ? Math.max(...education.map(edu => edu.id)) + 1 : 1;
    setEducation([...education, { 
      id: newId,
      degree: '', 
      institution: '', 
      location: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    }]);
  };
  
  // Remove education field
  const removeEducation = (id) => {
    if (education.length > 1) {
      setEducation(education.filter(edu => edu.id !== id));
    }
  };
  
  // Handle experience changes
  const handleExperienceChange = (id, field, value) => {
    setExperience(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };
  
  // Add new experience field
  const addExperience = () => {
    const newId = experience.length > 0 ? Math.max(...experience.map(exp => exp.id)) + 1 : 1;
    setExperience([...experience, { 
      id: newId,
      position: '', 
      company: '', 
      location: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    }]);
  };
  
  // Remove experience field
  const removeExperience = (id) => {
    if (experience.length > 1) {
      setExperience(experience.filter(exp => exp.id !== id));
    }
  };
  
  // Handle skills changes
  const handleSkillChange = (id, field, value) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };
  
  // Add new skill field
  const addSkill = () => {
    const newId = skills.length > 0 ? Math.max(...skills.map(skill => skill.id)) + 1 : 1;
    setSkills([...skills, { id: newId, skill: '', level: 'Beginner' }]);
  };
  
  // Remove skill field
  const removeSkill = (id) => {
    if (skills.length > 1) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Store name and email in localStorage
    localStorage.setItem('resumeName', personalInfo.name);
    localStorage.setItem('resumeEmail', personalInfo.email);
    
    // Prepare data to send to backend
    const resumeData = {
      personalInfo,
      education,
      experience,
      skills
    };
    
    // Show submitting status
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });
    
    try {
    const response = await fetch('http://localhost:5000/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit resume');
    }

    setFormStatus({
      isSubmitting: false,
      isSubmitted: true,
      error: null
    });

    setTimeout(() => {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: null
      });
    }, 3000);

  } catch (error) {
    console.error('Error submitting resume:', error);
    setFormStatus({
      isSubmitting: false,
      isSubmitted: false,
      error: 'Failed to submit resume. Please try again.'
    });
  }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Create Your Resume - JobSeeker</title>
        <meta name="description" content="Build your professional resume with JobSeeker" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <Header/>
        
        <main className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-indigo-600 py-4 px-6">
                <h1 className="text-2xl font-bold text-white">Create Your Resume</h1>
                <p className="text-indigo-100">Fill out the form below to create a professional resume</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                {/* Personal Information Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={personalInfo.name}
                        onChange={handlePersonalInfoChange}
                        className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={personalInfo.address}
                        onChange={handlePersonalInfoChange}
                        placeholder="City, State, Country"
                        className="w-full text-black text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="linkedIn" className="block text-gray-700 font-medium mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        id="linkedIn"
                        name="linkedIn"
                        value={personalInfo.linkedIn}
                        onChange={handlePersonalInfoChange}
                        className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="github" className="block text-gray-700 font-medium mb-2">
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        id="github"
                        name="github"
                        value={personalInfo.github}
                        onChange={handlePersonalInfoChange}
                        className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Education Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                    <button
                      type="button"
                      onClick={addEducation}
                      className="flex text-black items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Education
                    </button>
                  </div>
                  
                  {education.map((edu, index) => (
                    <div key={edu.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg text-black font-medium text-gray-800">Education #{index + 1}</h3>
                        {education.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-3">
                          <label className="block text-gray-700 font-medium mb-2">Degree/Certificate</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                            className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Bachelor of Science in Computer Science"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-gray-700 font-medium mb-2">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                            className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="University Name"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-gray-700 font-medium mb-2">Location</label>
                          <input
                            type="text"
                            value={edu.location}
                            onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)}
                            className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="City, State, Country"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                            <input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                              className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">End Date</label>
                            <input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                              className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3 md:col-span-2">
                          <label className="block text-gray-700 font-medium mb-2">Description</label>
                          <textarea
                            value={edu.description}
                            onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                            className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Describe your studies, achievements, etc."
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Experience Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Professional Experience</h2>
                    <button
                      type="button"
                      onClick={addExperience}
                      className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Experience
                    </button>
                  </div>
                  
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Experience #{index + 1}</h3>
                        {experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-3">
                          <label className="block text-gray-700 font-medium mb-2">Position/Title</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                            className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Software Engineer"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-gray-700 font-medium mb-2">Company/Organization</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                            className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Company Name"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-gray-700 font-medium mb-2">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                            className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="City, State, Country"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                              className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">End Date</label>
                            <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                              className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3 md:col-span-2">
                          <label className="block text-gray-700 font-medium mb-2">Description</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                            className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Describe your responsibilities and achievements"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Skills Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                    <button
                      type="button"
                      onClick={addSkill}
                      className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Skill
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skillItem) => (
                      <div key={skillItem.id} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={skillItem.skill}
                          onChange={(e) => handleSkillChange(skillItem.id, 'skill', e.target.value)}
                          className="flex-1 text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="e.g., JavaScript, Project Management"
                        />
                        
                        <select
                          value={skillItem.level}
                          onChange={(e) => handleSkillChange(skillItem.id, 'level', e.target.value)}
                          className="px-3 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        
                        {skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(skillItem.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Form Status Messages */}
                {formStatus.isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Resume submitted successfully! Your name and email have been saved.</span>
                    </div>
                  </div>
                )}
                
                {formStatus.error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{formStatus.error}</span>
                    </div>
                  </div>
                )}
                
               <div className="text-center mt-8">
  <button
    type="submit"
    className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full md:w-auto"
    disabled={formStatus.isSubmitting}
  >
    {formStatus.isSubmitting ? (
      <span className="flex items-center justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
          ></path>
        </svg>
        Submitting...
      </span>
    ) : (
      'Submit'
    )}
  </button>
</div>
</form>
</div>
</div>
</main>
</div>
</div>
 );
}
export default ResumePage;