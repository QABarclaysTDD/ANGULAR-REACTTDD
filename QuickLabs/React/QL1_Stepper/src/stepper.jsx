import React, { useState } from 'react';

const stepper = ({ step = 1 }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + step);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - step);
  };

  return (
    <div>
      <button onClick={decrement} aria-label="-">
        -
      </button>
      <span>{count}</span>
      <button onClick={increment} aria-label="+">
        +
      </button>
    </div>
  );
};

export default stepper;