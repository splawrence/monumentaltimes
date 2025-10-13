import React from 'react';
import PropTypes from 'prop-types';
import './AboutUs.css';
import hopePhoto from '../assets/hopehanson.png';
import joannaPhoto from '../assets/joannarocke.png';

const AboutUs = ({ onClose }) => {
  return (
    <div className="about-us-overlay" onClick={onClose}>
      <div className="about-us" onClick={(e) => e.stopPropagation()}>
        <button className="about-us__close" onClick={onClose}>×</button>
        
        <header className="about-us__header">
          <h1>Meet Our Editorial Staff</h1>
          <p className="about-us__intro">
            The dedicated team behind Monumental Times, committed to chronicling faith 
            and preserving the monumental moments in our lives.
          </p>
        </header>

        <div className="staff-grid">
          <div className="staff-member">
            <div className="staff-member__image">
              <img src={hopePhoto} alt="Hope Hanson" />
            </div>
            <div className="staff-member__info">
              <h2>Hope Hanson</h2>
              <h3>Editor-in-Chief</h3>
              <p>
                "Jill-of-all-trades" and master of none, Hope Hanson has done a variety of 
                things in her life, but the most rewarding and life-changing of all was giving 
                her heart to Jesus Christ at a young age. When she isn't writing for newspapers, 
                you might find Hope playing piano, baking, working one of her many jobs, or 
                enjoying time with friends.
              </p>
              <p>
                Hope is a proud Wisconsinite and patriot. Even more, she is honored to be a 
                daughter of the King and each new day is an opportunity to serve the Lord with 
                every moment.
              </p>
              <blockquote className="staff-verse">
                "Cause me to hear Your lovingkindness in the morning, For in You do I trust; 
                Cause me to know the way in which I should walk, For I lift up my soul to You."
                <cite>— Psalm 143:8</cite>
              </blockquote>
            </div>
          </div>

          <div className="staff-member">
            <div className="staff-member__image">
              <img src={joannaPhoto} alt="Joanna Rocke" />
            </div>
            <div className="staff-member__info">
              <h2>Joanna Rocke</h2>
              <h3>Managing Editor</h3>
              <p>
                Joanna is happy to call Wisconsin home for now, but she can't wait to go to 
                her real home. When she gets There, the dream will be over, the morning begun, 
                and she will be where she was always intended to be.
              </p>
              <blockquote className="staff-verse">
                "You will show me the path of life; in Your presence is fullness of joy, 
                at Your right hand are pleasures forevermore."
                <cite>— Psalm 16:11</cite>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="about-mission">
          <h2>Our Mission</h2>
          <p>
            Throughout the Bible, God has always emphasized the importance of remembering. 
            He commanded the Israelites to set up monuments of stone to mark significant 
            moments in their history. This newspaper began with that same vision in mind: 
            remembering what God has done.
          </p>
          <p>
            Far too often in our busy lives we forget to remember the things God is working 
            all around us. In this publication you will find that everything written or 
            created has that driving purpose behind it: <strong>Remember!</strong> It is a call to be 
            intentional, to write down and record in our own "piles of stones" what our 
            Father in heaven is doing among His children... those Monumental moments in our lives.
          </p>
        </div>
      </div>
    </div>
  );
};

AboutUs.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AboutUs;