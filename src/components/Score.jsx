import React from "react";

function Score({ score }) {
  return (
    <div className=" h-full w-full text-white flex justify-center items-center">
      <p className="text-slate-300 text-2xl font-medium">Points: {score}</p>
    </div>
  );
}

export default Score;
