import React, { useEffect, useState } from 'react';
import { getUserData } from '../../../services/userService';  

const UserData = () => {
  // State to store raw JSON data
  const [rawData, setRawData] = useState('');

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const jsonData = await getUserData();
        setRawData(JSON.stringify(jsonData, null, 2)); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <pre>
      <code>
        {rawData}
      </code>
    </pre>
  );
};

export default UserData;
