'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import axios from 'axios';
import { Header } from './Header';

// Sample job data for India
const INDIA_JOBS = [
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'Software Engineer',
    company: 'TCS',
    location: 'Bangalore, India',
    salary: '₹10-15 LPA',
    description: 'We are looking for an experienced Software Engineer proficient in React and Node.js.',
    requirements: 'Bachelors degree in Computer Science, 3+ years of experience in web development.',
    type: 'Full-time',
    postedDate: '2025-05-01',
    logoUrl: '/company-logos/tcs.png',
    skills: ['React', 'Node.js', 'JavaScript', 'Web Development']
  },
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'Data Scientist',
    company: 'Infosys',
    location: 'Hyderabad, India',
    salary: '₹12-18 LPA',
    description: 'Join our data science team to work on machine learning models and data analytics.',
    requirements: 'Masters degree in Data Science or related field, experience with Python and ML frameworks.',
    type: 'Full-time',
    postedDate: '2025-05-03',
    logoUrl: '/company-logos/infosys.png',
    skills: ['Python', 'Machine Learning', 'Data Analytics', 'SQL']
  },
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'UI/UX Designer',
    company: 'Wipro',
    location: 'Mumbai, India',
    salary: '₹8-12 LPA',
    description: 'Design user interfaces for web and mobile applications with a focus on user experience.',
    requirements: 'Background in design, proficiency in Figma and Adobe Creative Suite.',
    type: 'Full-time',
    postedDate: '2025-05-05',
    logoUrl: '/company-logos/wipro.png',
    skills: ['Figma', 'Adobe Creative Suite', 'UI Design', 'UX Design']
  },
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'DevOps Engineer',
    company: 'HCL Technologies',
    location: 'Pune, India',
    salary: '₹15-20 LPA',
    description: 'Implement and manage CI/CD pipelines, containerization, and cloud infrastructure.',
    requirements: 'Experience with Docker, Kubernetes, AWS/Azure, and CI/CD tools.',
    type: 'Full-time',
    postedDate: '2025-05-02',
    logoUrl: '/company-logos/hcl.png',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD']
  },
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'Frontend Developer Intern',
    company: 'Cognizant',
    location: 'Chennai, India',
    salary: '₹25,000/month',
    description: 'Learn and contribute to frontend development projects using React and JavaScript.',
    requirements: 'Currently pursuing a degree in Computer Science, knowledge of HTML, CSS, and JavaScript.',
    type: 'Internship',
    postedDate: '2025-05-04',
    logoUrl: '/company-logos/cognizant.png',
    skills: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'Product Manager',
    company: 'Reliance Jio',
    location: 'Delhi, India',
    salary: '₹18-25 LPA',
    description: 'Lead product development initiatives and collaborate with cross-functional teams.',
    requirements: 'MBA preferred, 5+ years of experience in product management in tech companies.',
    type: 'Full-time',
    postedDate: '2025-05-06',
    logoUrl: '/company-logos/jio.png',
    skills: ['Product Management', 'Agile', 'Market Research', 'Team Leadership']
  },
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'Full Stack Developer',
    company: 'Tech Mahindra',
    location: 'Bangalore, India',
    salary: '₹14-18 LPA',
    description: 'Develop and maintain web applications using MERN stack.',
    requirements: 'Experience with React, Node.js, MongoDB, and RESTful APIs.',
    type: 'Full-time',
    postedDate: '2025-05-03',
    logoUrl: '/company-logos/techmahindra.png',
    skills: ['React', 'Node.js', 'MongoDB', 'RESTful APIs', 'JavaScript']
  },
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'Machine Learning Engineer',
    company: 'Amazon India',
    location: 'Hyderabad, India',
    salary: '₹20-30 LPA',
    description: 'Develop machine learning models and algorithms for various business applications.',
    requirements: 'PhD or Master',
    type: 'Full-time',
    postedDate: '2025-05-02',
    logoUrl: '/company-logos/amazon.png',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning']
  },
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'Java Developer',
    company: 'Accenture',
    location: 'Pune, India',
    salary: '₹10-15 LPA',
    description: 'Design and implement Java-based applications according to client requirements.',
    requirements: 'Strong Java skills, knowledge of Spring framework, and database technologies.',
    type: 'Full-time',
    postedDate: '2025-05-07',
    logoUrl: '/company-logos/accenture.png',
    skills: ['Java', 'Spring', 'SQL', 'Microservices']
  },
  {
    id: "https://jobs.careers.microsoft.com/global/en/job/1819941/Incident-Response-Engineer---CIRT",
    title: 'Digital Marketing Specialist',
    company: 'Flipkart',
    location: 'Bangalore, India',
    salary: '₹8-12 LPA',
    description: 'Plan and execute digital marketing campaigns across various channels.',
    requirements: 'Experience in SEO, SEM, social media marketing, and analytics tools.',
    type: 'Full-time',
    postedDate: '2025-05-05',
    logoUrl: '/company-logos/flipkart.png',
    skills: ['Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Analytics']
  }
];

export default function Jobs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [isResumeLoading, setResumeLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [matchedSkills, setMatchedSkills] = useState({});

  // Get search parameters from URL
  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || '';
  const category = searchParams.get('category') || 'jobs';
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('email') || '';
      const urlEmail = searchParams.get('email') || '';
      setEmail(urlEmail || storedEmail);
    }
  }, [searchParams]);

  useEffect(() => {
    // If email is provided, fetch resume first
    if (email) {
      setResumeLoading(true);
      axios.get(`http://localhost:5000/resume/${email}`)
        .then(res => {
          setResume(res.data);
          console.log("Resume data:", res.data);
          setResumeLoading(false);
        })
        .catch(err => {
          console.error("Error fetching resume:", err);
          setResume(null);
          setResumeLoading(false);
        });
    } else {
      // If no email, skip resume fetch
      setResume(null);
    }
  }, [email]);

  useEffect(() => {
    // Wait until resume is loaded or failed to load
    if (isResumeLoading) return;
    
    setLoading(true);
    
    setTimeout(() => {
      // Filter jobs based on search parameters
      let filteredJobs = [...INDIA_JOBS];
      
      if (query) {
        const searchTerm = query.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(searchTerm) || 
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (location) {
        const locationTerm = location.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(locationTerm)
        );
      }
      
      // Filter by category (this would be more complex in a real app)
      if (category === 'internships') {
        filteredJobs = filteredJobs.filter(job => job.type === 'Internship');
      }
      
      // If resume exists and has skills, rank jobs by matching skills
      if (resume && resume.skills && resume.skills.length > 0) {
        console.log("Processing resume skills for matching");
        
        // Extract skills from resume (handling the object structure correctly)
        const resumeSkills = resume.skills
          .map(skillObj => skillObj.skill ? skillObj.skill.toLowerCase() : '')
          .filter(skill => skill); // Remove empty skills
        
        console.log("Resume skills:", resumeSkills);
        
        const newMatchedSkills = {};
        
        // Calculate matching skills for each job
        filteredJobs = filteredJobs.map(job => {
          const jobSkills = job.skills.map(skill => skill.toLowerCase());
          const matched = jobSkills.filter(jobSkill => 
            resumeSkills.some(resumeSkill => 
              resumeSkill.includes(jobSkill) || jobSkill.includes(resumeSkill)
            )
          );
          
          newMatchedSkills[job.id] = matched;
          
          // Add a matchScore property for sorting
          return {
            ...job,
            matchScore: matched.length
          };
        });
        
        // Sort jobs by match score (higher first)
        filteredJobs.sort((a, b) => b.matchScore - a.matchScore);
        
        // Save matched skills for display
        setMatchedSkills(newMatchedSkills);
      }
      
      setJobs(filteredJobs);
      setLoading(false);
    }, 1000);
  }, [query, location, category, resume, isResumeLoading]);

  const handleJobClick = (jobId) => {
    window.location.href = jobId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Job Search Results - JobSeeker</title>
        <meta name="description" content="Browse job opportunities in India" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header/>

        <div className="py-6">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {loading || isResumeLoading ? 'Searching...' : `${jobs.length} jobs found`}
              {query && ` for "${query}"`}
              {location && ` in "${location}"`}
              {resume && ' (Ranked by matching skills)'}
            </h1>
            
            <div className="text-sm text-gray-600 mb-2">
              Showing results for {category === 'internships' ? 'internships' : 'jobs'} in India
              {resume && <span className="ml-2 text-green-600">• Resume-matched results</span>}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {query && (
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Search: {query}
                  <button className="ml-2 text-indigo-600" onClick={() => router.push(`/jobs?location=${location}&category=${category}&email=${email}`)}>
                    ×
                  </button>
                </span>
              )}
              
              {location && (
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Location: {location}
                  <button className="ml-2 text-indigo-600" onClick={() => router.push(`/jobs?query=${query}&category=${category}&email=${email}`)}>
                    ×
                  </button>
                </span>
              )}
              
              {category !== 'jobs' && (
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Category: {category}
                  <button className="ml-2 text-indigo-600" onClick={() => router.push(`/jobs?query=${query}&location=${location}&email=${email}`)}>
                    ×
                  </button>
                </span>
              )}
              
              {email && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Resume matching: On ({email})
                  <button className="ml-2 text-green-600" onClick={() => {
                    localStorage.removeItem('email');
                    router.push(`/jobs?query=${query}&location=${location}&category=${category}`);
                  }}>
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
          
          {loading || isResumeLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map(job => (
                <div 
                  key={job.id}
                  className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer ${resume && job.matchScore > 0 ? 'border-l-4 border-green-500' : ''}`}
                  onClick={() => handleJobClick(job.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                        <span className="text-indigo-600 font-medium">{job.salary}</span>
                      </div>
                      
                      <div className="mt-1">
                        <span className="text-gray-700 font-medium">{job.company}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600">{job.location}</span>
                      </div>
                      
                      <p className="mt-2 text-gray-600 line-clamp-2">{job.description}</p>
                      
                      {resume && matchedSkills[job.id] && matchedSkills[job.id].length > 0 && (
                        <div className="mt-3">
                          <span className="text-sm font-medium text-green-700">
                            {matchedSkills[job.id].length} skill match{matchedSkills[job.id].length > 1 ? 'es' : ''}:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {matchedSkills[job.id].map((skill, index) => (
                              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs">
                            {job.type}
                          </span>
                          <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                            India
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          Posted on {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-10 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
              <p className="text-gray-600">
                We couldn't find any jobs matching your search criteria. Try broadening your search.
              </p>
              <button 
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => router.push('/')}
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}