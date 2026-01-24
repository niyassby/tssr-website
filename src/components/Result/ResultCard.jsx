import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, Printer } from 'lucide-react'
import { cn } from "@/lib/utils"
import { CancelCircleIcon, CheckmarkCircle02Icon } from "hugeicons-react"

export default function ResultCard({
  result = { },
  student = null
}) {
  const isPass = result?.remark?.toLowerCase() === "pass"

  return (
    <Card className="border-emerald-600">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <FileText className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg">Result Details</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "px-3 py-1 text-[0.72rem]",
              isPass ? "bg-emerald-600 hover:bg-emerald-600 text-white" : "bg-rose-600 hover:bg-rose-600 text-white"
            )}
          >
            {result?.remark}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            Grade: {result?.grade}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="hidden print:hidden md:inline-flex"
            aria-label="Print result"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="col-span-full w-full max-w-36 aspect-[3/4] border rounded-sm overflow-hidden">
          <img className="w-full h-full object-cover" src={student?.profileImage} alt="" />
        </div>
        <Field label="Register No" value={result?.admissionNumber} />
        <Field label="Name" value={result?.studentName} />
        <Field label="Course" value={result.courseName} colSpan />
        <Field label="Study Centre" value={result?.studyCenterName} />
        <Field label="Exam Centre" value={result.examCenterName} />
        <Field label="Total Grade " value={result?.grade} />
        <Field label="Duration" value={result.duration} />
        <Field label="Date" value={result.dateOfExam} />
        <div className={cn(
              "px-3 py-1 flex items-center justify-center gap-2 w-full col-span-full mt-5 rounded-md text-center font-medium text-white",
              isPass ? "bg-emerald-600 hover:bg-emerald-600 " : "bg-rose-600 hover:bg-rose-600"
            )}>
        {isPass?<CheckmarkCircle02Icon size={20}/>:
        <CancelCircleIcon size={20}/>}
          {result?.remark}
        </div>
      </CardContent>
    </Card>
  )
}

function Field({ label, value, colSpan = false }) {
  return (
    <div className={cn("grid gap-1", colSpan && "md:col-span-2")}>
      <div className="text-sm font-med ium text-muted-foreground">{label}</div>
      <div className="text- font-semibold">{value}</div>
    </div>
  )
}
