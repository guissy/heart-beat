import React from 'react';
import h1 from './assets/h1.png';
import './Wonderful.css';
import { Tween, Timeline } from 'react-gsap';
// @ts-ignore
import { Power2 } from 'gsap/TweenMax';


interface Props {
}

const Wonderful: React.FC<Props> = ({ }) => {
  return (
    <section className="wonderful">
      <Timeline target={
        <div className="h1-box">
          <Tween
            delay={4}
            to={{
              scale: 0.1,
              borderRadius: '50%',
              padding: '42%',
            }}
            duration={1.2}
            ease={Power2.easeIn}
          >
            <div className="h1-wrap">
              <img src={h1} alt="" />
            </div>
          </Tween>
        </div>
      }>
        <Tween
          delay={2}
          from={{
            scale: 3,
          }}
          to={{
            scale: 1.8,
          }}
          duration={1}
          ease={Power2.easeIn}
        />
        <Tween
          from={{ backgroundColor: "#ffffff", }}
          to={{
            scale: 1,
            backgroundColor: '#e4e3e4'
          }}
          duration={1}
          ease={Power2.easeOut}
        />
        <Tween
          from={{ borderRadius: 0 }}
          to={{
            width: 436,
            height: 436,
            borderRadius: '50%'
          }}
          duration={1}
          ease={Power2.easeOut}
        />
      </Timeline>
    </section >
  );
};

export default Wonderful;