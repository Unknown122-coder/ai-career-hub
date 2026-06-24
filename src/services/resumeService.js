/**
 * Resume Service — Mock API for resume analysis
 */

const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

const resumeService = {
  /**
   * Simulate resume upload with progress
   */
  async uploadResume(file, onProgress) {
    const totalSteps = 20;
    for (let i = 1; i <= totalSteps; i++) {
      await delay(120);
      if (onProgress) {
        onProgress(Math.round((i / totalSteps) * 100));
      }
    }

    return {
      id: Date.now().toString(),
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    };
  },

  /**
   * Analyze uploaded resume (mock)
   */
  async analyzeResume() {
    await delay(2000);

    return {
      atsScore: 78,
      overallRating: 'Good',
      foundKeywords: [
        'React', 'JavaScript', 'CSS', 'HTML', 'Git', 'REST API',
        'Responsive Design', 'Agile', 'Node.js',
      ],
      missingKeywords: [
        'TypeScript', 'CI/CD', 'Unit Testing', 'Docker', 'AWS',
        'GraphQL', 'Performance Optimization',
      ],
      suggestions: [
        {
          id: 1,
          title: 'Add Quantifiable Achievements',
          description: 'Include specific metrics and numbers to demonstrate impact. For example, "Improved page load time by 40%".',
          priority: 'high',
          category: 'content',
          icon: '📊',
        },
        {
          id: 2,
          title: 'Include Technical Keywords',
          description: 'Add missing keywords like TypeScript, Docker, and CI/CD to pass ATS filters.',
          priority: 'high',
          category: 'keywords',
          icon: '🔑',
        },
        {
          id: 3,
          title: 'Improve Summary Section',
          description: 'Write a compelling professional summary that highlights your unique value proposition.',
          priority: 'medium',
          category: 'structure',
          icon: '✍️',
        },
        {
          id: 4,
          title: 'Add Projects Section',
          description: 'Include 2-3 significant projects with technologies used and outcomes achieved.',
          priority: 'medium',
          category: 'content',
          icon: '🚀',
        },
        {
          id: 5,
          title: 'Optimize Formatting',
          description: 'Use consistent formatting, bullet points, and ensure the resume is ATS-friendly.',
          priority: 'low',
          category: 'formatting',
          icon: '📐',
        },
        {
          id: 6,
          title: 'Add Certifications',
          description: 'Include relevant certifications like AWS, Google Cloud, or Meta Frontend Developer.',
          priority: 'low',
          category: 'content',
          icon: '🏆',
        },
      ],
      sectionScores: {
        contact: 90,
        summary: 65,
        experience: 75,
        education: 85,
        skills: 70,
        projects: 60,
      },
    };
  },
};

export default resumeService;
