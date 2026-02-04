import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Calendar, Folder, Code, ShoppingCart, Heart, Eye } from 'lucide-react'
import Button from '../../components/Button/Button'
import AnimatedText from '../../components/AnimatedText/AnimatedText'
import { fadeInUp, staggerContainer } from '../../animations/framerVariants'
import { projects } from '../../data/portfolioData'
import './Projects.css'

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(projects)
  
  // Categories based on your screenshot
  const categories = [
    { id: 'all', label: 'All Projects', icon: null },
    { id: 'React', label: 'React', icon: Code },
    { id: 'E-commerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'Health & Fitness', label: 'Health & Fitness', icon: Heart },
    { id: 'Visualization', label: 'Visualization', icon: Eye }
  ]
  
  // Handle filter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects)
    } else {
      // Filter by category OR by technology tag
      const filtered = projects.filter(project => 
        project.category === activeFilter || 
        project.tags.includes(activeFilter)
      )
      setFilteredProjects(filtered)
    }
  }, [activeFilter])
  
  // Get icon for category
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.icon || null
  }
  
  const handleLinkClick = (e, url) => {
    e.preventDefault()
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  
  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          className="projects-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <AnimatedText text="Featured Projects" type="word" />
          </h2>
          <p className="section-subtitle">
            Real-world applications showcasing modern web development
          </p>
        </motion.div>
        
        {/* Category Filters */}
        <motion.div 
          className="projects-filters"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="filters-container">
            {categories.map((category) => {
              const Icon = category.icon
              const projectCount = category.id === 'all' 
                ? projects.length 
                : projects.filter(p => p.category === category.id || p.tags.includes(category.id)).length
              
              return (
                <motion.button
                  key={category.id}
                  className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category.id)}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={projectCount === 0}
                >
                  {Icon && <Icon className="filter-icon" size={16} />}
                  <span className="filter-label">{category.label}</span>
                
                </motion.button>
              )
            })}
          </div>
        </motion.div>
        
      
        
        {/* Projects Grid */}
        <motion.div 
          className="projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="no-projects"
                className="no-projects-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="no-projects-content">
                  <div className="no-projects-icon">🔍</div>
                  <h3>No projects found</h3>
                  <p>Try selecting a different category</p>
                  <Button
                    variant="outline"
                    size="medium"
                    onClick={() => setActiveFilter('all')}
                  >
                    Show All Projects
                  </Button>
                </div>
              </motion.div>
            ) : (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className={`project-card-inner color-${project.color}`}>
                    {/* Project Header */}
                    <div className="project-header">
                      <div className="project-indicator" />
                      <div className="project-header-content">
                        <Folder className="project-icon" />
                        <div className="project-meta">
                          <span className="project-year">
                            <Calendar size={14} />
                            {project.year}
                          </span>
                          <span className="project-category">{project.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Content */}
                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      
                      <p className="project-description">
                        {project.description}
                      </p>
                      
                      <div className="project-tags">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className={`project-tag ${tag === activeFilter ? 'active-tag' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveFilter(tag)
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Hover Overlay with Links */}
                    <AnimatePresence>
                      {hoveredProject === project.id && (
                        <motion.div 
                          className="project-overlay"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <motion.div 
                            className="project-links"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Button
                              variant="primary"
                              size="medium"
                              icon={ExternalLink}
                              href={project.live}
                              className="project-link-btn"
                            >
                              Live Demo
                            </Button>
                            <Button
                              variant="secondary"
                              size="medium"
                              icon={Github}
                              href={project.github}
                              className="project-link-btn"
                            >
                              View Code
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* GitHub CTA */}
        {activeFilter === 'all' && filteredProjects.length > 0 && (
          <motion.div 
            className="github-cta"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="cta-text">Want to see more projects?</p>
            <Button
              variant="outline"
              size="large"
              icon={Github}
              href="https://github.com/Mu-Wahaj"
            >
              View All on GitHub
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects