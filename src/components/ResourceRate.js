import { useEffect, useRef } from "react";

const ResourceRate = ({
  rate = 1, // 기본 획득량
  cooldown = 1000, // 초기 쿨다운(ms)
  multiplier = 1, // 배수
  boost = 1, // 부스트
  setResource, // 상태 업데이트 함수
}) => {
  const lastUpdateTimeRef = useRef(Date.now()); // 마지막 업데이트 시간
  const accumulatedGainRef = useRef(0); // 누적된 획득량

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastUpdateTimeRef.current;

      // 초당 획득량 계산
      const gainPerSecond = (rate / cooldown) * 1000 * multiplier * boost;

      // 획득량 누적
      accumulatedGainRef.current += gainPerSecond;

      if (elapsedTime >= 1000) {
        const totalGain = Math.floor(accumulatedGainRef.current);
        setResource((prev) => prev + totalGain); // 상태 업데이트
        accumulatedGainRef.current -= totalGain;
        lastUpdateTimeRef.current = currentTime;
      }
    }, 1000); // 0.1초마다 체크

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
  }, [rate, cooldown, multiplier, boost, setResource]);

  return null;
};

export default ResourceRate;
