import { useEffect, useState } from "react";

// JSON 데이터를 암호화하여 로컬스토리지에 저장하는 함수
const saveGameState = (state) => {
  const gameStateString = JSON.stringify(state);
  const encryptedState = btoa(gameStateString); // BASE64 인코딩
  localStorage.setItem("gameState", encryptedState);
};

// 로커스토리지에서 암호화된 JSON 데이터를 불러와 복호화하는 함수
const loadGameState = () => {
  const encryptedState = localStorage.getItem("gameState");
  if (encryptedState) {
    try {
      const decryptedState = atob(encryptedState); // BASE64 디코딩
      return JSON.parse(decryptedState) || {}; // 파싱 성공시 데이터 반환, 실패 시 빈 객체
    } catch (e) {
      console.error("Failed to load game State: ", e);
    }
  }

  return {}; // 초기 상태가 없을 때 빈 객체 변환
};

function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    const gameState = loadGameState();
    // gameState에 ㄱ밧이 있으면 해당 값을 사용, 없으면 초기값으로 설정
    return gameState && gameState[key] !== undefined
      ? gameState[key]
      : initialValue;
  });

  useEffect(() => {
    const gameState = loadGameState() || {};
    const updatedState = { ...gameState, [key]: state };
    saveGameState(updatedState); // 변경된 전체 상태를 저장
  }, [state, key]);
  return [state, setState];
}

export default usePersistentState;
