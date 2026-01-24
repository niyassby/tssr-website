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
import { useATCVerifyCertificate } from "@/hooks/useReactQuery"
import { toast } from "sonner"
import { AnimatedCheck } from "@/components/ui/AnimatedCheck"
import { AnimatedX } from "@/components/ui/AnimatedXIcon"
import { format } from "date-fns"


function normalizeatcId(input) {
  // Trim, collapse internal whitespace, uppercase
  return input.replace(/\s+/g, "").trim()
}


function CenterVerification() {
  const [atcId, setAtcId] = useState("")
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const {mutate, isPending}=useATCVerifyCertificate()

  const canSubmit = useMemo(() => normalizeatcId(atcId).length >= 6, [atcId])

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault()
      setError(null)
      setData(null)
      const admit = normalizeatcId(atcId)
      if (!admit || admit.length < 6) {
        setError("Please enter a valid ATC ID number.")
        return
      } 
      mutate({atcId: atcId}, {
        onSuccess: (data) => {
          if(data.success){
            setData(data?.data)
            console.log(data?.data)
            toast.success("ATC verified successfully")
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
    [atcId],
  )

  return (
    <main className="min-h-screen bg-slate-50">
    <div className="h-20 w-full"></div>
  <div className="mx-auto max-w-3xl px-4 py-10 md:py-14 mt-20">
    <header className="mb-8 md:mb-10">
      <div className="flex flex-col text-center items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Authorized Study Centers Verification
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your Authorized Study Centres ID to view verify.
          </p>
        
      </div>
    </header>
    <Card className="shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Study Centers Verification</CardTitle>
        <CardDescription>Enter your Authorized Study Centres ID</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="atcId">Study Center - ATC Code</Label>
            <div className="flex items-center max-md:flex-col gap-2">
              <Input
                id="atcId"
                inputMode="text"
                placeholder="e.g. ADM2024-001"
                autoComplete="off"
                spellCheck={false}
                value={atcId}
                onChange={(e) => setAtcId(e.target.value)}
                aria-describedby="atcId-help"
                className="uppercase"
              />
              <Button type="submit" disabled={!canSubmit || isPending} className="whitespace-nowrap max-md:w-full">
                {isPending ? <Loader2 className="animate-spin" /> : <Search />}
                Verify
              </Button>
            </div>
            {/* <p id="admission-help" className="text-xs text-muted-foreground">
              Use the format {'"ADMYYYY-XXX"'}. Input will be normalized automatically.
            </p> */}
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
            {data.isApproved ?<div className="flex flex-col items-center gap-1">
                <AnimatedCheck size={100}/>
                <div className="font-medium">Study Centre Verifide</div>
              </div>:
              <div className="flex flex-col items-center gap-1">
                <AnimatedX size={100}/>
                <div className="font-medium">Study Centre Not Valied</div>
              </div>}
            </div>

            <div className="grid gap-0 p-4 sm:grid-cols-2">
              <Field label="ATC ID" value={data.atcId } />
              <Field label="Status" badge value={data.isActive} />
              <Field label="Center Name" value={data?.name} />
              <Field label="Center Head" value={data?.centerHead} />
              {/* <Field label="Email" value={data?.email} /> */}
              <Field label="District" value={data?.district} />
              <Field label="Place" value={data?.place} />
              {/* <Field label="Pincode" value={data?.pincode} /> */}
              <Field label="Reg No" value={data?.regNo} />
              {/* <Field label="Admission year" value={String(data.year)} /> */}
              <Field label="Renewal Date" value={format(new Date(data?.renewalDate), "PPP")} />
            </div>

            <div className="border-t p-4 text-sm text-muted-foreground flex items-center gap-2">
              {data.isApproved ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden />
                  This Authorized Study Centre has been verified by TSSR Council.
                </>
              ) :  (
                <>
                  <XCircle className="h-4 w-4 text-rose-600" aria-hidden />
                  This Authorized Study Centre not verified by TSSR Council.
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
      <Badge className={cn(value ? "bg-emerald-600 text-white" : "bg-rose-600 text-white", "rounded-full min-w-20")} >{value ? "Active" : "Not Active"}</Badge>
      :<div className={cn(" font-semibold uppercase")}>{value}</div>
    }
    </div>
  )
}


export default CenterVerification
