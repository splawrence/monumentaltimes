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
                <p>There will be no coarse language, excessive violence, or inappropriate situations portrayed in any writing for the content of this newspaper in order to be completely Above Reproach and bring glory to God in our writing by honoring His ways and protecting the innocence of our readers. Although these things are a very real part of our world, including them in our writing is unnecessary. Art should reflect reality, yes, but also help to shape our lives: therefore we will strive to influence towards Christlike-ness rather than worldliness.
Matthew 5:8 “Blessed are the pure in heart, For they shall see God.”
2 Timothy 2:22 “Flee also youthful lusts; but pursue righteousness, faith, love, peace with those who call on the Lord out of a pure heart.”
Hebrews 10:23-24 “Let us hold fast the confession of our hope without wavering, for he who promised is faithful. And let us consider how to stir up one another to love and good works, not neglecting to meet together, as is the habit of some, but encouraging one another, and all the more as you see the Day drawing near.”
</p>
                
                <h3>Independence and Objectivity</h3>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                
                <h3>Ethical Standards</h3>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                
                <h3>Corrections and Transparency</h3>
                <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2>Article Submission Guidelines</h2>
              <div className="policy-text">
                <h3>Submission Requirements</h3>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                
                <h3>Content Standards</h3>
                <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
                
                <h3>Word Count and Format</h3>
                <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                
                <h3>Review Process</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                
                <h3>Publication Timeline</h3>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                
                <h3>Rights and Attribution</h3>
                <p>Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
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
