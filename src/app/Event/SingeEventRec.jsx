import React from 'react';
import { useGetOneEventRecord, useUpdateEventRecord } from '@/hooks/useReactQuery';
import { useParams } from 'react-router-dom';
import { User, Mail, Phone, Hash, MapPin, CheckCircle, XCircle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

function SingeEventRec() {
    const { id } = useParams();
    const { data:res, isLoading, error, refetch } = useGetOneEventRecord(id);
    const { mutate: updateRecord, isPending: isUpdating } = useUpdateEventRecord();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    const data = res?.data

    if (error || !data) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-xl shadow-md border border-gray-100">
                    <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">Record Not Found</h2>
                    <p className="text-gray-500 mt-2">The event record you are looking for does not exist or has been removed.</p>
                </div>
            </div>
        );
    }

    const handleAttendance = () => {
        updateRecord(
            { recordId: data.recordId || id, attendanceStatus: true },
            {
                onSuccess: () => {
                    toast.success('Attendance marked successfully!');
                    refetch();
                },
                onError: () => {
                    toast.error('Failed to mark attendance. Please try again.');
                }
            }
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
            <div className='w-full h-36'/>
            <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 px-8 py-12 text-center relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        {data.profileImage ? (
                            <img
                                src={data.profileImage}
                                alt={data.name}
                                className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover mb-5"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
                                <User className="h-12 w-12 text-white" />
                            </div>
                        )}
                        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-md">{data.name}</h1>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-white backdrop-blur border border-white/30 text-sm font-medium tracking-wide shadow-sm">
                                <Hash className="w-4 h-4 mr-1.5 opacity-80" />
                                {data.regNo}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-8 sm:p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                        <div className="flex items-start">
                            <div className="bg-indigo-50 p-2.5 rounded-lg mr-4 shrink-0">
                                <Mail className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Email Address</p>
                                <p className="text-gray-800 font-medium truncate" title={data.email}>{data.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-indigo-50 p-2.5 rounded-lg mr-4 shrink-0">
                                <Phone className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Phone Number</p>
                                <p className="text-gray-800 font-medium">{data.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-indigo-50 p-2.5 rounded-lg mr-4 shrink-0">
                                <CreditCard className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Payment Status</p>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${data.payStatus?.toLowerCase() === 'success' ? 'bg-green-100 text-green-700' :
                                        data.payStatus?.toLowerCase() === 'failed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {data.payStatus || 'Pending'}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-indigo-50 p-2.5 rounded-lg mr-4 shrink-0">
                                <MapPin className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Address</p>
                                <p className="text-gray-800 font-medium text-sm leading-relaxed">{data.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-8">
                        <div className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl border border-gray-200 mb-8 shadow-inner">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Attendance Status</p>
                                <div className="flex items-center">
                                    {data.attendanceStatus ? (
                                        <><CheckCircle className="h-6 w-6 text-green-500 mr-2.5" /><span className="text-lg font-bold text-green-700">Present</span></>
                                    ) : (
                                        <><XCircle className="h-6 w-6 text-amber-500 mr-2.5" /><span className="text-lg font-bold text-amber-600">Not Marked</span></>
                                    )}
                                </div>
                            </div>
                        </div>

                        {data.isAdmin && (
                            <div className="mt-2 text-center">
                                {data.attendanceStatus ? (
                                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center shadow-sm">
                                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                        <h3 className="text-xl font-bold text-green-800">QR Code Scanned</h3>
                                        <p className="text-green-600 text-sm mt-1.5 font-medium">This participant marked as present.</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleAttendance}
                                        disabled={isUpdating}
                                        className="w-full flex items-center justify-center py-4 px-8 border border-transparent text-lg font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 shadow-xl shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer"
                                    >
                                        {isUpdating ? 'Marking Attendance...' : 'Mark as Present'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingeEventRec;