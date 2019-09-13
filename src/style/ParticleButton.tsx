import React from 'react';
import './ParticleButton.css';
import Particles, { ParticleOption } from './Particles';

const ParticleButton: React.FC = () => {
  const itemRef = React.useRef(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const particles = React.useRef<Particles>(null);
  const particlesOpts: ParticleOption =
    // {
    //   type: 'triangle',
    //   style: 'stroke',
    //   size: 5,
    //   color: 'blue',
    //   duration: 1400,
    //   speed: 1.5,
    //   oscillationCoefficient: 15,
    //   direction: 'right'
    // },
    {
      type: 'triangle',
      easing: 'easeOutSine',
      size: 3,
      duration: 800,
      particlesAmountCoefficient: 7,
      speed: 3,
      oscillationCoefficient: 1
    } as any;

    // particlesOpts.complete = () => {
    //   if ( !buttonVisible ) {
    //     anime.remove(bttnBack);
    //     anime({
    //       targets: bttnBack,
    //       duration: 300,
    //       easing: 'easeOutQuint',
    //       opacity: 1,
    //       scale: [0,1]
    //     });
    //     bttnBack.style.pointerEvents = 'auto';
    //   }
    // };
    // const particles = new Particles(bttn, particlesOpts);

    // bttnBack.addEventListener('click', () => {
    //   if ( !particles.isAnimating() && !buttonVisible ) {
    //     anime.remove(bttnBack);
    //     anime({
    //       targets: bttnBack,
    //       duration: 300,
    //       easing: 'easeOutQuint',
    //       opacity: 0,
    //       scale: 0
    //     });
    //     bttnBack.style.pointerEvents = 'none';
    //
    //     particles.integrate({
    //       duration: 800,
    //       easing: 'easeOutSine'
    //     });
    //     buttonVisible = !buttonVisible;
    //   }
    // });

  React.useEffect(() => {
    // @ts-ignore
    particles.current = new Particles(btnRef.current as any, particlesOpts);
    let buttonVisible = true;
    btnRef.current!.addEventListener('click', () => {
      if ( !particles.current!.isAnimating() && buttonVisible ) {
        particles.current!.disintegrate();
        buttonVisible = !buttonVisible;
      }
    });
  }, [particlesOpts])

  return (
    <main>
      <svg className="hidden">
        <symbol id="icon-arrow" viewBox="0 0 24 24">
          <title>arrow</title>
          <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 "></polygon>
        </symbol>
        <symbol id="icon-drop" viewBox="0 0 24 24">
          <title>drop</title>
          <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z"></path><path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z"></path>
        </symbol>
        <svg id="icon-github" viewBox="0 0 33 33">
          <title>github</title>
          <path d="M16.608.455C7.614.455.32 7.748.32 16.745c0 7.197 4.667 13.302 11.14 15.456.815.15 1.112-.353 1.112-.785 0-.386-.014-1.411-.022-2.77-4.531.984-5.487-2.184-5.487-2.184-.741-1.882-1.809-2.383-1.809-2.383-1.479-1.01.112-.99.112-.99 1.635.115 2.495 1.679 2.495 1.679 1.453 2.489 3.813 1.77 4.741 1.353.148-1.052.569-1.77 1.034-2.177-3.617-.411-7.42-1.809-7.42-8.051 0-1.778.635-3.233 1.677-4.371-.168-.412-.727-2.069.16-4.311 0 0 1.367-.438 4.479 1.67a15.602 15.602 0 0 1 4.078-.549 15.62 15.62 0 0 1 4.078.549c3.11-2.108 4.475-1.67 4.475-1.67.889 2.242.33 3.899.163 4.311C26.37 12.66 27 14.115 27 15.893c0 6.258-3.809 7.635-7.437 8.038.584.503 1.105 1.497 1.105 3.017 0 2.177-.02 3.934-.02 4.468 0 .436.294.943 1.12.784 6.468-2.159 11.131-8.26 11.131-15.455 0-8.997-7.294-16.29-16.291-16.29"></path>
        </svg>
        <svg id="icon-rewind" viewBox="0 0 36 20">
          <title>rewind</title>
          <path d="M16.315.061c.543 0 .984.44.984.984v17.217c0 .543-.44.983-.984.983L.328 10.391s-.738-.738 0-1.476C1.066 8.178 16.315.061 16.315.061zM35.006.061c.543 0 .984.44.984.984v17.217c0 .543-.44.984-.984.984L19.019 10.39s-.738-.738 0-1.475C19.757 8.178 35.006.06 35.006.06z"></path>
        </svg>
      </svg>
      <div className="grid">
        {/*<div className="grid__item theme-8">*/}
        {/*  <button className="action" style={{ opacity: 1, transform: 'scale(1)', pointerEvents: 'auto' }}>*/}
        {/*    <svg className="icon icon--rewind">*/}
        {/*      <use xlinkHref="#icon-rewind"/>*/}
        {/*    </svg>*/}
        {/*  </button>*/}
          {/*<div className="particles">*/}
          {/*  <div className="particles-wrapper" style={{ visibility: 'hidden', transform: 'translateX(-101%)' }}>*/}
          {/*    <button className="particles-button" style={{ transform: 'translateX(101%)' }}>Logout</button>*/}
          {/*  </div>*/}
          {/*  <canvas className="particles-canvas" style={{ display: 'none' }} width={485} height={383}/>*/}
          {/*</div>*/}
        {/*</div>*/}
        <div className="grid__item theme-12" ref={itemRef}>
          <button className="action" style={{ opacity: 1, transform: 'scale(1)', pointerEvents: 'auto' }}>
            <svg className="icon icon--rewind">
              <use xlinkHref="#icon-rewind"/>
            </svg>
          </button>
          <button ref={btnRef} className="particles-button">Export</button>
          {/*<div className="particles">*/}
          {/*  <div className="particles-wrapper" style={{ visibility: 'hidden', transform: 'translateX(101%)' }}>*/}
          {/*    <button className="particles-button" style={{ transform: 'translateX(-101%)' }}>Export</button>*/}
          {/*  </div>*/}
          {/*  <canvas className="particles-canvas" style={{ display: 'none' }} width={577} height={367}/>*/}
          {/*</div>*/}
        </div>
      </div>
    </main>
  );
};

export default ParticleButton;