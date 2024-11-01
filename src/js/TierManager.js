import { useEffect } from "react";

const tierConditions = [
  {
    level: 2,
    requiredCoins: 1000,
    message: "Congurations! You've reached Tier 2 with advanced bonuces!",
  },
  {
    level: 3,
    requiredCoins: 5000,
    message: "Welcome to Tier 3! New upgrades available!",
  },
  // TODO: 더 많은 티어 추가 가능
];

const TierManager = ({ coins, tier, setTier }) => {
  useEffect(() => {
    const nextTier = tierConditions.find((t) => t.level === tier + 1);
    if (nextTier && coins >= nextTier.requiredCoins) {
      setTier(nextTier.level);
      alert(nextTier.message);
    }
  }, [coins, tier, setTier]);

  return null;
};

export default TierManager;
