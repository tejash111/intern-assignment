import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Coins, Lock, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";



const ProfileCard = ({ candidate, onUnlock, onReject }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (candidate?.isUnlocked) {
      navigate(`/profile/${candidate._id}`);
    }
  };




 
  

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const score = candidate?.score ?? 0;
  const dashOffset = circumference * (1 - score / 100);
  const progressColor = "#47cd89"; 
  const bgStroke = "#e6f7ef"; 

  return (
    <div
      className={`bg-card border border-neutral-800 rounded-lg p-6 transition-all ${
        candidate?.unlocked ? "cursor-pointer hover:border-accent" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1 relative">
          <div className="w-14 h-14 rounded-full bg-muted shrink-0" ><img src="emptybg.png " alt="" className="rounded-full"/>
          <img src="tick.png" alt="" className="w-6 absolute top-7 left-9"/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-medium text-foreground truncate">
                { candidate.name }
              </h3>
              <span className="text-accent">•</span>
              <span className="text-accent text-base text-[#7cd4fd] font-bold">{candidate?.title}</span>
              
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{candidate?.experience}</p>
              <p>
                {candidate?.company} | {candidate?.location} | {candidate?.availability}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <div className="relative w-14 h-14 shrink-0">
            <svg className="w-14 h-14 -rotate-90">
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
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold">{candidate?.score}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-base bg-n mb-2 text-[#737373]">Skills</p>
        <div className="flex flex-wrap gap-2">
          {candidate?.skills?.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-[#292929] rounded text-secondary-foreground">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-base tex mb-2 text-[#737373]">Ideal next opportunity</p>
        <div className="flex items-center gap-2">
          <Badge variant="" className=" bg-[#293056] rounded text-accent">
            ✓ {candidate?.idealNextOpportunity}
          </Badge>
          <Badge variant="" className="bg-[#053321] text-[#75e0a7] rounded">
            {candidate?.salary}
          </Badge>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        
          <Button
            variant="outline"
            className="flex-1 border-neutral-800 border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
           
          >
            <X className="w-4 h-4 my-auto mt-[1px] text-red-500" />
            Reject
          </Button>
    
        <Button
          className="flex-1 bg-white text-black  font-semibold"
           
        >
          {candidate.unlocked ? (
            <Link to={`/profile/${candidate?._id}`}>View Profile</Link>
          ) : (
            <button onClick={onUnlock} className="flex gap-1 w-auto items-center justify-center">
              <Lock className=""/> Unlock Profile | 🪙{candidate.unlockCost}
            </button>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
