import { useRouter } from "next/router";
import Link from "next/link";

const BigMenu = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex xl:container">
      <div className="group relative w-1/2 max-h-[50vh]">
        <div
          onClick={() => router.push('/shop/men')}
          className="absolute top-0 right-0 left-0 bottom-0 hidden cursor-pointer items-center justify-center bg-black/50 group-hover:flex"
        >
          <h1 className="text-center text-2xl text-white drop-shadow-lg sm:text-4xl md:text-6xl xl:text-8xl">
            For men
          </h1>
        </div>
        <img
          onClick={() => router.push('/shop/men')}
          onKeyDown={ e => e.key === 'Enter' && router.push('/shop/men')}
          className="h-full max-w-full" src="./for-men.jpg" alt="for men" role="link" tabIndex={0}/>
      </div>
      <div className="group relative w-1/2 max-h-[50vh]">
        <div
          onClick={() => router.push('/shop/women')}
          className="absolute top-0 right-0 left-0 bottom-0 hidden cursor-pointer items-center justify-center bg-black/50 group-hover:flex"
        >
          <h1 className="text-center text-2xl text-white drop-shadow-lg sm:text-4xl md:text-6xl xl:text-8xl">
            For Women
          </h1>
        </div>
        <img 
          onClick={() => router.push('/shop/women')}
          onKeyDown={ e => e.key === 'Enter' && router.push('/shop/women')}
          className="h-full max-w-full" src="./for-women.jpg" alt="for women" role="link" tabIndex={0}/>
      </div>
    </div>
  )
}

export default BigMenu;