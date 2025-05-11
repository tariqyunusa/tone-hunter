import { useState, useRef, useEffect } from "react";
const useVideoDominantColor = (videoUrl, interval = 1000) => {
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

      setDominantColor(dominant);
    };

    const startSampling = () => {
      intervalId.current = setInterval(getDominantColor, interval);
    };

    video.addEventListener('play', startSampling);

    return () => {
      clearInterval(intervalId.current);
      video.removeEventListener('play', startSampling);
    };
  }, [videoUrl, interval]);

  return { dominantColor, videoRef };
};
export default useVideoDominantColor