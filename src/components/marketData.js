import { useEffect, useState } from 'react';

const marketData = (endpoint) => {
  
  const [data, setData] = useState([]);
  const getData = async () => {

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });
      const json = await response.json();
      setData(json);
    }
    catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return data;
};




export default marketData;