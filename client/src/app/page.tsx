'use client';

import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center px-4 h-screen">
        <div className="max-w-4xl mx-auto mt-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight font-['Gabarito']">
            L&apos;allié des visionnaires pour accélérer votre marque
            et se tourner vers l&apos;avenir
          </h1>
          <p className="gradient-text uppercase tracking-wider text-sm mt-8">
             APPROUVÉ PAR LES STARTUPS ET LES ENTREPRISES SOUTENUES PAR
          </p>
          
          <motion.div 
            className="flex justify-center items-center gap-12 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.1,
                filter: "brightness(1.2)",
                transition: { duration: 0.2 }
              }}
              className="cursor-pointer"
            >
              <Image 
                src="/google.png" 
                alt="Google" 
                width={120} 
                height={40} 
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </motion.div>

            <motion.div
              whileHover={{ 
                scale: 1.1,
                filter: "brightness(1.2)",
                transition: { duration: 0.2 }
              }}
              className="cursor-pointer"
            >
              <Image 
                src="/amplify.png" 
                alt="Amplify" 
                width={120} 
                height={40} 
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </motion.div>

            <motion.div
              whileHover={{ 
                scale: 1.1,
                filter: "brightness(1.2)",
                transition: { duration: 0.2 }
              }}
              className="cursor-pointer"
            >
              <Image 
                src="/vercel.png" 
                alt="Vercel" 
                width={120} 
                height={40} 
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
