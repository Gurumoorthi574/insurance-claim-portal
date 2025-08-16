import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState({
    id: null, // To store the ID of an existing claim being edited
    // Form 1: Personal & Policy Details
    policyNumber: '',
    firstName: '',    
    lastName: '',             
    address: '',     
    phoneNumber: '',        
    dateOfBirth: '',
    relationshipToPatient: '',
    emailAddress: '',

    // Form 2: Medical Provider Information
    providerName: '',
    providerType: '',
    providerId: '',
    facilityName: '', 
    facilityAddress: '',
    dateOfService: '',
    referralType: '',

    // Form 3: Treatment Details
    dateOfIllness: '',
    primaryDiagnosis: '',
    diagnosisCode: '',
    typeOfVisit: '',
    symptomsDescription: '', 
    treatmentProvided: '',   
    workRelated: '',         
    autoAccidentRelated: '', 

    // Form 4: Medical Expenses
    expenseItems: [], 
    totalClaimAmount: 0,
    uploadedDocumentPaths: [],
    remark: '',
  });

  // Save form data to backend using axios
  const saveData = async (data = form) => {
    const response = await axios.post('http://localhost:3000/api/saveData', data, {
      withCredentials: true,
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