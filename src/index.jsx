import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import getAllColors from './Hooks/GetColors';

const Index = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const image = new Image();
    image.src = '/gr-2.jpg'; 
    image.crossOrigin = 'Anonymous';

    image.onload = async () => {
      const result = await getAllColors(image);
      setColors(result);
    };
  }, []);

  return (
    <div>
      <h1>Dominant Colors</h1>
      <ul>
        {colors.slice(0, 10).map(({ color, count }, i) => (
          <li key={i} style={{ background: `rgb(${color})`, padding: '10px', margin: '5px', color: '#fff' }}>
            rgb({color}) — {count} pixels
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index
