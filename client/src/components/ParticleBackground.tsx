'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  depth: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const rotationRef = useRef<number>(0)

  useEffect(() => {
    // Récupération du canvas et du contexte
    const canvas = canvasRef.current
    if (!canvas) return // Protection contre canvas null

    const ctx = canvas.getContext('2d')
    if (!ctx) return // Protection contre ctx null

    // Redimensionnement du canvas
    function handleResize() {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // Réinitialiser les particules après redimensionnement
        initParticles()
      }
    }

    // Initialisation des dimensions
    handleResize()
    window.addEventListener('resize', handleResize)

    // Initialisation des particules
    function initParticles() {
      const particles: Particle[] = []
      
      // Créer plus de couches de particules à différentes profondeurs
      for (let i = 0; i < 5; i++) {
        // Profondeur entre 0 et 1
        const depth = i / 5 + 0.1
        
        // Plus de particules dans chaque couche
        const numParticles = 30 * (i + 1)
        
        for (let j = 0; j < numParticles; j++) {
          // S'assurer que canvas existe avant de l'utiliser
          if (!canvas) return
          
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            // Taille basée sur la profondeur - les plus grandes particules semblent plus proches
            size: 0.4 + (depth * 1.8), 
            // Vitesse ralentie - mouvement plus lent et paisible
            speed: 0.05 + (depth * 0.2),
            depth,
            // Couleur légèrement variable
            color: `rgba(255, 255, 255, ${0.4 + Math.random() * 0.3})`
          })
        }
      }
      
      particlesRef.current = particles
    }

    // Fonction d'animation
    function animate() {
      requestAnimationFrame(animate)
      
      // S'assurer que canvas et ctx existent avant de les utiliser
      if (!canvas || !ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Point central pour la rotation (centre de l'écran)
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      // Mettre à jour et dessiner les particules
      particlesRef.current.forEach(particle => {
        // Augmenter très lentement la rotation
        rotationRef.current += 0.000002
        
        // Déplacer les particules vers le haut avec différentes vitesses
        particle.y -= particle.speed
        
        // Calculer la position avec un léger effet de rotation
        const distance = Math.sqrt(
          Math.pow(particle.x - centerX, 2) + 
          Math.pow(particle.y - centerY, 2)
        )
        
        // Plus loin du centre = plus d'effet de rotation (mais plus lent)
        const rotationFactor = (distance / 800) * rotationRef.current
        
        // Calculer la position après rotation
        const finalX = 
          centerX + 
          (particle.x - centerX) * Math.cos(rotationFactor) - 
          (particle.y - centerY) * Math.sin(rotationFactor)
        
        const finalY = 
          centerY + 
          (particle.x - centerX) * Math.sin(rotationFactor) + 
          (particle.y - centerY) * Math.cos(rotationFactor)
        
        // Réinitialiser la position quand la particule atteint le haut
        if (particle.y < -10) {
          // S'assurer que canvas existe avant de l'utiliser
          if (!canvas) return
          
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
        }
        
        // Calculer l'opacité dynamique basée sur la position de rotation
        const dynamicOpacity = 0.2 + (Math.abs(Math.sin(rotationFactor * 1.5)) * 0.4)
        
        // Taille dynamique pour un effet de scintillement subtil (ralenti)
        const dynamicSize = particle.size * (0.8 + Math.sin(Date.now() * 0.0005 + particle.depth * 5) * 0.2)
        
        // Dessiner la particule
        // S'assurer que ctx existe avant de l'utiliser
        if (!ctx) return
        
        ctx.beginPath()
        ctx.arc(finalX, finalY, dynamicSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicOpacity})`
        ctx.fill()
      })
    }

    // Initialiser et démarrer l'animation
    initParticles()
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full opacity-70 pointer-events-none -z-10"
    />
  )
} 