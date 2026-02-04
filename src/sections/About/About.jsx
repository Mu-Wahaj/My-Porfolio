import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Code } from 'lucide-react'
import AnimatedText from '../../components/AnimatedText/AnimatedText'
import { fadeInUp, staggerContainer } from '../../animations/framerVariants'
import './About.css'

const About = () => {
  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '100%', label: 'Client Satisfaction' },
    { value: '21', label: 'Years Young' }
  ]
  
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          className="about-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <AnimatedText text="About Me" type="word" />
          </h2>
          <p className="section-subtitle">
            Get to know the developer behind the code
          </p>
        </motion.div>
        
        <div className="about-content">
          <motion.div 
            className="about-left"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="about-card">
              <h3>My Journey</h3>
              <p>
                As a passionate Frontend Developer with over 2 years of 
                experience, I specialize in creating beautiful, functional, 
                and performant web applications. My focus is on modern 
                frontend technologies, UI/UX design principles, and 
                creating engaging web animations.
              </p>
              <p>
                Currently pursuing my Bachelor's in Information Technology 
                at PUCIT (2024-2028), I'm constantly learning and adapting 
                to new technologies while maintaining a strong foundation 
                in core web development principles.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="about-right"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="info-card">
              <h4>Personal Details</h4>
              <div className="info-list">
                <div className="info-item">
                  <GraduationCap className="info-icon" />
                  <div>
                    <div className="info-label">Education</div>
                    <div className="info-value">BS Information Technology</div>
                    <div className="info-sub">PUCIT, 2024-2028</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <Calendar className="info-icon" />
                  <div>
                    <div className="info-label">Experience</div>
                    <div className="info-value">2+ Years</div>
                    <div className="info-sub">Frontend Development</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <MapPin className="info-icon" />
                  <div>
                    <div className="info-label">Location</div>
                    <div className="info-value">Pakistan</div>
                    <div className="info-sub">Remote Available</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <Code className="info-icon" />
                  <div>
                    <div className="info-label">Languages</div>
                    <div className="info-value">English & Urdu</div>
                    <div className="info-sub">Fluent </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About