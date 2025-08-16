import React from 'react';

const DashboardSkeleton = () => {
  return (
    <>
      {/* Header Skeleton */}
      <div className='flex justify-between items-center mb-8'>
        <div className='h-9 bg-gray-300 rounded-md w-1/3 animate-pulse'></div>
        <div className='flex items-center gap-3'>
          <div className='text-right'>
            <div className='h-5 bg-gray-300 rounded-md w-48 mb-2 animate-pulse'></div>
            <div className='h-3 bg-gray-300 rounded-md w-32 animate-pulse'></div>
          </div>
          <div className='w-10 h-10 rounded-full bg-gray-300 animate-pulse'></div>
        </div>
      </div>

      {/* Status Cards Skeleton */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-gray-200 h-24 rounded-xl animate-pulse"></div>
        <div className="flex-1 bg-gray-200 h-24 rounded-xl animate-pulse"></div>
        <div className="flex-1 bg-gray-200 h-24 rounded-xl animate-pulse"></div>
      </div>

      {/* Table Skeleton */}
      <section className="bg-slate-100 rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] p-6 flex flex-col">
        <div className="h-7 bg-gray-300 rounded-md w-1/4 mb-6 animate-pulse"></div>
        <div className="overflow-x-auto">
          <div className="min-w-full text-left border-separate border-spacing-y-2">
            {/* Table Header Skeleton */}
            <div className="flex justify-between p-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-300 rounded-md w-1/6 animate-pulse"></div>
              ))}
            </div>
            {/* Table Body Skeleton */}
            <div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-14 my-2 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardSkeleton;