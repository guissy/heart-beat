import React, { useState, useEffect } from 'react';
import h1 from './assets/h1.png';
import './Wonderful.css';
import { Tween, Timeline } from 'react-gsap';
// @ts-ignore
import { Power2 } from 'gsap/TweenMax';



const Wonderful: React.FC = () => {
  const [num, setNum] = useState(3);
  useEffect(() => {
    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      setNum(count);
      if (count <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="wonderful">
      <img src={h1} alt="" style={{ width: 0, height: 0 }} />
      {
        !!num && <h1 className="loading">{num}</h1>
      }
      {
        !num && <Timeline target={
          <div className="h1-box">
            <Tween
              delay={2}
              to={{
                width: 50,
                height: 50,
                padding: 0,
                borderRadius: '50%',
                '--o': 0,
              }}
              from={{
                '--o': 1,
              }}
              duration={1.2}
              ease={Power2.easeIn}
            >
              <div className="h1-wrap">
                <img src={h1} alt="" style={{ opacity: 'var(--o)' as any }}/>
              </div>
            </Tween>
            <Tween
              delay={2}
              to={{
                '--l1': 0,
                '--l2': '50%',
                '--l2w': '30px',
                '--l2h': '30px',
                '--l3w': '30px',
                '--l3h': '30px',
                '--l2bg': '#ffffff',
                '--l2r': '0deg',
                '--l3t': '90px',
              }}
              from={{
                '--l1': 1,
                '--l2': '0',
                '--l2w': '200px',
                '--l2h': '10px',
                '--l3w': '60px',
                '--l3h': '10px',
                '--l2bg': '#454345',
                '--l2r': '0',
                '--l3t': '60px',
              }}
              duration={1.2}
              ease={Power2.easeIn}
            >
              <div className="lines">
                <div className="line1" style={{ transform: 'scale(var(--l1))' as any }}></div>
                <div className="line2" style={{
                  borderRadius: 'var(--l2)',
                  width: 'var(--l2w)',
                  height: 'var(--l2h)',
                  background: 'var(--l2bg)',
                  transformOrigin: '-120px 60px',
                  transform: 'rotate(var(--l2r))',
                }}></div>
                <div className="line3" style={{
                  borderRadius: 'var(--l2)',
                  width: 'var(--l3w)',
                  height: 'var(--l3h)',
                  background: 'var(--l2bg)',
                  top: 'var(--l3t)',
                  transformOrigin: '-120px 60px',
                  transform: 'rotate(var(--l2r))',
                }}></div>
              </div>
            </Tween>
          </div>
        }>
          <Tween
            delay={0}
            from={{
              scale: 3,
              opacity: 0,
            }}
            to={{
              scale: 1.8,
              opacity: 1,
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
              scale: 0.5,
              borderRadius: '50%'
            }}
            duration={1}
            ease={Power2.easeOut}
          />

        </Timeline>
      }
    </section>
  );
};

export default Wonderful;
