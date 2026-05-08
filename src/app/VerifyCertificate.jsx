import React from "react"
import { useCallback, useMemo, useState } from "react"
import { AlertTriangle, CheckCircle2, Loader2, Search, ShieldCheck, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { useVerifyCertificate } from "@/hooks/useReactQuery"
import { toast } from "sonner"
import { AnimatedCheck } from "@/components/ui/AnimatedCheck"
import { AnimatedX } from "@/components/ui/AnimatedXIcon"


function normalizeAdmission(input) {
  // Trim, collapse internal whitespace, uppercase
  return input.replace(/\s+/g, "").toUpperCase().trim()
}


export default function CertificateVerification() {
  const [admission, setAdmission] = useState("")
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const {mutate, isPending}=useVerifyCertificate()

  const canSubmit = useMemo(() => normalizeAdmission(admission).length >= 6, [admission])

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault()
      setError(null)
      setData(null)
      const admit = normalizeAdmission(admission)
      if (!admit || admit.length < 6) {
        setError("Please enter a valid register number.")
        return
      } 
      mutate({admissionNumber: admission}, {
        onSuccess: (data) => {
          if(data.success){
            setData(data?.data)
            console.log(data?.data)
            toast.success("Certificate verified successfully")
          }else{
             toast.error(data.message) 
             setError(data.message)
          }
        },
        onError: (error) => {
          setError(error.message)
          toast.error(error.message)
        },
      })
    },
    [admission],
  )

  return (
    <main className="min-h-screen bg-slate-50">
    <div className="h-20 w-full"></div>
  <div className="mx-auto max-w-3xl px-4 py-10 md:py-14 mt-20">
    <header className="mb-8 md:mb-10">
      <div className="flex flex-col text-center items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Certificate Verification
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your register No to view your Certificate Verification.
          </p>
        
      </div>
    </header>
    <Card className="shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Certificate Verification</CardTitle>
        <CardDescription>Enter a student's register number to verify their certificate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="admission">Register number</Label>
            <div className="flex items-center max-md:flex-col gap-2">
              <Input
                id="admission"
                inputMode="text"
                placeholder="e.g. ADM2024-001"
                autoComplete="off"
                spellCheck={false}
                value={admission}
                onChange={(e) => setAdmission(e.target.value)}
                aria-describedby="admission-help"
                className="uppercase"
              />
              <Button type="submit" disabled={!canSubmit || isPending} className="whitespace-nowrap max-md:w-full">
                {isPending ? <Loader2 className="animate-spin" /> : <Search />}
                Verify
              </Button>
            </div>
            <p id="admission-help" className="text-xs text-muted-foreground">
              Use the format {'"ADMYYYY-XXX"'}. Input will be normalized automatically.
            </p>
          </div>

          
        </form>

        {error && (
          <Alert variant="destructive" className='flex gap-2' role="alert" aria-live="assertive">
            <AnimatedX size={29}/>
            <div >
            <AlertTitle>Verification failed</AlertTitle>
            <AlertDescription className='text-destructive'>{error}</AlertDescription>
            </div>
          </Alert>
        )}

        {data && (
          <div className="rounded-lg border bg-card text-card-foreground">
            <div className="flex items-center justify-center border-b p-4">
            {data?.isCertificateIssued ?<div className="flex flex-col items-center gap-1">
                <AnimatedCheck size={100}/>
                <div className="font-medium">Certificate Verifide</div>
              </div>:
              <div className="flex flex-col items-center gap-1">
                <AnimatedX size={100}/>
                <div className="font-medium">Certificate Not Valied</div>
              </div>}
            </div>

            <div className="grid gap-x-3 p-4 sm:grid-cols-2">
              <div className="col-span-full mb-2">
                <div className="w-24 h-28 border rounded-2xl overflow-hidden">
                  <img src={data?.studentId?.profileImage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"} className="w-full h-full object-cover" alt="" />
                </div>
              </div>
              <Field label="Register number" value={data.admissionNumber} />
              <Field label="Status" badge value={data.isCertificateIssued} />
              <Field label="Student Name" value={data?.studentId?.name} />
              <Field label="Center Name" value={data?.studycenterId?.name} />
              <Field label="Grade" value={data.grade} />
              <Field label="Course" value={data.courseId?.name} />
              <Field label="Batch" value={data.batchId?.month} />
              <Field label="Duration" value={data.courseId?.duration} />
              <Field label="Admission year" value={String(data.year)} />
              {/* <Field label="Enrolled Date" value={format(new Date(data?.enrolledDate, "PPP"))} /> */}
            </div>

            <div className="border-t p-4 text-sm text-muted-foreground flex items-center gap-2">
              {data.isCertificateIssued  ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden />
                  This certificate is valid and was issued by TSSR Council.
                </>
              ) :  (
                <>
                  <XCircle className="h-4 w-4 text-rose-600" aria-hidden />
                  This certificate has been revoked. Contact the issuer.
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
        </div>
        </main>
  )
}

function Field({ label, value, badge=false}) {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:py-2">
      <div className="text-sm text-muted-foreground">{label}</div>
      {badge ?
      <Badge className={cn(value ? "bg-emerald-600 text-white" : "bg-rose-600 text-white", "rounded-full min-w-20")} >{value ? "Pass" : "Fail"}</Badge>
      :<div className={cn(" font-semibold uppercase")}>{value}</div>
    }
    </div>
  )
}
