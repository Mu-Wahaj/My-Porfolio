import React from 'react'
import { motion } from 'framer-motion'
import './AnimatedText.css'

const AnimatedText = ({ 
  text, 
  type = 'word',
  delay = 0,
  className = '',
  animateOnce = true,
  threshold = 0.1,
  ...props 
}) => {
  const words = text.split(' ')
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: delay,
        staggerDirection: 1
      }
    })
  }
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.5
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
    }
  }
  
  const characterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    }
  }
  
  const characterChild = {
    hidden: {
      opacity: 0,
      y: 10,
      x: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150
      }
    }
  }
  
  if (type === 'character') {
    const letters = text.split('')
    return (
      <motion.div
        className={`animated-text animated-text-${type} ${className}`}
        variants={characterContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: animateOnce, amount: threshold, margin: "0px 0px -50px 0px" }}
        {...props}
      >
        {letters.map((letter, index) => (
          <motion.span 
            key={index} 
            variants={characterChild}
            className="animated-character"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.div>
    )
  }
  
  return (
    <motion.div
      className={`animated-text animated-text-${type} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: animateOnce, amount: threshold, margin: "0px 0px -50px 0px" }}
      {...props}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="animated-word"
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default AnimatedText