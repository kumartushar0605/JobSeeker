'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Header } from './Header';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('jobs');

  const handleSearch = (e) => {
  e.preventDefault();
  const queryParams = new URLSearchParams({
    query: searchQuery,
    location: location,
    category: category
  }).toString();
  window.location.href = `/jobs?${queryParams}`;
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>JobSeeker - Find Your Dream Job</title>
        <meta name="description" content="Find your dream job easily with JobSeeker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
<Header/>
        <main className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                Find your job and make sure <span className="text-indigo-600">goal</span>
              </h1>
              <p className="text-xl text-gray-600">
                Your dream job is waiting for you. Start your journey today.
              </p>
              
              <form onSubmit={handleSearch} className="mt-6">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Job title, keyword, or company"
                      className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="md:w-40">
                    <select
                      className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="jobs">Jobs</option>
                      <option value="internships">Internships</option>
                      <option value="courses">Courses</option>
                    </select>
                  </div>
                  
                  <div className="md:w-48">
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Search
                  </button>
                </div>
              </form>
              
              <div className="mt-8">
                <p className="text-sm text-gray-500">Popular searches: Software Engineer, Marketing, Remote Jobs, Data Science</p>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="job.gif" 
                alt="Job search illustration" 
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
          
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Why choose JobSeeker</h2>
              <p className="mt-4 text-lg text-gray-600">We connect talent with opportunity</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Top Companies</h3>
                <p className="mt-2 text-gray-600">Access opportunities from Fortune 500 companies and fast-growing startups.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Real-time Updates</h3>
                <p className="mt-2 text-gray-600">Get notified instantly when new jobs matching your criteria are posted.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Verified Listings</h3>
                <p className="mt-2 text-gray-600">All our job listings are verified for authenticity and accuracy.</p>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="py-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">JobSeeker</h4>
              <p className="text-gray-600">Connecting talent with opportunity since 2022.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Browse Jobs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Career Resources</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Salary Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Post a Job</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Talent Solutions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} JobSeeker. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}