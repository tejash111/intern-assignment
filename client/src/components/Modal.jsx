
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Coins, X } from "lucide-react";


const UnlockModal = ({ candidate, isOpen, onClose, onConfirm, availableCredits }) => {
  if (!candidate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#000000] text-white  border-neutral-800 border-2 rounded-3xl w-[480px] h-[508px]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
        <DialogHeader className="text-center pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
              <div className="text-3xl"><img src="lock.png" alt="" /></div>
            </div>
          </div>
          <DialogTitle className="text-4xl font-bold text-center">
            Are you sure you want to unlock this profile?
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300 text-sm pt-4">
            Unlocking will cost {candidate.unlockCost} credit. Once confirmed, you'll be able to chat with
            this candidate directly.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <div className="text-center mb-6 flex justify-center gap-1">
            <p className="text-md text-gray-300 mb-1">Credits Available:</p>
            <p className="text-lg font-semibold">{availableCredits}</p>
          </div>
          <Button
            onClick={onConfirm}
            className="w-full bg-[#713b12] border-3 text-white border-[#754c2e]"
            size="lg"
          >
            Unlock 🪙 {candidate.unlockCost} Credits
          </Button>
          <hr className="text-neutral-800 mt-4"/>
          <p className="text-xs text-center text-[#75c8ef] mt-4">
            Most startups find it worth it - top talents go fast.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockModal;
