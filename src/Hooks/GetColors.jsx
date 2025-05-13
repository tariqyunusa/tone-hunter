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

const getAllColors = async (image, step = 4 * 10, quantize = true, format = 'rgb') => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;
    const colorMap = {};

    for (let i = 0; i < data.length; i += step) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      let a = data[i + 3];

      if (a < 125) continue;

      if (quantize) {
        r = Math.round(r / 16) * 16;
        g = Math.round(g / 16) * 16;
        b = Math.round(b / 16) * 16;
      }

      let color;
      if (format === 'hex') {
        color = convertToHex(r, g, b);
      } else if (format === 'hsl') {
        color = convertToHsl(r, g, b);
      } else {
        color = `rgb(${r},${g},${b})`;
      }

      colorMap[color] = (colorMap[color] || 0) + 1;
    }

    const sorted = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .map(([color, count]) => ({ color, count }));

    resolve(sorted);
  });
};

export default getAllColors;
