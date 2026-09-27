import React, { useState } from 'react';
import './styles.css';

const App = () => {
  const [profile, setProfile] = useState({
    name: 'Priyan Bilavendran',
    photo: 'https://api.dicebear.com/7.x/notionists-neutral/svg?seed=aura', 
    department: 'B.E. Computer Science and Engineering',
    year: '2nd Year',
    skills: ['Python', 'C++', 'React JS', 'SAP', 'Database Management'],
    socialLinks: {
      github: 'https://github.com/priyan-bilavendran',
      linkedin: 'https://www.linkedin.com/in/priyan-bilavendran-716378327/'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({ ...profile });
  const [skillsInput, setSkillsInput] = useState(profile.skills.join(', '));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'github' || name === 'linkedin') {
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const cleanedSkills = skillsInput
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    setProfile({
      ...formData,
      skills: cleanedSkills
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setSkillsInput(profile.skills.join(', '));
    setIsEditing(false);
  };

  return (
    <div className="app-container">
      <div className="profile-card">
        {!isEditing ? (
          <div className="card-view">
            <header className="card-header-main">
              <div className="photo-name-container">
                <img src={profile.photo} alt={`${profile.name} avatar`} className="profile-photo" />
                <div className="name-details-container">
                  <h1 className="profile-name">{profile.name}</h1>
                  <p className="profile-dept">{profile.department}</p>
                  <p className="profile-year">{profile.year}</p>
                </div>
              </div>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </header>
            
            <div className="card-body">
              <div className="skills-section">
                <h3>Technical Skills</h3>
                <div className="skills-list">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="social-section-container">
                <h3>Social</h3>
                <div className="social-section">
                  <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                  <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className="card-edit" onSubmit={handleSave}>
            <h2>Edit Student Profile</h2>
            
            <div className="form-group-row photo-edit-row">
              <div className="form-group photo-url-group">
                <label>Photo URL</label>
                <input type="url" name="photo" value={formData.photo} onChange={handleChange} />
              </div>
              <div className="form-group name-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="text" name="year" value={formData.year} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Skills (comma separated)</label>
              <input 
                type="text" 
                value={skillsInput} 
                onChange={(e) => setSkillsInput(e.target.value)} 
                placeholder="e.g. React, Python, UI Design"
              />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>GitHub URL</label>
                <input type="url" name="github" value={formData.socialLinks.github} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input type="url" name="linkedin" value={formData.socialLinks.linkedin} onChange={handleChange} />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="save-btn">Save Changes</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;