import React, { useState } from 'react';
import { Edit3, Save, X, Plus, Trash2, Github, ExternalLink, Mail, Code, Brain, Cloud, Database } from 'lucide-react';

const Portfolio = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    name: "Your Name",
    title: "Software Engineer & ML Specialist",
    email: "your.email@example.com",
    linkedin: "linkedin.com/in/yourprofile",
    github: "github.com/yourusername",
    projects: [
      {
        id: 1,
        title: "Cloud-Native Personal Portfolio Website (Software and ML projects)",
        duration: "January 2024 – Present",
        points: [
          "Implemented backend server in Go, offering efficient horizontal scaling, and the frontend as a React single-page app.",
          "Utilized Docker to containerize services, streamlining deployment and scalability across development environments.",
          "Deployed on AWS, using ECS to launch services and Application Load Balancer (ALB) for traffic distribution.",
          "Creating Multi-Head Attention model in AWS SageMaker for scalable, real-time usage as an assistant GPT.",
          "Automated deployment with AWS CloudFormation, enhancing continuous integration/delivery."
        ],
        skills: ["React", "Go", "Docker", "AWS ECS", "MongoDB", "AWS Cloud Map", "ALB", "CloudFormation", "CI/CD", "NGINX"]
      }
    ]
  });

  const updateField = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateProject = (projectId, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId ? { ...project, [field]: value } : project
      )
    }));
  };

  const updateProjectPoint = (projectId, pointIndex, value) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId 
          ? {
              ...project,
              points: project.points.map((point, index) =>
                index === pointIndex ? value : point
              )
            }
          : project
      )
    }));
  };

  const addProjectPoint = (projectId) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId 
          ? { ...project, points: [...project.points, "New achievement or responsibility"] }
          : project
      )
    }));
  };

  const removeProjectPoint = (projectId, pointIndex) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId 
          ? {
              ...project,
              points: project.points.filter((_, index) => index !== pointIndex)
            }
          : project
      )
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "New Project Title",
      duration: "Month Year – Present",
      points: ["Describe your key achievement or responsibility"],
      skills: ["Skill1", "Skill2", "Skill3"]
    };
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const removeProject = (projectId) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== projectId)
    }));
  };

  const updateSkills = (projectId, skillsString) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    updateProject(projectId, 'skills', skillsArray);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Floating Edit Button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="fixed top-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        {isEditing ? <Save size={20} /> : <Edit3 size={20} />}
      </button>

      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            {isEditing ? (
              <input
                type="text"
                value={portfolioData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="text-5xl font-bold text-white bg-transparent border-b-2 border-blue-400 text-center w-full max-w-2xl mx-auto mb-4 focus:outline-none focus:border-blue-300"
              />
            ) : (
              <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {portfolioData.name}
              </h1>
            )}
            
            {isEditing ? (
              <input
                type="text"
                value={portfolioData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="text-xl text-blue-100 bg-transparent border-b border-blue-400 text-center w-full max-w-xl mx-auto focus:outline-none focus:border-blue-300"
              />
            ) : (
              <p className="text-xl text-blue-100 mb-8">{portfolioData.title}</p>
            )}

            <div className="flex justify-center space-x-6 mt-8">
              <a href={`mailto:${portfolioData.email}`} className="flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors">
                <Mail size={20} />
                <span>{isEditing ? (
                  <input
                    type="email"
                    value={portfolioData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-300"
                  />
                ) : portfolioData.email}</span>
              </a>
              <a href={`https://${portfolioData.linkedin}`} className="flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors">
                <ExternalLink size={20} />
                <span>{isEditing ? (
                  <input
                    type="text"
                    value={portfolioData.linkedin}
                    onChange={(e) => updateField('linkedin', e.target.value)}
                    className="bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-300"
                  />
                ) : portfolioData.linkedin}</span>
              </a>
              <a href={`https://${portfolioData.github}`} className="flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors">
                <Github size={20} />
                <span>{isEditing ? (
                  <input
                    type="text"
                    value={portfolioData.github}
                    onChange={(e) => updateField('github', e.target.value)}
                    className="bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-300"
                  />
                ) : portfolioData.github}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Code className="mr-3 text-blue-400" />
            Projects & Experience
          </h2>
          {isEditing && (
            <button
              onClick={addProject}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus size={20} />
              <span>Add Project</span>
            </button>
          )}
        </div>

        <div className="space-y-8">
          {portfolioData.projects.map((project) => (
            <div key={project.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      className="text-xl font-bold text-white bg-transparent border-b border-blue-400 w-full focus:outline-none focus:border-blue-300 mb-2"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  )}
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={project.duration}
                      onChange={(e) => updateProject(project.id, 'duration', e.target.value)}
                      className="text-blue-300 bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-300"
                    />
                  ) : (
                    <p className="text-blue-300 font-medium">{project.duration}</p>
                  )}
                </div>
                
                {isEditing && (
                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {project.points.map((point, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="text-blue-400 mr-3 mt-1">•</span>
                    <div className="flex-1 flex items-center">
                      {isEditing ? (
                        <div className="flex-1 flex items-center space-x-2">
                          <textarea
                            value={point}
                            onChange={(e) => updateProjectPoint(project.id, index, e.target.value)}
                            className="flex-1 bg-transparent border border-blue-400 rounded p-2 text-gray-300 focus:outline-none focus:border-blue-300 resize-none"
                            rows="2"
                          />
                          <button
                            onClick={() => removeProjectPoint(project.id, index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <span>{point}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {isEditing && (
                <button
                  onClick={() => addProjectPoint(project.id)}
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-2 mb-4"
                >
                  <Plus size={16} />
                  <span>Add Point</span>
                </button>
              )}

              <div>
                <p className="text-sm font-semibold text-blue-400 mb-2">Skills Used:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={project.skills.join(', ')}
                    onChange={(e) => updateSkills(project.id, e.target.value)}
                    placeholder="Enter skills separated by commas"
                    className="w-full bg-transparent border border-blue-400 rounded p-2 text-gray-300 focus:outline-none focus:border-blue-300"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-400/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Overview */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center">
          <Brain className="mr-3 text-purple-400" />
          Technical Expertise
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Cloud className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-3">Cloud & DevOps</h3>
            <div className="flex flex-wrap gap-2">
              {['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'].map(skill => (
                <span key={skill} className="bg-blue-600/30 text-blue-300 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Code className="text-green-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-3">Backend & APIs</h3>
            <div className="flex flex-wrap gap-2">
              {['Go', 'Node.js', 'Python', 'REST APIs', 'GraphQL'].map(skill => (
                <span key={skill} className="bg-green-600/30 text-green-300 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Database className="text-purple-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-3">ML & Data</h3>
            <div className="flex flex-wrap gap-2">
              {['TensorFlow', 'PyTorch', 'SageMaker', 'MongoDB', 'PostgreSQL'].map(skill => (
                <span key={skill} className="bg-purple-600/30 text-purple-300 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;