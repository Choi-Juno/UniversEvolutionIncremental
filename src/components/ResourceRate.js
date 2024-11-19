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
    const calculateResourceGain = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastUpdateTimeRef.current;

      if (elapsedTime >= 1000) {
        // 초당 획득량 계산
        const gainPerSecond = (rate / cooldown) * 1000 * multiplier * boost;

        // 누적 획득량 계산 및 적용
        accumulatedGainRef.current += gainPerSecond * (elapsedTime / 1000);
        const totalGain = Math.floor(accumulatedGainRef.current);

        if (totalGain > 0) {
          setResource((prev) => prev + totalGain); // 상태 업데이트
          accumulatedGainRef.current -= totalGain; // 누적값 정리
        }

        lastUpdateTimeRef.current = currentTime;
      }
    };

    const intervalId = setInterval(calculateResourceGain, 100); // 짧은 간격으로 확인

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
  }, [rate, cooldown, multiplier, boost, setResource]);

  return null;
};

export default ResourceRate;
