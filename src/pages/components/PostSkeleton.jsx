import React from "react";
import './PostSkeleton.css'

function PostSkeleton() {
  return (
    <div className="flex w-[300px] h-[300px] flex-col gap-1">
      <div className="skeleton flex w-auto flex-1 items-center justify-center gap-2 px-2">
        <div className="square h-10 w-10 rounded-full"></div>
        <div className="flex-1">
          <div className="line h-2 w-20"></div>
          <div className="line h-2 w-28"></div>
          <div className="line h-2"></div>
        </div>
      </div>
      <div className="skeleton flex items-center justify-center px-3">
        <div className="line h-32 w-32 rounded-lg"></div>
      </div>
      <div className="skeleton flex justify-between px-3">
        <div className="line h-4 w-4"></div>
        <div className="line h-4 w-12"></div>
      </div>
    </div>
  );
}

export default PostSkeleton;
