import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClaimHistory = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaimHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/fetch/claim-history', {
          withCredentials: true,
        });
        setClaims(response.data.data || []);
      } catch (error) {
        console.error('Error fetching claim history:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClaimHistory();
  }, [navigate]);

  // Neumorphic-friendly status colors, matching Dashboard
  const statusColor = {
    'Approved': 'text-green-600',
    'Rejected': 'text-red-600',
    'Pending': 'text-yellow-600',
  };

  const redirectToDashboard = () => navigate('/dashboard');
  const redirectToNewClaimStepper = () => navigate('/stepper');
  const redirectToLogin = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (!document.cookie.includes('token')) {
      navigate('/login'); // Redirect to login if no token found
    }
  };


  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-100 text-slate-700 flex flex-col p-6 shadow-[8px_0px_16px_#cbd5e1] z-10">
        <h1 className="text-3xl font-bold mb-12 text-cyan-700">GH INSURANCE</h1>
        <nav className="flex flex-col gap-4">
          <button 
            className="flex items-center bg-slate-100 text-slate-700 hover:text-cyan-600 px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            onClick={redirectToDashboard}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 12v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1V9M9 21h6"></path></svg>
            Dashboard
          </button>
          <button 
            className="flex items-center bg-slate-100 text-slate-700 hover:text-cyan-600 px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            onClick={redirectToNewClaimStepper}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Submit Claim
          </button>
          <button 
            className="flex items-center bg-slate-100 text-cyan-600 font-semibold  px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            Claim History
          </button>
          <button 
            className="flex items-center bg-slate-100 text-slate-700 hover:text-cyan-600 px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            onClick={redirectToLogin}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-slate-800">Claim History</h1>
          <div className="flex items-center gap-3 text-slate-700">
            <span className="font-medium">Gurumoorthi</span>
            <div className='w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-lg shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff]'>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
          </div>
        </div>

        {/* Claim History Table */}
        <section className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="p-3 font-bold text-slate-600 uppercase tracking-wider">
                    Policy No
                  </th>
                  <th className="p-3 font-bold text-slate-600 uppercase tracking-wider">
                    Visitor Type
                  </th>
                  <th className="p-3 font-bold text-slate-600 uppercase tracking-wider">
                    Date of Incident
                  </th>
                  <th className="p-3 font-bold text-slate-600 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="p-3 font-bold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  {/* <th className="p-3 font-bold text-slate-600 uppercase tracking-wider">
                    Last Updated
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center text-slate-500 py-6">Loading...</td>
                  </tr>
                ) : claims.length > 0 ? (
                  claims.map((claim) => (
                    <tr key={claim._id} className="bg-slate-100 hover:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] transition-shadow duration-150 ease-in-out rounded-lg">
                      <td className="p-3 rounded-l-lg text-slate-700 whitespace-nowrap">
                        {claim.policyNumber || 'N/A'}
                      </td>
                      <td className="p-3 text-slate-700 whitespace-nowrap">
                        {claim.title ? claim.title.toUpperCase() : 'N/A'}
                      </td>
                      <td className="p-3 text-slate-700 whitespace-nowrap">
                        {claim.dateOfIncident
                          ? new Date(claim.dateOfIncident).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="p-3 text-slate-700 whitespace-nowrap">
                        {new Date(claim.dateSubmitted).toLocaleDateString()}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-3 py-1 text-sm font-medium rounded-md ${statusColor[claim.status] || "text-slate-600"}`}>
                          {claim.status}
                        </span>
                      </td>
                      {/* <td className="p-3 rounded-r-lg text-slate-700 whitespace-nowrap">
                        {`Updated on ${new Date(claim.lastUpdated).toLocaleDateString()}`}
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-slate-500 py-6">No claim history available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClaimHistory;