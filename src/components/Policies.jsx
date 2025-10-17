import React from 'react';
import PropTypes from 'prop-types';
import './Policies.css';

const Policies = ({ onClose }) => {
  return (
    <div className="policies-overlay">
      <div className="policies-modal">
        <button className="close-button" onClick={onClose} aria-label="Close policies">
          ×
        </button>

        <div className="policies-content">
          <header className="policies-header">
            <h1>Policies & Submission Guidelines</h1>
            <p className="policies-subtitle">Monumental Times Editorial Standards and Article Submission Criteria</p>
          </header>

          <div className="policies-sections">
            <section className="policy-section">
              <h2>Policies</h2>
              <div className="policy-text">
                <h3>General Content</h3>
                <p>There will be no coarse language, excessive violence, or inappropriate situations portrayed in any writing for the content of this newspaper in order to be completely Above Reproach and bring glory to God in our writing by honoring His ways and protecting the innocence of our readers. Although these things are a very real part of our world, including them in our writing is unnecessary.</p>

                <p>Art should reflect reality, yes, but also help to shape our lives: therefore we will strive to influence towards Christlike-ness rather than worldliness.</p>

                <blockquote>
                  <p>Matthew 5:8 "Blessed are the pure in heart, For they shall see God."</p>
                  <p>2 Timothy 2:22 "Flee also youthful lusts; but pursue righteousness, faith, love, peace with those who call on the Lord out of a pure heart."</p>
                  <p>Hebrews 10:23-24 "Let us hold fast the confession of our hope without wavering, for he who promised is faithful. And let us consider how to stir up one another to love and good works, not neglecting to meet together, as is the habit of some, but encouraging one another, and all the more as you see the Day drawing near."</p>
                </blockquote>

              </div>
            </section>

            <section className="policy-section">
              <h2>Article Submission Guidelines</h2>
              <div className="policy-text">
                <h3>Submission Requirements</h3>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
              </div>
            </section>
          </div>

          <footer className="policies-footer">
            <p><strong>Last Updated:</strong> October 2025</p>
            <p>For questions regarding these policies or submission guidelines, please contact our editorial team.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

Policies.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Policies;
