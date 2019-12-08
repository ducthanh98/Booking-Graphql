import Toast from 'react-bootstrap/Toast';
import React from 'react';

const Toastr = (props) => {
    const { show, updateState, content } = props;
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'absolute',
                minHeight: '100px',
                width: '300px',
                top: 0,
                right: 0,
            }}
        >
            <Toast
                autohide show={show} delay={3000} onClose={() => updateState('showToastr', !show)}
            >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">App</strong>
                </Toast.Header>
                <Toast.Body style={{ backgroundColor: 'white' }}>{content}</Toast.Body>
            </Toast>
        </div>
    )
}

export default Toastr;