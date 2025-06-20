import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown>{text}</ReactMarkdown>;

  useEffect(() => {
    fetch(endpoints.about)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <div className="about-section">
                <div className="about-image-container">
                  <img
                    src={data?.imageSource}
                    alt="profile"
                    className="about-profile-image"
                  />
                </div>
                <div className="about-text-container">
                  {parseIntro(data.about)}
                </div>
              </div>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
