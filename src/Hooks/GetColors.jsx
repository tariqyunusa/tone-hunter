const getAllColors = async (image, step = 4 * 10, quantize = true) => {
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

      const color = `${r},${g},${b}`;
      colorMap[color] = (colorMap[color] || 0) + 1;
    }

    const sorted = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .map(([color, count]) => ({ color, count }));

    resolve(sorted);
  });
};

export default getAllColors;
