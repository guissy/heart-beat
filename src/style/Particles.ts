import anime from 'animejs';

export interface ParticleOption {
  width: number;
  height: number;
  x: number;
  y: number;
  canvasPadding: number;
  oscillationCoefficient: number;
  particlesAmountCoefficient: number;
  complete: () => void;
  style: string;
  duration: number;
  type: string;
  direction: string;
  begin: (anim: any) => void;
  easing: string;
  speed: () => number | number;
  color: () => string | string;
  size: () => number | number;
}

interface ParticleItem {
  life: number;
  death: number;
  speed: number;
  x: number;
  y: number;
  increase: number;
  counter: number;
  angle: number;
  startX: number;
  startY: number;
  size: number;
  color: string;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class Particles {
  el: HTMLElement;
  options: ParticleOption;
  particles: ParticleItem[] = [];
  frame: number = 0;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  wrapper: HTMLDivElement | null = null;
  parentWrapper: HTMLDivElement | null = null;
  o: ParticleOption = {} as ParticleOption;
  rect: Rect = {} as Rect;
  disintegrating: number = 1;
  width: number = 0;
  height: number = 0;
  lastProgress: number = 0;

  constructor(element: HTMLElement, options: ParticleOption) {
    this.el = element;
    this.options = Object.assign(
      { color: getCSSValue(this.el, 'background-color') },
      this.defaults,
      options
    );
    this.init();
  }

  defaults = {
    type: 'circle',
    style: 'fill',
    canvasPadding: 150,
    duration: 1000,
    easing: 'easeInOutCubic',
    direction: 'left',
    size: function () {
      return Math.floor((Math.random() * 3) + 1);
    },
    speed: function () {
      return rand(4);
    },
    particlesAmountCoefficient: 3,
    oscillationCoefficient: 20
  };
  init = () => {
    this.particles = [];
    this.frame = 0;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.className = 'particles-canvas';
    this.canvas.style.display = 'none';
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'particles-wrapper';
    this.el!.parentNode!.insertBefore(this.wrapper, this.el);
    this.wrapper.appendChild(this.el);
    this.parentWrapper = document.createElement('div');
    this.parentWrapper.className = 'particles';
    this.wrapper.parentNode!.insertBefore(this.parentWrapper, this.wrapper);
    this.parentWrapper.appendChild(this.wrapper);
    this.parentWrapper.appendChild(this.canvas);
  };
  loop = () => {
    this.updateParticles();
    this.renderParticles();
    if (this.isAnimating()) {
      this.frame = requestAnimationFrame(this.loop.bind(this));
    }
  };
  updateParticles = () => {
    for (var i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      if (p.life > p.death) {
        this.particles.splice(i, 1);
      } else {
        p.x += p.speed;
        p.y = this.o.oscillationCoefficient * Math.sin(p.counter * p.increase);
        p.life++;
        p.counter += this.disintegrating ? 1 : -1;
      }
    }
    if (!this.particles.length) {
      this.pause();
      this.canvas!.style.display = 'none';
      if (typeof this.o.complete === 'function') {
        this.o.complete();
      }
    }
  };
  renderParticles = () => {
    this.ctx!.clearRect(0, 0, this.width, this.height);
    for (var i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      if (p.life < p.death) {
        this.ctx!.translate(p.startX, p.startY);
        this.ctx!.rotate(p.angle * Math.PI / 180);
        this.ctx!.globalAlpha = this.disintegrating ? 1 - p.life / p.death : p.life / p.death;
        this.ctx!.fillStyle = this.ctx!.strokeStyle = p.color;
        this.ctx!.beginPath();

        if (this.o.type === 'circle') {
          this.ctx!.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        } else if (this.o.type === 'triangle') {
          this.ctx!.moveTo(p.x, p.y);
          this.ctx!.lineTo(p.x + p.size, p.y + p.size);
          this.ctx!.lineTo(p.x + p.size, p.y - p.size);
        } else if (this.o.type === 'rectangle') {
          this.ctx!.rect(p.x, p.y, p.size, p.size);
        }

        if (this.o.style === 'fill') {
          this.ctx!.fill();
        } else if (this.o.style === 'stroke') {
          this.ctx!.closePath();
          this.ctx!.stroke();
        }

        this.ctx!.globalAlpha = 1;
        this.ctx!.rotate(-p.angle * Math.PI / 180);
        this.ctx!.translate(-p.startX, -p.startY);
      }
    }
  };
  play = () => {
    this.frame = requestAnimationFrame(this.loop.bind(this));
  };
  pause = () => {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  };
  addParticle = (options: ParticleOption) => {
    var frames = this.o.duration * 60 / 1000;
    var speed = typeof (this.o.speed) === 'function' ? this.o.speed() : this.o.speed;
    var color = typeof (this.o.color) === 'function' ? this.o.color() : this.o.color;
    this.particles.push({
      startX: options.x,
      startY: options.y,
      x: this.disintegrating ? 0 : speed * -frames,
      y: 0,
      color: color,
      angle: rand(360),
      counter: this.disintegrating ? 0 : frames,
      increase: Math.PI * 2 / 100,
      life: 0,
      death: this.disintegrating ? (frames - 20) + Math.random() * 40 : frames,
      speed: speed,
      size: typeof (this.o.size) === 'function' ? this.o.size() : this.o.size
    });
  };

  addParticles = (rect: Rect, progress: number) => {
    var progressDiff = this.disintegrating ? progress - this.lastProgress : this.lastProgress - progress;
    this.lastProgress = progress;
    var x = this.options.canvasPadding;
    var y = this.options.canvasPadding;
    var progressValue: number = (this.isHorizontal() ? rect.width : rect.height) * progress + progressDiff * (this.disintegrating ? 100 : 220);
    if (this.isHorizontal()) {
      x += this.o.direction === 'left' ? progressValue : rect.width - progressValue;
    } else {
      y += this.o.direction === 'top' ? progressValue : rect.height - progressValue;
    }
    var i = Math.floor(this.o.particlesAmountCoefficient * (progressDiff * 100 + 1));
    if (i > 0) {
      while (i--) {
        this.addParticle({
          x: x + (this.isHorizontal() ? 0 : rect.width * Math.random()),
          y: y + (this.isHorizontal() ? rect.height * Math.random() : 0)
        } as ParticleOption);
      }
    }
    if (!this.isAnimating()) {
      this.canvas!.style.display = 'block';
      this.play();
    }
  };
  addTransforms = (value: number) => {
    var translateProperty = this.isHorizontal() ? 'translateX' : 'translateY';
    var translateValue = this.o.direction === 'left' || this.o.direction === 'top' ? value : -value;
    this.wrapper!.style.transform = translateProperty + '(' + translateValue + '%)';
    this.el.style.transform = translateProperty + '(' + -translateValue + '%)';
  };
  disintegrate = (options?: ParticleOption) => {
    if (!this.isAnimating()) {
      this.disintegrating = 1;
      this.lastProgress = 0;
      this.setup(options);
      var _ = this;
      this.animate(function (anim) {
        var value = anim.animatables[0].target.value;
        _.addTransforms(value);
        if (_.o.duration) {
          _.addParticles(_.rect, value / 100);
        }
      });
    }
  };
  integrate = (options: ParticleOption) => {
    if (!this.isAnimating()) {
      this.disintegrating = 0;
      this.lastProgress = 1;
      this.setup(options);
      var _ = this;
      this.animate(function (anim) {
        var value = anim.animatables[0].target.value;
        setTimeout(function () {
          _.addTransforms(value);
        }, _.o.duration);
        if (_.o.duration) {
          _.addParticles(_.rect, value / 100);
        }
      });
    }
  };

  setup = (options?: ParticleOption) => {
    this.o = Object.assign({}, this.options, options);
    this.wrapper!.style.visibility = 'visible';
    if (this.o.duration) {
      this.rect = this.el.getBoundingClientRect() as Rect;
      this.width = this.canvas!.width = this.o.width || this.rect.width + this.o.canvasPadding * 2;
      this.height = this.canvas!.height = this.o.height || this.rect.height + this.o.canvasPadding * 2;
    }
  };

  animate = (update: (anim: any) => void) => {
    var _ = this;
    anime({
      targets: { value: _.disintegrating ? 0 : 101 },
      value: _.disintegrating ? 101 : 0,
      duration: _.o.duration,
      easing: _.o.easing,
      begin: _.o.begin,
      update: update,
      complete: function () {
        if (_.disintegrating) {
          _.wrapper!.style.visibility = 'hidden';
        }
      }
    });
  };
  isAnimating = (): boolean => {
    return !!this.frame;
  };
  isHorizontal = () => {
    return this.o.direction === 'left' || this.o.direction === 'right';
  };
}

function stringToHyphens(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getCSSValue(el: HTMLElement, prop: string) {
  if (prop in el.style) {
    return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
  }
}


function rand(value: number) {
  return Math.random() * value - value / 2;
}
