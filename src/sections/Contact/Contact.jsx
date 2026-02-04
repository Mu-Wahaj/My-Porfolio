import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, Linkedin, Github, Twitter, CheckCircle, AlertCircle } from 'lucide-react'
import Button from '../../components/Button/Button'
import AnimatedText from '../../components/AnimatedText/AnimatedText'
import { fadeInUp, staggerContainer } from '../../animations/framerVariants'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  })
  
  // Your API access key
  const API_ACCESS_KEY = 'a9feaeb7-e604-46f9-b6cc-563d9d206efc'
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    
    // Clear any previous status when user starts typing
    if (formStatus.isError || formStatus.isSuccess) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: false,
        message: ''
      })
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Please fill in all fields'
      })
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Please enter a valid email address'
      })
      return
    }
    
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: 'Sending your message...'
    })
    
    try {
      // Prepare the data for submission
      const submissionData = {
        access_key: API_ACCESS_KEY,
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        from_name: "Muhammad Wahaj Portfolio",
        reply_to: formData.email.trim()
      }
      
      // Send the form data using fetch API (POST method)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        // Success
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: 'Message sent successfully! I\'ll get back to you soon.'
        })
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        })
        
        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus({
            isSubmitting: false,
            isSuccess: false,
            isError: false,
            message: ''
          })
        }, 5000)
        
      } else {
        // API returned error
        throw new Error(result.message || 'Failed to send message')
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: error.message || 'Something went wrong. Please try again.'
      })
      
      // Auto-clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: false,
          message: ''
        })
      }, 5000)
    }
  }
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Mu-Wahaj', label: 'GitHub', target: "_blank" },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammadwahajj/', label: 'LinkedIn',target: "_blank" },
    { icon: Twitter, href: 'https://x.com/wahajjutt373', label: 'Twitter', target: "_blank" },
    { icon: Mail, href: 'mailto:muhammad.wahaj.986@gmail.com', label: 'Email' }
  ]
  
  const contactInfo = [
    { icon: Mail, text: 'muhammad.wahaj.986@gmail.com' },
    { icon: Phone, text: '+92 325 9421211' },
    { icon: MapPin, text: 'Pakistan, Remote Available' }
  ]
  
  return (
    <section id="contact" className="contact">
<div className="contact-container">        <motion.div
          className="contact-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <AnimatedText text="Get In Touch" type="word" />
          </h2>
          <p className="section-subtitle">
            Let's discuss your next project
          </p>
        </motion.div>
        
        <div className="contact-content">
          <motion.div 
            className="contact-left"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="contact-form-wrapper">
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label htmlFor="name">FULL NAME</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    disabled={formStatus.isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    disabled={formStatus.isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">YOUR MESSAGE</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell me about your project..."
                    disabled={formStatus.isSubmitting}
                  />
                </div>
                
                {/* Form Status Messages */}
                {formStatus.message && (
                  <div className={`form-status ${formStatus.isSuccess ? 'success' : 'error'}`}>
                    {formStatus.isSuccess ? (
                      <CheckCircle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    ) : (
                      <AlertCircle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    )}
                    {formStatus.message}
                  </div>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  icon={formStatus.isSubmitting ? null : Send}
                  disabled={formStatus.isSubmitting}
                  className="submit-btn"
                  loading={formStatus.isSubmitting}
                >
                  {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="contact-right"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="contact-info-card">
              <h3>Contact Information</h3>
              
              <div className="info-items">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="info-item">
                      <Icon className="info-icon" />
                      <span>{info.text}</span>
                    </div>
                  )
                })}
              </div>
              
              <div className="social-links">
                <h4>Follow Me</h4>
                <div className="social-icons">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <Icon size={24} />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
              
              <div className="availability">
                <div className="status-indicator" />
                <span>Available for freelance work</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact