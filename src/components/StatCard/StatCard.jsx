import { memo, useRef } from 'react';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

/**
 * Stat Card — displays metric with icon, value, label and change indicator
 */
const StatCard = memo(function StatCard({
  icon,
  iconBg,
  iconColor,
  value,
  label,
  change,
  changeType = 'positive',
  timeframe = 'This Month',
  variant = 'default',
  delay = 0,
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`stat-card variant-${variant}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="stat-card-glow" />
      <div className="stat-card-header">
        <div
          className="stat-card-icon"
          style={iconBg ? { background: iconBg, color: iconColor } : {}}
        >
          {icon}
        </div>
        <div className="stat-card-actions">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
      </div>
      
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
      
      <div className="stat-card-footer">
        {change !== undefined && (
          <div className={`stat-card-change ${changeType}`}>
            {changeType === 'positive' ? (
              <TrendingUpIcon style={{ fontSize: 14 }} />
            ) : (
              <TrendingDownIcon style={{ fontSize: 14 }} />
            )}
            {changeType === 'positive' ? '+' : ''}{change}
          </div>
        )}
        <span className="stat-card-timeframe">{timeframe}</span>
      </div>
    </motion.div>
  );
});

export default StatCard;
