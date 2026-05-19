'use client';
import { useEffect, useState } from 'react';
import styles from './SecurityGauge.module.css';

export default function SecurityGauge({ score = 0, size = 180, label = 'Güvenlik Skoru' }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * score);
      setAnimatedScore(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    animate();
  }, [score]);

  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  
  const getColor = () => {
    if (animatedScore >= 80) return '#00E676';
    if (animatedScore >= 50) return '#FFB300';
    return '#FF3B5C';
  };

  const getGradientId = () => {
    if (animatedScore >= 80) return 'gaugeGreen';
    if (animatedScore >= 50) return 'gaugeAmber';
    return 'gaugeRed';
  };

  const getStatusText = () => {
    if (animatedScore >= 80) return 'Güvenli';
    if (animatedScore >= 50) return 'Riskli';
    return 'Tehlikeli';
  };

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg className={styles.svg} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="gaugeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E676" />
            <stop offset="100%" stopColor="#69F0AE" />
          </linearGradient>
          <linearGradient id="gaugeAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FFD54F" />
          </linearGradient>
          <linearGradient id="gaugeRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3B5C" />
            <stop offset="100%" stopColor="#FF6B81" />
          </linearGradient>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          className={styles.bgCircle}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className={styles.fillCircle}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${getGradientId()})`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          filter="url(#gaugeGlow)"
        />
      </svg>
      <div className={styles.value}>
        <span className={styles.number} style={{ color: getColor() }}>
          {animatedScore}
        </span>
        <span className={styles.statusText} style={{ color: getColor() }}>
          {getStatusText()}
        </span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
