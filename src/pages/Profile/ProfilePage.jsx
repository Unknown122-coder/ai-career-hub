import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Input } from '../../components';
import { useAuth } from '../../contexts';
import { getInitials } from '../../utils';

const INITIAL_PROFILE = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  title: 'Frontend Developer',
  bio: 'Passionate frontend developer with 2+ years of experience building modern web applications.',
  skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Node.js', 'Git', 'Figma', 'REST APIs'],
  experience: [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      duration: 'Jan 2024 — Present',
      description: 'Building user-facing features with React and TypeScript. Improved core web vitals by 35%.',
    },
    {
      id: '2',
      title: 'Junior Developer',
      company: 'StartupXYZ',
      duration: 'Jun 2022 — Dec 2023',
      description: 'Developed responsive web applications and contributed to component library.',
    },
  ],
  education: [
    {
      id: '1',
      title: 'B.S. Computer Science',
      company: 'Stanford University',
      duration: '2018 — 2022',
      description: 'Focus on Human-Computer Interaction. GPA: 3.8/4.0',
    },
  ],
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [editSection, setEditSection] = useState(null);
  const [newSkill, setNewSkill] = useState('');

  const handleFieldChange = useCallback((field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addSkill = useCallback(() => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  }, [newSkill, profile.skills]);

  const removeSkill = useCallback((skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  }, []);

  return (
    <div className="profile-page">
      {/* Header Card */}
      <motion.div
        className="profile-header-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-avatar-large">
          {getInitials(profile.name)}
        </div>
        <h2 className="profile-name">{profile.name}</h2>
        <p className="profile-email">{profile.email}</p>
        <p className="text-muted text-small" style={{ marginTop: 4 }}>
          {profile.title} · {profile.location}
        </p>
      </motion.div>

      {/* Personal Details */}
      <motion.div
        className="profile-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="profile-section-header">
          <h3 className="section-title">Personal Details</h3>
          <Button
            variant={editSection === 'personal' ? 'primary' : 'ghost'}
            size="sm"
            icon={editSection === 'personal' ? SaveIcon : EditIcon}
            onClick={() => setEditSection(editSection === 'personal' ? null : 'personal')}
          >
            {editSection === 'personal' ? 'Save' : 'Edit'}
          </Button>
        </div>

        <div className="profile-field-grid">
          <Input
            name="name"
            label="Full Name"
            value={profile.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            disabled={editSection !== 'personal'}
          />
          <Input
            name="email"
            label="Email"
            value={profile.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            disabled={editSection !== 'personal'}
          />
          <Input
            name="phone"
            label="Phone"
            value={profile.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            disabled={editSection !== 'personal'}
          />
          <Input
            name="location"
            label="Location"
            value={profile.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            disabled={editSection !== 'personal'}
          />
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        className="profile-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="profile-section-header">
          <h3 className="section-title">Skills</h3>
        </div>
        <div className="skill-tags">
          {profile.skills.map((skill) => (
            <span className="skill-tag" key={skill}>
              {skill}
              <span
                className="remove-skill"
                onClick={() => removeSkill(skill)}
                role="button"
                tabIndex={0}
                aria-label={`Remove ${skill}`}
                onKeyDown={(e) => e.key === 'Enter' && removeSkill(skill)}
              >
                <CloseIcon style={{ fontSize: 14 }} />
              </span>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <input
            className="form-input"
            placeholder="Add a skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            style={{ maxWidth: 240 }}
          />
          <Button variant="secondary" size="sm" icon={AddIcon} onClick={addSkill}>
            Add
          </Button>
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div
        className="profile-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="profile-section-header">
          <h3 className="section-title">Experience</h3>
        </div>
        {profile.experience.map((exp) => (
          <div className="experience-item" key={exp.id}>
            <div className="item-header">
              <div>
                <p className="item-title">{exp.title}</p>
                <p className="item-company">{exp.company}</p>
              </div>
            </div>
            <p className="item-duration">{exp.duration}</p>
            <p className="item-description">{exp.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Education */}
      <motion.div
        className="profile-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="profile-section-header">
          <h3 className="section-title">Education</h3>
        </div>
        {profile.education.map((edu) => (
          <div className="education-item" key={edu.id}>
            <div className="item-header">
              <div>
                <p className="item-title">{edu.title}</p>
                <p className="item-company">{edu.company}</p>
              </div>
            </div>
            <p className="item-duration">{edu.duration}</p>
            <p className="item-description">{edu.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
