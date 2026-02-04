import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Zap, Server } from 'lucide-react'
import AnimatedText from '../../components/AnimatedText/AnimatedText'
import { fadeInUp, staggerContainer } from '../../animations/framerVariants'
import './Skills.css'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend')
  
  const categories = [
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'design', label: 'UI/UX Design', icon: Palette },
    { id: 'animation', label: 'Animation', icon: Zap },
    { id: 'tools', label: 'Tools', icon: Server }
  ]
  
  const skills = {
    frontend: [
      { name: 'React', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Vite', level: 85 }
    ],
    design: [
      { name: 'Figma', level: 90 },
      { name: 'Canva', level: 85 },
      { name: 'Prototyping', level: 80 },
      { name: 'Wireframing', level: 85 },
      { name: 'Design Systems', level: 75 }
    ],
    animation: [
      { name: 'GSAP', level: 90 },
      { name: 'Framer Motion', level: 75 },
      { name: 'jQuery ', level: 60 },
      { name: 'CSS Animations', level: 85 },
      { name: 'Canvas API', level: 80 }
    ],
    tools: [
      { name: 'Git', level: 85 },
      { name: 'VS Code', level: 90 },
      { name: 'Webpack', level: 75 },
      { name: 'Bash', level: 80 },
      { name: 'Oracle DB', level: 70 },
      { name: 'IntelliJ IDEA', level: 75 }
    ]
  }
  
  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          className="skills-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <AnimatedText text="Skills & Expertise" type="word" />
          </h2>
         
        </motion.div>
        
        <div className="skills-content">
          <motion.div 
            className="skills-categories"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="category-icon" />
                  <span>{category.label}</span>
                </motion.button>
              )
            })}
          </motion.div>
          
          <motion.div 
            className="skills-grid"
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {skills[activeCategory].map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div 
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills