import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import Button from '../Button/Button'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
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
        >
          <Code2 className="logo-icon" />
          <span className="logo-text">Wahaj</span>
          <span className="logo-dot">.</span>
        </motion.div>
        
        <div className="nav-menu">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="nav-link"
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
          onClick={() => document.getElementById('contact').scrollIntoView()}
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
      >
        <div className="mobile-menu-items">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              document.getElementById('contact').scrollIntoView()
              setIsOpen(false)
            }}
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