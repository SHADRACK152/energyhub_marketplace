import React from 'react';

const LoadingSkeleton = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-square bg-muted"></div>
          <div className="p-4 space-y-3">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 })?.map((_, i) => (
                <div key={i} className="w-3 h-3 bg-muted rounded"></div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="h-5 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-12"></div>
            </div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;