'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'

export default function GetStartedForm() {
  const [duration, setDuration] = useState('15')
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100
      setScrollProgress(scrollPercentage)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-[#131313] rounded-3xl p-4 md:p-6 border border-[#1a1717] relative">
        {/* Slider */}
        <div className="absolute right-3 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-[#FFB5E8] via-[#FFDAC1] to-[#B5EAD7]">
          <motion.div 
            className="absolute w-full rounded-full bg-white"
            style={{ 
              height: '60px',
              y: `calc(${scrollProgress}% - ${scrollProgress * 0.6}px)`
            }}
            animate={{ opacity: scrollProgress > 0 ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="bg-[#131313] rounded-2xl p-4 md:p-6 h-[500px] md:h-[600px] overflow-y-auto hide-scrollbar pr-6 md:pr-8"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          <div className="space-y-10">
            {/* En-tête */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 p-[2px]">
                  <Image 
                    src="/candy.svg" 
                    alt="CandyCode" 
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-[#666666] text-sm font-medium">Candybay</h2>
                  <h3 className="text-2xl font-bold text-white">Quick Chat</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#666666] text-sm">
                <span className="text-lg">👋</span>
                <p className="leading-relaxed">
                  A quick chat powered by Google Meet. Let&apos;s discuss your project and see how we can help!
                </p>
              </div>
            </div>

            {/* Durée et Timezone */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm text-[#666666] mb-3 uppercase tracking-wider">Duration</h4>
                <div className="flex gap-2">
                  {['15', '30'].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setDuration(mins)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        duration === mins 
                          ? 'bg-white text-black' 
                          : 'text-[#666666] border border-[#2a2a2a] hover:border-white/20'
                      }`}
                    >
                      {mins} minutes
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-[#666666] mb-3 uppercase tracking-wider">Timezone</h4>
                <button className="flex items-center gap-2 text-white text-sm py-2 px-4 rounded-lg border border-[#2a2a2a] hover:border-white/20 transition-all duration-200">
                  <span>🌍</span>
                  <span>Europe/Paris</span>
                </button>
              </div>
            </div>

            {/* Calendrier */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#0A0A0A]/50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-white font-medium">January 2024</h4>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#666666]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#666666]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                  <div key={day} className="text-[#666666] text-xs font-medium py-2">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => (
                  <button
                    key={i}
                    className="aspect-square flex items-center justify-center text-sm font-medium rounded-lg hover:bg-white hover:text-black text-[#666666] transition-all duration-200"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium bg-gradient-to-r from-[#AEC6CF] via-[#FFB5E8] to-[#B5EAD7] text-transparent bg-clip-text mb-3">
                  WHAT&apos;S YOUR VISION FOR THIS PROJECT?
                </label>
                <textarea 
                  className="w-full bg-[#0A0A0A] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFB5E8] h-32 resize-none text-sm"
                  placeholder="Tell us about your project goals and expectations..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium bg-gradient-to-r from-[#AEC6CF] via-[#FFB5E8] to-[#B5EAD7] text-transparent bg-clip-text mb-3">
                  WHERE DID YOU HEAR ABOUT US?
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[#0A0A0A] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFB5E8] text-sm"
                  placeholder="e.g. Google, Twitter, Friend..."
                />
              </div>
            </div>

            {/* Bouton */}
            <motion.button 
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#FFB5E8] to-[#B5EAD7] text-black font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Book consultation
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
} 