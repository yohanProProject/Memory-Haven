import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

// Interfaces
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  studyLevel: string;
  favoriteSubject: string;
  bio: string;
  badges: Badge[];
  stats: UserStats;
}

interface Badge {
  name: string;
  icon: string;
}

interface UserStats {
  postsCount: number;
  helpfulAnswers: number;
  reputation: number;
}

interface DetailedStat {
  label: string;
  value: string;
  icon: string;
  color: string;
  change: string;
}

interface ActivityDay {
  date: string;
  activity: number;
}

interface ProgressData {
  label: string;
  current: number;
  target: number;
  color: string;
}

interface Achievement {
  title: string;
  icon: string;
  color: string;
  date: string;
  unlocked?: boolean;
  unlockedDate?: string;
  description: string;
  progress?: {
    current: number;
    required: number;
    unit: string;
  };
}

interface Activity {
  title: string;
  description: string;
  date: string;
  type: 'posts' | 'questions' | 'answers' | 'downloads';
  points?: number;
}

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ProfilComponent {
  // Main properties
  activeTab: 'overview' | 'activity' | 'achievements' | 'settings' = 'overview';
  showEditModal = false;
  activityFilter = '';

  // User data
  userProfile: UserProfile = {
    firstName: 'Ousmane',
    lastName: 'Fall',
    email: 'Ousmane.Fall@email.com',
    avatarUrl: 'assets/avatars/oussou.jpg',
    studyLevel: 'superieur',
    favoriteSubject: 'math',
    bio: 'Étudiante en mathématiques, passionnée par les sciences et toujours prête à aider !',
    badges: [
      { name: 'Aide précieuse', icon: 'fas fa-star' },
      { name: 'Expert Math', icon: 'fas fa-calculator' },
      { name: 'Mentor', icon: 'fas fa-graduation-cap' }
    ],
    stats: {
      postsCount: 142,
      helpfulAnswers: 89,
      reputation: 2450
    }
  };

  editableProfile: UserProfile = { ...this.userProfile };

  // Detailed statistics
  detailedStats: DetailedStat[] = [
    {
      label: 'Messages publiés',
      value: '142',
      icon: 'fas fa-comments',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      change: '+12 ce mois'
    },
    {
      label: 'Réponses utiles',
      value: '89',
      icon: 'fas fa-thumbs-up',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      change: '+8 ce mois'
    },
    {
      label: 'Points de réputation',
      value: '2,450',
      icon: 'fas fa-trophy',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      change: '+230 ce mois'
    },
    {
      label: 'Ressources téléchargées',
      value: '67',
      icon: 'fas fa-download',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      change: '+5 ce mois'
    }
  ];

  // Activity data for the last 30 days
  activityData: ActivityDay[] = [];

  // Progress data
  progressData: ProgressData[] = [
    {
      label: 'Messages hebdomadaires',
      current: 8,
      target: 10,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      label: 'Réponses acceptées',
      current: 15,
      target: 20,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      label: 'Niveau bien-être',
      current: 7,
      target: 10,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  // Recent achievements
  recentAchievements: Achievement[] = [
    {
      title: 'Expert Math',
      icon: 'fas fa-calculator',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      date: 'Il y a 2 jours',
      description: '50 réponses utiles en mathématiques'
    },
    {
      title: 'Mentor',
      icon: 'fas fa-graduation-cap',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      date: 'Il y a 1 semaine',
      description: 'Aider 25 étudiants différents'
    },
    {
      title: 'Contributeur actif',
      icon: 'fas fa-fire',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      date: 'Il y a 2 semaines',
      description: '7 jours consécutifs d\'activité'
    }
  ];

  // All activities
  private allActivities: Activity[] = [
    {
      title: 'Réponse acceptée en mathématiques',
      description: 'Votre réponse sur les dérivées a été marquée comme utile',
      date: 'Il y a 2 heures',
      type: 'answers',
      points: 15
    },
    {
      title: 'Nouveau message dans le forum',
      description: 'Vous avez publié une question sur la physique quantique',
      date: 'Il y a 5 heures',
      type: 'posts',
      points: 5
    },
    {
      title: 'Téléchargement de ressource',
      description: 'Vous avez téléchargé "Formules de trigonométrie"',
      date: 'Hier',
      type: 'downloads'
    },
    {
      title: 'Question posée',
      description: 'Nouvelle question sur les intégrales',
      date: 'Il y a 2 jours',
      type: 'questions',
      points: 2
    }
  ];

  filteredActivity: Activity[] = [...this.allActivities];

  // All achievements
  allAchievements: Achievement[] = [
    {
      title: 'Premier pas',
      description: 'Créer votre compte',
      icon: 'fas fa-baby',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      date: 'il y a 3 mois',
      unlocked: true,
      unlockedDate: 'il y a 3 mois'
    },
    {
      title: 'Communicateur',
      description: 'Publier 10 messages',
      icon: 'fas fa-comments',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      date: 'il y a 2 mois',
      unlocked: true,
      unlockedDate: 'il y a 2 mois'
    },
    {
      title: 'Expert Math',
      description: '50 réponses utiles en mathématiques',
      icon: 'fas fa-calculator',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      date: 'il y a 2 jours',
      unlocked: true,
      unlockedDate: 'il y a 2 jours'
    },
    {
      title: 'Maître suprême',
      description: '100 réponses acceptées',
      icon: 'fas fa-crown',
      color: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
      date: '',
      unlocked: false,
      progress: {
        current: 89,
        required: 100,
        unit: 'réponses'
      }
    },
    {
      title: 'Bibliothécaire',
      description: 'Télécharger 100 ressources',
      icon: 'fas fa-book',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      date: '',
      unlocked: false,
      progress: {
        current: 67,
        required: 100,
        unit: 'ressources'
      }
    },
    {
      title: 'Zen master',
      description: 'Compléter 30 exercices de bien-être',
      icon: 'fas fa-lotus',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      date: '',
      unlocked: false,
      progress: {
        current: 18,
        required: 30,
        unit: 'exercices'
      }
    }
  ];

  // Settings
  notificationSettings: NotificationSetting[] = [
    {
      id: 'new_answers',
      label: 'Nouvelles réponses',
      description: 'Recevoir une notification quand quelqu\'un répond à vos questions',
      enabled: true
    },
    {
      id: 'helpful_votes',
      label: 'Votes utiles',
      description: 'Notification quand vos réponses sont votées utiles',
      enabled: true
    },
    {
      id: 'daily_digest',
      label: 'Résumé quotidien',
      description: 'Recevoir un résumé de l\'activité de la communauté',
      enabled: false
    },
    {
      id: 'wellness_reminders',
      label: 'Rappels bien-être',
      description: 'Notifications pour vos exercices de relaxation',
      enabled: true
    }
  ];

  privacySettings: NotificationSetting[] = [
    {
      id: 'profile_visibility',
      label: 'Profil public',
      description: 'Permettre aux autres utilisateurs de voir votre profil',
      enabled: true
    },
    {
      id: 'show_activity',
      label: 'Activité visible',
      description: 'Afficher votre activité récente publiquement',
      enabled: false
    },
    {
      id: 'show_achievements',
      label: 'Réalisations visibles',
      description: 'Afficher vos badges et réalisations',
      enabled: true
    }
  ];

  constructor(private router: Router) {
    this.generateActivityData();
  }

  // Generate mock activity data for the last 30 days
  private generateActivityData(): void {
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      this.activityData.push({
        date: date.toLocaleDateString(),
        activity: Math.floor(Math.random() * 10)
      });
    }
  }

  // Navigation methods
  setActiveTab(tab: 'overview' | 'activity' | 'achievements' | 'settings'): void {
    this.activeTab = tab;
  }

  // Profile editing methods
  openAvatarEditor(): void {
    console.log('Ouverture de l\'éditeur d\'avatar');
    // Future: implement avatar editor
  }

  editProfile(): void {
    this.editableProfile = { ...this.userProfile };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  saveProfile(): void {
    this.userProfile = { ...this.editableProfile };
    this.closeEditModal();
    console.log('Profil sauvegardé:', this.userProfile);
  }

  downloadData(): void {
    console.log('Téléchargement des données utilisateur...');
    // Future: implement data export
  }

  // Activity methods
  filterActivity(): void {
    if (!this.activityFilter) {
      this.filteredActivity = [...this.allActivities];
    } else {
      this.filteredActivity = this.allActivities.filter(
        activity => activity.type === this.activityFilter
      );
    }
  }

  refreshActivity(): void {
    console.log('Actualisation de l\'activité...');
    // Future: reload activity from backend
  }

  getActivityColor(type: string): string {
    const colors = {
      posts: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      questions: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      answers: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      downloads: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    };
    return colors[type as keyof typeof colors] || '#6c757d';
  }

  getActivityIcon(type: string): string {
    const icons = {
      posts: 'fas fa-comment',
      questions: 'fas fa-question-circle',
      answers: 'fas fa-reply',
      downloads: 'fas fa-download'
    };
    return icons[type as keyof typeof icons] || 'fas fa-circle';
  }

  getActivityTypeLabel(type: string): string {
    const labels = {
      posts: 'Message',
      questions: 'Question',
      answers: 'Réponse',
      downloads: 'Téléchargement'
    };
    return labels[type as keyof typeof labels] || type;
  }

  // Settings methods
  updateNotificationSetting(settingId: string): void {
    const setting = this.notificationSettings.find(s => s.id === settingId);
    if (setting) {
      console.log(`Paramètre de notification mis à jour: ${settingId} = ${setting.enabled}`);
    }
  }

  updatePrivacySetting(settingId: string): void {
    const setting = this.privacySettings.find(s => s.id === settingId);
    if (setting) {
      console.log(`Paramètre de confidentialité mis à jour: ${settingId} = ${setting.enabled}`);
    }
  }

  // Danger zone methods
  deleteAccount(): void {
    const confirm = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
    if (confirm) {
      console.log('Suppression du compte...');
      // Future: implement account deletion
    }
  }

  resetProgress(): void {
    const confirm = window.confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ? Tous vos points et réalisations seront perdus.');
    if (confirm) {
      console.log('Réinitialisation de la progression...');
      // Future: implement progress reset
    }
  }
}
