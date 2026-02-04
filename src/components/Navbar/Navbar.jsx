import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import Button from '../Button/Button'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lenisRef = useRef(null)
  
  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Get Lenis instance from window if available
    if (window.lenisInstance) {
      lenisRef.current = window.lenisInstance
    }
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToSection = (e, href) => {
    e.preventDefault()
    
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      // Close mobile menu if open
      if (isOpen) {
        setIsOpen(false)
      }
      
      // Try using Lenis if available
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetElement, {
          offset: -80, // Account for navbar height
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        // Fallback to native smooth scroll
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }
  }
  
  const handleHireMeClick = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    
    if (contactSection) {
      // Close mobile menu if open
      if (isOpen) {
        setIsOpen(false)
      }
      
      // Try using Lenis if available
      if (lenisRef.current) {
        lenisRef.current.scrollTo(contactSection, {
          offset: -80,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        // Fallback to native smooth scroll
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }
  }
  
  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => scrollToSection(e, '#hero')}
        >
          <Code2 className="logo-icon" />
          <span className="logo-text">Wahaj</span>
          <span className="logo-dot">.</span>
        </motion.div>
        
        <div className="nav-menu">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="nav-link"
              onClick={(e) => scrollToSection(e, item.href)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="nav-link-text">{item.label}</span>
              <span className="nav-link-underline" />
            </motion.a>
          ))}
        </div>
        
        <Button
          variant="primary"
          size="small"
          onClick={handleHireMeClick}
          className="nav-cta"
        >
          Hire Me
        </Button>
        
        <button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className="mobile-menu"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="mobile-menu-items">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mobile-nav-link"
              onClick={(e) => scrollToSection(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="medium"
            onClick={handleHireMeClick}
            className="mobile-cta"
          >
            Let's Talk
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar