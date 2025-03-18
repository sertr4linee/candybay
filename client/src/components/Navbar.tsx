'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleBackground from './ParticleBackground'
import GetStartedForm from './GetStartedForm'

export default function Navbar() {
  const [isHovering, setIsHovering] = useState(false);
  const [isLogoHovering, setIsLogoHovering] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fermer la modale avec Echap
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Variants pour les animations de la modale - plus fluides
  const modalVariants = {
    hidden: { 
      x: "-100%", 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "tween", 
        ease: "easeOut", 
        duration: 0.6
      }
    },
    exit: { 
      x: "-100%", 
      opacity: 0,
      transition: { 
        ease: "easeInOut", 
        duration: 0.5 
      }
    }
  };

  // Animation plus douce pour le fond
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  // Animation pour les éléments du contenu de la modale
  // const contentVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: (custom: number) => ({
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       delay: custom * 0.1,
  //       duration: 0.5,
  //       ease: "easeOut"
  //     }
  //   }),
  //   exit: (custom: number) => ({
  //     opacity: 0,
  //     y: 20,
  //     transition: {
  //       delay: 0.05 * custom,
  //       duration: 0.3
  //     }
  //   })
  // };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 bg-[#080808] border-b border-[#1a1717] py-4 sm:py-6 md:py-8 font-['Gabarito',_sans-serif]">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo - aligné à gauche */}
          <div 
            className="flex items-center cursor-pointer"
            onMouseEnter={() => setIsLogoHovering(true)}
            onMouseLeave={() => setIsLogoHovering(false)}
          >
            <motion.div
              initial={{ y: 0, rotate: 0 }}
              animate={{
                y: isLogoHovering ? [0, -5, 0] : 0,
                rotate: isLogoHovering ? [0, -2, 2, -1, 1, 0] : 0,
                filter: isLogoHovering ? "hue-rotate(45deg) brightness(1.2)" : "brightness(1)"
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut"
              }}
            >
              <Image src="/icon.svg" alt="Logo" width={150} height={150} className="w-24 sm:w-32 md:w-40" />
            </motion.div>
          </div>

          {/* Navigation - visible uniquement en desktop */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link 
              href="#work" 
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold hover:text-[#FFB5E8] transition-colors duration-300 ${
                hoveredLink === 'work' ? 'text-white' : 'text-[#828282]'
              }`}
              onMouseEnter={() => setHoveredLink('work')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Work
            </Link>
            <Link 
              href="#process" 
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold hover:text-[#AEC6CF] transition-colors duration-300 ${
                hoveredLink === 'process' ? 'text-white' : 'text-[#828282]'
              }`}
              onMouseEnter={() => setHoveredLink('process')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Process
            </Link>
            <Link 
              href="#services" 
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold hover:text-[#B5EAD7] transition-colors duration-300 ${
                hoveredLink === 'services' ? 'text-white' : 'text-[#828282]'
              }`}
              onMouseEnter={() => setHoveredLink('services')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Services
            </Link>
            <Link 
              href="#about" 
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold hover:text-[#C7CEEA] transition-colors duration-300 ${
                hoveredLink === 'about' ? 'text-white' : 'text-[#828282]'
              }`}
              onMouseEnter={() => setHoveredLink('about')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              About
            </Link>
            <Link 
              href="#contact" 
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold hover:text-[#FFDAC1] transition-colors duration-300 ${
                hoveredLink === 'contact' ? 'text-white' : 'text-[#828282]'
              }`}
              onMouseEnter={() => setHoveredLink('contact')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Contact
            </Link>
          </nav>

          {/* Bouton START - aligné à droite */}
          <button 
            className="bg-white text-black font-black py-1.5 px-3 sm:py-2 sm:px-4 rounded-2xl flex items-center transition-colors text-sm md:text-lg"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => setIsModalOpen(true)}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: isHovering ? [0, -10, 10, -5, 5, 0] : 0,
                scale: isHovering ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                duration: 0.6,
                ease: "easeInOut"
              }}
              className="mr-1 sm:mr-2"
            >
              <Image 
                src="/wandd.svg" 
                alt="Magic Wand" 
                width={20} 
                height={20} 
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 invert-0" 
              />
            </motion.div>
            START
          </button>
        </div>
      </header>

      {/* Modale avec animation plus fluide et fond de particules */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <>
            {/* Fond sombre */}
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-80 z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* Contenu de la modale */}
            <motion.div 
              className="fixed inset-0 bg-[#000000] z-50 shadow-2xl flex overflow-hidden font-['Gabarito',_sans-serif]"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Fond avec particules */}
              <div className="absolute inset-0 z-0">
                <ParticleBackground />
              </div>

              {/* Section gauche avec les liens */}
              <div className="w-1/2 h-full flex flex-col p-20 relative z-10">
                <motion.div
                  className="space-y-4 mt-20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.h2 
                    className="text-[100px] font-black text-[#333333] leading-[0.9] cursor-pointer"
                    whileHover={{ 
                      color: '#FFB5E8',
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    WORK
                  </motion.h2>
                  <motion.h2 
                    className="text-[100px] font-black text-[#333333] leading-[0.9] cursor-pointer"
                    whileHover={{ 
                      color: '#C7CEEA',
                      scale: 1.02, 
                      transition: { duration: 0.3 }
                    }}
                  >
                    PROCESS
                  </motion.h2>
                  <motion.h2 
                    className="text-[100px] font-black text-[#333333] leading-[0.9] cursor-pointer"
                    whileHover={{ 
                      color: '#B5EAD7',
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    SERVICES
                  </motion.h2>
                  <motion.h2 
                    className="text-[100px] font-black text-[#333333] leading-[0.9] cursor-pointer"
                    whileHover={{ 
                      color: '#FFDAC1',
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    ABOUT
                  </motion.h2>
                </motion.div>

                {/* Adresses en bas */}
                <div className="absolute bottom-20 left-20 text-[#666666] flex space-x-12">
                  <div>
                    <h3 className="font-bold text-extrabold mb-2 text-white">Nice</h3>
                    <p className="text-sm opacity-60">131 bd rené cassin</p>
                    <p className="text-sm opacity-60">Alpes-Maritimes, France</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-extrabold mb-2 text-white">Amsterdam</h3>
                    <p className="text-sm opacity-60">straatjesstraat 12</p>
                    <p className="text-sm opacity-60">Netherlands</p>
                  </div>
                </div>
              </div>

              {/* Section droite avec le formulaire */}
              <div className="w-1/2 h-full flex items-center justify-center relative z-10 ">
                <GetStartedForm />
              </div>

              {/* Bouton de fermeture */}
              <button 
                className="absolute top-6 right-6 text-white p-2 rounded-sm z-20 hover:opacity-70 transition-opacity border border-white"
                onClick={() => setIsModalOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}