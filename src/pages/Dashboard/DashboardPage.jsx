
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import WorkOutlineIcon from '@mui/icons-material/WorkOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsOutlined';
import { StatCard } from '../../components';
import { useAuth, useTheme } from '../../contexts';
import dashboardService from '../../services/dashboardService';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const chartOptions = (isDark) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
      titleColor: isDark ? '#f1f5f9' : '#0f172a',
      bodyColor: isDark ? '#94a3b8' : '#64748b',
      borderColor: isDark ? '#1e293b' : '#e2e8f0',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      boxPadding: 4,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: isDark ? '#94a3b8' : '#64748b', font: { size: 12 } },
    },
    y: {
      grid: {
        color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      },
      ticks: { color: isDark ? '#94a3b8' : '#64748b', font: { size: 12 } },
    },
  },
});

export default function DashboardPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState({});
  const [activities, setActivities] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(null);
  const [chartFilter, setChartFilter] = useState('year');

  useEffect(() => {
    const fetchData = async () => {
      const [statsData, appData, successData, conversionData, actData, intData, profData] =
        await Promise.all([
          dashboardService.getStats(),
          dashboardService.getApplicationsByMonth(),
          dashboardService.getSuccessRate(),
          dashboardService.getInterviewConversion(),
          dashboardService.getRecentActivities(),
          dashboardService.getUpcomingInterviews(),
          dashboardService.getProfileCompletion(),
        ]);

      setStats(statsData);
      setChartData({ applications: appData, success: successData, conversion: conversionData });
      setActivities(actData);
      setInterviews(intData);
      setProfileCompletion(profData);
    };

    fetchData();
  }, []);

  const firstName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

  if (!stats) {
    return (
      <div className="dashboard-page">
        <div className="stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-card" style={{ height: 140, opacity: 0.5 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--surface-alt)' }} />
              <div style={{ width: '60%', height: 32, borderRadius: 8, background: 'var(--surface-alt)', marginTop: 16 }} />
              <div style={{ width: '40%', height: 16, borderRadius: 6, background: 'var(--surface-alt)', marginTop: 8 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Welcome */}
      <motion.div
        className="welcome-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="welcome-title">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},{' '}
          <span className="text-gradient">{firstName}</span> 👋
        </h2>
        <p className="welcome-subtitle">
          Here&apos;s what&apos;s happening with your career journey today.
        </p>
      </motion.div>

      {/* Profile Completion */}
      {profileCompletion && (
        <motion.div
          className="profile-completion"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Profile Completion</h3>
              <p className="text-muted text-small">Complete your profile to improve job matches</p>
            </div>
            <span className="badge badge-primary">{profileCompletion.percentage}%</span>
          </div>
          <div className="progress-bar-wrapper">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${profileCompletion.percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <div className="progress-label">
            <span>{profileCompletion.completed.length} completed</span>
            <span>{profileCompletion.pending.length} remaining</span>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          variant="primary"
          icon={<WorkOutlineIcon />}
          value={stats.totalApplications}
          label="Total Applications"
          change={stats.changes.applications.value}
          changeType={stats.changes.applications.type}
          delay={0.1}
        />
        <StatCard
          variant="default"
          icon={<ChatBubbleOutlineIcon />}
          value={stats.activeInterviews}
          label="Active Interviews"
          change={stats.changes.interviews.value}
          changeType={stats.changes.interviews.type}
          delay={0.2}
        />
        <StatCard
          variant="default"
          icon={<DescriptionIcon />}
          value={`${stats.resumeScore}%`}
          label="Resume Score"
          change={stats.changes.resumeScore.value}
          changeType={stats.changes.resumeScore.type}
          delay={0.3}
        />
        <StatCard
          variant="secondary"
          icon={<EmojiEventsIcon />}
          value={stats.offersReceived}
          label="Offers Received"
          change={stats.changes.offers.value}
          changeType={stats.changes.offers.type}
          delay={0.4}
        />
      </div>

      {/* Charts + Sidebar */}
      <div className="dashboard-grid">
        <div>
          {/* Applications Chart */}
          {chartData.applications && (
            <motion.div
              className="chart-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: '24px' }}
            >
              <div className="chart-header">
                <h3 className="chart-title">Applications Overview</h3>
                <div className="chart-filter">
                  {['week', 'month', 'year'].map((f) => (
                    <button
                      key={f}
                      className={chartFilter === f ? 'active' : ''}
                      onClick={() => setChartFilter(f)}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ height: 260 }}>
                <Line data={chartData.applications} options={chartOptions(isDark)} />
              </div>
            </motion.div>
          )}

          {/* Success Rate + Conversion */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {chartData.success && (
              <motion.div
                className="chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="chart-title" style={{ marginBottom: 24 }}>Success Funnel</h3>
                <div style={{ height: 220 }}>
                  <Doughnut
                    data={chartData.success}
                    options={{
                      ...chartOptions(isDark),
                      cutout: '65%',
                      scales: undefined,
                      plugins: {
                        ...chartOptions(isDark).plugins,
                        legend: { display: true, position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle', font: { size: 12 } } },
                      },
                    }}
                  />
                </div>
              </motion.div>
            )}

            {chartData.conversion && (
              <motion.div
                className="chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="chart-title" style={{ marginBottom: 24 }}>Interview Conversion</h3>
                <div style={{ height: 220 }}>
                  <Bar data={chartData.conversion} options={{
                    ...chartOptions(isDark),
                    plugins: {
                      ...chartOptions(isDark).plugins,
                      legend: { display: true, position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle', font: { size: 12 } } },
                    },
                  }} />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Resume Score */}
          <motion.div
            className="score-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: 24 }}
          >
            <div className="score-ring">
              <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-alt)" strokeWidth="10" />
                <motion.circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke={stats.resumeScore >= 70 ? '#10b981' : '#f59e0b'}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={314}
                  initial={{ strokeDashoffset: 314 }}
                  animate={{ strokeDashoffset: 314 - (314 * stats.resumeScore) / 100 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                />
              </svg>
              <span className="score-value">{stats.resumeScore}</span>
            </div>
            <p className="score-label">Resume ATS Score</p>
            <span className="badge badge-success">Good</span>
          </motion.div>

          {/* Upcoming Interviews */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ marginBottom: 24 }}
          >
            <div className="card-header">
              <h3 className="card-title">Upcoming Interviews</h3>
              <span className="badge badge-primary">{interviews.length}</span>
            </div>
            <div className="interview-list">
              {interviews.map((item) => (
                <div className="interview-item" key={item.id}>
                  <div className="interview-info">
                    <p className="interview-company">{item.company}</p>
                    <p className="interview-role">{item.role}</p>
                  </div>
                  <div className="interview-date">
                    <p className="date">{item.date}</p>
                    <p className="time">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card-header">
              <h3 className="card-title">Recent Activity</h3>
            </div>
            <div className="activity-list">
              {activities.map((activity) => (
                <div className="activity-item" key={activity.id}>
                  <div
                    className="activity-icon"
                    style={{ background: `${activity.color}15`, color: activity.color }}
                  >
                    {activity.icon}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.text}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
