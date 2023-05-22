import React, { useRef, useEffect } from 'react';

interface VideoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src?: MediaStream;
}

const Video: React.FC<VideoProps> = ({ src }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (src) {
        videoRef.current.srcObject = src;
      }
      videoRef?.current?.addEventListener('loadedmetadata', () => {
        videoRef?.current?.play();
      });
    }
  }, [src]);

  return (
    <div>
      <video ref={videoRef} className="h-full w-full object-cover" muted />
    </div>
  );
};

export default Video;
