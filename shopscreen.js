import React from 'react';
import { useGame } from '../context/GameContext';

const ShopScreen = () => {
  const { gameData, upgrade } = useGame();
  
  const calculateUpgradeCost = (currentPower) => {
    return 100 * Math.pow(2, currentPower - 1);
  };
  
  const nextUpgradeCost = calculateUpgradeCost(gameData.tapPower);
  
  const handleUpgrade = async () => {
    if (gameData.coins < nextUpgradeCost) {
      alert('Not enough coins!');
      return;
    }
    
    const success = await upgrade();
    if (success) {
      alert('Upgrade successful!');
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Upgrade Shop</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg">
            <span className="font-bold">Current Power:</span> {gameData.tapPower}
          </div>
          <div className="text-lg">
            <span className="font-bold">Coins:</span> {gameData.coins}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">Next Upgrade</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold">Tap Power: {gameData.tapPower} → {gameData.tapPower + 1}</p>
            <p className="text-gray-600">+1 coin per tap</p>
          </div>
          <div className="text-xl font-bold">{nextUpgradeCost} coins</div>
        </div>
        
        <button
          onClick={handleUpgrade}
          disabled={gameData.coins < nextUpgradeCost}
          className={`w-full py-3 rounded-lg font-bold ${
            gameData.coins < nextUpgradeCost
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {gameData.coins < nextUpgradeCost ? 'Not Enough Coins' : 'Buy Upgrade'}
        </button>
      </div>
      
      <div className="mt-6 text-center text-gray-600">
        <p>Upgrade costs double with each level</p>
      </div>
    </div>
  );
};

export default ShopScreen;
