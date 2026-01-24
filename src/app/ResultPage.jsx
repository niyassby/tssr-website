import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Loader2, Search, CheckCircle2, AlertTriangle } from 'lucide-react'
import ResultCard from "@/components/Result/ResultCard" 
import { DayPicker } from "@/components/ui/day-picker"
import { useResultCheck } from "@/hooks/useReactQuery"
import { toast } from "sonner"
import { normalizeDobToUTC } from "@/components/Utils/DOBConvertion"


export default function Result() {
  const [admissionNo, setAdmissionNo] = useState("")
  const [dob, setDob] = useState(null)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [student, setStudent] = useState(null)
  const {mutate, isPending}=useResultCheck()

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setStudent(null)

    if(!admissionNo || !dob){
        toast.error("Please fill all the fields")
        setError("Please fill all the fields")
        return
    }
    const normalizedDob = normalizeDobToUTC(dob)
    mutate(
      { admissionNumber: admissionNo, dob:normalizedDob },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setResult(data?.data);
            setStudent(data?.student);
            setError(null);
            toast.success(data.message);
          } else {
            toast.error(data.message);
            setError(data.message);
          }
        },
        onError: (error) => {
          toast.error(error.message);
          setError(error.message);
        },
      }
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
        <div className="h-20 w-full"></div>
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14 mt-20">
        <header className="mb-8 md:mb-10">
          <div className="flex flex-col text-center items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Student Result Check
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your Admission No and Date of Birth to view your examination result.
              </p>
            
          </div>
        </header>

        <Card className="shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-base md:text-lg">Find your result</CardTitle>
            <CardDescription className="text-sm">
              Enter your admission number and date of birth to check your result.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <div className="md:col-span-3 space-y-1">
                <Label htmlFor="admissionNo">Admission No</Label>
                <Input
                  id="admissionNo"
                  placeholder="e.g. RUK/A59/10235 or 102563562"
                  inputMode="text"
                  autoCapitalize="characters"
                  value={admissionNo}
                  onChange={(e) => setAdmissionNo(e.target.value)}
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Use the format printed on your ID card. Slashes and backslashes are accepted.
                </p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <Label htmlFor="dob">Date of Birth</Label>
                <DayPicker date={dob} setDate={setDob} />
              </div>
              <div className="md:col-span-5 flex items-end">
                <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check Result
                    </>
                  )}
                </Button>
              </div>
            </form>

            {error && (
              <Alert variant="destructive" role="alert" aria-live="assertive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Not found</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <>
                <Separator className="my-2" />
                <div
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="mb-3 flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Record found</span>
                  </div>
                  <ResultCard student={student} result={result} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
