import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  constructor(private router: Router) {}

  // Statistics data
  statistics = [
    {
      icon: 'fas fa-users',
      value: '1,200+',
      label: 'Étudiants actifs'
    },
    {
      icon: 'fas fa-comments',
      value: '850+',
      label: 'Discussions actives'
    },
    {
      icon: 'fas fa-heart',
      value: '95%',
      label: 'Satisfaction'
    }
  ];

  // Features data
  features = [
    {
      icon: 'fas fa-handshake text-primary',
      title: 'Entraide',
      description: 'Une communauté bienveillante où chaque étudiant peut poser ses questions et aider les autres. Ensemble, nous surmontons les défis académiques.'
    },
    {
      icon: 'fas fa-spa text-success',
      title: 'Bien-être',
      description: 'Des outils de relaxation, exercices de respiration et ressources pour gérer le stress scolaire et maintenir un équilibre mental sain.'
    },
    {
      icon: 'fas fa-trophy text-warning',
      title: 'Réussite',
      description: 'Accédez à des ressources pédagogiques de qualité, des conseils d\'experts et des méthodes éprouvées pour exceller dans vos études.'
    }
  ];

  // Testimonials data
  testimonials = [
    {
      quote: 'Memory Haven m\'a permis de trouver de l\'aide rapidement pour mes cours de mathématiques. La communauté est vraiment bienveillante !',
      name: 'Sarah M.',
      role: 'Étudiante en L2 Sciences'
    },
    {
      quote: 'Les exercices de bien-être m\'ont aidé à gérer mon stress pendant les examens. Je recommande vivement cette plateforme.',
      name: 'Thomas L.',
      role: 'Étudiant en Master'
    },
    {
      quote: 'Grâce aux ressources partagées et aux conseils de la communauté, j\'ai amélioré mes méthodes de travail et mes résultats.',
      name: 'Emma K.',
      role: 'Étudiante en L3 Littérature'
    }
  ];

  // Navigation method
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // Scroll to top method
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
