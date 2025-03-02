import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly ANIMATION_CLASSES = {
    fadeIn: 'animate__animated animate__fadeIn',
    fadeInUp: 'animate__animated animate__fadeInUp',
    fadeInDown: 'animate__animated animate__fadeInDown',
    fadeInLeft: 'animate__animated animate__fadeInLeft',
    fadeInRight: 'animate__animated animate__fadeInRight',
    bounceIn: 'animate__animated animate__bounceIn',
    pulse: 'animate__animated animate__pulse',
    rubberBand: 'animate__animated animate__rubberBand',
    slideInUp: 'animate__animated animate__slideInUp',
    zoomIn: 'animate__animated animate__zoomIn'
  };

  private readonly ANIMATION_DELAYS = {
    none: '',
    short: 'animate__delay-1s',
    medium: 'animate__delay-2s',
    long: 'animate__delay-3s'
  };

  animate(element: ElementRef, animationType: keyof typeof this.ANIMATION_CLASSES, delay: keyof typeof this.ANIMATION_DELAYS = 'none'): void {
    const el = element.nativeElement;
    const animationClass = this.ANIMATION_CLASSES[animationType];
    const delayClass = this.ANIMATION_DELAYS[delay];

    el.classList.add(...animationClass.split(' '));
    if (delayClass) {
      el.classList.add(delayClass);
    }

    el.addEventListener('animationend', () => {
      el.classList.remove(...animationClass.split(' '));
      if (delayClass) {
        el.classList.remove(delayClass);
      }
    }, { once: true });
  }

  addPermanentAnimation(element: ElementRef, animationType: keyof typeof this.ANIMATION_CLASSES, delay: keyof typeof this.ANIMATION_DELAYS = 'none'): void {
    const el = element.nativeElement;
    const animationClass = this.ANIMATION_CLASSES[animationType];
    const delayClass = this.ANIMATION_DELAYS[delay];

    el.classList.add(...animationClass.split(' '));
    if (delayClass) {
      el.classList.add(delayClass);
    }
  }
}
