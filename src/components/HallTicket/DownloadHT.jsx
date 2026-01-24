
import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Calendar, BadgeIcon as IdCard } from "lucide-react"
import { DayPicker } from "../ui/day-picker"
import { toast } from "sonner"
import { useDlHallTicket } from "@/hooks/useReactQuery"
import { normalizeDobToUTC } from "../Utils/DOBConvertion"

const instructions = [
    "Enter your correct Admission Number and Date of Birth in the form.",
    "Double-check the details you entered to avoid any errors.",
    "Click on the 'Get Hall Ticket' button.",
    "Your hall ticket will appear below the form on the screen.",
    "Click the Download button shown with your hall ticket.",
    "The print dialog will open automatically.",
    "You can now download the hall ticket as a PDF or print it directly."
]


export default function DownloadHT({setStudent}) {
  const [admissionNo, setAdmissionNo] = useState("")
  const [dob, setDob] = useState(null)
  const {mutate, isPending}=useDlHallTicket()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!admissionNo || !dob) {
      toast.error("Please fill in all required fields")
      return
    }
    const normalizedDob = normalizeDobToUTC(dob);
    const data = { admissionNumber: admissionNo, dob:normalizedDob };
    
    mutate(data, {
      onSuccess: (data) => {
        if(data.success){
          setStudent(data.data)
          toast.success("Hall Ticket Downloaded Successfully")
        }else{
          toast.error(data.message)
        }
      }
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-[85rem] mx-auto px-4 py-20 ">
        <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hall Ticket</h1>
            <p className="text-gray-600 mb-8 max-w-xl">Please follow the steps below carefully to download and print your Hall Ticket:</p>
            <h1 className="text-lg font-medium mb-3">Instructions to Download Hall Ticket</h1>
            <div className="space-y-1">
                {instructions.map((instruction, index) =>{
                    return <p key={index} className="text-gray-800 ">{index+1}. {instruction}</p>
                })}
            </div>
                <h1 className="text-lg font-medium mt-6">Important Notes:</h1>
                <p className="text-gray-800 mt-2">✔ Ensure all details (Name, Photo, Exam Date, Center) are correct.</p>
                <p className="text-gray-800 ">✔ Contact the exam department immediately if there are errors.</p>


        </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Download className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Download Hall Ticket</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your admission details to download your hall ticket
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="admission-no" className="text-sm font-medium text-gray-700">
                Admission Number *
              </Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="admission-no"
                  type="text"
                  placeholder="Enter your admission number"
                  value={admissionNo}
                  onChange={(e) => setAdmissionNo(e.target.value.toUpperCase())}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
                Date of Birth *
              </Label>
              <div className="relative">
               
                <DayPicker date={dob} setDate={setDob}/>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Get Hall Ticket
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Please ensure your admission number and date of birth are correct.  If you have any issues, please contact the exam department.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
