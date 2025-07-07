import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  private navbarCollapse: any;

  ngOnInit() {
    // Initialisation du collapse Bootstrap 5
    this.initBootstrapCollapse();
  }

  ngOnDestroy() {
    // Nettoyage
    if (this.navbarCollapse) {
      this.navbarCollapse.dispose();
    }
  }

  private initBootstrapCollapse() {
    // Attendre que Bootstrap soit disponible
    setTimeout(() => {
      if (typeof bootstrap !== 'undefined') {
        const navbarCollapseElement = document.getElementById('navbarNav');
        if (navbarCollapseElement) {
          this.navbarCollapse = new bootstrap.Collapse(navbarCollapseElement, {
            toggle: false
          });
        }
      }
    }, 100);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (typeof bootstrap !== 'undefined' && this.navbarCollapse) {
      this.navbarCollapse.toggle();
    } else {
      // Fallback pour navigation manuelle
      const navbarNav = document.getElementById('navbarNav');
      if (navbarNav) {
        navbarNav.classList.toggle('show');
      }
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    
    if (typeof bootstrap !== 'undefined' && this.navbarCollapse) {
      this.navbarCollapse.hide();
    } else {
      // Fallback pour navigation manuelle
      const navbarNav = document.getElementById('navbarNav');
      if (navbarNav) {
        navbarNav.classList.remove('show');
      }
    }
  }

  // Méthode pour fermer le menu lors du clic en dehors
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const navbar = document.querySelector('.navbar');
    
    if (navbar && !navbar.contains(target) && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}
