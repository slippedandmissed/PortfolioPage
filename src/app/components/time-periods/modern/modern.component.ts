import { trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { leftRightSlider } from 'src/app/data/animations';
import { sections } from 'src/app/data/sections';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modern',
  templateUrl: './modern.component.html',
  styleUrls: ['./modern.component.scss'],
  animations: [
    trigger("routeAnimations", leftRightSlider)
  ]
})
export class ModernComponent implements AfterViewInit {

  @ViewChild("main") main?: ElementRef;
  @ViewChild("background") background?: ElementRef;

  constructor() { }

  private readonly animationFramerate = 60;

  private readonly startColor = [271 - 360, 1, .26];
  private readonly endColor = [0, 1, 0.66];

  private lerp(a: number[], b: number[], t: number): number[] {
    return a.map((e, i) =>
      e + (b[i] - e) * t
    );
  }

  private wiggle(elt: HTMLElement, total: number) {
    let t = 0;
    let xAmplitude = 10;
    let yAmplitude = 5;
    let period = 10;

    const index = +(elt.getAttribute("index") ?? "0");

    const [h, s, l] = this.lerp(this.startColor, this.endColor, index/(total-1));

    const hslString = `hsl(${(h%360 + 360) % 360}deg, ${s*100}%, ${l*100}%)`;

    elt.setAttribute("fill", hslString);

    const xPhase = Math.random() * 2 * Math.PI;
    const yPhase = Math.random() * 2 * Math.PI;
    const scalePhase = Math.random() * 2 * Math.PI;

    const minScale = 1.4;
    const maxScale = 1.5; 

    setInterval(() => {
      t += 2 * Math.PI / this.animationFramerate / period;
      const x = xAmplitude * Math.cos(t + xPhase);
      const y = yAmplitude * Math.sin(t + yPhase);
      const scale = ((Math.sin(t + scalePhase) + 1)/2) * (maxScale-minScale) + minScale;
      elt.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }, 1000 / this.animationFramerate);
  }

  ngAfterViewInit(): void {
    if (this.background) {
      this.background.nativeElement.querySelectorAll("path").forEach((x: HTMLElement, i: number, a: HTMLElement[]) => {
        this.wiggle(x, a.length);
      });
    }
  }

  sections = sections;

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  faArrowUp = faArrowUp;

  scrollToTop() {
    this.main?.nativeElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

}
