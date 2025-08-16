import React, { useState } from 'react'
import { useFormContext } from '../FormContext';
import { FaUser, FaHospital, FaNotesMedical, FaDollarSign } from 'react-icons/fa';
import ReviewFormSkeleton from './ReviewFormSkeleton';
import toast from 'react-hot-toast';

function ReviewForm({ goToPrev }) { // Accept goToPrev prop
  const [isCertified, setIsCertified] = useState(false);
  const { form, setForm, saveData, isLoading } = useFormContext();
  const type = localStorage.getItem('U_type');
  const isUpdating = !!form.id;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  // Placeholder data - in a real app, this would come from props or a state management system
  const currentClaimDetails = {
    personal: {
      name: `${form.firstName || ''} ${form.lastName || ''}`,
      email: form.emailAddress || '',
      policyNumber: form.policyNumber || 'Will be generated upon submission',
      phone: form.phoneNumber || '',
    },
    provider: { // Assuming these fields exist in your form context from previous steps
      providerName: form.providerName || "N/A", // Example: replace with actual form field
      facility: form.facilityName || "N/A", // Example: replace with actual form field
      serviceDate: form.dateOfService || form.dateOfIllness || "N/A", // Prefer dateOfService
      providerType: form.providerType || "N/A", // Example: replace with actual form field
    },
    treatment: { // Assuming these fields exist in your form context from previous steps
      diagnosis: form.primaryDiagnosis || "N/A",
      diagnosisCode: form.diagnosisCode || "N/A",
      visitType: form.typeOfVisit || "N/A",
    },
    expense: { // Assuming totalClaimAmount is calculated and stored in form context
      totalClaimAmount: form.totalClaimAmount || 0, // Example: replace with actual form field
    }
  };

  const handleSubmitClaim = async () => {
    if (isCertified) {
      try {
        // Pass the relevant data to be saved.
        // Assuming saveData expects the entire form object or a specific structure.
        // const response = await saveData(form); // Assuming saveData returns the response data from the API call
        const updatedForm = { ...form};
        if (isUpdating && type === 'admin') {
          updatedForm.status = 'Approved'; // Admin updates set status to Approved
        }
        const response = await saveData(updatedForm);
        if (isUpdating) {
          toast.success('Claim updated successfully!');
        } else {
          toast.success(`Claim Submitted Successfully! Your Policy Number is ${response.policyNumber}.`);
        }
      } catch (error) {
        console.error('Error submitting claim:', error);
        toast.error(`Failed to submit claim.${error.message}`);
      }
    } else {
      toast.error("Please certify the information before submission.");
    }
  };

  if (isLoading) {
    return <ReviewFormSkeleton />;
  }
  
  return (
    <div className="font-sans max-w-4xl mx-auto p-5 md:p-8 bg-slate-100 rounded-2xl shadow-[8px_8px_16px_#cbd5e1,_-8px_-8px_16px_#ffffff]">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-800 mb-1">Review & Submit</h1>
        <p className="text-slate-600">Review your claim details before submission</p>
      </div>

      {/* Personal Information Section */}
      <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-6">
        <h2 className="flex items-center text-xl font-medium text-slate-700 mb-4">
          <FaUser className="text-cyan-600 mr-3 text-2xl" /> Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-gray-700">
          <div>
            <span className="font-semibold text-gray-600">Name:</span> {currentClaimDetails.personal.name}
          </div>
          <div>
            <span className="font-semibold text-gray-600">Policy Number:</span> {currentClaimDetails.personal.policyNumber}
          </div>
          <div>
            <span className="font-semibold text-gray-600">Email:</span> {currentClaimDetails.personal.email}
          </div>
          <div>
            <span className="font-semibold text-gray-600">Phone:</span> {currentClaimDetails.personal.phone}
          </div>
        </div>
      </div>

      {/* Provider Information Section */}
      <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-6">
        <h2 className="flex items-center text-xl font-medium text-slate-700 mb-4">
          <FaHospital className="text-cyan-600 mr-3 text-2xl" /> Provider Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-gray-700">
          <div>
            <span className="font-semibold text-gray-600">Provider:</span> {currentClaimDetails.provider.providerName}
          </div>
          <div>
            <span className="font-semibold text-gray-600">Facility:</span> {currentClaimDetails.provider.facility}
          </div>
          <div>
            <span className="font-semibold text-gray-600">Service Date:</span> {currentClaimDetails.provider.serviceDate}
          </div>
          <div>
            <span className="font-semibold text-gray-600">Provider Type:</span> {currentClaimDetails.provider.providerType}
          </div>
        </div>
      </div>

      {/* Treatment Details Section */}
      <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-6">
        <h2 className="flex items-center text-xl font-medium text-slate-700 mb-4">
          <FaNotesMedical className="text-cyan-600 mr-3 text-2xl" /> Treatment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-gray-700">
          <div>
            <span className="font-semibold text-gray-600">Diagnosis:</span> {currentClaimDetails.treatment.diagnosis}
          </div>
          <div>
            <span className="font-semibold text-gray-600">Diagnosis Code:</span> {currentClaimDetails.treatment.diagnosisCode}
          </div>
          <div>
            <span className="font-semibold text-gray-600">Visit Type:</span> {currentClaimDetails.treatment.visitType}
          </div>
        </div>
      </div>

      {/* Expense Summary Section */}
      <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-6">
        <h2 className="flex items-center text-xl font-medium text-slate-700 mb-4">
          <FaDollarSign className="text-cyan-600 mr-3 text-2xl" /> Expense Summary
        </h2>
        <div className="flex justify-between items-center text-lg font-bold text-gray-800">
          <h3>Total Claim Amount:</h3>
          <span className="text-cyan-600">${currentClaimDetails.expense.totalClaimAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Certification Checkbox */}
      <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-8">
        <label className="flex items-start cursor-pointer text-slate-700">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-cyan-600 bg-slate-100 border-slate-300 rounded-md mt-1 mr-3 focus:ring-cyan-500 shadow-[inset_2px_2px_4px_#cbd5e1,_inset_-2px_-2px_4px_#ffffff]"
            checked={isCertified}
            onChange={(e) => setIsCertified(e.target.checked)}
          />
          <span className="text-sm leading-relaxed">
            I certify that the information provided is true and accurate to the best of my knowledge. I understand that any false
            statements may result in denial of this claim and may constitute fraud. I authorize the release of medical information // text-slate-600
            necessary to process this claim.
          </span>
        </label>
      </div>

      {/* Admin Remark Section - Visible only for admins on update */}
      {isUpdating && type === 'admin' && (
        <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-8">
          <label className="block text-slate-700">
            <span className="font-semibold">Admin Remark:</span>
            <textarea
              name="remark"
              value={form.remark || ''}
              onChange={handleChange}
              className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
              placeholder="Add a remark for the user..."
              rows="3"
            />
          </label>
        </div>
      )}

      {/* Navigation Buttons and Step Indicator */}
      <div className="flex justify-between items-center mt-8">
        <button
          className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
          onClick={goToPrev} // Use goToPrev prop for navigation
        >
          Previous
        </button>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-sm md:hidden">Step 5 of 5</span> {/* Hidden on desktop */}
          <button
            className="px-8 py-3 bg-slate-100 text-green-600 font-semibold rounded-xl shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] active:text-green-700 transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-[inset_2px_2px_4px_#cbd5e1,_inset_-2px_-2px_4px_#ffffff]"
            onClick={handleSubmitClaim} // This will now handle both create and update
            disabled={!isCertified}
          >
            {isUpdating ? (type === 'admin' ? 'Accept' : 'Update Claim') : 'Submit Claim'}
          </button>
        </div>
      </div>
      <div className="text-right text-slate-500 text-sm mt-2 hidden md:block">Step 5 of 5</div> {/* Visible on desktop */}
    </div>
  )
}

export default ReviewForm