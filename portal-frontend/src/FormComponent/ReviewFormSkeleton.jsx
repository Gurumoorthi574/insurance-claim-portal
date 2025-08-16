import React from 'react';
import { FaUser, FaHospital, FaNotesMedical, FaDollarSign } from 'react-icons/fa';

const ReviewFormSkeleton = () => {
  return (
    <div className="font-sans max-w-4xl mx-auto p-5 md:p-8 bg-slate-100 rounded-2xl shadow-[8px_8px_16px_#cbd5e1,_-8px_-8px_16px_#ffffff] animate-pulse">
      {/* Header Section */}
      <div className="mb-8">
        <div className="h-9 bg-gray-300 rounded-md w-1/2 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded-md w-3/4"></div>
      </div>

      {/* Personal Information Section Skeleton */}
      <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-6">
        <h2 className="flex items-center text-xl font-medium text-slate-700 mb-4">
          <FaUser className="text-cyan-600 mr-3 text-2xl" /> Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded-md w-2/3"></div>
          <div className="h-5 bg-gray-200 rounded-md w-2/3"></div>
        </div>
      </div>

      {/* Provider Information Section Skeleton */}
      <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-6">
        <h2 className="flex items-center text-xl font-medium text-slate-700 mb-4">
          <FaHospital className="text-cyan-600 mr-3 text-2xl" /> Provider Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded-md w-2/3"></div>
          <div className="h-5 bg-gray-200 rounded-md w-2/3"></div>
        </div>
      </div>

      {/* Treatment Details Section Skeleton */}
      <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-6">
        <h2 className="flex items-center text-xl font-medium text-slate-700 mb-4">
          <FaNotesMedical className="text-cyan-600 mr-3 text-2xl" /> Treatment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded-md w-2/3"></div>
        </div>
      </div>

      {/* Expense Summary Section Skeleton */}
      <div className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 mb-6">
        <h2 className="flex items-center text-xl font-medium text-slate-700 mb-4">
          <FaDollarSign className="text-cyan-600 mr-3 text-2xl" /> Expense Summary
        </h2>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
        </div>
      </div>

      {/* Navigation Buttons Skeleton */}
      <div className="flex justify-between items-center mt-8">
        <div className="h-12 w-28 bg-gray-200 rounded-xl"></div>
        <div className="h-12 w-36 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export default ReviewFormSkeleton;