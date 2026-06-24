import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeUpload } from '../../components';
import resumeService from '../../services/resumeService';
import { getScoreColor } from '../../utils';

export default function ResumePage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleFileSelect = useCallback(async (file) => {
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);
    setAnalysis(null);

    try {
      await resumeService.uploadResume(file, (progress) => {
        setUploadProgress(progress);
      });

      setIsUploading(false);
      setIsAnalyzing(true);

      const result = await resumeService.analyzeResume();
      setAnalysis(result);
      setIsAnalyzing(false);
    } catch (err) {
      setIsUploading(false);
      setIsAnalyzing(false);
      console.error('Upload failed:', err);
    }
  }, []);

  const getPriorityColor = (priority) => {
    if (priority === 'high') return '#ef4444';
    if (priority === 'medium') return '#f59e0b';
    return '#10b981';
  };

  const getPriorityBg = (priority) => {
    if (priority === 'high') return 'rgba(239, 68, 68, 0.1)';
    if (priority === 'medium') return 'rgba(245, 158, 11, 0.1)';
    return 'rgba(16, 185, 129, 0.1)';
  };

  return (
    <div className="resume-page">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="heading-3" style={{ marginBottom: 8 }}>Resume Analyzer</h2>
        <p className="text-muted text-small" style={{ marginBottom: 32 }}>
          Upload your resume to get an AI-powered ATS score and actionable improvement suggestions.
        </p>
      </motion.div>

      {/* Upload Zone */}
      <ResumeUpload
        onFileSelect={handleFileSelect}
        uploadProgress={uploadProgress}
        uploadedFile={uploadedFile}
        isUploading={isUploading}
      />

      {/* Analyzing state */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              marginTop: 32,
            }}
          >
            <div
              className="spinner-border"
              style={{ width: 48, height: 48, color: '#6366f1' }}
              role="status"
            >
              <span className="sr-only">Analyzing...</span>
            </div>
            <p style={{ marginTop: 16, fontWeight: 500 }}>Analyzing your resume...</p>
            <p className="text-muted text-small">This may take a few seconds</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            className="analysis-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ATS Score + Keywords */}
            <div className="ats-score-section">
              <motion.div
                className="ats-score-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="ats-ring">
                  <svg viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="80" cy="80" r="68" fill="none" stroke="var(--surface-alt)" strokeWidth="12" />
                    <motion.circle
                      cx="80" cy="80" r="68" fill="none"
                      stroke={getScoreColor(analysis.atsScore)}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={427}
                      initial={{ strokeDashoffset: 427 }}
                      animate={{ strokeDashoffset: 427 - (427 * analysis.atsScore) / 100 }}
                      transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                    />
                  </svg>
                  <span className="ats-value">{analysis.atsScore}</span>
                </div>
                <p className="ats-label">ATS Score</p>
                <span
                  className="badge"
                  style={{
                    background: `${getScoreColor(analysis.atsScore)}15`,
                    color: getScoreColor(analysis.atsScore),
                  }}
                >
                  {analysis.overallRating}
                </span>
              </motion.div>

              <div className="keywords-section">
                <h3 className="heading-5">Keywords Analysis</h3>
                <p className="text-muted text-small" style={{ marginBottom: 16 }}>
                  Keywords found and missing from your resume
                </p>

                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#10b981' }}>
                  ✓ Found Keywords ({analysis.foundKeywords.length})
                </h4>
                <div className="keyword-tags" style={{ marginBottom: 20 }}>
                  {analysis.foundKeywords.map((kw) => (
                    <span className="keyword-tag found" key={kw}>{kw}</span>
                  ))}
                </div>

                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#ef4444' }}>
                  ✗ Missing Keywords ({analysis.missingKeywords.length})
                </h4>
                <div className="keyword-tags">
                  {analysis.missingKeywords.map((kw) => (
                    <span className="keyword-tag missing" key={kw}>{kw}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <h3 className="heading-4" style={{ marginBottom: 16 }}>Improvement Suggestions</h3>
            <div className="suggestions-grid">
              {analysis.suggestions.map((s, idx) => (
                <motion.div
                  className="suggestion-card"
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <div
                    className="suggestion-icon"
                    style={{
                      background: getPriorityBg(s.priority),
                      color: getPriorityColor(s.priority),
                    }}
                  >
                    {s.icon}
                  </div>
                  <h4 className="suggestion-title">{s.title}</h4>
                  <p className="suggestion-text">{s.description}</p>
                  <span
                    className="suggestion-priority"
                    style={{
                      background: getPriorityBg(s.priority),
                      color: getPriorityColor(s.priority),
                    }}
                  >
                    {s.priority} priority
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
