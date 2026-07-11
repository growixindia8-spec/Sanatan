import React, { useState, useEffect } from 'react';

export default function Typewriter({ headingText, subtextText, speed = 40 }) {
  const [typedHeading, setTypedHeading] = useState('');
  const [typedSubtext, setTypedSubtext] = useState('');
  const [phase, setPhase] = useState('heading'); // 'heading', 'subtext', 'done'

  useEffect(() => {
    // Reset typing state immediately when heading or subtext changes (e.g. slide change)
    setTypedHeading('');
    setTypedSubtext('');
    setPhase('heading');
  }, [headingText, subtextText]);

  // Heading typing effect
  useEffect(() => {
    if (phase !== 'heading') return;

    if (typedHeading.length < headingText.length) {
      const timeout = setTimeout(() => {
        setTypedHeading(headingText.slice(0, typedHeading.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Pause slightly before typing subheading
      const delay = setTimeout(() => {
        setPhase('subtext');
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [typedHeading, phase, headingText, speed]);

  // Subtext typing effect
  useEffect(() => {
    if (phase !== 'subtext') return;

    if (typedSubtext.length < subtextText.length) {
      const timeout = setTimeout(() => {
        setTypedSubtext(subtextText.slice(0, typedSubtext.length + 1));
      }, speed - 10); // slightly faster for subtext so it feels natural
      return () => clearTimeout(timeout);
    } else {
      setPhase('done');
    }
  }, [typedSubtext, phase, subtextText, speed]);

  return (
    <div className="w-full select-none">
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-devanagari leading-tight mb-4 drop-shadow-md min-h-[72px] sm:min-h-[96px] md:min-h-[120px]">
        {typedHeading}
        {phase === 'heading' && (
          <span className="inline-block w-1.5 ml-1 bg-saffron animate-pulse font-light">|</span>
        )}
      </h1>

      <p className="text-gray-200 text-base sm:text-lg md:text-xl font-medium mb-8 max-w-xl drop-shadow min-h-[48px] sm:min-h-[56px] md:min-h-[64px]">
        {typedSubtext}
        {phase === 'subtext' && (
          <span className="inline-block w-1.5 ml-1 bg-saffron animate-pulse font-light">|</span>
        )}
      </p>
    </div>
  );
}
