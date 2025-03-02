import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollRevealDirective implements OnInit {
  @Input() animation: string = 'fadeInUp';
  @Input() delay: number = 0;
  @Input() duration: number = 800;
  @Input() distance: string = '20px';
  @Input() origin: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  @Input() easing: string = 'cubic-bezier(0.5, 0, 0, 1)';
  @Input() interval: number = 100;
  @Input() opacity: number = 0;
  @Input() scale: number = 1;
  @Input() cleanup: boolean = true;

  private observer: IntersectionObserver;

  constructor(private el: ElementRef) {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.reveal();
          if (this.cleanup) {
            this.observer.unobserve(this.el.nativeElement);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
  }

  ngOnInit() {
    this.setup();
    this.observer.observe(this.el.nativeElement);
  }

  private setup() {
    const el = this.el.nativeElement;
    el.style.visibility = 'hidden';
    el.style.opacity = this.opacity;
    el.style.transform = this.getInitialTransform();
    el.style.transition = this.getTransition();
  }

  private reveal() {
    const el = this.el.nativeElement;
    setTimeout(() => {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      el.style.transform = `translate3d(0, 0, 0) scale(${this.scale})`;
    }, this.delay);
  }

  private getInitialTransform(): string {
    let transform = '';
    switch (this.origin) {
      case 'top':
        transform = `translate3d(0, -${this.distance}, 0)`;
        break;
      case 'right':
        transform = `translate3d(${this.distance}, 0, 0)`;
        break;
      case 'bottom':
        transform = `translate3d(0, ${this.distance}, 0)`;
        break;
      case 'left':
        transform = `translate3d(-${this.distance}, 0, 0)`;
        break;
    }
    return transform + ` scale(${this.scale})`;
  }

  private getTransition(): string {
    return `opacity ${this.duration}ms ${this.easing},
            transform ${this.duration}ms ${this.easing}`;
  }
}
