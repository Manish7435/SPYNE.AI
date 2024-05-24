import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import styles from './styles.module.css'


const VideoPlayer = ({ videoUrl, captions }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0); 
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);

    const handleProgress = (state) => {
        setCurrentTime(state.playedSeconds);
    };

    const handleDuration = (duration) => {
        setTotalDuration(duration);
    };

    const seekToTime = (time) => {
        if (playerRef.current) {
            playerRef.current.seekTo(time);
            setIsPlaying(true)
        }
    };

    return (
        <div className='video_container'>
            <ReactPlayer 
                ref={playerRef}
                url={videoUrl}
                controls
                playing={isPlaying}
                onProgress={handleProgress}
                onDuration={handleDuration}
                height={window.innerWidth === 360 ? '220px' : '400px'}
                width={window.innerWidth === 360 ? '100%' : '600px'}
            />
            <div className={styles.timebar}>
                {captions.map(caption => (
                    <div
                        key={caption.startTime}
                        className={`${styles.caption_marker} ${currentTime >= caption.startTime && currentTime <= caption.endTime ? styles.active : ''}`}
                        style={{ left: `${(caption.startTime / totalDuration) * 100}%` }}
                        onClick={() => seekToTime(caption.startTime)}
                    >
                        {caption.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoPlayer