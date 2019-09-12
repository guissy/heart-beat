import React from 'react';

const TextGradient: React.FC = () => {
  return (
    <div className="app-wrap">
      <style>{`
      .app-wrap{
        background: #1c0549;
      }
      pre {
        color: #009688;
        background: linear-gradient(90deg, #F44336 0%, #CDDC39 50%, #F44336 100%);
        background-size: cover;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 900;
        line-height: 15px;
      }
      `}</style>
      <pre>{`
  _   _    _______    _   _       _      _  __
 | \\ | |  |__   __|  | \\ | |     | |    (_)/ _|
 |  \\| | ___ | |___  |  \\| | ___ | |     _| |_ ___
 | . \` |/ _ \\| / __| | . \` |/ _ \\| |    | |  _/ _ \\
 | |\\  | (_) | \\__ \\ | |\\  | (_) | |____| | ||  __/
 |_| \\_|\\___/|_|___/ |_| \\_|\\___/|______|_|_| \\___|
 `}</pre>
    </div>
  );
};

export default TextGradient;