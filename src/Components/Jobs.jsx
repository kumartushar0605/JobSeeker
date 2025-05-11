'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import axios from 'axios';
import { Header } from './Header';

// Sample job data for India
const INDIA_JOBS = [
  {
    id: "https://in.indeed.com/viewjob?cmp=Bluglint-solutions&t=Customer+Success+Manager&jk=5329d75fff58f231&xpse=SoCQ67I3ygQhfXAPTr0LbzkdCdPP&xfps=508560c4-773b-4ec2-894b-27d1f452a4f4&xkcb=SoDb67M3ygQkugRCGh0PbzkdCdPP&vjs=3",
    title: 'Customer Success Associate',
    company: 'Divyansh Manpower',
    location: 'Bangalore, India',
    salary: '₹2,50,000 - ₹3,50,000 a year',
    description: 'We are seeking a motivated and persuasive customer success associate (International process ) to join team. ',
    requirements: '',
    type: 'Full-time',
    postedDate: '2025-05-01',
    logoUrl: '/company-logos/tcs.png',
    skills: ['Telemarketing']
  },
  {
    id: "https://in.indeed.com/jobs?q=&l=India&radius=25&sc=0kf%3Aattr%28CF3CP%29attr%28HFDVW%29attr%28QUSBH%29%3B&from=searchOnDesktopSerp&vjk=d8550f94419c12f6",
    title: 'Back Office Executive',
    company: 'Divyansh Manpower',
    location: 'Rajkot, Gujarat',
    salary: '₹18,000 a month',
    description: 'Join our data science team to work on machine learning models and data analytics.',
    requirements: '',
    type: 'Full-time',
    postedDate: '2025-05-03',
    logoUrl: '/company-logos/infosys.png',
    skills: ['Software troubleshooting']
  },
  {
    id: "https://in.indeed.com/jobs?q=software+developer&l=India&from=searchOnDesktopSerp%2Cwhatautocomplete%2CwhatautocompleteSourceStandard&vjk=0bcad95e75b37cc0&advn=1574153571661265",
    title: 'Backend Developer (NodeJs)',
    company: 'NetApp',
    location: 'Bengaluru, Karnataka',
    salary: '₹8-12 LPA',
    description: 'Design user interfaces for web and mobile applications with a focus on user experience.',
    requirements: 'Background in design, proficiency in Figma and Adobe Creative Suite.',
    type: 'Full-time',
    postedDate: '2025-05-05',
    logoUrl: '/company-logos/wipro.png',
    skills: ['UNIX','REST','Product development','Nodejs']
  },
  {
    id: "https://in.indeed.com/viewjob?cmp=Relinns-Technologies&t=Developer&jk=edd2f85a78d44b95&xpse=SoAB67I3ygScf6TZph0LbzkdCdPP&xfps=e600207c-9c07-444a-8abc-e8ae7e0643eb&xkcb=SoA_67M3ygSKobSKSx0KbzkdCdPP&vjs=3",
    title: 'AngularJS Developer',
    company: 'Relinns Technologies',
    location: 'Mohali, Punjab',
    salary: '₹55,463.90 - ₹85,427.18 a month',
    description: 'Implement and manage CI/CD pipelines, containerization, and cloud infrastructure.',
    requirements: 'Experience with Docker, Kubernetes, AWS/Azure, and CI/CD tools.',
    type: 'Full-time',
    postedDate: '2025-05-02',
    logoUrl: '/company-logos/hcl.png',
    skills: ['AngularJS','Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD']
  },
  {
    id: "https://in.indeed.com/jobs?q=software+developer&l=India&from=searchOnDesktopSerp%2Cwhatautocomplete%2CwhatautocompleteSourceStandard&vjk=64d75cdf0c3ade77&advn=5955520678810220",
    title: 'Sr Engineer II (C++ Developer)',
    company: 'Aristocrat',
    location: 'Chennai, India',
    salary: 'N/A',
    description: 'Learn and contribute to frontend development projects using React and JavaScript.',
    requirements: '',
    type: 'Internship',
    postedDate: '2025-05-04',
    logoUrl: '/company-logos/cognizant.png',
    skills: ['HTML', 'CSS', 'JavaScript', 'React','C++']
  },
  {
    id: "https://in.indeed.com/jobs?q=software+developer&l=India&from=searchOnDesktopSerp%2Cwhatautocomplete%2CwhatautocompleteSourceStandard&vjk=c64f6f1d05d6be15",
    title: 'Full Stack Developer',
    company: 'My Local Adda',
    location: 'Bikaner, Rajasthan',
    salary: '₹10,000 - ₹50,000 a month',
    description: 'Lead product development initiatives and collaborate with cross-functional teams.',
    requirements: '',
    type: 'Full-time',
    postedDate: '2025-05-06',
    logoUrl: '/company-logos/jio.png',
    skills: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    id: "https://in.indeed.com/viewjob?jk=3034c4b413717c8e&q=software+developer&l=India&tk=1ir0d1bdrgfvv820&from=web&advn=3606199600416962&adid=444366081&ad=-6NYlbfkN0B7ZpnVno2OhvAM_Pyy0kUv_65s6lOQVfoR21TAGuvSd8ljl1wOoXVjrakGXOEItA2O-5Aaa-rimO8dyi-yHWizW38N-PTMhw4c0bcLBfoyeDfjj3_3EEet3vuTbJ2KrvHZJzi8vH8ZT6vUbXWeelxCtPSAs5ho8dtAuR2DTGjIkwVWh_DnlCASrkGH4bxELBr_dj4vTGnYqzTBrdUZwI-WZp2u4ii4TBOeQ-5SlUiab8DC-XC39HA5ciAFHsHOjfa9VmY1Ry9cPCdWX0BdtFWqI546s1uRCxMhqueXAzxCSClTjjygwqm48SyNeZBUx6u3Td7g4lGKABzJLkYklv0dDmR2Yb2wYy8uk2pdvn0Ky8oNdiIqKQmGEfK8L6EDefClUEhsPMCJ8ZDUagfL-WQqLGkRfODoCWK53VInA0Edk97EJiQmG-rTZG5WY4v0qZTaHW9eODyFRyDsyNu--J6RTeYt6Te3hX2Mol1TmX2lqJgipbdW62NAV-eRjSE0mkX-IkMOKr0RD7TwxUvK_wLbHdq2u8eLtpo%3D&pub=4a1b367933fd867b19b072952f68dceb&camk=ethIe0s0heczo5oQKhcbBQ%3D%3D&xkcb=SoBF6_M3ygSKobSKSx0NbzkdCdPP&xpse=SoCF6_I3ygS-vQwknB0JbzkdCdPP&xfps=301aa377-0e81-40fc-8d3e-1aede95c1a72&vjs=3",
    title: 'Dot Net Developer',
    company: 'SMSGATEWAYHUB TECHNOLOGIES PVT LTD',
    location: 'Rajendra Nagar, Indore, Madhya Pradesh',
    salary: '₹13,249.29 - ₹20,000.00 a month',
    description: 'Develop and maintain web applications using MERN stack.',
    requirements: 'Experience with React, Node.js, MongoDB, and RESTful APIs.',
    type: 'Full-time',
    postedDate: '2025-05-03',
    logoUrl: '/company-logos/techmahindra.png',
    skills: ['React', 'Node.js', 'MongoDB', 'RESTful APIs', 'JavaScript']
  },
  {
    id: "https://in.indeed.com/viewjob?cmp=Wondrfly-Inc.&t=Full+Stack+Developer&jk=dc5469e283459a05&xpse=SoBa67I3ygS39wADnT0LbzkdCdPP&xfps=a77ab75f-de54-44ea-a23f-c1811dcf5f66&xkcb=SoDs67M3ygSKobSKSx0DbzkdCdPP&vjs=3",
    title: 'Full Stack Developer Lead',
    company: 'Wondrfly Inc.',
    location: 'Hyderabad, India',
    salary: '₹50,000 a month',
    description: 'Develop machine learning models and algorithms for various business applications.',
    requirements: 'PhD or Master',
    type: 'Full-time',
    postedDate: '2025-05-02',
    logoUrl: '/company-logos/amazon.png',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning']
  },
  {
    id: "https://in.indeed.com/viewjob?cmp=ICEAXE-TECHNOLOGIES&t=Angular+Developer&jk=eb0a70adcb11f7af&xpse=SoBb67I3ygSw4mSKXZ0LbzkdCdPP&xfps=9534e91d-e0ea-4234-a6b5-7a0355611e12&xkcb=SoDF67M3ygSKobSKSx0BbzkdCdPP&vjs=3",
    title: 'Developer Intern (Angular)',
    company: 'ICEAXE TECHNOLOGIES',
    location: 'Remote',
    salary: '₹10-15 LPA',
    description: 'Design and implement Java-based applications according to client requirements.',
    requirements: 'Strong Java skills, knowledge of Spring framework, and database technologies.',
    type: 'Full-time',
    postedDate: '2025-05-07',
    logoUrl: '/company-logos/accenture.png',
    skills: ['Angular', 'Spring', 'SQL', 'Microservices']
  },
  {
    id: "https://in.indeed.com/viewjob?jk=fced5a00277802dc&tk=1ir0d1bdrgfvv820&from=serp&vjs=3",
    title: 'GTCSYS',
    company: 'Flipkart',
    location: 'Bangalore, India',
    salary: '₹8-12 LPA',
    description: 'Plan and execute digital marketing campaigns across various channels.',
    requirements: 'Experience in SEO, SEM, social media marketing, and analytics tools.',
    type: 'Full-time',
    postedDate: '2025-05-05',
    logoUrl: '/company-logos/flipkart.png',
    skills: ['HTML','CSS']
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
                  className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${resume && job.matchScore > 0 ? 'border-l-4 border-green-500' : ''}`}
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
                      
                      <div className="mt-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJobClick(job.id);
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Apply Now
                        </button>
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