import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../FormContext';

function MedicalProviderForm({goToNext,goToPrev}) {
    const { form, setForm, saveData } = useFormContext();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFormNext = async () => {
        try {
            //await saveData(form); // Save current form data
            goToNext(); // Move to the next form step/component
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    const navigate = useNavigate();
    const redirectToLogin = () => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (!document.cookie.includes('token')) {
        navigate('/login'); // Redirect to login if no token found
      }
    };
    const redirectToDashboard = () => navigate('/dashboard');
    

  return (
     <section className="flex-1 bg-slate-100 p-4 md:p-8">

      <main className="bg-slate-100 rounded-2xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 md:p-8 flex flex-col gap-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Treatment Details</h2>
                <p className="text-slate-600">Details about your illness/injury and treatment</p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <label className="block">
                  Date of illness/injury:
                  <input
                    type="date"
                    name="dateOfIllness"
                    value={form.dateOfIllness || ''}
                    className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                    onChange={handleChange}
                  />
                </label>
                <label className="block">
                  Type of visit:
                  <select
                    name="typeOfVisit"
                    value={form.typeOfVisit || ''}
                    onChange={handleChange}
                    className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                  >
                    <option value="">Select</option>
                    <option value="outpatient">Outpatient</option>
                    <option value="inpatient">Inpatient</option>
                    <option value="emergency">Emergency</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
                <label className="block">
                  Primary Diagnosis:
                  <input
                    type="text"
                    name="primaryDiagnosis"
                    value={form.primaryDiagnosis || ''}
                    className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                    onChange={handleChange}
                    placeholder="Enter primary diagnosis"
                  />
                </label>
                <label className="block">
                  Diagnosis Code:
                  <input
                    type="text"
                    name="diagnosisCode"
                    value={form.diagnosisCode || ''}
                    className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                    onChange={handleChange}
                    placeholder="Enter diagnosis code"
                  />
                </label>
                <label className="block">
                  Symptoms Description:
                  <textarea
                    name="symptomsDescription"
                    value={form.symptomsDescription || ''}
                    className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                    onChange={handleChange}
                    placeholder="Describe symptoms"
                  />
                </label>
                <label className="block">
                  Treatment Provided:
                  <textarea
                    name="treatmentProvided"
                    value={form.treatmentProvided || ''}
                    className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                    onChange={handleChange}
                    placeholder="Describe treatment provided"
                  />
                </label>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <label className="block">
                  Was this work-related?
                  <select
                    name="workRelated"
                    value={form.workRelated || ''}
                    onChange={handleChange}
                    className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
                <label className="block">
                  Was this auto accident-related?
                  <select
                    name="autoAccidentRelated"
                    value={form.autoAccidentRelated || ''}
                    onChange={handleChange}
                    className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
              </div>
      </main>
    </section>
  )
}

export default MedicalProviderForm