import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import BigMenu from "@/components/Big-menu";
import Carousel from "@/components/Carousel";

const dataSource = ['./landing-carousel-1.jpg', './landing-carousel-2.jpg'];

export default function HomePage() {
  return (
    <>
      <motion.main
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <div className="main-container flex max-h-[calc(100vh-64px)] items-center overflow-hidden object-cover">
          <div className="relative max-h-[calc(100vh-64px)]">
            <Carousel dataSource={dataSource} />
          </div>
        </div>
        <BigMenu />
      </motion.main>
      <Footer isFixed={false} />
    </>
  )
}
