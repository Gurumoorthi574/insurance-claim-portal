import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../FormContext'; 

function HealthCareForm({goToNext, goToPrev}) {
    const { form, setForm, saveData } = useFormContext(); // Access form context

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }));
    };

    const handleFormNext = async () => {
      try {
       goToNext(); // Move to the next form step/component
      } catch (error) {
        console.error(error);
      }
    };

    const navigate = useNavigate();
    const redirectToLogin = () => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (!document.cookie.includes('token')) {
        navigate('/login'); // Redirect to login if no token found
      }
    };
    //  const redirectToDashboard = () => navigate('/dashboard');
    // const navigateToSecondForm = () => navigate('/claim-second-form');
    // const navigateToThirdForm = () => navigate('/claim-third-form');
    // const navigateToFourthForm = () => navigate('/claim-fourth-form');
    // const navigateToFifthForm = () => navigate('/claim-fifth-form');

  return (
    <section className="flex-1 bg-slate-100 p-4 md:p-8">
      <main className="bg-slate-100 rounded-2xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 md:p-8 flex flex-col gap-6">
         <div className="mb-1">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Medical Provider Information</h2>
          <p className="text-slate-600">Details about your healthcare provider and visit</p>
          </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
            <label className="block">
                Healthcare Provider Name
                <input
                  type="text"
                  name="providerName"
                  value={form.providerName || ''}
                  placeholder='Dr. Sarah Johnson, MD'
                  className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                  onChange={handleChange}
                />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
               Provider Type
                <select
                    name="providerType"
                    className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                    value={form.providerType || ''}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="physician">Primary care Physician</option>
                    <option value="specialist">Specialist</option>
                    <option value="hospitalcare">Urgent Care</option>
                    <option value="emergencycare">Emergency Room</option>
                    <option value="lab">Laboratry</option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
            </label>
            <label className="block">
                Provider ID/NPI
                <input
                  name="providerId"
                  value={form.providerId || ''}
                  className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                  onChange={handleChange}
                ></input>
            </label>
          </div>
            <label className="block">
                Facllity/Clinic Name
                <input
                  type="text"
                  name="facilityName" // Corrected typo: facllityName -> facilityName
                  value={form.facilityName || ''} // Corrected typo: facllityName -> facilityName
                  className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                  onChange={handleChange}
                />
            </label>
            <label className="block">
                Address
                <input
                 type="text"
                 name="facilityAddress"
                 value={form.facilityAddress || ''}
                 className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                 onChange={handleChange}
                />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                Date of Service
                <input
                  type="date"
                  name="dateOfService"
                  value={form.dateOfService || ''}
                  className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                  onChange={handleChange}
                />
            </label>
            <label className="block">
                Referral Type
                <select
                 name="referralType"
                 className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
                 value={form.referralType || ''}
                 onChange={handleChange}
                >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
            </label>
            </div>
            
      </main>
    </section>
  )
}

export default HealthCareForm