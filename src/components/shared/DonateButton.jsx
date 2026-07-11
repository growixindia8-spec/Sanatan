import React from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const DonateButton = ({ campaign, className, children = 'Donate Now', onClick, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // If a custom onClick is provided, call it
    if (onClick) {
      onClick(e);
    }
    
    if (!e.defaultPrevented) {
      const targetUrl = campaign ? `/donate?campaign=${encodeURIComponent(campaign)}` : '/donate';
      navigate(targetUrl);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={twMerge(
        'bg-[#FF6A00] text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wider',
        'shadow-md shadow-orange-500/20 btn-animated',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default DonateButton;
