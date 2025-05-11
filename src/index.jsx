import React from 'react';
import useVideoDominantColor from './Hooks/VideoHunter';

const VideoColorPreview = ({ videoUrl }) => {
  const { dominantColor, videoRef } = useVideoDominantColor(videoUrl, 500);

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div>
        <video
          ref={videoRef}
          src={videoUrl}
          width={400}
          controls
          crossOrigin="anonymous"
        />
      </div>

      <div>
        {dominantColor ? (
          <>
            <p>Dominant Color: rgb({dominantColor.join(', ')})</p>
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: `rgb(${dominantColor.join(',')})`,
                border: '1px solid #000',
              }}
            />
          </>
        ) : (
          <p>Loading color…</p>
        )}
      </div>
    </div>
  );
};

export default VideoColorPreview;
