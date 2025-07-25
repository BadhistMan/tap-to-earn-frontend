import { useState, useEffect } from 'react';

export const useTelegramAuth = () => {
  const [userData, setUserData] = useState(null);
  const [initData, setInitData] = useState('');
  
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      
      const initData = tg.initData || '';
      const initDataUnsafe = tg.initDataUnsafe || {};
      
      setInitData(initData);
      
      if (initDataUnsafe.user) {
        setUserData({
          id: initDataUnsafe.user.id,
          username: initDataUnsafe.user.username,
          firstName: initDataUnsafe.user.first_name,
          lastName: initDataUnsafe.user.last_name,
          photoUrl: initDataUnsafe.user.photo_url
        });
      }
    }
  }, []);
  
  return { userData, initData };
};
