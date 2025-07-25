const API_BASE = process.env.REACT_APP_API_BASE || 'https://tap-to-earn-backend.onrender.com';

export const getUser = async (telegramId, initData) => {
  const response = await fetch(`${API_BASE}/api/user/${telegramId}`, {
    headers: {
      'X-Init-Data': initData
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  
  return await response.json();
};

export const tap = async (initData) => {
  const response = await fetch(`${API_BASE}/api/tap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ init_data: initData })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Tap failed');
  }
  
  return await response.json();
};

export const upgrade = async (initData) => {
  const response = await fetch(`${API_BASE}/api/upgrade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ init_data: initData })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upgrade failed');
  }
  
  return await response.json();
};

export const claimDaily = async (initData) => {
  const response = await fetch(`${API_BASE}/api/daily`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ init_data: initData })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Daily claim failed');
  }
  
  return await response.json();
};

export const submitReferral = async (initData, referralCode) => {
  const response = await fetch(`${API_BASE}/api/referral`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      init_data: initData,
      referral_code: referralCode
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Referral failed');
  }
  
  return await response.json();
};

export const withdraw = async (initData, method, address) => {
  const response = await fetch(`${API_BASE}/api/withdraw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      init_data: initData,
      method: method,
      address: address
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Withdrawal failed');
  }
  
  return await response.json();
};

export const getLeaderboard = async () => {
  const response = await fetch(`${API_BASE}/api/leaderboard`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard');
  }
  
  return await response.json();
};
