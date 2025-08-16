import { useEffect } from 'react';
import { useFormContext } from '../FormContext';

function PersonInformationForm() {
  const { form, setForm } = useFormContext();
  const type = localStorage.getItem('U_type');
  const userEmail = localStorage.getItem('U_email');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (type === 'user' && userEmail && form.emailAddress !== userEmail) {
      setForm(prevForm => ({ ...prevForm, emailAddress: userEmail }));
    }
  }, [type, userEmail, form.emailAddress, setForm]);
  
  return (
    <>
      <section className="flex-1 bg-slate-100 p-4 md:p-8">
        <main className="bg-slate-100 rounded-2xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
          <p className="text-slate-600 mb-4">
            Please provide your personal details and policy information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {type === 'admin' && (
              <label className="block">
              Policy No:
              <input
                name="policyNumber"
                value={form.policyNumber}
                onChange={handleChange}
                placeholder="H-12354860789"
                className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
              />
            </label>)}
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
              Date of Birth
              <input
                type="date"
                name="dateOfBirth"
                // Format date to YYYY-MM-DD for the input field
                value={form.dateOfBirth ? new Date(form.dateOfBirth).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
              />
            </label>
          </div>
          <label className="block">
            Address*:
            <input
              type="text"
              name="address"
              value={form.address || ''}
              onChange={handleChange}
              placeholder="Enter your full address"
              className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
            />
          </label>
          {type === 'admin' && (
            <label className="block">
              Email Address*:
              <input
                type="email"
                name="emailAddress"
                value={form.emailAddress || ''}
                onChange={handleChange}
                placeholder="Enter user's email"
                className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
              />
            </label>
          )}

          <label className="block">
            Phone Number*:
            <input
              type="number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="+91 1234567890"
              className="block w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] mt-[0.625rem]"
            />
          </label>

          <label className="block">
            Relationship to Patient*:
            <select
              name="relationshipToPatient"
              value={form.relationshipToPatient || ''}
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