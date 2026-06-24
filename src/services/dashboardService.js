/**
 * Dashboard Service — Mock API for dashboard data
 */

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

const dashboardService = {
  async getStats() {
    await delay();
    return {
      totalApplications: 47,
      activeInterviews: 8,
      resumeScore: 78,
      offersReceived: 3,
      changes: {
        applications: { value: 12, type: 'positive' },
        interviews: { value: 3, type: 'positive' },
        resumeScore: { value: 5, type: 'positive' },
        offers: { value: 1, type: 'positive' },
      },
    };
  },

  async getApplicationsByMonth() {
    await delay(400);
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Applications',
          data: [4, 7, 5, 12, 9, 15, 11, 8, 14, 10, 6, 3],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  },

  async getSuccessRate() {
    await delay(400);
    return {
      labels: ['Applied', 'Screened', 'Interview', 'Offer'],
      datasets: [
        {
          data: [47, 28, 12, 3],
          backgroundColor: ['#6366f1', '#06b6d4', '#f59e0b', '#10b981'],
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    };
  },

  async getInterviewConversion() {
    await delay(400);
    return {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Interviews',
          data: [3, 5, 8, 4],
          backgroundColor: 'rgba(99, 102, 241, 0.8)',
          borderRadius: 8,
        },
        {
          label: 'Offers',
          data: [1, 1, 2, 1],
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderRadius: 8,
        },
      ],
    };
  },

  async getRecentActivities() {
    await delay(300);
    return [
      {
        id: 1,
        type: 'application',
        text: 'Applied to Frontend Engineer at Stripe',
        time: '2 hours ago',
        icon: '📝',
        color: '#6366f1',
      },
      {
        id: 2,
        type: 'interview',
        text: 'Interview scheduled with Google',
        time: '5 hours ago',
        icon: '🎯',
        color: '#06b6d4',
      },
      {
        id: 3,
        type: 'resume',
        text: 'Resume score improved to 78',
        time: '1 day ago',
        icon: '📄',
        color: '#10b981',
      },
      {
        id: 4,
        type: 'offer',
        text: 'Received offer from Vercel',
        time: '2 days ago',
        icon: '🎉',
        color: '#f59e0b',
      },
      {
        id: 5,
        type: 'application',
        text: 'Applied to SDE at Amazon',
        time: '3 days ago',
        icon: '📝',
        color: '#6366f1',
      },
    ];
  },

  async getUpcomingInterviews() {
    await delay(300);
    return [
      {
        id: 1,
        company: 'Google',
        role: 'Frontend Engineer',
        date: 'Jun 28, 2026',
        time: '10:00 AM',
        type: 'Technical',
      },
      {
        id: 2,
        company: 'Meta',
        role: 'React Developer',
        date: 'Jul 02, 2026',
        time: '2:00 PM',
        type: 'System Design',
      },
      {
        id: 3,
        company: 'Stripe',
        role: 'Software Engineer',
        date: 'Jul 05, 2026',
        time: '11:30 AM',
        type: 'Behavioral',
      },
    ];
  },

  async getProfileCompletion() {
    await delay(200);
    return {
      percentage: 72,
      completed: ['Personal Info', 'Skills', 'Resume'],
      pending: ['Experience', 'Education', 'Portfolio'],
    };
  },
};

export default dashboardService;
