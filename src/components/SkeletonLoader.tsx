'use client';

interface SkeletonLoaderProps {
  className?: string;
}

export function SkeletonLoader({ className = '' }: SkeletonLoaderProps) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
  );
}

export function NetworkGraphSkeleton() {
  return (
    <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        <p className="text-gray-600 dark:text-gray-400">Building network graph...</p>
      </div>
    </div>
  );
}

const skeletonItems = [1, 2, 3];

export function ResultsSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonLoader className="h-8 w-3/4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skeletonItems.map(i => (
          <div key={i} className="p-4 border rounded-lg">
            <SkeletonLoader className="h-6 w-1/2 mb-2" />
            <SkeletonLoader className="h-4 w-full mb-1" />
            <SkeletonLoader className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}