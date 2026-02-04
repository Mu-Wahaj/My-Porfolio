import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import Button from '../../components/Button/Button'
import AnimatedText from '../../components/AnimatedText/AnimatedText'
import { fadeInUp, slideInFromLeft, slideInFromRight } from '../../animations/framerVariants'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        {/* Animated Background Elements */}
        <div className="hero-background">
          <div className="gradient-blob blob-1" />
          <div className="gradient-blob blob-2" />
        </div>
        
        <div className="hero-grid">
          {/* Left Column - Text Content */}
          <motion.div 
            className="hero-text-content"
            initial="hidden"
            animate="visible"
            variants={slideInFromLeft}
          >
            <motion.div 
              className="hero-badge"
              variants={fadeInUp}
            >
              <Sparkles size={16} />
              <span>Frontend Developer & Designer</span>
            </motion.div>
            
            <h1 className="hero-title-container">
              <AnimatedText 
                text="Hi, I'm Muhammad Wahaj" 
                type="word"
                delay={0.1}
                className="hero-main-title-line"
                animateOnce={true}
                threshold={0.3}
              />
              <AnimatedText 
                text="Tech Lab" 
                type="word"
                delay={0.3}
                className="hero-sub-title-line gradient-text"
                animateOnce={true}
                threshold={0.3}
              />
            </h1>
            
            <motion.p 
              className="hero-description"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              2+ years specializing in modern frontend development, 
              UI/UX design, and web animations. Currently pursuing 
              BS Information Technology at PUCIT.
            </motion.p>
            
            <motion.div 
              className="hero-cta-buttons"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <Button 
                variant="primary" 
                size="large"
                icon={ArrowRight}
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta-primary"
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="large"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta-secondary"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Visual Element */}
          <motion.div 
            className="hero-visual"
            initial="hidden"
            animate="visible"
            variants={slideInFromRight}
            transition={{ delay: 0.2 }}
          >
            {/* Responsive Abstract Visual */}
            <div className="visual-container">
              <div className="code-block block-1">
                <div className="code-line" />
                <div className="code-line" />
                <div className="code-line" />
              </div>
              <div className="code-block block-2">
                <div className="code-line" />
                <div className="code-line" />
                <div className="code-line" />
              </div>
              <div className="floating-orb">
                <div className="orb-inner" />
              </div>
            </div>
          </motion.div>
        </div>
        
        
      </div>
    </section>
  )
}

export default Hero