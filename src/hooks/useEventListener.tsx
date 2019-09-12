import React, { useEffect, useState } from 'react';

export function useEventListener(eventName: string, element = window) {
  const [event, setEvent] = useState({} as MouseEvent);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = (event: Event) => {
        setEvent(event as any as MouseEvent);
      };
      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // 如果 eventName 或 element 变化，就再次运行
  );
  return event;
};

function TestEventListener() {
  const coords = useEventListener('mousemove');
  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );
}

export default TestEventListener;