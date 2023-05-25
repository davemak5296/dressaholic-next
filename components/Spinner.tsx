type SpinnerProps = {
  sm?: boolean;
};

const Spinner = ({ sm }: SpinnerProps) => {
  let body = document.querySelector('body');
  let scrolH = body?.scrollHeight as number;
  let clientH = window.innerHeight as number;
  let scrolTop = window.scrollY as number;
  
  return (
    <div
      style={{ bottom: `-${scrolH - clientH}px`}}
      className={`${
        sm ? 'pt-[5%]' : 'pt-[15%]'
      } absolute top-0 right-0 left-0 z-50 flex justify-center bg-white/80`}
    >
      <div
        style={{
          top: scrolTop > 0 ? `-${scrolTop}px` : '0px',
          bottom: scrolTop > 0 ? `-${(scrolTop)}px` :  `${scrolH - clientH}px`
        }}
        className={`${
          sm ? 'h-[30px] w-[30px]' : 'h-[100px] w-[100px]'
        } absolute mx-auto my-auto left-0 right-0 inline-block animate-spin rounded-[50%] border-4 border-solid border-[#c3c3c3] border-t-[#636767]`}
      ></div>
    </div>
  );
};

export default Spinner;
