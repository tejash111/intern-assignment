import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, ExternalLink, Linkedin, Briefcase, X, ChevronDown, Loader, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ProfileAPI } from "../services/api";


const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 const [candidate, setCandidate] = useState(null);


  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await ProfileAPI.getSingleProfile(id);
      setCandidate(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  fetchProfile();
}, [id]);
   
    
  
   

   const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const score = candidate?.score ?? 0;
  const dashOffset = circumference * (1 - score / 100);
  const progressColor = "#47cd89";
  const bgStroke = "#e6f7ef"; 
useEffect(() => {
  if (candidate === null) return;
  if (!candidate) {
    navigate("/");
  }
}, [candidate, navigate]);

if (candidate === null) {
  return <div className="min-h-screen bg-background bg-[#0f0f0f] text-white flex items-center justify-center"><LoaderCircle className="animate-spin"/></div>;
}
if (!candidate) {
  return null;
}

  return (
    <div className="min-h-screen bg-background bg-[#0f0f0f] text-white">
     <nav className="bg-[#0f0f0f] border-b border-neutral-800 px-6 py-4">
        <div className="max-w-9xl mx-auto flex flex-wrap md:flex-nowrap justify-between items-center font-bold">
          <div className="flex  items-center gap-4 mb-3 md:mb-0">
           
            <div className="flex items-center gap-4 font-medium mb-">
              <span className="text-white">Posted Gigs</span>
              <span className="text-neutral-600 text-3xl font-normal">/</span>
              <span className="text-white ">Applicants</span>
              <span className="text-neutral-600 text-3xl font-normal ">/</span>
              <span className="text-black bg-white p-[1px] px-2 rounded-md text-sm md:text-md md:font-medium">View Profile</span>
            </div>
          </div>

          <div className="flex items-center gap-4 ">
            <span className="text-neutral-400">Candidate Status</span>
            <div className="bg-[#141414]  px-4 py-2 rounded-lg border-2 border-neutral-800 flex  gap-3 items-center">
              <option className="p-1 bg-[#4e1d09] text-[#fec84b] rounded-lg px-2">● Under Review</option>
              <ChevronDown className="text-[#a3a3a3] font-semibold"/>
            </div>
          
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
       

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card rounded-lg p-6">
              <div className="flex items-start gap-4 mb-6">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 relative flex-wrap md:flex-nowrap">
                        <img src="/emptybg.png" alt="" className="rounded-full w-24 object-cover" />
                        <img src="/tick.png" alt="" className="absolute w-8 top-15 left-18 md:left-17 md:-bottom-1"/>

                        <div className="">
                         <div className="flex items-center gap-3 mb-2 relative flex-wrap md:flex-nowrap">
                                <h1 className="text-2xl font-semibold">{candidate.name}</h1>
                      <span className="text-gray-400 ">•</span>
                    
                    <span className="text-[#7cd4fd] text-2xl font-semibold">{candidate.title}</span>
                     <span className="text-gray-400 ">•</span>
                    {candidate.isClubMember && (
                    <Badge className="bg-gradient-to-br from-[#501091] to-[#511092] text-badge-foreground rounded px-2   py-1">♦  Club Member</Badge>
                    )} 
                         </div>

                         <div>
  <p>
                      {candidate.experience} | {candidate.company} | {candidate.location} |   <span className="text-emerald-500 "> • </span> Avilable Immediately
                            
                    </p>
                         </div>
                        </div>

                        
                   

                    
                  </div>
                
                </div>
              </div>

              {candidate.about && (
                <div className="mb-6 text-sm text-gray-300">
                  <h2 className="text-sm font-noraml mb-3 text-gray-200">About me</h2>
                  <p className=" max-w-xl">{candidate.about}</p>
                </div>
              )}

              <hr className="text-gray-800 mb-4"/>

              <div className="mb-6">
                <h2 className="text-sm font-normal text-gray-200 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#292929] rounded font-normal text-gray-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

               <hr className="text-gray-800 mb-4"/>

              {candidate.college && (
                <div className="mb-6 text-gray-300">
                  <h2 className="text-sm font-normal mb-3">College</h2>
                  <div className="space-y-1">
                    <p className="font-normal">{candidate.degree}</p>
                    <p className="t text-sm">
                      {candidate.college} | {candidate.graduationYear}
                    </p>
                  </div>
                </div>
              )}

               <hr className="text-gray-800 mb-4"/>

              {candidate.experiences && candidate.experiences.length > 0 && (
                <div className="text-gray-300">
                  <h2 className="text-sm font-normal mb-3">Experience</h2>
                  <div className="space-y-4">
                    {candidate.experiences.map((exp, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-normal">{exp.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {exp.company} | {exp.period}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

         

          <div className="space-y-4">
            <div className="bg-card   rounded-lg p-6">
              <div className=" mb-6 relative">
                <p className="text-sm text-gray-300 absolute bottom-16">Score</p>
                <div className="relative ">
                  <svg className="w-33 h-33 -rotate-90">
                   
                <circle
                cx="28"
                cy="28"
                r="24"
                stroke="#424242"
                strokeWidth="4"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="#47cd89"
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all"
              />
                  </svg>
                  <div className="absolute inset-0 flex top-22 left-2">
                    <span className="text-xl font-semibold ">{candidate.score}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 text-gray-300">Location</p>
                  <p className="font-medium">{candidate.location}</p>
                </div>

                {candidate.website && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 text-gray-300">Website</p>
                    <a
                      href={`https://${candidate.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline inline-flex items-center gap-1"
                    >
                      {candidate.website} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {candidate.resume && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 text-gray-300">Resume</p>
                    <a
                      href="#"
                      className="text-accent hover:underline inline-flex items-center gap-1"
                    >
                      {candidate.resume} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {candidate.email && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 text-gray-300">Email</p>
                    <a
                      href={`mailto:${candidate.email}`}
                      className="text-accent hover:underline inline-flex items-center gap-1"
                    >
                      {candidate.email} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-sm flex mb-2 text-gray-300">Ideal next opportunity</p>
                  <Badge variant="" className="bg-[#293056] rounded text-gray-300 mr-2">
                    ✓ {candidate.idealNextOpportunity}
                  </Badge>
                  <Badge variant="" className="bg-[#053321] rounded text-[#6bd09b]">
                    {candidate.salary}
                  </Badge>
                </div>

                {candidate.socials && candidate.socials.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2 text-gray-300">Socials</p>
                    <div className="flex gap-2">
                      {candidate.socials.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded bg-accent text-accent-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
                        >
                          <img src="/linkedin.webp" alt="" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

        
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileDetail;
