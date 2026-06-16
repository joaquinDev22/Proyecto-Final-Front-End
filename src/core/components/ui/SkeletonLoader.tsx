import React from 'react';

type SkeletonLoaderProps = {
  className?: string;
};

export default function SkeletonLoader({ className = '' }: SkeletonLoaderProps) {
  return (
    <div className={`animate-pulse bg-slate-800 rounded-md ${className}`}></div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 mb-4">
      <div className="flex gap-4">
        <SkeletonLoader className="w-16 h-16 rounded-xl shrink-0" />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <SkeletonLoader className="h-6 w-48 mb-2" />
              <SkeletonLoader className="h-4 w-32" />
            </div>
            <SkeletonLoader className="h-8 w-24 rounded-lg" />
          </div>
          <div className="flex gap-2 mt-4">
            <SkeletonLoader className="h-6 w-20 rounded-full" />
            <SkeletonLoader className="h-6 w-24 rounded-full" />
            <SkeletonLoader className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
