import React from 'react'
import { motion } from 'framer-motion'
import './Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  ...props 
}) => {
  
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    
    if (href) {
      // For external links, open in new tab
      window.open(href, target, 'noopener,noreferrer')
      e.preventDefault()
    }
    
    if (onClick) {
      onClick(e)
    }
  }
  
  // Determine the component type
  const Component = href ? motion.a : motion.button
  
  // Button/Link props
  const componentProps = href ? {
    href,
    target,
    rel,
    onClick: handleClick
  } : {
    type,
    onClick: handleClick,
    disabled: disabled || loading
  }
  
  return (
    <Component
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${disabled ? 'btn-disabled' : ''} ${loading ? 'btn-loading' : ''} ${className}`}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      {...componentProps}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="btn-loader">
          <div className="btn-loader-spinner" />
        </div>
      )}
      
      {/* Icon before text */}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className="btn-icon btn-icon-left" />
      )}
      
      {/* Button text */}
      <span className="btn-text">
        {children}
      </span>
      
      {/* Icon after text */}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="btn-icon btn-icon-right" />
      )}
      
      {/* Glow effect */}
      {!disabled && <div className="btn-glow" />}
      
      {/* Ripple effect for click */}
      <span className="btn-ripple" />
    </Component>
  )
}

export default Button