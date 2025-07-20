import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../FormContext'; 
function PersonInformationForm({goToNext, goToPrev, isFirst}) { // Accept isFirst prop
    const { form, setForm, saveData } = useFormContext();

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    try {
      // Data is already updated in FormContext via handleChange.
      // No need to call saveData here for intermediate steps.
      goToNext(); // Call the function passed as a prop
    } catch (error) {
      console.error("Error in handleNext:", error);
    }
  };
   

    const navigate = useNavigate();
    const redirectToLogin = () => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (!document.cookie.includes('token')) {
        navigate('/login'); // Redirect to login if no token found
      }
    };const redirectToDashboard = () => navigate('/dashboard');
    const navigateToSecondForm = () => navigate('/claim-second-form');
    const navigateToThirdForm = () => navigate('/claim-third-form');
    const navigateToFourthForm = () => navigate('/claim-fourth-form');
    const navigateToFifthForm = () => navigate('/claim-fifth-form');
  return (
    <>
      <section className="flex-1 bg-slate-100 p-4 md:p-8">
          <main className="bg-slate-100 rounded-2xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
            <p className="text-slate-600 mb-4">
              Please provide your personal details and policy information
           </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              First Name*:
              <input
                type="text"
                name="firstName"
                value={form.firstName || ''}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
              />
            </label>

            <label className="block">
              Last Name*:
              <input
                type="text"
                name="lastName"
                value={form.lastName || ''}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
              />
            </label>

            <label className="block">
              Policy No:
              <input
                name="policyNumber"
                value={form.policyNumber || ''}
                onChange={handleChange}
                placeholder="H-12354860789"
                className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
              />
            </label>

            <label className="block">
              Date of Birth
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth || ''}
                onChange={handleChange}
                className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
              />
            </label>
          </div>

          <label className="block">
            Email Address*:
            <input
              type="email"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
              placeholder="Enter your email"
              className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
            />
          </label>

          <label className="block">
            Phone Number*:
            <input
              type="number"
              name="phone"
              value={form.phone || ''}
              onChange={handleChange}
              placeholder="+91 1234567890"
              className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
            />
          </label>

          <label className="block">
            Relationship to Patient*:
            <select
              name="relationship"
              value={form.relationship || ''}
              onChange={handleChange}
              className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
            >
              <option value="">Select</option>
              <option value="self">SELF</option>
              <option value="spouse">SPOUSE</option>
              <option value="child">CHILD</option>
              <option value="parent">PARENT</option>
              <option value="sibling">SIBLING</option>
              <option value="other">OTHER</option>
            </select>
          </label>

          {/* Navigation Buttons */}
         
        </main>
      </section>
    </>
    
  );
}

export default PersonInformationForm;