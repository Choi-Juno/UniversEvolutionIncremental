// components/SmoothCounter.js
import React, { useEffect, useState, useRef } from "react";
import { formatNumber } from "../utils/formatNumber";

const SmoothCounter = ({ targetValue }) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const duration = 1000; // 1초 동안 애니메이션 실행

    const updateDisplayValue = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      if (elapsed < duration) {
        // 목표값에 비례한 증가량 계산
        const progress = elapsed / duration;
        const newValue = displayValue + (targetValue - displayValue) * progress;
        setDisplayValue(newValue);
        requestRef.current = requestAnimationFrame(updateDisplayValue);
      } else {
        // 애니메이션이 종료되면 정확한 목표값으로 설정
        setDisplayValue(targetValue);
        cancelAnimationFrame(requestRef.current);
        startTimeRef.current = null;
      }
    };

    requestRef.current = requestAnimationFrame(updateDisplayValue);
    return () => cancelAnimationFrame(requestRef.current);
  }, [targetValue, displayValue]);

  return <span>{formatNumber(Math.round(displayValue))}</span>;
};

export default SmoothCounter;
