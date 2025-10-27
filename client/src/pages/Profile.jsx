import { useEffect, useState } from "react";
import ProfileCard from "../components/profileCard";
import UnlockModal from "../components/Modal";
import { Button } from "../components/ui/button";
import { ArrowUpDown, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ProfileAPI } from "../services/api";

const Profiles = () => {
  const [candidates, setCandidates] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableCredits, setAvailableCredits] = useState(200);

   useEffect(() => {
    fetchProfiles()
 
  }, []);

 
  

  const fetchProfiles = async () => {
    try {
      console.log('TaskList: Fetching tasks...');
      const response = await ProfileAPI.getAllProfiles()
      console.log( response.data.data);
      setCandidates(response.data.data );
      
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } 
  };

  const handleUnlock = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

 useEffect(() => {
  console.log("Updated candidates:", candidates);
}, [candidates]);

const handleConfirmUnlock = async () => {
  if (selectedCandidate && availableCredits >= selectedCandidate.unlockCost) {
    try {
      const response = await ProfileAPI.unlockProfile(selectedCandidate._id);
      if (response.data.success) {
        setCandidates((prev) =>
          prev.map((c) =>
            c._id === selectedCandidate._id
              ? { ...c, isUnlocked: true, unlocked: true }
              : c
          )
        );
        setAvailableCredits((prev) => prev - selectedCandidate.unlockCost);
        setIsModalOpen(false);
        toast.success("Profile unlocked successfully!");
      } else {
        toast.error("Failed to unlock profile!");
      }
    } catch (error) {
      toast.error("Unlock failed: " + (error?.response?.data?.message || error.message));
    }
  } else {
    toast.error("Insufficient credits!");
  }
};

  const handleReject = (id) => {
    setCandidates((prev) => prev.filter((c) => c._id !== id));
    toast.success("Candidate rejected");
  };

  if (candidates === null) {
  return <div className="min-h-screen bg-background bg-[#0f0f0f] text-white flex items-center justify-center"><LoaderCircle className="animate-spin"/></div>;
}
if (!candidates) {
  return null;
}

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
        <nav className="bg-[#0f0f0f] border-b border-neutral-800 px-6 py-4 ">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 font-bold">Posted Gigs</span>
            <span className="text-neutral-600">/</span>
            <span className="text-white font-medium">Applicants</span>
          </div>
          <div className=" items-center gap-4">
            <button className="bg-[#141414] rounded-lg p-2 px-4 border-2 font-semibold border-[#292929] text-white transition-colors">
              Contact us
            </button>
          
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
            <div className="max-w-8xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">Product Designer</h1>
              <span className="mr-20 md:mr-0 px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-lg text-sm font-medium">
                • 59 Applicants
              </span>
            </div>
            <div className="flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-2 text-neutral-400 text-sm">
              <span>0 - 1 Years of Experience</span>
              <span className="hidden md:inline h-5 w-0.5 bg-[#737373] rounded-lg"></span>
              <span>Zepto</span>
              <span className="hidden md:inline h-5 w-0.5 bg-[#737373] rounded-lg"></span>
              <span>New Delhi, India</span>
              <span className="hidden md:inline h-5 w-0.5 bg-[#737373] rounded-lg"></span>
              <span className="text-emerald-500">•</span>
              <span>Available Immediately</span>
            </div>
          </div>
        </div>
      <hr className="text-neutral-800 mb-4"/>
        </div>
        

          <div className="flex  items-center overflow-auto gap-4 mb-6">
            <Button variant="secondary " className={"bg-[#141414] border-2 border-[#292929] font-semibold"} size="sm">
              Experience Level
            </Button>
            <Button variant="secondary" size="sm" className={"bg-[#141414] border-2 border-[#292929] font-semibold"}>
              Availability
            </Button>
            <Button variant="secondary" size="sm" className={"bg-[#141414] border-2 border-[#292929] font-semibold"}>
              Preferred Location
            </Button>
            <Button variant="secondary" size="sm" className={"bg-[#141414] border-2 border-[#292929] font-semibold"}>
              Skills
            </Button>
            <Button variant="secondary" size="sm" className={"bg-[#141414] border-2 border-[#292929] font-semibold"}>
              Expected CTC
            </Button>
            <Button variant="ghost" size="sm" className="ml-auto" >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {candidates.map((candidate) => (
            <ProfileCard
              key={candidate._id}
              candidate={candidate}
              onUnlock={() => handleUnlock(candidate)}
              onReject={handleReject}
            />
          ))}
        </div>
      </main>

      <UnlockModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmUnlock}
        availableCredits={availableCredits}
      />
    </div>
  );
};

export default Profiles;
