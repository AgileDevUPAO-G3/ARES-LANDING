import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  socialIcons: NodeListOf<HTMLElement> | null = null;
  @ViewChild('logo') logoElement: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
    // Inicializar los íconos de redes sociales y agregarles el efecto hover
    setTimeout(() => {
      this.socialIcons = document.querySelectorAll('.social-icons i')!;
      this.addHoverEffect();
    }, 100);
    this.onResize(null as any);
  }

  addHoverEffect(): void {
    if (this.socialIcons) {
      this.socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          icon.style.transform = 'scale(1.2)';
          icon.style.transition = 'transform 0.3s ease';
        });

        icon.addEventListener('mouseleave', () => {
          icon.style.transform = 'scale(1)';
        });
      });
    }
    if (this.logoElement) {
      const logo = this.logoElement.nativeElement;
      logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.2)';
        logo.style.transition = 'transform 0.3s ease';
      });

       logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = window.innerWidth;
    const logo = document.querySelector('.img-logo');
    if (logo) {
      if (width <= 768) {
        logo.classList.add('hidden');
      } else {
        logo.classList.remove('hidden');
      }
    }
  }
}