import React, { useState } from 'react';
import styles from './styles.module.css'

const Caption = ({ onAddCaption }) => {
    const [caption, setCaption] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCaption({ text: caption, startTime: parseFloat(startTime), endTime: parseFloat(endTime) });
        setCaption('');
        setStartTime('');
        setEndTime('');
    };
    console.log('cdscsdcsd',parseFloat(startTime))

    return (
        <form onSubmit={handleSubmit} className={styles.caption_container}>
            <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="caption"
                required
            />
            <input
                type="number"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start Time(s)"
                required
            />
            <input
                type="number"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End Time(s)"
                required
            />
            <button type="submit" className={styles.caption_btn}>Add Caption</button>
        </form>
    );
};

export default Caption;
