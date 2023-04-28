import { useRouter } from "next/router";
import Link from "next/link";

const BigMenu = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex xl:container">
      <div className="group relative w-1/2">
        <div
          onClick={() => router.push('/shop/men')}
          className="absolute top-0 right-0 left-0 bottom-0 hidden cursor-pointer items-center justify-center bg-black/50 group-hover:flex"
        >
          <h1 className="text-center text-2xl text-white drop-shadow-lg sm:text-4xl md:text-6xl xl:text-8xl">
            <Link href="/news">For men</Link>
          </h1>
        </div>
        <img className="h-full" src="./for-men.jpg" alt="" />
      </div>
      <div className="group relative w-1/2">
        <div
          onClick={() => router.push('/shop/women')}
          className="absolute top-0 right-0 left-0 bottom-0 hidden cursor-pointer items-center justify-center bg-black/50 group-hover:flex"
        >
          <h1 className="text-center text-2xl text-white drop-shadow-lg sm:text-4xl md:text-6xl xl:text-8xl">
            <Link href="/shop/men">For Women</Link>
          </h1>
        </div>
        <img className="h-full" src="./for-women.jpg" alt="" />
      </div>
    </div>
  )
}

export default BigMenu;