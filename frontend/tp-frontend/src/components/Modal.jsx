import React from 'react';

export default function Modal({ children, onClose }) {
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={handleContentClick}>
                {children}
            </div>
        </div>
    );
}