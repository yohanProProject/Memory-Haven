import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

// Interfaces
interface DashboardStat {
  label: string;
  value: string;
  icon: string;
  color: string;
  trend: number;
}

interface MonthlyData {
  label: string;
  value: number;
}

interface Alert {
  title: string;
  description: string;
  type: 'warning' | 'error' | 'info';
  time: string;
}

interface SystemActivity {
  description: string;
  time: string;
  icon: string;
  color: string;
  type: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'moderator' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  lastActivity: string;
  joinDate: string;
}

interface UsersFilter {
  search: string;
  role: string;
  status: string;
  sortBy: string;
}

interface Report {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  reportedBy: string;
  date: string;
}

interface ContentCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface Content {
  id: string;
  title: string;
  description: string;
  type: string;
  author: string;
  date: string;
  status: 'draft' | 'published' | 'archived';
}

interface PlatformSettings {
  name: string;
  description: string;
  contactEmail: string;
  allowRegistration: boolean;
}

interface SecuritySettings {
  requireEmailVerification: boolean;
  enableTwoFactor: boolean;
  sessionDuration: number;
  maxLoginAttempts: number;
}

interface ContentSettings {
  moderateContent: boolean;
  maxFileSize: number;
  allowedFileTypes: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  adminEmail: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  // Navigation
  activeTab: 'dashboard' | 'users' | 'moderation' | 'content' | 'settings' = 'dashboard';

  // Dashboard data
  dashboardStats: DashboardStat[] = [
    {
      label: 'Utilisateurs actifs',
      value: '1,284',
      icon: 'fas fa-users',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      trend: 12.5
    },
    {
      label: 'Messages publiés',
      value: '5,647',
      icon: 'fas fa-comments',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      trend: 8.3
    },
    {
      label: 'Ressources partagées',
      value: '892',
      icon: 'fas fa-file-alt',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      trend: 15.7
    },
    {
      label: 'Signalements',
      value: '23',
      icon: 'fas fa-flag',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      trend: -5.2
    }
  ];

  monthlyData: MonthlyData[] = [
    { label: 'Jan', value: 450 },
    { label: 'Fév', value: 520 },
    { label: 'Mar', value: 480 },
    { label: 'Avr', value: 640 },
    { label: 'Mai', value: 590 },
    { label: 'Jun', value: 720 },
    { label: 'Jul', value: 680 },
    { label: 'Aoû', value: 750 },
    { label: 'Sep', value: 820 },
    { label: 'Oct', value: 780 },
    { label: 'Nov', value: 860 },
    { label: 'Déc', value: 920 }
  ];

  maxMonthlyValue = Math.max(...this.monthlyData.map(d => d.value));

  recentAlerts: Alert[] = [
    {
      title: 'Contenu signalé',
      description: 'Un message a été signalé comme inapproprié',
      type: 'warning',
      time: 'Il y a 2h'
    },
    {
      title: 'Erreur système',
      description: 'Problème de connexion à la base de données',
      type: 'error',
      time: 'Il y a 4h'
    },
    {
      title: 'Nouvelle inscription',
      description: '15 nouveaux utilisateurs aujourd\'hui',
      type: 'info',
      time: 'Il y a 6h'
    }
  ];

  recentSystemActivity: SystemActivity[] = [
    {
      description: 'Nouveau utilisateur inscrit : Marie Dubois',
      time: 'Il y a 15 minutes',
      icon: 'fas fa-user-plus',
      color: '#28a745',
      type: 'Inscription'
    },
    {
      description: 'Ressource "Mathématiques L1" approuvée',
      time: 'Il y a 1 heure',
      icon: 'fas fa-check',
      color: '#007bff',
      type: 'Approbation'
    },
    {
      description: 'Signalement traité et résolu',
      time: 'Il y a 2 heures',
      icon: 'fas fa-flag',
      color: '#ffc107',
      type: 'Modération'
    },
    {
      description: 'Sauvegarde automatique effectuée',
      time: 'Il y a 3 heures',
      icon: 'fas fa-save',
      color: '#6f42c1',
      type: 'Système'
    }
  ];

  // Users management
  usersFilter: UsersFilter = {
    search: '',
    role: '',
    status: '',
    sortBy: 'name'
  };

  allUsers: User[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      avatar: 'assets/avatars/sophie.jpg',
      role: 'student',
      status: 'active',
      lastActivity: 'Il y a 2h',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Thomas Durand',
      email: 'thomas.durand@email.com',
      role: 'moderator',
      status: 'active',
      lastActivity: 'Il y a 30min',
      joinDate: '2023-11-20'
    },
    {
      id: '3',
      name: 'Emma Rousseau',
      email: 'emma.rousseau@email.com',
      role: 'student',
      status: 'suspended',
      lastActivity: 'Il y a 1 semaine',
      joinDate: '2024-02-08'
    },
    {
      id: '4',
      name: 'Lucas Bernard',
      email: 'lucas.bernard@email.com',
      role: 'admin',
      status: 'active',
      lastActivity: 'Il y a 10min',
      joinDate: '2023-09-12'
    }
  ];

  filteredUsers: User[] = [...this.allUsers];
  currentPage = 1;
  totalPages = 1;
  usersPerPage = 10;

  // Moderation
  pendingReports: Report[] = [
    {
      id: '1',
      title: 'Contenu inapproprié',
      description: 'Message contenant du langage offensant',
      content: 'Ce message contient des propos déplacés...',
      type: 'Harcèlement',
      priority: 'high',
      reportedBy: 'Marie L.',
      date: 'Il y a 2h'
    },
    {
      id: '2',
      title: 'Spam',
      description: 'Publication répétitive de liens commerciaux',
      content: 'Achetez maintenant sur notre site...',
      type: 'Spam',
      priority: 'medium',
      reportedBy: 'Paul D.',
      date: 'Il y a 4h'
    }
  ];

  urgentReports: Report[] = this.pendingReports.filter(r => r.priority === 'high');
  recentReports: Report[] = [...this.pendingReports];

  // Content management
  contentCategories: ContentCategory[] = [
    {
      id: '1',
      name: 'Articles',
      icon: 'fas fa-newspaper',
      color: '#007bff',
      count: 45
    },
    {
      id: '2',
      name: 'Ressources PDF',
      icon: 'fas fa-file-pdf',
      color: '#dc3545',
      count: 128
    },
    {
      id: '3',
      name: 'Vidéos',
      icon: 'fas fa-play-circle',
      color: '#28a745',
      count: 67
    },
    {
      id: '4',
      name: 'Exercices',
      icon: 'fas fa-tasks',
      color: '#ffc107',
      count: 89
    }
  ];

  recentContent: Content[] = [
    {
      id: '1',
      title: 'Introduction aux dérivées',
      description: 'Cours complet sur les dérivées',
      type: 'PDF',
      author: 'Prof. Martin',
      date: 'Aujourd\'hui',
      status: 'published'
    },
    {
      id: '2',
      title: 'Exercices de physique',
      description: 'Série d\'exercices sur la mécanique',
      type: 'Document',
      author: 'Dr. Dubois',
      date: 'Hier',
      status: 'draft'
    },
    {
      id: '3',
      title: 'Tutoriel JavaScript',
      description: 'Vidéo d\'introduction à JavaScript',
      type: 'Vidéo',
      author: 'Dev. Team',
      date: 'Il y a 2 jours',
      status: 'published'
    }
  ];

  // Settings
  platformSettings: PlatformSettings = {
    name: 'Memory Haven',
    description: 'Plateforme d\'accompagnement et de bien-être pour étudiants',
    contactEmail: 'contact@memoryhaven.com',
    allowRegistration: true
  };

  securitySettings: SecuritySettings = {
    requireEmailVerification: true,
    enableTwoFactor: false,
    sessionDuration: 120,
    maxLoginAttempts: 5
  };

  contentSettings: ContentSettings = {
    moderateContent: true,
    maxFileSize: 10,
    allowedFileTypes: 'pdf,doc,docx,jpg,png,mp4'
  };

  notificationSettings: NotificationSettings = {
    emailNotifications: true,
    pushNotifications: false,
    adminEmail: 'admin@memoryhaven.com'
  };

  // Math property for template
  Math = Math;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filterUsers();
  }

  // Navigation methods
  setActiveTab(tab: 'dashboard' | 'users' | 'moderation' | 'content' | 'settings'): void {
    this.activeTab = tab;
  }

  // Dashboard methods
  refreshData(): void {
    console.log('Actualisation des données...');
    // Future: reload data from backend
  }

  exportData(): void {
    console.log('Export des données...');
    // Future: implement data export
  }

  getAlertColor(type: string): string {
    const colors = {
      warning: '#ffc107',
      error: '#dc3545',
      info: '#007bff'
    };
    return colors[type as keyof typeof colors] || '#6c757d';
  }

  getAlertIcon(type: string): string {
    const icons = {
      warning: 'fas fa-exclamation-triangle',
      error: 'fas fa-times-circle',
      info: 'fas fa-info-circle'
    };
    return icons[type as keyof typeof icons] || 'fas fa-circle';
  }

  // Users management methods
  filterUsers(): void {
    this.filteredUsers = this.allUsers.filter(user => {
      const matchesSearch = !this.usersFilter.search || 
        user.name.toLowerCase().includes(this.usersFilter.search.toLowerCase()) ||
        user.email.toLowerCase().includes(this.usersFilter.search.toLowerCase());
      
      const matchesRole = !this.usersFilter.role || user.role === this.usersFilter.role;
      const matchesStatus = !this.usersFilter.status || user.status === this.usersFilter.status;
      
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort users
    this.filteredUsers.sort((a, b) => {
      switch (this.usersFilter.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'joinDate':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        default:
          return 0;
      }
    });

    this.updatePagination();
  }

  resetUsersFilter(): void {
    this.usersFilter = {
      search: '',
      role: '',
      status: '',
      sortBy: 'name'
    };
    this.filterUsers();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.usersPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  exportUsers(): void {
    console.log('Export des utilisateurs...');
    // Future: implement users export
  }

  addUser(): void {
    console.log('Ajout d\'un nouvel utilisateur...');
    // Future: implement add user modal
  }

  viewUser(user: User): void {
    console.log('Affichage de l\'utilisateur:', user);
    // Future: implement user details modal
  }

  editUser(user: User): void {
    console.log('Édition de l\'utilisateur:', user);
    // Future: implement edit user modal
  }

  suspendUser(user: User): void {
    const action = user.status === 'suspended' ? 'réactiver' : 'suspendre';
    const confirm = window.confirm(`Êtes-vous sûr de vouloir ${action} cet utilisateur ?`);
    if (confirm) {
      user.status = user.status === 'suspended' ? 'active' : 'suspended';
      console.log(`Utilisateur ${action}é:`, user);
      this.filterUsers();
    }
  }

  getRoleBadgeClass(role: string): string {
    const classes = {
      student: 'bg-primary',
      moderator: 'bg-warning text-dark',
      admin: 'bg-danger'
    };
    return classes[role as keyof typeof classes] || 'bg-secondary';
  }

  getRoleLabel(role: string): string {
    const labels = {
      student: 'Étudiant',
      moderator: 'Modérateur',
      admin: 'Admin'
    };
    return labels[role as keyof typeof labels] || role;
  }

  getStatusBadgeClass(status: string): string {
    const classes = {
      active: 'bg-success',
      suspended: 'bg-warning text-dark',
      banned: 'bg-danger'
    };
    return classes[status as keyof typeof classes] || 'bg-secondary';
  }

  getStatusLabel(status: string): string {
    const labels = {
      active: 'Actif',
      suspended: 'Suspendu',
      banned: 'Banni'
    };
    return labels[status as keyof typeof labels] || status;
  }

  // Moderation methods
  reviewReports(): void {
    console.log('Révision des signalements...');
    // Future: implement reports review
  }

  reviewComments(): void {
    console.log('Révision des commentaires...');
    // Future: implement comments review
  }

  reviewResources(): void {
    console.log('Révision des ressources...');
    // Future: implement resources review
  }

  moderationHistory(): void {
    console.log('Affichage de l\'historique de modération...');
    // Future: implement moderation history
  }

  approveReport(report: Report): void {
    console.log('Approbation du signalement:', report);
    const index = this.recentReports.indexOf(report);
    if (index > -1) {
      this.recentReports.splice(index, 1);
    }
  }

  rejectReport(report: Report): void {
    console.log('Rejet du signalement:', report);
    const index = this.recentReports.indexOf(report);
    if (index > -1) {
      this.recentReports.splice(index, 1);
    }
  }

  viewReportDetails(report: Report): void {
    console.log('Détails du signalement:', report);
    // Future: implement report details modal
  }

  getPriorityBadgeClass(priority: string): string {
    const classes = {
      low: 'bg-success',
      medium: 'bg-warning text-dark',
      high: 'bg-danger'
    };
    return classes[priority as keyof typeof classes] || 'bg-secondary';
  }

  getPriorityLabel(priority: string): string {
    const labels = {
      low: 'Faible',
      medium: 'Moyen',
      high: 'Élevé'
    };
    return labels[priority as keyof typeof labels] || priority;
  }

  // Content management methods
  addContent(): void {
    console.log('Ajout de nouveau contenu...');
    // Future: implement add content modal
  }

  manageCategory(category: ContentCategory): void {
    console.log('Gestion de la catégorie:', category);
    // Future: implement category management
  }

  viewContent(content: Content): void {
    console.log('Affichage du contenu:', content);
    // Future: implement content details
  }

  editContent(content: Content): void {
    console.log('Édition du contenu:', content);
    // Future: implement edit content modal
  }

  deleteContent(content: Content): void {
    const confirm = window.confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?');
    if (confirm) {
      const index = this.recentContent.indexOf(content);
      if (index > -1) {
        this.recentContent.splice(index, 1);
      }
      console.log('Contenu supprimé:', content);
    }
  }

  getContentIcon(type: string): string {
    const icons = {
      PDF: 'fas fa-file-pdf',
      Document: 'fas fa-file-alt',
      Vidéo: 'fas fa-play-circle',
      Image: 'fas fa-image'
    };
    return icons[type as keyof typeof icons] || 'fas fa-file';
  }

  getContentColor(type: string): string {
    const colors = {
      PDF: '#dc3545',
      Document: '#007bff',
      Vidéo: '#28a745',
      Image: '#ffc107'
    };
    return colors[type as keyof typeof colors] || '#6c757d';
  }

  getContentStatusBadgeClass(status: string): string {
    const classes = {
      draft: 'bg-warning text-dark',
      published: 'bg-success',
      archived: 'bg-secondary'
    };
    return classes[status as keyof typeof classes] || 'bg-secondary';
  }

  getContentStatusLabel(status: string): string {
    const labels = {
      draft: 'Brouillon',
      published: 'Publié',
      archived: 'Archivé'
    };
    return labels[status as keyof typeof labels] || status;
  }

  // Settings methods
  saveSettings(): void {
    console.log('Sauvegarde des paramètres...');
    console.log('Platform:', this.platformSettings);
    console.log('Security:', this.securitySettings);
    console.log('Content:', this.contentSettings);
    console.log('Notifications:', this.notificationSettings);
    // Future: implement settings save to backend
    alert('Paramètres sauvegardés avec succès !');
  }

  resetSettings(): void {
    const confirm = window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?');
    if (confirm) {
      // Reset to default values
      this.platformSettings = {
        name: 'Memory Haven',
        description: 'Plateforme d\'accompagnement et de bien-être pour étudiants',
        contactEmail: 'contact@memoryhaven.com',
        allowRegistration: true
      };

      this.securitySettings = {
        requireEmailVerification: true,
        enableTwoFactor: false,
        sessionDuration: 120,
        maxLoginAttempts: 5
      };

      this.contentSettings = {
        moderateContent: true,
        maxFileSize: 10,
        allowedFileTypes: 'pdf,doc,docx,jpg,png,mp4'
      };

      this.notificationSettings = {
        emailNotifications: true,
        pushNotifications: false,
        adminEmail: 'admin@memoryhaven.com'
      };

      console.log('Paramètres réinitialisés');
    }
  }
}
