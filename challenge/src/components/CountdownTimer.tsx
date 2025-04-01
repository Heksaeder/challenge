import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
    const [duration, setDuration] = useState(15); // default duration in minutes
    const [countdownStarted, setCountdownStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [eventTime, setEventTime] = useState(0);

    useEffect(() => {
        if (countdownStarted) {
            const countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                let remainingTime = eventTime - currentTime;


                if (remainingTime <= 840000) {
                    // 14 minutes
                }


                if (remainingTime <= 0) {
                    remainingTime = 0;
                    clearInterval(countdownInterval);
                    alert("Countdown complete!");
                }

                setTimeRemaining(remainingTime);
            }, 1000);

            return () => clearInterval(countdownInterval);
        }
    }, [countdownStarted, eventTime]);

    const handleSetCountdown = () => {
        const currentTime = new Date().getTime();
        setEventTime(currentTime + duration * 60000);
        setCountdownStarted(true);
        localStorage.setItem("duration", duration.toString());
    };

    const handleStopCountdown = () => {
        setCountdownStarted(false);
        setTimeRemaining(0);
    };

    const handleResetCountdown = () => {
        setCountdownStarted(false);
        setDuration(15);
        setTimeRemaining(0);
        localStorage.removeItem("duration");
    };

    const formatTime = (time: any) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);

        return (
            <div className="countdown-display">
                <div className="countdown-value">
                    {minutes.toString().padStart(2, "0")} : {seconds.toString().padStart(2, "0")}
                </div>
            </div>
        );
    };

    return (
        <div className="countdown-timer-container">
            {!countdownStarted ? (
                <form className="countdown-form">
                    <input
                        name="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        min="1"
                        className={"inputduration"}
                    />

                    <button type="button" onClick={handleSetCountdown}>Start Countdown</button>
                </form>
            ) : (
                <>
                    {formatTime(timeRemaining)}
                    <div className="control-buttons">
                        <button onClick={handleStopCountdown}>Stop</button>
                        <button onClick={handleResetCountdown}>Reset</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CountdownTimer;