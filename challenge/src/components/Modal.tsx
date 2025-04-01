import React from "react";

interface ModalProps {
    timeRemaining: number;
}

const Modal: React.FC<ModalProps> = ({ timeRemaining }) => {
    const seconds = Math.ceil(timeRemaining / 1000);
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {seconds > 0 ? (
                    <div className="countdown">{seconds}</div>
                ) : (
                    <div className="game-over">Game Over</div>
                )}
            </div>
        </div>
    );
};

export default Modal;