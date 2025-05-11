import React,{useEffect, useRef, useState} from 'react'
const useDominantColor = (imageUrl) => {
  const [dominantColor, setDominantColor] = useState(null);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const { data } = ctx.getImageData(0, 0, img.width, img.height);

      const colorCount = {};
      let maxCount = 0;
      let dominant = [0, 0, 0];

      for (let i = 0; i < data.length; i += 4 * 10) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 125) continue;

        const color = `${r},${g},${b}`;
        colorCount[color] = (colorCount[color] || 0) + 1;
        if (colorCount[color] > maxCount) {
          maxCount = colorCount[color];
          dominant = [r, g, b];
        }
      }

      setDominantColor(dominant);
    };
  }, [imageUrl]);

  return dominantColor;
};

export default useDominantColor;