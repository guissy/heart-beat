import React from 'react';
import h1 from './assets/h1.png';
import './Wonderful.css';
import { Tween } from 'react-gsap';
// @ts-ignore
import { Power2 } from 'gsap/TweenMax';


interface Props {
}

const Wonderful: React.FC<Props> = ({ }) => {
  return (
    <section className="wonderful">
      <div className="h1-box">
      <Tween
        to={{
            scale: 0.14
        }}
        duration={1}
        ease={Power2.easeOut}
      >
        <div className="h1-wrap">
          <img src={h1} alt="" />
        </div>
      </Tween>
      </div>

    </section>
  );
};

export default Wonderful;