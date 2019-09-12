import React, { useEffect, useState } from 'react';

export function useEventListener(eventName: string, element = window) {
  // 创建一个 ref 来存储处理程序
  const [event, setEvent] = useState({} as MouseEvent);

  useEffect(
    () => {
      // 确保元素支持 addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // 创建事件监听调用存储在 ref 的处理方法
      const eventListener = (event: Event) => {
        setEvent(event as any as MouseEvent);
      };

      // 添加事件监听
      element.addEventListener(eventName, eventListener);

      // 清除的时候移除事件监听
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