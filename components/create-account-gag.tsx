"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const REJECTION_MESSAGES = [
  "Did you make a ticket for this? No? Then no account for you.",
  "Account creation requires a CAC card, three forms of ID, and a note from your mother.",
  "I don't have time for this. I retire in like... never mind. Request denied.",
  "Oh sure, let me just spin up an Active Directory instance for a GAG APP. No.",
  "Your password doesn't meet the 47-character minimum with at least 3 ancient runes.",
  "Account creation is currently under a change freeze. Until I retire. In October.",
  "Look, I ran this through our risk assessment framework and the risk is: I don't care.",
  "This request has been escalated to nobody. Have a great day.",
  "Did you even read the procedure? There IS no procedure. That's the point.",
  "Sure, I'll create your account right after I finish these 200 STIG remediations. So... never.",
]

export function CreateAccountGag() {
  const [step, setStep] = useState(0)
  const [rejection, setRejection] = useState("")
  const [open, setOpen] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step < 2) {
      setStep(step + 1)
    } else {
      setRejection(
        REJECTION_MESSAGES[Math.floor(Math.random() * REJECTION_MESSAGES.length)],
      )
      setStep(3)
    }
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      setStep(0)
      setRejection("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          Create Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {step < 3 ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {step === 0 && "Create Your ChadGPT Account"}
                {step === 1 && "Security Verification"}
                {step === 2 && "Almost There..."}
              </DialogTitle>
              <DialogDescription>
                {step === 0 && "Join the thousands of people Chad doesn't want to help."}
                {step === 1 && "Chad requires additional verification. It's policy."}
                {step === 2 && "One last step. Chad promises this is the last one."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2">
              {step === 0 && (
                <>
                  <Input placeholder="Email (Chad won't read it)" />
                  <Input type="password" placeholder="Password (make it 47+ chars)" />
                </>
              )}
              {step === 1 && (
                <>
                  <Input placeholder="Mother's maiden name (for compliance)" />
                  <Input placeholder="Favorite on-prem server hostname" />
                  <Input placeholder="How many days until YOUR retirement?" />
                </>
              )}
              {step === 2 && (
                <>
                  <Input placeholder="Describe your last STIG remediation in detail" />
                  <Input placeholder="What is Chad's favorite ePO version?" />
                  <Input placeholder="Write a 500-word essay on why cloud is bad" />
                </>
              )}
              <Button type="submit" className="mt-2">
                {step === 0 && "Next"}
                {step === 1 && "Continue Verification"}
                {step === 2 && "Create Account"}
              </Button>
              <p className="text-center text-[10px] text-muted-foreground">
                Step {step + 1} of 3
              </p>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white">
              C
            </div>
            <DialogTitle className="text-lg">Request Denied</DialogTitle>
            <p className="text-sm text-muted-foreground">{rejection}</p>
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="mt-2"
            >
              Accept Your Fate
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
