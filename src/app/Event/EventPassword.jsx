import { useAllEvents, useVerifyEventPassword } from '@/hooks/useReactQuery';
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

function EventPassword() {
    const { eventId: paramEventId } = useParams();
    const { data: events, isLoading, isError } = useAllEvents();
    const [password, setPassword] = useState('');
    const [eventId, setEventId] = useState(paramEventId || '');
    const [isSuccess, setIsSuccess] = useState(false);
    const [errro, setError]=useState(null)
    const { mutate: verifyEventPassword, isPending, isError: isVerifyError, error: verifyError } = useVerifyEventPassword();

    const handleSubmit = () => {
        setIsSuccess(false);
        setError(null);
        if(!eventId || !password){
            toast.error("Please select event and enter password");
            setError("Please select event and enter password");
            return;
        }
        verifyEventPassword({ eventId, password },{
            onSuccess: (data) => {
                if(data.success){
                    toast.success(data.message);
                    setIsSuccess(true);
                    setError(null);
                    setPassword("");
                    setEventId("");
                }else{
                    toast.error(data.message);
                    setError(data.message)
                }
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    }

    const hasEvent = events?.data?.some((event) => event._id === paramEventId);

    if (isLoading) return <div className="w-full h-screen flex items-center justify-center "  ><Loader2 className="animate-spin" /></div>;
    if (isError) return <div className="w-full h-screen flex items-center justify-center text-2xl font-bold text-red-500"  >NO EVENT FOUND</div>;
    if (!hasEvent) return <div className="w-full h-screen flex items-center justify-center text-2xl font-bold text-red-500"  >NO EVENT FOUND</div>;
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Event Password</CardTitle>
                    <CardDescription>Select event and enter the password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    {!paramEventId && <Select onValueChange={(value) => setEventId(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Event" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {events.data?.map((event) => (
                                    <SelectItem key={event._id} value={event._id}>{event.eventName}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>}
                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button className="w-full" onClick={handleSubmit}>
                        {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
                    </Button>
                    {errro && <p className="text-red-500 text-sm">{errro}</p>}
                    {isSuccess && <p className="text-green-600 text-sm">Password verified successfully, Now you can scan and verfy qrcode directly from your phone</p>}
                </CardContent>
            </Card>
        </div>
    )
}

export default EventPassword