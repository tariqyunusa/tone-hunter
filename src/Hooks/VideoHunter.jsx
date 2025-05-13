import { useState, useRef, useEffect } from "react";

const convertToHex = (r, g, b) => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
};

const convertToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

const useVideoDominantColor = (videoUrl, interval = 1000, format = 'rgb') => {
  const [dominantColor, setDominantColor] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));
  const intervalId = useRef(null);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    const video = videoRef.current;
    video.crossOrigin = 'anonymous';

    const ctx = canvasRef.current.getContext('2d');

    const getDominantColor = () => {
      if (video.readyState < 2 || video.paused || video.ended) return;

      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      const { data } = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);

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

      let color;
      if (format === 'hex') {
        color = convertToHex(dominant[0], dominant[1], dominant[2]);
      } else if (format === 'hsl') {
        color = convertToHsl(dominant[0], dominant[1], dominant[2]);
      } else {
        color = `rgb(${dominant[0]},${dominant[1]},${dominant[2]})`; 
      }

      setDominantColor(color);
    };

    const startSampling = () => {
      intervalId.current = setInterval(getDominantColor, interval);
    };

    video.addEventListener('play', startSampling);

    return () => {
      clearInterval(intervalId.current);
      video.removeEventListener('play', startSampling);
    };
  }, [videoUrl, interval, format]);

  return { dominantColor, videoRef };
};

export default useVideoDominantColor;
