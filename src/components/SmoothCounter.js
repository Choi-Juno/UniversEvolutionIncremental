// components/SmoothCounter.js
import React, { useEffect, useState, useRef } from "react";
import { formatNumber } from "../utils/formatNumber";

const SmoothCounter = ({ targetValue }) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const requestRef = useRef(null);

  useEffect(() => {
    const duration = 1000; // 애니메이션의 전체 지속 시간 (1초)
    const frameRate = 60; // 초당 60프레임 (약 16ms 간격으로 업데이트)
    const totalFrames = duration / (1000 / frameRate); // 총 프레임 수 계산
    const increment = (targetValue - displayValue) / totalFrames; // 프레임당 증가량

    const animate = () => {
      setDisplayValue((prevValue) => {
        const newValue = prevValue + increment;

        // 목표값에 도달했거나 넘으면 정확히 목표값으로 설정하고 애니메이션 종료
        if (
          (increment > 0 && newValue >= targetValue) ||
          (increment < 0 && newValue <= targetValue)
        ) {
          cancelAnimationFrame(requestRef.current);
          return targetValue;
        }

        return newValue;
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current); // 클린업
  }, [targetValue, displayValue]);

  return <span>{formatNumber(Math.round(displayValue))}</span>; // 화면에 정수로만 표시
};

export default SmoothCounter;
