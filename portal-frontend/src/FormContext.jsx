import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState({
    id: null, // To store the ID of an existing claim being edited
    // Form 1: Personal & Policy Details
    policyNumber: '', // Retained
    firstName: '',    // Aligned with backend expectation (e.g., ClaimForm.jsx)
    lastName: '',     // Aligned with backend expectation
    email: '',        // Aligned with backend expectation
    phone: '',        // Aligned with backend expectation
    address: '',      // Retained, assuming it's collected in Form 1 or elsewhere
    dateOfBirth: '',  // Retained
    relationship: '', // Retained (Relationship to Patient)

    // Form 2: Medical Provider Information
    providerName: '',
    providerType: '',
    providerId: '',
    facilityName: '', // Corrected from potential 'facllityName'
    facilityAddress: '',
    dateOfService: '',
    referralType: '',

    // Form 3: Treatment Details
    dateOfIllness: '',
    primaryDiagnosis: '',
    diagnosisCode: '',
    typeOfVisit: '',
    symptomsDescription: '', // Added from ClaimThirdForm
    treatmentProvided: '',   // Added from ClaimThirdForm
    workRelated: '',         // Added from ClaimThirdForm
    autoAccidentRelated: '', // Added from ClaimThirdForm

    // Form 4: Medical Expenses
    expenseItems: [], // Array for multiple expense entries
    totalClaimAmount: 0,
    uploadedDocumentPaths: [], // Optional: For storing paths of uploaded files

    // Additional/Legacy fields (review if still needed or map to new fields)
    // uhid: '', // Review if needed, not in new schema
    // coveredByOtherInsurance: '', // Review if needed
    // insuranceCompanyName: '', // Was companyName, maps to schema
    // sumInsured: '',           // Retained
    // claimTitle: '', // Retained, maps to schema
    // claimantName: '', // Covered by firstname/lastname or claimantFirstName/LastName
    // gender: '', // Covered by claimantGender
    // occupation: '', // Covered by claimantOccupation
    // hospitalName: '', // Covered by facilityName
    // hospitalizationDueTo: '', // Retained
    // dateOfIncident: '', // Retained, distinct from dateOfIllness
    // dateOfAdmission: '', // Retained
    // dateOfDischarge: '', // Retained
    // injuryCause: '', // Retained
    // reportedToPolice: '', // Retained
    // mlcFirAttached: '' // Retained
  });

  // Save form data to backend using axios
  const saveData = async (data = form) => {
    const response = await axios.post('http://localhost:3000/api/saveData', data, {
      withCredentials: true, // This line is crucial for sending cookies
    });
    return response.data;
  };

  return (
    <FormContext.Provider value={{ form, setForm, saveData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;