import { useEffect } from "react";
import "../App.css";

const DustParticle = () => {
  // 랜덤한 위치에 우주 먼지 애니메이션 추가
  useEffect(() => {
    const container = document.getElementById("dust-container");

    // 먼지 입자 생성
    const createDustParticle = () => {
      for (let i = 0; i < 100; i++) {
        const dustParticle = document.createElement("div");
        dustParticle.classList.add("dust-particle");
        setRandomPosition(dustParticle);
        container.appendChild(dustParticle);
      }
    };

    // 먼지 입자의 위치를 랜덤하게 설정
    const setRandomPosition = (element) => {
      element.style.top = `${Math.random() * 100}vh`;
      element.style.left = `${Math.random() * 100}vw`;
    };

    // 먼지 위치 업데이트 함수
    const updateDustPositions = () => {
      const particles = container.getElementsByClassName("dust-particle");
      for (let particle of particles) {
        setRandomPosition(particle);
      }
    };

    // 먼지 입자 생성 및 위치 업데이트 주기 설정
    createDustParticle();
    const intervalId = setInterval(updateDustPositions, 3000); // 3초마다 위치 변경

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 제거
      container.innerHTML = ""; // 먼지 입자 제거
    };
  }, []);
  return null; // 화면에 렌더링할 내용 없음.
};

export default DustParticle;
