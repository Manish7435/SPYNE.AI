import React, { useState } from 'react';
import styles from './styles.module.css'
import VideoPlayer from './components/VideoPlayer';
import Caption from './components/Caption';

function App() {
    const [videoUrl, setVideoUrl] = useState('');
    const [captions, setCaptions] = useState([]);
    const [inputUrl, setInputUrl] = useState('');
    const [error, setError] = useState(false)

    const handleAddCaption = (newCaption) => {
        for (let caption of captions) {
            if (
                (newCaption.startTime >= caption.startTime && newCaption.startTime <= caption.endTime) ||
                (newCaption.endTime >= caption.startTime && newCaption.endTime <= caption.endTime) ||
                (newCaption.startTime <= caption.startTime && newCaption.endTime >= caption.endTime)
            ) {
                setError(true)
                return false; 
            }
        }
        setCaptions([...captions, newCaption]);
        setError(false)
        return true; 
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        setVideoUrl(inputUrl);
        setCaptions([]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.spyne_logo}>
                <img src='https://www.spyne.ai/wp-content/uploads/2023/07/Spyne-Logo-Ecom-_-Home-page.png' alt='spyne'/>
            </div>
            <form onSubmit={handleUrlSubmit} className={styles.form}>
                <div className={styles.input_container}>
                    <input
                        className={styles.input_main}
                        type="url"
                        placeholder="Enter video URL"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.btn}>
                        <img className={styles.image} src='/Play.svg' alt="search" />
                    </button>
                </div>
            </form>
            {videoUrl && (
               <div className='video_container'>
                    <VideoPlayer videoUrl={videoUrl} captions={captions} />
                    <Caption onAddCaption={handleAddCaption} />
                    {error && <div className={styles.caption_error}>Please enter valid time, overlappind with one of the other captions</div>}
                    </div>
            )}
        </div>
    );
}

export default App;
