import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTelegramAuth } from '../hooks/useTelegramAuth';
import { getUser, tap, upgrade, claimDaily, submitReferral, withdraw } from '../services/api';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const { userData, initData } = useTelegramAuth();
  const [gameData, setGameData] = useState({
    coins: 0,
    tapPower: 1,
    referralCount: 0,
    lastDailyClaim: null,
    loading: true
  });
  
  const [leaderboard, setLeaderboard] = useState([]);
  
  const fetchUserData = async () => {
    if (!userData) return;
    
    try {
      const data = await getUser(userData.id, initData);
      setGameData({
        coins: data.coins,
        tapPower: data.tap_power,
        referralCount: data.referral_count,
        lastDailyClaim: data.last_daily_claim,
        loading: false
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };
  
  const handleTap = async () => {
    try {
      const data = await tap(initData);
      setGameData(prev => ({
        ...prev,
        coins: data.coins
      }));
      return data.coins;
    } catch (error) {
      console.error('Tap failed:', error);
      return null;
    }
  };
  
  const handleUpgrade = async () => {
    try {
      const data = await upgrade(initData);
      setGameData(prev => ({
        ...prev,
        coins: data.coins,
        tapPower: data.tap_power
      }));
      return true;
    } catch (error) {
      console.error('Upgrade failed:', error);
      return false;
    }
  };
  
  const handleDailyClaim = async () => {
    try {
      const data = await claimDaily(initData);
      setGameData(prev => ({
        ...prev,
        coins: data.coins,
        lastDailyClaim: data.last_daily_claim
      }));
      return true;
    } catch (error) {
      console.error('Daily claim failed:', error);
      return false;
    }
  };
  
  const handleReferral = async (code) => {
    try {
      const data = await submitReferral(initData, code);
      setGameData(prev => ({
        ...prev,
        coins: data.coins
      }));
      return true;
    } catch (error) {
      console.error('Referral failed:', error);
      return false;
    }
  };
  
  const handleWithdraw = async (method, address) => {
    try {
      const data = await withdraw(initData, method, address);
      setGameData(prev => ({
        ...prev,
        coins: data.coins
      }));
      return true;
    } catch (error) {
      console.error('Withdrawal failed:', error);
      return false;
    }
  };
  
  useEffect(() => {
    if (userData) {
      fetchUserData();
    }
  }, [userData]);
  
  const value = {
    user: userData,
    gameData,
    leaderboard,
    tap: handleTap,
    upgrade: handleUpgrade,
    claimDaily: handleDailyClaim,
    submitReferral: handleReferral,
    withdraw: handleWithdraw,
    refreshData: fetchUserData
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
