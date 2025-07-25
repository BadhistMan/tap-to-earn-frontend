import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

const TapScreen = () => {
  const { gameData, tap } = useGame();
  const [tapping, setTapping] = useState(false);
  const [coinsAdded, setCoinsAdded] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  
  const handleTap = async () => {
    setTapping(true);
    
    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
    
    const newCoins = await tap();
    if (newCoins !== null) {
      const added = newCoins - gameData.coins;
      setCoinsAdded(added);
      setShowAnimation(true);
      
      // Reset animation after 1 second
      setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
    }
    
    setTapping(false);
  };
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Tap to Earn Coins!</h2>
      
      <div className="relative mb-8">
        <button
          onClick={handleTap}
          disabled={tapping}
          className="w-40 h-40 rounded-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 
                     shadow-lg transform active:scale-95 transition-transform duration-150
                     flex items-center justify-center text-2xl font-bold"
        >
          TAP
        </button>
        
        {showAnimation && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-green-500 font-bold text-xl animate-bounce">
              +{coinsAdded}
            </span>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg">
            <span className="font-bold">Tap Power:</span> {gameData.tapPower}
          </div>
          <div className="text-lg">
            <span className="font-bold">Coins:</span> {gameData.coins}
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Each tap gives you {gameData.tapPower} coins
          </p>
        </div>
      </div>
    </div>
  );
};

export default TapScreen;
