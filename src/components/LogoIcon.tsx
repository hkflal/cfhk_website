import React from 'react';

interface LogoIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ 
  width = 40, 
  height = 40, 
  className = "" 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="45" fill="currentColor" />
      <text 
        x="50" 
        y="58" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fontSize="40" 
        fontWeight="bold" 
        fill="white"
      >
        CF
      </text>
    </svg>
  );
};

export default LogoIcon; 