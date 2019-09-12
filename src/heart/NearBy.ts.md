```ts
const distancePoints = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

// from http://www.quirksmode.org/js/events_properties.html#position
const getMousePos = (e: MouseEvent) => {
  var posx = 0, posy = 0;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy }
};

type Opt = { onProgress: (distance: number) => void }

export default class Nearby {
  private DOM: { el: HTMLElement };
  private options: Opt;

  constructor(el: HTMLElement, options: Opt) {
    this.DOM = { el: el };
    this.options = options;
    this.init();
  }

  mousemoveFn = (ev: MouseEvent) => requestAnimationFrame(() => {
    const mousepos = getMousePos(ev);
    const docScrolls = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    };
    const elRect = this.DOM.el.getBoundingClientRect();
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
    if (this.options.onProgress) {
      this.options.onProgress(distancePoints(mousepos.x, mousepos.y, closestPoint.x, closestPoint.y))
    }
  });

  init() {
    window.addEventListener('mousemove', this.mousemoveFn);
  }
}
```