import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const HomePageSkeleton: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Skeleton */}
      <div className="text-center py-16 md:py-20">
        <SkeletonLoader className="w-32 h-32 rounded-full mx-auto mb-6" />
        <SkeletonLoader className="h-10 md:h-14 w-3/4 mx-auto mb-6" />
        <SkeletonLoader className="h-5 w-full max-w-3xl mx-auto mb-2" />
        <SkeletonLoader className="h-5 w-2/3 max-w-3xl mx-auto mb-8" />
        
        <div className="max-w-2xl mx-auto bg-card shadow-lg rounded-lg p-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <SkeletonLoader className="h-12 w-full" />
            <SkeletonLoader className="h-12 w-48 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* About Me Skeleton */}
      <div className="py-16 md:py-24 bg-card/20 border-y border-card/50 mt-16 opacity-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            <div className="md:col-span-1 flex justify-center">
              <SkeletonLoader className="w-48 h-48 md:w-full md:h-64 rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <SkeletonLoader className="h-8 w-3/4 mb-6" />
              <SkeletonLoader className="h-4 w-full mb-2" />
              <SkeletonLoader className="h-4 w-full mb-2" />
              <SkeletonLoader className="h-4 w-5/6 mb-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;