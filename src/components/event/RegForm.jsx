import React from 'react';
import { User, Mail, Phone, Hash, MapPin, CreditCard, ShieldCheck, Building } from 'lucide-react';
import { toast } from 'sonner';

function RegForm({ externalDetails, setExternalDetails, onPayment }) {

    // Initialize state if empty
    const details = externalDetails || {
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        studyCenterName: ''
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExternalDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!externalDetails.name || !externalDetails.email || !externalDetails.phoneNumber || !externalDetails.address) {
            toast.error("Please fill all the fields");
            return;
        }
        if (onPayment) {
            onPayment();
        }
    };

    return (
        <div className="md:col-span-2 border-t border-gray-100 bg-white p-8 md:p-12 transition-all duration-500 ease-in-out animate-fadeIn">
            <div className="flex flex-col mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <User className="text-indigo-500" size={28} />
                    External Attendee Registration
                </h3>
                <p className="text-gray-500 mt-1">Please fill out your details to proceed to payment.</p>
            </div>

            <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                required
                                value={details.name || ''}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white shadow-sm"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                required
                                value={details.email || ''}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white shadow-sm"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                name="phoneNumber"
                                required
                                value={details.phoneNumber || ''}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white shadow-sm"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                    </div>
                    {/* Study Center Name */}
                    <div className="col-span-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Study Center Name (Optional)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="studyCenterName"
                                required
                                value={details.studyCenterName || ''}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white shadow-sm"
                                placeholder="Study Center Name"
                            />
                        </div>
                    </div>


                    {/* Address */}
                    <div className="col-span-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                        <div className="relative">
                            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                <MapPin size={18} className="text-gray-400" />
                            </div>
                            <textarea
                                name="address"
                                required
                                rows="3"
                                value={details.address || ''}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white shadow-sm resize-none"
                                placeholder="Enter your full residential or organizational address"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-indigo-200 flex-1 outline-none"
                    >
                        <CreditCard size={20} />
                        Proceed to Payment
                    </button>
                    <p className="text-xs text-gray-500 mt-3 text-center md:text-left flex items-center justify-center md:justify-start gap-1">
                        <ShieldCheck size={14} /> Secure Razorpay payment gateway
                    </p>
                </div>
            </form>
        </div>
    );
}

export default RegForm;