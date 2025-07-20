import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormContext } from "../FormContext";
import { Button } from "@material-tailwind/react";
import PersonInformationForm from "../FormComponent/PersonInformationForm";
import HealthCareForm from "../FormComponent/HealthCareForm";
import MedicalProviderForm from "../FormComponent/MedicalProviderForm";
import ClaimFourthForm from "../FormComponent/MedicalExpenseForm";
import ReviewForm from "../FormComponent/ReviewForm";
import { HomeIcon, UserIcon, CogIcon, DocumentTextIcon, CheckCircleIcon,} from "@heroicons/react/24/solid";



export function InsuranceStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { claimId } = useParams(); 
  const { form, setForm } = useFormContext(); // Access form and setForm
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    if (claimId) {
      setIsLoading(true);
      // The 'claimId' from useParams() is now treated as the policyNumber.
      axios.get(`http://localhost:3000/api/fetch/claim/by-policy/${claimId}`, {
        withCredentials: true,
      })
        .then(response => {
          const fetchedData = response.data;
          // Map fetchedData to the FormContext structure.
          // Adjust field names (e.g., fetchedData.someApiField) based on your API response.
          setForm({
            // Ensure all fields from FormContext are considered for mapping
            id: fetchedData.id || null,

            // Form 1: Personal & Policy Details
            policyNumber: fetchedData.policyNumber || '',
            firstName: fetchedData.firstName || '',
            lastName: fetchedData.lastName || '',
            email: fetchedData.email || '',
            phone: fetchedData.phone || '',
            address: fetchedData.address || '',
            dateOfBirth: fetchedData.dob || fetchedData.dateOfBirth || '',
            relationship: fetchedData.relationship || '',

            // Form 2: Medical Provider Information
            providerName: fetchedData.providerName || fetchedData.hospitalName || '',
            providerType: fetchedData.providerType || '',
            providerId: fetchedData.providerId || '',
            facilityName: fetchedData.facilityName || fetchedData.hospitalName || '', // hospitalName is a common field name
            facilityAddress: fetchedData.facilityAddress || '',
            dateOfService: fetchedData.dateOfService || '',
            referralType: fetchedData.referralType || '',

            // Form 3: Treatment Details
            dateOfIllness: fetchedData.dateOfIllness || fetchedData.dateOfIncident || '', // dateOfIncident from older forms
            primaryDiagnosis: fetchedData.primaryDiagnosis || '',
            diagnosisCode: fetchedData.diagnosisCode || '',
            typeOfVisit: fetchedData.typeOfVisit || '',
            symptomsDescription: fetchedData.symptomsDescription || '',
            treatmentProvided: fetchedData.treatmentProvided || '',
            workRelated: fetchedData.workRelated || '',
            autoAccidentRelated: fetchedData.autoAccidentRelated || '',

            // Form 4: Medical Expenses
            expenseItems: Array.isArray(fetchedData.expenseItems) ? fetchedData.expenseItems : [],
            totalClaimAmount: parseFloat(fetchedData.totalClaimAmount || fetchedData.amount) || 0, // 'amount' might be a legacy field for total

            // Other potential fields from FormContext that might be in API response
            insuranceCompanyName: fetchedData.insuranceCompanyName || fetchedData.companyName || '',
            sumInsured: fetchedData.sumInsured || '',
          });
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch claim data for stepper:', err);
          setIsLoading(false);
          // If claim is not found or user is not authorized, navigate to dashboard
          if (err.response && (err.response.status === 401 || err.response.status === 404)) {
            alert('Claim not found or you do not have permission to view it.');
            navigate('/dashboard');
          }
        });
    } else {
      // This is a new claim, reset the form to its initial state
      // and ensure the stepper is at the first step.
      setForm({
        id: null,
        policyNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        relationship: '',
        providerName: '',
        providerType: '',
        providerId: '',
        facilityName: '',
        facilityAddress: '',
        dateOfService: '',
        referralType: '',
        dateOfIllness: '',
        primaryDiagnosis: '',
        diagnosisCode: '',
        typeOfVisit: '',
        symptomsDescription: '',
        treatmentProvided: '',
        workRelated: '',
        autoAccidentRelated: '',
        expenseItems: [],
        totalClaimAmount: 0,
        insuranceCompanyName: '',
        sumInsured: '',
      });
      setActiveStep(0); // Ensure stepper starts at the first step for new claims
    }
  }, [claimId, setForm]);

  const steps = [
    { label: "Form I", icon: <HomeIcon className="w-5 h-5" /> },
    { label: "Form II", icon: <UserIcon className="w-5 h-5" /> },
    { label: "Form III", icon: <CogIcon className="w-5 h-5" /> },
    { label: "Form IV", icon: <DocumentTextIcon className="w-5 h-5" /> },
    { label: "Form V", icon: <CheckCircleIcon className="w-5 h-5" /> },
  ];

  const isLast = activeStep === steps.length - 1;
  const isFirst = activeStep === 0;

  const handleNext = () => {
    if (!isLast) setActiveStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirst) setActiveStep((prev) => prev - 1);
  };

  const renderActiveForm = () => {
    if (isLoading && claimId) {
      return <div className="text-center p-10">Loading claim details...</div>;
    }
    switch (activeStep) {
      case 0:
        return <PersonInformationForm goToNext={handleNext}  goToPrev={handlePrev} isFirst={isFirst} />;
      case 1:
        return <HealthCareForm goToNext={handleNext}  goToPrev={handlePrev} />;
      case 2:
        return <MedicalProviderForm goToNext={handleNext}  goToPrev={handlePrev} />;
      case 3:
        return <ClaimFourthForm goToNext={handleNext}  goToPrev={handlePrev} />;
      case 4:
        return <ReviewForm goToNext={handleNext}  goToPrev={handlePrev} />;
      default:
        return <div>Step not found</div>;
    }
  };
  // const navigate = useNavigate(); // Already defined above
    const redirectToLogin = () => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (!document.cookie.includes('token')) {
        navigate('/login'); // Redirect to login if no token found
      }
    };

    const redirectToDashboard = () => navigate('/dashboard');

  return (
    <div className="flex h-screen font-sans bg-slate-100">
      <aside className="w-64 bg-slate-100 text-slate-700 flex flex-col p-6 shadow-[8px_0px_16px_#cbd5e1] z-10">
        <h1 className="text-3xl font-bold mb-12 text-cyan-700">Insurance</h1>
        <nav className="flex flex-col gap-4">
          <button 
            className="bg-slate-100 text-slate-700 hover:text-cyan-600 px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            onClick={redirectToDashboard}
          >
            Dashboard
          </button>
          <button 
            className="bg-slate-100 text-cyan-600 font-semibold px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            // onClick={navigateToNewClaimStepper} // Assuming this should navigate to the stepper itself or a new claim
          >
            Submit Claim
          </button>
          <button 
            className="bg-slate-100 text-slate-700 hover:text-cyan-600 px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            onClick={redirectToLogin}
          >
            Logout
          </button>
        </nav>
      </aside>
      {/* Main content area for stepper, takes remaining space and handles scrolling */}
      <main className="flex-1 p-8 overflow-y-auto bg-slate-100"> {/* Use p-8 for padding, adjust as needed */}
        <div className="max-w-4xl mx-auto bg-slate-100 p-6 rounded-2xl shadow-[8px_8px_16px_#cbd5e1,_-8px_-8px_16px_#ffffff]"> {/* Centers the stepper content & applies Neumorphic card style */}
          {/* Stepper Icons */}
          <div className="flex items-center justify-between w-full relative">
            
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Step circle with icon */}
                <div // Neumorphic step circle
                  onClick={() => setActiveStep(idx)}
                  className={`
                    z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                    transition-all duration-300 ease-in-out
                    ${
                      activeStep === idx // Active step
                        ? "bg-slate-100 text-cyan-600 shadow-[inset_5px_5px_10px_#cbd5e1,_inset_-5px_-5px_10px_#ffffff]" 
                        : activeStep > idx // Completed step
                        ? "bg-green-500 text-white shadow-[5px_5px_10px_#b0e0b0,_-5px_-5px_10px_#d0ffd0]" // Softer green shadow
                        : "bg-slate-200 text-slate-500 shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff]" // Inactive step
                    }
                  `}
                >
                  {step.icon}
                </div>

                {/* Line between steps */}
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      activeStep > idx ? "bg-green-400" : "bg-slate-300" // Softer line colors
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          {/*Render the active form component*/}
          <div className="mt-5 mb-5">{renderActiveForm()}</div>

          {/* Navigation */}
          <div className={`mt-10 flex ${isFirst ? 'justify-end' : 'justify-between'}`}>
            {!isFirst && (
              <Button
                onClick={handlePrev}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
              >
                Prev
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="px-8 py-3 bg-slate-100 text-cyan-600 font-semibold rounded-xl shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] active:text-cyan-700 transition-all duration-150 ease-in-out"
              disabled={isLast}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>

  );
}
