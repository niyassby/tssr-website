import React from 'react';
import { Mail, Phone, MapPin, User, FileText, Calendar as CalendarIcon, GraduationCap, CreditCard, ShieldCheck } from 'lucide-react';

function StudentDetails({ studentData, onPayment }) {
    if (!studentData) return null;

    // Extract data handling nested student object safely
    const student = studentData.student || {};
    const courseName = studentData.courseName || '';
    const admissionNumber = studentData.admissionNumber || student.studentId || '';

    return (
        <div className="md:col-span-2 border-t border-gray-100 bg-white p-8 md:p-12 transition-all duration-500 ease-in-out animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <ShieldCheck className="text-green-500" size={28} />
                        Student Eligibility Verified
                    </h3>
                    <p className="text-gray-500 mt-1">Please review the details below before proceeding to payment.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Profile Card */}
                <div className="col-span-1 border border-gray-100 rounded-2xl p-6 bg-slate-50 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

                    <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden mb-4 mt-6 bg-white z-10">
                        {student.profileImage ? (
                            <img src={student.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                                <User size={48} />
                            </div>
                        )}
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 capitalize px-2 z-10">
                        {student.name || 'Unknown Student'}
                    </h4>

                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold z-10 font-mono tracking-wide">
                        <FileText size={14} />
                        {admissionNumber}
                    </div>

                    <div className="w-full mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-center gap-2 text-gray-700 font-medium mb-2">
                            <GraduationCap size={18} className="text-indigo-500" />
                            {courseName}
                        </div>
                        {studentData.batchMonth && studentData.year && (
                            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                                <CalendarIcon size={16} />
                                Batch: {studentData.batchMonth} {studentData.year}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Details Grid */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Contact Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Phone</p>
                                    <p className="text-gray-900 font-medium">{student.phoneNumber || 'Not provided'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-rose-50 rounded-lg text-rose-600 shrink-0">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</p>
                                    <p className="text-gray-900 font-medium line-clamp-1" title={student.email}>{student.email || 'Not provided'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 md:col-span-2">
                                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Address</p>
                                    <p className="text-gray-900 font-medium capitalize">
                                        {[student.houseName, student.place, student.district, student.state, student.pincode].filter(Boolean).join(', ')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Personal Details</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Age</p>
                                <p className="text-gray-900 font-medium">{student.age || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Gender</p>
                                <p className="text-gray-900 font-medium capitalize">{student.gender || '-'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Guardian Name</p>
                                <p className="text-gray-900 font-medium capitalize">{student.parentName || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="pt-4">
                        <button
                            onClick={onPayment}
                            className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-indigo-200 outline-none"
                        >
                            <CreditCard size={20} />
                            Proceed to Payment
                        </button>
                        <p className="text-xs text-gray-500 mt-3 text-center md:text-left flex items-center justify-center md:justify-start gap-1">
                            <ShieldCheck size={14} /> Secure payment gateway
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDetails;