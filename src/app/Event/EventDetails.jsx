import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAllEvents, useRegisterEvent, useStudentEligibility } from '@/hooks/useReactQuery';
import { Calendar1Icon, CircleDollarSign, Clock1Icon, Loader2 } from 'lucide-react';
import { Location01Icon } from 'hugeicons-react';
import { toast } from 'sonner';
import StudentDetails from '@/components/event/StudentDetails';
import axiosInstance from '@/API/axiosConfig';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import EventSlip from '@/components/event/EventSlip';
import RegForm from '@/components/event/RegForm';
import { AnimatedCheck } from '@/components/ui/AnimatedCheck';


function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: events, isLoading, isError } = useAllEvents();

    // States
    const [studentId, setStudentId] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [isExternal, setIsExternal] = useState(false);
    const [externalDetails, setExternalDetails] = useState(null);
    const [slipData, setSlipData] = useState(null);
    const [success, setSuccess] = useState(false);
    

    const { mutate: checkEligibility, isPending: isChecking } = useStudentEligibility();
    const { mutateAsync: createOrder, isPending: registerPending } = useRegisterEvent();

    const event = events?.data?.find(e => e._id === id || e.id === id);

    const handleStudentEligibility = (e) => {
        e.preventDefault();
        // Reset states before new check
        setStudentData(null);
        setSlipData(null);

        checkEligibility({ admissionNumber: studentId, eventId: event._id }, {
            onSuccess: (data) => {
                if (!data.success) return toast.error(data.message);

                toast.success(data.message);
                if (data.isAlreadyRegistered) {
                    setSlipData(data.data);
                    // console.log(data);
                    
                    setSuccess(true);
                } else {
                    setStudentData(data.data);
                }
            },
            onError: (err) => toast.error(err.message)
        });
    };

    const handleRegisterEvent = async () => {
        try {
            const order = await createOrder({
                eventId: event._id,
                enrollmentId: studentData?.enrollmentId || "",
                externalDetails: externalDetails
            });

            if (!order.success) return toast.error(order.message);

            const dataOrder = order?.data?.razorpayOrder;
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: dataOrder.amount,
                currency: "INR",
                name: "TSSR Council",
                order_id: dataOrder.id,
                handler: async (response) => {
                    const res = await axiosInstance.post("/api/events/verifyPayment", {
                        ...response,
                        recordId: order?.data?.record?._id
                    });

                    if (res.data.success) {
                        toast.success("Payment successful");
                        setSlipData(res.data?.data);
                        setSuccess(true);
                        // Clear entry states
                        setStudentData(null);
                        setIsExternal(false);
                    } else {
                        toast.error(res.data.message);
                    }
                },
                theme: { color: "#4F46E5" } // Indigo 600
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    };

    // Loading & Error states (keep your existing UI here)
    if (isLoading) return <div className="...loading-spinner" />;
    if (!event) return <div className="...not-found" />;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="w-full h-24 md:h-36"></div>

            <div className="max-w-5xl mx-auto">
                <button onClick={() => navigate('/events')} className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8 group transition-colors">
                    <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to all events
                </button>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">

                    {/* LEFT SIDE: Event Info (Static) */}
                    <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-1">{event.eventName}</h1>
                        <h2 className="text-gray-600  mb-6">{event.eventProgram}</h2>

                        <div className="space-y-6 mt-8">
                            <InfoRow Icon={Calendar1Icon} label="Date" value={new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: "Asia/Kolkata", })} />
                            <InfoRow Icon={Clock1Icon} label="Time" value={`${event.time?.from} - ${event.time?.to}`} />
                            <InfoRow Icon={Location01Icon} label="Location" value={event.location} />
                        </div>
                    </div>



                    {/* RIGHT SIDE: Dynamic Action Area */}
                    <div className="bg-gr ay-50 p-8 md:p-12 flex flex-col justify-center">
                        <div className="relative z-10 ">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Registration</h3>
                            <div className="flex justify-between items-center bg-indigo-50 px-4 py-1 rounded-lg mb-6 border border-indigo-100">
                                <div className="flex items-center gap-3">
                                    <CircleDollarSign size={20} className='text-indigo-600' />
                                    <span className="font-semibold text-gray-700">Fee</span>
                                </div>
                                <span className="text-2xl font-bold text-indigo-600">
                                    {event.fee > 0 ? `₹${event.fee}` : 'Free'}
                                </span>
                            </div>

                            {event.participantType === 'student' ? (
                                <form onSubmit={handleStudentEligibility} className="space-y-4">
                                    <input
                                        type="text"
                                        required
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="Enter Admission Number"
                                    />
                                    <button type="submit" disabled={isChecking} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition flex justify-center">
                                        {isChecking ? <Loader2 className="animate-spin" /> : "Verify & Register"}
                                    </button>
                                    <p className='text-sm text-gray-500'>If you don't receive the slip after payment, please re-enter your admission number to download slip.</p>
                                </form>
                            ) : (
                                <>
                                <button onClick={() => setIsExternal(true)} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition">
                                    Register Now
                                </button>
                                <p className='text-sm text-gray-500 mt-3'>If you don't receive the slip after payment, please re-enter your phone number to download slip.</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='col-span-full'>
                        {/* STEP 2: STUDENT DETAILS (Found but not paid) */
                            success && slipData ? (
                                <div className="flex flex-col items-center justify-center space-y-2 animate-in fade-in zoom-in duration-300 p-8">
                                    <AnimatedCheck size={100} />
                                    <h3 className="text-xl font-bold text-gray-900">Registration Complete!</h3>
                                    <p className="text-gray-600 text-sm">Your spot has been secured. Download your entry slip below.</p>
                                    <PDFDownloadLink
                                        document={<EventSlip data={event} studentData={slipData}  />}
                                        fileName={`EventSlip_${event.eventName}.pdf`}
                                        className="inline-flex w-full max-w-md justify-center items-center px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
                                    >
                                        {({ loading }) => loading ? "Preparing PDF..." : "Download Slip"}
                                    </PDFDownloadLink>
                                    {/* <PDFViewer width={"100%"} height={"1000px"}>
                                        <EventSlip data={event} studentData={slipData} />
                                    </PDFViewer>  */}
                                    </div>
                            ) :
                                studentData ? (
                                    <StudentDetails studentData={studentData} onPayment={handleRegisterEvent} isLoading={registerPending} />
                                ) :

                                    /* STEP 3: EXTERNAL FORM */
                                    isExternal ? (
                                        <RegForm externalDetails={externalDetails} setExternalDetails={setExternalDetails} onPayment={handleRegisterEvent} isLoading={registerPending} />
                                    ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Small helper component for readability
const InfoRow = ({ Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <Icon size={20} strokeWidth={1.5} className='shrink-0 text-indigo-600 mt-1' />
        <div>
            <p className="text-xs text-gray-500 ">{label}</p>
            <p className="text-base text-gray-900 font-semibold leading-tight">{value || 'TBD'}</p>
        </div>
    </div>
);

export default EventDetails;