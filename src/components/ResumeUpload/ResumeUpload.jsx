import { memo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { formatFileSize } from '../../utils';
import { FILE_LIMITS } from '../../constants';

/**
 * ResumeUpload — Drag & drop file upload with progress
 */
const ResumeUpload = memo(function ResumeUpload({
  onFileSelect,
  uploadProgress,
  uploadedFile,
  isUploading,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: FILE_LIMITS.MAX_SIZE,
    multiple: false,
    disabled: isUploading,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`upload-zone ${isDragActive ? 'drag-over' : ''}`}
        role="button"
        aria-label="Upload resume file"
        tabIndex={0}
      >
        <input {...getInputProps()} />
        <motion.div
          className="upload-icon"
          animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
        >
          <CloudUploadIcon fontSize="large" />
        </motion.div>
        <p className="upload-title">
          {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
        </p>
        <p className="upload-subtitle">
          or click to browse. Supports PDF, DOC, DOCX (max 5MB)
        </p>
      </div>

      <AnimatePresence>
        {(isUploading || uploadedFile) && (
          <motion.div
            className="upload-progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="file-info">
              <div className="file-icon">
                <InsertDriveFileIcon />
              </div>
              <div className="file-details">
                <p className="file-name">{uploadedFile?.name || 'resume.pdf'}</p>
                <p className="file-size">
                  {uploadedFile ? formatFileSize(uploadedFile.size) : '—'}
                </p>
              </div>
              <span className="badge badge-primary">
                {uploadProgress === 100 ? 'Uploaded' : `${uploadProgress || 0}%`}
              </span>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress || 0}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default ResumeUpload;
