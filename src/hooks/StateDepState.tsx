/** setState2 deps setState1, like watch in vue */
import React, { useEffect, useState } from 'react';

const StateDepState: React.FC = () => {
  let [count, setCount] = useState(0);
  let [frozen, setFrozen] = useState(false);

  useEffect(() => {
    if (frozen) {
      setCount(count);
    } else {
      setCount(count + 1);
    }
    setFrozen(true)
  }, [frozen]);

  return (<div>
    {count}
    <button className="icon plus">加</button>
    <button className="icon plus">减</button>
  </div>);
};

export default StateDepState;