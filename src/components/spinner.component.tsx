import * as React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 z-50 flex justify-center bg-white/50 pt-[15%]">
      <div className="inline-block h-[100px] w-[100px] animate-spin rounded-[50%] border-4 border-solid border-[#c3c3c3] border-t-[#636767]"></div>
    </div>
  );
};

export default Spinner;
