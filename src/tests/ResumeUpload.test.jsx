import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from './testUtils';
import ResumeUpload from '../components/ResumeUpload/ResumeUpload';

describe('ResumeUpload', () => {
  const defaultProps = {
    onFileSelect: vi.fn(),
    uploadProgress: 0,
    uploadedFile: null,
    isUploading: false,
  };

  it('renders the upload zone', () => {
    render(<ResumeUpload {...defaultProps} />);

    expect(screen.getByText(/drag & drop your resume/i)).toBeInTheDocument();
    expect(screen.getByText(/supports pdf, doc, docx/i)).toBeInTheDocument();
  });

  it('has proper aria label', () => {
    render(<ResumeUpload {...defaultProps} />);

    expect(screen.getByRole('button', { name: /upload resume/i })).toBeInTheDocument();
  });

  it('shows progress when uploading', () => {
    render(
      <ResumeUpload
        {...defaultProps}
        isUploading={true}
        uploadProgress={45}
        uploadedFile={{ name: 'resume.pdf', size: 1024000 }}
      />
    );

    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getByText('resume.pdf')).toBeInTheDocument();
  });

  it('shows uploaded badge when complete', () => {
    render(
      <ResumeUpload
        {...defaultProps}
        uploadProgress={100}
        uploadedFile={{ name: 'resume.pdf', size: 1024000 }}
      />
    );

    expect(screen.getByText('Uploaded')).toBeInTheDocument();
  });
});
