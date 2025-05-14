# Tone Hunter

Tone hunter is a package that provides React hooks and utilities to extract color data from images and videos using canvas-based pixel sampling. It supports different color formats including RGB, HEX, and HSL.

## Features

- Get all colors from an image with frequency counts.
- Detect the dominant color of an image.
- Track the dominant color from a video over time.
- Output in rgb, hex, or hsl formats.
- Works client-side using the HTML Canvas API.

## Installation

```bash
npm install tone-hunter
```

## Hooks

- useGetAllColors
- useDominantColor
- useVideoDominantColor

## API Refrence

1. useGetAllColors(image, step?, quantize?, format?)
   extracts and sorts all visible colors from an HTML image element.

### parameters

- image (HTMLImageElement): Image to extract colors from.
- step(number): Sampling rate. defaults to 40. (N.B: higher values = fewer pixels checked).
- quantize(boolean): reduces color noise by grouping similar shades. defaults to true.
- format('rgb' | 'hex' | 'hsl'): Output color format. defaults to 'rgb'.

### Usage

```JavaScript
import { useEffect } from 'react'
import { useGetAllColors } from 'tone-hunter';


const Component = () => {
    useEffect(() => {
        const img = new Image();

        img.src = '/pathtoimage.jpg';
        img.onload = async  () => {
            const colors = await useGetAllColors(img, 40, true, 'hex');
            console.log("colors extracted", colors);
    };
    },[])

    return(
        <>
            ...
        </>
    )
};

export default Component
```

### Returns:

A promise resolving to an array of objects.

```JavaScript
[
  { color: 'rgb(128, 128, 128)', count: 42 },
  { color: '#FF00FF', count: 33 },
  ...
]
```

2. useDominantColor(image, format?)
   Hook to extract the most frequent (dominant) color from an image URL.

### Parameters
- image (string): Public image URL.
- format ('rgb' | 'hex' | 'hsl'): Output color format. Defaults to 'rgb'.

### Usage

useDominatColor can only be used in the body of a functional component as it is a hook.

```JavaScript
import { useState } from 'react';
import { useDominantColor } from 'tone-hunter';

const Component = () => {
const [imageUrl, setImageUrl] = useState('pathtoimage.jpg')

const color = useDominantColor(imageUrl, 'hsl')

return(
    <>
        ...
    </>
)
}

export default Component

```

3. useVideoDominantColor(videoUrl, interval?, format?)
Hook to track the dominant color of a video frame-by-frame as it plays.

### Parameters:
- videoUrl (string): Public video URL.
- interval (number): Time between samples in ms. Default is 1000 (1 second).
- format ('rgb' | 'hex' | 'hsl'): Output format. Defaults to 'rgb'.

### Usage
useVideoDominantColor can only be used in the body of a functional component as it is a hook.

```JavaScript
import { useVideoDominantColor } from 'tone-hunter';

const Component = () => {
  const { dominantColor, videoRef } = useVideoDominantColor('/video.mp4', 500, 'hex');

  return (
    <div style={{ backgroundColor: dominantColor }}>
      <video ref={videoRef} src="/video.mp4" controls />
    </div>
  );
};

export deafult Component

```
## Notes

- All hooks use the Canvas API, so images and videos must be served from the same origin or have proper CORS headers.
- Transparent pixels (alpha < 125) are ignored.
- For best performance, use smaller media dimensions or reduce sampling frequency.


## 🪪 License

This project is licensed under the [MIT License](./LICENSE).


