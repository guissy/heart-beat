import { RefObject, useState, useEffect, useRef, useCallback } from 'react';

const distancePoints = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

// from http://www.quirksmode.org/js/events_properties.html#position
const getMousePos = (e: MouseEvent) => {
  let posx = 0;
  let posy = 0;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy }
};

export function mousemoveFn(elm: HTMLElement, setDistance: (n: number) => void) {
  return (ev: MouseEvent) => requestAnimationFrame(() => {
    if (elm) {
      const mousepos = getMousePos(ev);
      const docScrolls = {
        left: document.body.scrollLeft + document.documentElement.scrollLeft,
        top: document.body.scrollTop + document.documentElement.scrollTop
      };
      const elRect = elm.getBoundingClientRect();
      const elCoords = {
        x1: elRect.left + docScrolls.left, x2: elRect.width + elRect.left + docScrolls.left,
        y1: elRect.top + docScrolls.top, y2: elRect.height + elRect.top + docScrolls.top
      };
      const closestPoint = { x: mousepos.x, y: mousepos.y };

      if (mousepos.x < elCoords.x1) {
        closestPoint.x = elCoords.x1;
      } else if (mousepos.x > elCoords.x2) {
        closestPoint.x = elCoords.x2;
      }
      if (mousepos.y < elCoords.y1) {
        closestPoint.y = elCoords.y1;
      } else if (mousepos.y > elCoords.y2) {
        closestPoint.y = elCoords.y2;
      }
      setDistance(distancePoints(mousepos.x, mousepos.y, closestPoint.x, closestPoint.y));
    }
  })
};
