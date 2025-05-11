import React from 'react';
import useDominantColor from './ImageHunter';

const ToneHunter = ({ imageUrl }) => {
  const dominantColor = useDominantColor(imageUrl);

  return (
    <div>
      <img src={imageUrl} alt="source" style={{ maxWidth: '200px' }} />
      {dominantColor && (
        <div>
          Dominant Color: rgb({dominantColor.join(', ')})
          <div
            style={{
              width: 50,
              height: 50,
              backgroundColor: `rgb(${dominantColor.join(', ')})`,
              marginTop: '10px',
              border: '1px solid #000',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ToneHunter;
