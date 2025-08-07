import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function Dashboard() {
  let endpoint = 'http://localhost:3000/api/fetch/dashboard';
  const [count, setCount] = React.useState({
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
  });
  const [dasboardData, setDasboardData] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  axios.get(endpoint, {
    withCredentials: true,
  })
  .then(response => {
    const responseData = response.data;
    setDasboardData(responseData.data || []);
    setCount({
      pendingCount: responseData.pendingCount || 0,
      approvedCount: responseData.approvedCount || 0,
      rejectedCount: responseData.rejectedCount || 0,
    });
  })
  .catch(error => {
    if (error.response?.status === 401) {
      // Token is invalid or expired. Clear cookie and redirect to login.
      // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate('/login', { state: { error: 'Your session has expired. Please log in again.' } });
    }
  });
  }, [navigate]);
  const statusColor = {
    Pending: "text-yellow-600",
    Approved: "text-green-600",
    Rejected: "text-red-600",
    Recieved: "text-orange-600", // Typo mapped, now using text color
  };

  const redirectToLogin = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (!document.cookie.includes('token')) {
      navigate('/login'); // Redirect to login if no token found
    }
  };
  const redirectToDashboard = () => navigate('/dashboard');
  const navigateToNewClaimStepper = () => navigate('/stepper'); // For new claims
  const navigateToClaimHistory = () => navigate('/history'); // For claim history

  return (
    <div className="flex h-screen font-sans bg-slate-100">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="w-64 bg-slate-100 text-slate-700 flex flex-col p-6 shadow-[8px_0px_16px_#cbd5e1] z-10">
        <h1 className="text-3xl font-bold mb-12 text-cyan-700">GH INSURANCE</h1>
        <nav className="flex flex-col gap-4">
          <button 
            className="flex items-center bg-slate-100 text-cyan-600 font-semibold px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            onClick={redirectToDashboard}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 12v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1V9M9 21h6"></path></svg>
            Dashboard
          </button>
          <button 
            className="flex items-center bg-slate-100 text-slate-700 hover:text-cyan-600 px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            onClick={navigateToNewClaimStepper}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Submit Claim
          </button>
          <button 
            className="flex items-center bg-slate-100 text-slate-700 hover:text-cyan-600 px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            onClick={navigateToClaimHistory}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            Claim History
          </button>
          <button 
            className="flex items-centerbg-slate-100 text-slate-700 hover:text-cyan-600 px-4 py-3 rounded-xl text-left shadow-[5px_5px_10px_#cbd5e1,_-5px_-5px_10px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out"
            onClick={redirectToLogin}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-slate-100 p-10 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
            <h2 className='text-3xl font-semibold text-slate-800'>Welcome Gurumoorthi</h2>
            <div className='flex items-center gap-3 text-slate-700'>
                <span className="font-medium">Gurumoorthi</span>
                <div className='w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-lg shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff]'>👤</div>
            </div>
        </div>

        {/* Status Cards */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-slate-100 p-6 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] flex items-start">
            <div className="text-5xl font-bold text-yellow-500 ">{count.pendingCount}</div>
            <div className='flex flex-col ml-3'>
                <div className="text-2xl font-medium pt-1 text-slate-800">Pending</div>
                <div className="text-sm text-slate-600">Claims</div>
            </div>
          </div>
          <div className="flex-1 bg-slate-100 p-6 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] flex items-start">
            <div className="text-5xl font-bold text-green-500 ">{count.approvedCount}</div>
            <div className='flex flex-col ml-3'>
                <div className="text-2xl font-medium pt-1 text-slate-800">Approved</div>
                <div className="text-sm text-slate-600">Claims</div>
            </div>
          </div>
          <div className="flex-1 bg-slate-100 p-6 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] flex items-start">
            <div className="text-5xl font-bold text-red-500 ">{count.rejectedCount}</div>
            <div className='flex flex-col ml-3'>
                <div className="text-2xl font-medium pt-1 text-slate-800">Rejected</div>
                <div className="text-sm text-slate-600">Claims</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <section className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-slate-800">My Claims</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  {/* Updated Headers */}
                  <th className="p-3 font-bold text-slate-600">Policy No</th>
                  <th className="p-3 font-bold text-slate-600">Name</th>
                  <th className="p-3 font-bold text-slate-600">Status</th>
                  <th className="p-3 font-bold text-slate-600">Amount</th>
                  <th className="p-3 font-bold text-slate-600 text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {dasboardData && dasboardData.length > 0 ? (
                  dasboardData.map((claim, idx) => (
                    <tr key={claim.id || idx} className="bg-slate-100 hover:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] transition-shadow duration-150 ease-in-out rounded-lg">
                      {/* Updated Data Mapping */}
                      <td className="p-3 rounded-l-lg text-slate-700">{claim.policyNumber || 'N/A'}</td>
                      <td className="p-3 text-slate-700">{`${claim.firstName || ''} ${claim.lastName || ''}`.trim() || 'N/A'}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-md ${statusColor[claim.status] || "text-slate-600"}`}
                        >
                          {claim.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-700">{typeof claim.totalClaimAmount === 'number' ? `$${claim.totalClaimAmount.toFixed(2)}` : (claim.amount ? `$${parseFloat(claim.amount).toFixed(2)}` : 'N/A')}</td>
                      <td className="p-3 rounded-r-lg text-center">
                        <button
                          className="bg-slate-100 text-cyan-600 font-medium px-4 py-2 rounded-lg shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] hover:shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_3px_3px_6px_#cbd5e1,_inset_-3px_-3px_6px_#ffffff] transition-all duration-150 ease-in-out"
                        >
                          View
                        </button>
                        {/* -To Do */}
                        {/* <button
                          className="bg-slate-100 text-cyan-600 font-medium px-4 py-2 rounded-lg shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] hover:shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_3px_3px_6px_#cbd5e1,_inset_-3px_-3px_6px_#ffffff] transition-all duration-150 ease-in-out"
                          onClick={() => navigate(`/stepper/${claim.policyNumber}`)}
                        >
                          View
                        </button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-slate-500 py-6">No claims found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard