import { useEffect } from "react";

const AutoCollector = ({ coins, setCoins, autoCoin }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prevCoins) => prevCoins + autoCoin);
    }, 1000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 제거
  }, [autoCoin, setCoins]);
  return null; // 화면에 렌더링 할 내용 없음
};

export default AutoCollector;
