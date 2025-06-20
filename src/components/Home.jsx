import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <Fade>
      <div className="home-container">
        <h1 className="home-name">{data?.name}</h1>
        <div style={{ flexDirection: 'row' }}>
          <h2 className="home-intro">I&apos;m&nbsp;</h2>
          <span className="typewriter-text">
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: data?.roles,
              }}
            />
          </span>
        </div>
        <Social />
        <a href="/projects" className="btn btn-gradient">View My Work</a>
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
