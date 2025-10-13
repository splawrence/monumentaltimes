import React from 'react';
import './CanvaEmbed.css';

const CanvaEmbed = () => {
  return (
    <div className="canva-embed-container">
      <div className="canva-embed-wrapper">
        <iframe
          loading="lazy"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 'none',
            padding: 0,
            margin: 0
          }}
          src="https://www.canva.com/design/DAGy_fHSwTY/iAJAzEKq5XSYVvNh8-OriA/view?embed"
          allowFullScreen="allowfullscreen"
          allow="fullscreen"
          title="Canva Design"
        />
      </div>
    </div>
  );
};

export default CanvaEmbed;