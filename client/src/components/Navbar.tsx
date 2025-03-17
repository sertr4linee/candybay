'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleBackground from './ParticleBackground'

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
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: (custom: number) => ({
      opacity: 0,
      y: 20,
      transition: {
        delay: 0.05 * custom,
        duration: 0.3
      }
    })
  };

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
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold ${
                hoveredLink === 'work' ? 'text-white' : 'text-[#828282]'
              }`}
              onMouseEnter={() => setHoveredLink('work')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Work
            </Link>
            <Link 
              href="#process" 
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold ${
                hoveredLink === 'process' ? 'text-white' : 'text-[#828282]'
              }`}
              onMouseEnter={() => setHoveredLink('process')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Process
            </Link>
            <Link 
              href="#services" 
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold ${
                hoveredLink === 'services' ? 'text-white' : 'text-[#828282]'
              }`}
              onMouseEnter={() => setHoveredLink('services')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Services
            </Link>
            <Link 
              href="#about" 
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold ${
                hoveredLink === 'about' ? 'text-white' : 'text-[#828282]'
              }`}
              onMouseEnter={() => setHoveredLink('about')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              About
            </Link>
            <Link 
              href="#contact" 
              className={`transition-all px-3 py-1.5 rounded text-sm bg-[#131313] font-extrabold ${
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
              className="fixed inset-0 bg-[#000000] z-50 shadow-2xl flex flex-col overflow-hidden font-['Gabarito',_sans-serif]"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Arrière-plan avec particules */}
              <div className="absolute inset-0 z-0">
                <ParticleBackground />
              </div>
              
              {/* Bouton de fermeture corrigé */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 sm:p-4">
                <button 
                  className="bg-gray-800 bg-opacity-70 hover:bg-gray-700 text-white p-2 sm:p-3 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(false);
                  }}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Contenu centré */}
              <div className="flex-1 flex items-center justify-center relative z-10 p-4">
                <div className="max-w-3xl w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
                  {/* Titre avec dégradé */}
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4 sm:mb-6 md:mb-8"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={1}
                  >
                    let's get started
                  </motion.h2>
                  
                  {/* Description */}
                  <motion.p 
                    className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 md:mb-12 max-w-2xl"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={2}
                  >
                    We love to craft the most alternative brands and wicked-fast websites on starship earth. Let's team up to delight your customers and accelerate your business!
                  </motion.p>
                  
                  {/* Formulaire */}
                  <motion.div 
                    className="flex flex-col space-y-4 sm:space-y-6 md:space-y-8"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={3}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm uppercase tracking-wide text-[#a3a3a3] mb-1 sm:mb-2">
                          YOUR NAME
                        </label>
                        <input 
                          type="text" 
                          className="w-full bg-[#131313] bg-opacity-80 border border-[#2a2a2a] rounded px-3 py-2 sm:px-4 sm:py-3 text-white focus:outline-none focus:border-[#FFAFCC]" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm uppercase tracking-wide text-[#a3a3a3] mb-1 sm:mb-2">
                          YOUR EMAIL
                        </label>
                        <input 
                          type="email" 
                          className="w-full bg-[#131313] bg-opacity-80 border border-[#2a2a2a] rounded px-3 py-2 sm:px-4 sm:py-3 text-white focus:outline-none focus:border-[#A2D2FF]" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm uppercase tracking-wide text-[#a3a3a3] mb-1 sm:mb-2">
                        WHAT'S YOUR VISION FOR THIS PROJECT?
                      </label>
                      <textarea 
                        className="w-full bg-[#131313] bg-opacity-80 border border-[#2a2a2a] rounded px-3 py-2 sm:px-4 sm:py-3 text-white h-24 sm:h-32 md:h-40 focus:outline-none focus:border-[#CDB4DB]" 
                      ></textarea>
                    </div>
                    
                    <div>
                      <motion.button 
                        className="bg-white text-black font-black py-2 px-4 sm:py-3 sm:px-6 md:px-8 rounded-full hover:opacity-90 transition-opacity text-sm sm:text-base"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        SEND MESSAGE
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}