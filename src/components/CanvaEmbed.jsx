import React from 'react';
import './CanvaEmbed.css';

const CanvaEmbed = () => {
  return (
    <div className="canva-embed-container">
      <div className="canva-embed-wrapper">
        <iframe
          loading="lazy"
          className="canva-embed-iframe"
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