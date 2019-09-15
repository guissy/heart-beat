import React from 'react';
// @ts-ignore
import TweenMax from 'gsap/TweenMax';
import { lineEq } from '../heart/HeartBeat';
import { mousemoveFn } from '../heart/useNearBy';
import './PlaceholderForm.css';

const shuffleArray = (arr: any[]) => arr.sort(() => Math.random() - 0.5);
function charming(elm: HTMLElement) {
  var className = "char";
  var index = 1;
  var makeSpans = function (elm: HTMLElement) {
    var parent = elm.parentNode!;
    const str = elm.nodeValue!;
    for (let i = 0; i < str.length; i += 1) {
      var span = document.createElement('span');
      if (className) {
        span.className = className + index;
        index++;
      }
      span.appendChild(document.createTextNode(str[i]));
      parent.insertBefore(span, elm);
    }
    parent.removeChild(elm)
  };
  function walkElm(elm: HTMLElement) {
    const div = [].slice.call(elm.childNodes);
    for (var i = 0; i < div.length; i += 1) {
      walkElm(div[i]);
    }
    if (elm.nodeType === Node.TEXT_NODE) {
      makeSpans(elm);
    }
  }
  walkElm(elm);
  return elm;
}

interface InputProps {
  name: string;
  label: string;
}
const PlaceholderInput: React.FC<InputProps> = ({name, label}) => {
  const labelRef = React.useRef<HTMLLabelElement>(null);
  const placeholderRef = React.useRef<HTMLSpanElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [distance, setDistance] = React.useState(NaN);
  const [visibleNum, setVisibleNum] = React.useState(0);

  React.useEffect(() => {
    const mouseMove = mousemoveFn(inputRef.current!, setDistance);
    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  React.useEffect(() => {
    charming(labelRef.current!);
    charming(placeholderRef.current!);
    inputRef.current!.addEventListener('input', () => {
      if ( inputRef.current!.value.length !== 0 ) {
        placeholderRef.current!.style.opacity = '0';
      }
      else {
        placeholderRef.current!.style.opacity = '1';
      }
    });
  }, []);

  React.useEffect(() => {
    const labelLetters = Array.from(labelRef.current!.querySelectorAll('span'));
    const placeholderLetters = Array.from(placeholderRef.current!.querySelectorAll('span'));
    const lettersTotal = placeholderLetters.length;
    const lettersPosArr = shuffleArray(Array.from(Array(lettersTotal).keys()));
    let currentVisible = lettersTotal;
    setVisibleNum(lettersTotal);
    // whatever we do, start at [distanceThreshold.max]px from the element and end at [distanceThreshold.min]px from the element.
    const distanceThreshold = {min: 0, max: 50};
    const point = lineEq(lettersTotal, 0, distanceThreshold.max, distanceThreshold.min, distance);
    const visible = Math.max(0,Math.min(lettersTotal,Math.floor(point)));
    if ( currentVisible != visible ) {
      // hide placeholder and show label.
      if ( visible < currentVisible ) {
        for (let i = 0, len = lettersPosArr.length - visible; i < len; ++i) {
          const letter = placeholderLetters[lettersPosArr[i]];
          if ( letter.dataset.state != 'hidden' ) {
            letter.dataset.state = 'hidden';
            TweenMax.to(letter, 0.5, {
              //ease: 'Back.easeIn',
              ease: 'Expo.easeOut',
              y: '-200%',
              opacity: 0
            });

            TweenMax.to(labelLetters[lettersPosArr[i]], 0.5, {
              //ease: 'Back.easeOut',
              //delay: 0.4,
              ease: 'Expo.easeOut',
              y: '0%',
              startAt: {y: '200%'},
              opacity: 1
            });
          }
        }
      }
      // hide label and show placeholder. (only if input doesn't have a value).
      else if (inputRef.current!.value.length === 0) {
        for (let i = lettersTotal-1, len = lettersTotal- (lettersPosArr.length - visible); i >= lettersTotal-len; --i) {
          const letter = placeholderLetters[lettersPosArr[i]];
          if ( letter.dataset.state === 'hidden' ) {
            letter.dataset.state = '';
            TweenMax.to(letter, 0.2, {
              ease: 'Circ.easeOut',
              y: '0%',
              //overwrite: 'all',
              opacity: 1
            });

            TweenMax.to(labelLetters[lettersPosArr[i]], 1, {
              ease: 'Circ.easeOut',
              y: '200%',
              //overwrite: 'all',
              opacity: 0
            });
          }
        }
      }

      if( visible <= 0 ) {
        inputRef.current!.focus();
      }

      currentVisible = visible;
      setVisibleNum(visible);
    }
  }, [distance, visibleNum])
  return (
    <div className="form__item">
      <label className="form__label" htmlFor="firstname" ref={labelRef}>{label}</label>
      <input className="form__input" type="text" name={name} ref={inputRef} />
      <span className="form__placeholder" ref={placeholderRef}>{label}</span>
    </div>
  );
}

const PlaceholderForm: React.FC = () => {
  return (
    <section className="content">
      <form className="form">
        <div className="form__title">&gt; Create an account</div>
        <PlaceholderInput name="firstname" label="First Name" />
        <PlaceholderInput name="lastname" label="Last Name" />
        <PlaceholderInput name="email" label="Email Address" />
      </form>
    </section>
  );
};

export default PlaceholderForm;