import React, { useCallback, useEffect } from 'react';
import { mousemoveFn } from './useNearBy';
import { Tween } from 'react-gsap';
// @ts-ignore
import { Power2 } from 'gsap/TweenMax';

const lineEq = (y2: number, y1: number, x2: number, x1: number, currentVal: number) => {
  // y = mx + b
  const m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
  return m * currentVal + b;
};

const distanceThreshold = { min: 0, max: 100 };

/**************** Heart Icon ****************/
// const iconHeart = document.querySelector('.icon--heart');
// const iconHeartButton = iconHeart.parentNode;
const heartbeatInterval = { from: 1, to: 40 };
const grayscaleInterval = { from: 1, to: 0 };
// const tweenHeart = TweenMax.to(iconHeart, 5, {
//   yoyoEase: Power2.easeOut,
//   repeat: -1,
//   yoyo: true,
//   scale: 1.3,
//   paused: true
// });
type Status = 'running' | 'paused';
const HearBeat: React.FC = () => {
  const ref = React.useRef(null);
  const tweenRef = React.useRef<Tween | any>(null);
  const [stateHeart, setStateHeart] = React.useState<Status>('paused');
  const [bw, setBw] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const [distance, setDistance] = React.useState(NaN);
  const elm = tweenRef.current && (tweenRef.current as any).targets[0];
  mousemoveFn(elm, setDistance);
  /*useEffect(() => {
    const tweenHeart = tweenRef.current.getGSAP();
    const time = lineEq(heartbeatInterval.from, heartbeatInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
    tweenHeart.timeScale(Math.min(Math.max(time, heartbeatInterval.from), heartbeatInterval.to));
    if (distance < distanceThreshold.max && distance >= distanceThreshold.min && stateHeart !== 'running') {
      tweenHeart.play();
      setStateHeart('running');
    } else if ((distance > distanceThreshold.max || distance < distanceThreshold.min) && stateHeart !== 'paused') {
      tweenHeart.pause();
      setStateHeart('paused');
      // TweenMax.to(iconHeart, .2, {
      //   ease: Power2.easeOut,
      //   scale: 1,
      //   onComplete: () => tweenHeart.time(0)
      // });
      setScale(1);
    }

    const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
    setBw(bw);
    // TweenMax.to(iconHeart, 1, {
    //   ease: Power2.easeOut,
    //   filter: `grayscale(${Math.min(bw, grayscaleInterval.from)})`
    // });
  }, [distance, stateHeart]);*/
  console.log('☞☞☞ 9527 HeartBeat 60', distance);
  return (
    <>
      {ref.current && JSON.stringify((ref.current as any).getBoundingClientRect())}
      <Tween
        to={{
          filter: `grayscale(${Math.min(bw, grayscaleInterval.from)})`,
          scale: scale,
        }}
        duration={0.2}
        ease={Power2.easeOut}
        ref={tweenRef}
      >
        <svg
          className="icon icon--heart"
          filter="grayscale(1)"
          ref={ref}
        >
          <defs>
            <svg id="heart__a" viewBox="0 0 24 21">
              <path
                d="M20.497.957A6.765 6.765 0 0017.22.114a6.76 6.76 0 00-5.218 2.455A6.778 6.778 0 003.506.957 6.783 6.783 0 000 6.897c0 .732.12 1.434.335 2.09 1.163 5.23 11.668 11.827 11.668 11.827s10.498-6.596 11.663-11.826a6.69 6.69 0 00.336-2.091 6.786 6.786 0 00-3.505-5.94z"/>
            </svg>
          </defs>
          <use href="#heart__a"/>
        </svg>
      </Tween>
      <style>{`
        .icon {
            display: block;
            width: 1.5em;
            height: 1.5em;
            margin: 0 auto;
            fill: currentColor;
        }
        .icon--heart {
            color: #ec165f;
            filter: grayscale(1);
        }
      `}</style>
    </>
  );
};

export default HearBeat;