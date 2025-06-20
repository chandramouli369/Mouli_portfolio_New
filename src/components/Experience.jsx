import React, { useEffect, useState } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

function Experience(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />

      {data
        ? (
          <div className="section-content-container">
            <Container>
              <Timeline
                lineColor="var(--primary-color)"
              >
                {data.map((item) => (
                  <Fade>
                    <TimelineItem
                      key={item.title + item.dateText}
                      dateText={item.dateText}
                      dateInnerStyle={{ background: 'var(--primary-color)' }}
                      className="experience-item"
                      bodyContainerStyle={{ color: 'var(--text-color)' }}
                    >
                      <h2 className="item-title">
                        {item.title}
                      </h2>
                      <div className="experience-subtitle-container">
                        <h4 style={{ color: 'var(--primary-color)', display: 'inline' }} className="experience-subtitle">
                          {item.subtitle}
                        </h4>
                        {item.workType && (
                        <h5 className="experience-inline-child" style={{ display: 'inline', marginLeft: 8 }}>
                          {` ${item.workType}`}
                        </h5>
                        )}
                      </div>
                      <ul className="experience-ul">
                        {item.workDescription.map((point) => (
                          <div key={point}>
                            <li>
                              <ReactMarkdown
                                children={point}
                                components={{
                                  p: 'span',
                                }}
                              />
                            </li>
                            <br />
                          </div>
                        ))}
                      </ul>
                    </TimelineItem>
                  </Fade>
                ))}
              </Timeline>
            </Container>
          </div>
        ) : <FallbackSpinner /> }
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
