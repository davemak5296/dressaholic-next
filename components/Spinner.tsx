type SpinnerProps = {
  sm?: boolean;
};

const Spinner = ({ sm }: SpinnerProps) => {
  return (
    <div
      className={`${
        sm ? 'pt-[5%]' : 'pt-[15%]'
      } absolute top-0 bottom-0 right-0 left-0 z-50 flex justify-center bg-white/80`}
    >
      <div
        className={`${
          sm ? 'h-[30px] w-[30px]' : 'h-[100px] w-[100px]'
        } inline-block animate-spin rounded-[50%] border-4 border-solid border-[#c3c3c3] border-t-[#636767]`}
      ></div>
    </div>
  );
};

export default Spinner;
