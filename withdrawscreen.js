import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const WithdrawScreen = () => {
  const { gameData, withdraw } = useGame();
  const [method, setMethod] = useState('paypal');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  
  const minWithdrawal = 50000;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    if (gameData.coins < minWithdrawal) {
      setMessage(`Minimum withdrawal is ${minWithdrawal} coins`);
      setSubmitting(false);
      return;
    }
    
    if (!address.trim()) {
      setMessage('Please enter your payment address');
      setSubmitting(false);
      return;
    }
    
    const success = await withdraw(method, address);
    
    if (success) {
      setMessage('Withdrawal request submitted successfully!');
      setAddress('');
    } else {
      setMessage('Withdrawal failed. Please try again.');
    }
    
    setSubmitting(false);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Withdraw Earnings</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <div className="flex justify-between items-center">
          <div className="text-lg">
            <span className="font-bold">Your Coins:</span> {gameData.coins}
          </div>
          <div className="text-lg">
            <span className="font-bold">Minimum:</span> {minWithdrawal}
          </div>
        </div>
        
        {gameData.coins < minWithdrawal && (
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg text-center">
            You need {minWithdrawal - gameData.coins} more coins to withdraw
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Withdrawal Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="paypal">PayPal</option>
            <option value="usdt">USDT (TRC20)</option>
            <option value="telebirr">Telebirr</option>
            <option value="bank">Ethiopian Commercial Bank</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {method === 'paypal' && 'PayPal Email'}
            {method === 'usdt' && 'USDT Wallet Address'}
            {method === 'telebirr' && 'Telebirr Phone Number'}
            {method === 'bank' && 'Bank Account Number'}
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder={
              method === 'paypal' ? 'your@email.com' :
              method === 'usdt' ? 'TRC20 wallet address' :
              method === 'telebirr' ? '+2519XXXXXXXX' :
              'Bank account number'
            }
          />
        </div>
        
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            message.includes('success') ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={submitting || gameData.coins < minWithdrawal}
          className={`w-full py-3 rounded-lg font-bold ${
            gameData.coins < minWithdrawal || submitting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {submitting ? 'Processing...' : 'Request Withdrawal'}
        </button>
      </form>
    </div>
  );
};

export default WithdrawScreen;
