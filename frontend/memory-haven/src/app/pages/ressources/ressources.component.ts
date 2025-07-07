import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Resource {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  level: string;
  type: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  reviews: number;
  fileSize: string;
  fileType: string;
  isBookmarked: boolean;
}

interface NewResource {
  title: string;
  description: string;
  category: string;
  level: string;
  type: string;
  file?: File;
}

@Component({
  selector: 'app-ressources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-in', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class RessourcesComponent implements OnInit {

  // Admin Access (simulate user role)
  isAdmin = true; // TODO: Get from auth service

  // Form Properties
  showUploadForm = false;
  showAdvancedFilters = false;
  newResource: NewResource = {
    title: '',
    description: '',
    category: '',
    level: '',
    type: ''
  };

  // Search and Filter Properties
  searchQuery = '';
  selectedCategory = '';
  selectedLevel = '';
  selectedType = '';
  selectedSort = 'recent';

  // State Properties
  hasMoreResources = true;
  filteredResources: Resource[] = [];

  // Statistics
  resourceStats = {
    totalResources: 187,
    totalDownloads: 2453
  };

  // Resources Data
  resources: Resource[] = [
    {
      id: '1',
      title: 'Cours complet sur les fonctions polynomiales',
      description: 'Un guide détaillé couvrant toutes les propriétés des fonctions polynomiales avec exercices corrigés.',
      author: 'Prof. Martin Dubois',
      category: 'math',
      level: 'lycee',
      type: 'course',
      uploadDate: 'Il y a 2 jours',
      downloads: 234,
      rating: 4.8,
      reviews: 45,
      fileSize: '2.3 MB',
      fileType: 'PDF',
      isBookmarked: false
    },
    {
      id: '2',
      title: 'Analyse littéraire - Méthodologie complète',
      description: 'Méthodes et techniques pour réussir vos analyses littéraires avec exemples pratiques.',
      author: 'Dr. Sophie Laurent',
      category: 'french',
      level: 'lycee',
      type: 'guide',
      uploadDate: 'Il y a 5 jours',
      downloads: 189,
      rating: 4.6,
      reviews: 32,
      fileSize: '1.8 MB',
      fileType: 'PDF',
      isBookmarked: true
    },
    {
      id: '3',
      title: 'Exercices de physique - Mécanique newtonienne',
      description: 'Série d\'exercices progressifs sur les lois de Newton avec corrections détaillées.',
      author: 'Prof. Jean Moreau',
      category: 'sciences',
      level: 'lycee',
      type: 'exercise',
      uploadDate: 'Il y a 1 semaine',
      downloads: 156,
      rating: 4.7,
      reviews: 28,
      fileSize: '3.1 MB',
      fileType: 'PDF',
      isBookmarked: false
    },
    {
      id: '4',
      title: 'Résumé - Première Guerre mondiale',
      description: 'Synthèse complète des causes, déroulement et conséquences de la Grande Guerre.',
      author: 'Prof. Marie Dupont',
      category: 'history',
      level: 'lycee',
      type: 'summary',
      uploadDate: 'Il y a 3 jours',
      downloads: 167,
      rating: 4.5,
      reviews: 22,
      fileSize: '1.2 MB',
      fileType: 'PDF',
      isBookmarked: true
    },
    {
      id: '5',
      title: 'Conjugaison anglaise - Temps et aspects',
      description: 'Guide complet de la conjugaison anglaise avec tableaux récapitulatifs et exercices.',
      author: 'Sarah Wilson',
      category: 'languages',
      level: 'lycee',
      type: 'course',
      uploadDate: 'Il y a 4 jours',
      downloads: 198,
      rating: 4.9,
      reviews: 51,
      fileSize: '2.7 MB',
      fileType: 'PDF',
      isBookmarked: false
    },
    {
      id: '6',
      title: 'Sujets d\'examen - Baccalauréat Mathématiques',
      description: 'Collection de sujets d\'examen des années précédentes avec corrigés détaillés.',
      author: 'Équipe Académique',
      category: 'math',
      level: 'lycee',
      type: 'exam',
      uploadDate: 'Il y a 1 semaine',
      downloads: 289,
      rating: 4.8,
      reviews: 67,
      fileSize: '4.5 MB',
      fileType: 'PDF',
      isBookmarked: true
    },
    {
      id: '7',
      title: 'Chimie organique - Nomenclature et réactions',
      description: 'Introduction à la chimie organique avec focus sur la nomenclature IUPAC.',
      author: 'Dr. Pierre Leroy',
      category: 'sciences',
      level: 'superieur',
      type: 'course',
      uploadDate: 'Il y a 6 jours',
      downloads: 123,
      rating: 4.4,
      reviews: 19,
      fileSize: '3.8 MB',
      fileType: 'PDF',
      isBookmarked: false
    },
    {
      id: '8',
      title: 'Algorithmes de tri - Présentation interactive',
      description: 'Présentation PowerPoint interactive expliquant les principaux algorithmes de tri.',
      author: 'Prof. Alex Martin',
      category: 'other',
      level: 'superieur',
      type: 'course',
      uploadDate: 'Il y a 2 semaines',
      downloads: 145,
      rating: 4.6,
      reviews: 24,
      fileSize: '5.2 MB',
      fileType: 'PPTX',
      isBookmarked: false
    }
  ];

  ngOnInit() {
    this.filteredResources = [...this.resources];
  }

  // Form Methods
  toggleUploadForm() {
    this.showUploadForm = !this.showUploadForm;
    if (this.showUploadForm) {
      setTimeout(() => {
        const formElement = document.querySelector('.upload-form-section');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newResource.file = file;
      console.log('File selected:', file.name);
    }
  }

  submitResource() {
    if (this.newResource.title && this.newResource.category && this.newResource.file) {
      const resource: Resource = {
        id: (this.resources.length + 1).toString(),
        title: this.newResource.title,
        description: this.newResource.description || 'Aucune description disponible',
        author: 'Vous',
        category: this.newResource.category,
        level: this.newResource.level || 'lycee',
        type: this.newResource.type || 'course',
        uploadDate: 'À l\'instant',
        downloads: 0,
        rating: 0,
        reviews: 0,
        fileSize: this.formatFileSize(this.newResource.file.size),
        fileType: this.getFileExtension(this.newResource.file.name),
        isBookmarked: false
      };

      this.resources.unshift(resource);
      this.applyFilters();
      this.resetUploadForm();
      this.showUploadForm = false;

      console.log('Resource uploaded:', resource);
    }
  }

  resetUploadForm() {
    this.newResource = {
      title: '',
      description: '',
      category: '',
      level: '',
      type: ''
    };
    // Reset file input
    const fileInput = document.getElementById('resourceFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Search and Filter Methods
  onSearch() {
    this.applyFilters();
  }

  onCategoryFilter() {
    this.applyFilters();
  }

  onLevelFilter() {
    this.applyFilters();
  }

  onTypeFilter() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedLevel = '';
    this.selectedType = '';
    this.selectedSort = 'recent';
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = [...this.resources];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.author.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(resource => 
        resource.category === this.selectedCategory
      );
    }

    // Apply level filter
    if (this.selectedLevel) {
      filtered = filtered.filter(resource => 
        resource.level === this.selectedLevel
      );
    }

    // Apply type filter
    if (this.selectedType) {
      filtered = filtered.filter(resource => 
        resource.type === this.selectedType
      );
    }

    // Apply sorting
    switch (this.selectedSort) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    this.filteredResources = filtered;
  }

  // Navigation Methods
  scrollToResources() {
    const element = document.getElementById('resources');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Action Methods
  downloadResource(resourceId: string) {
    const resource = this.resources.find(r => r.id === resourceId);
    if (resource) {
      resource.downloads++;
      console.log('Downloading resource:', resource.title);
      // TODO: Implement actual download logic
    }
  }

  previewResource(resourceId: string) {
    console.log('Previewing resource:', resourceId);
    // TODO: Implement preview modal
  }

  shareResource(resourceId: string) {
    const resource = this.resources.find(r => r.id === resourceId);
    if (resource) {
      const url = `${window.location.origin}/ressources/${resourceId}`;
      navigator.clipboard.writeText(url).then(() => {
        console.log('URL copiée dans le presse-papiers');
        // TODO: Show toast notification
      });
    }
  }

  bookmarkResource(resourceId: string) {
    const resource = this.resources.find(r => r.id === resourceId);
    if (resource) {
      resource.isBookmarked = !resource.isBookmarked;
      console.log('Resource bookmarked:', resource.isBookmarked);
    }
  }

  rateResource(resourceId: string) {
    console.log('Rating resource:', resourceId);
    // TODO: Implement rating modal
  }

  refreshResources() {
    console.log('Refreshing resources...');
    // TODO: Implement refresh logic
    this.applyFilters();
  }

  loadMoreResources() {
    console.log('Loading more resources...');
    // TODO: Implement pagination logic
    this.hasMoreResources = false;
  }

  // Helper Methods
  getCategoryName(categoryId: string): string {
    const categories: { [key: string]: string } = {
      'math': 'Mathématiques',
      'french': 'Français',
      'sciences': 'Sciences',
      'history': 'Histoire',
      'languages': 'Langues',
      'other': 'Autre'
    };
    return categories[categoryId] || 'Non catégorisé';
  }

  getCategoryColor(categoryId: string): string {
    const colors: { [key: string]: string } = {
      'math': '#667eea',
      'french': '#f093fb',
      'sciences': '#4facfe',
      'history': '#43e97b',
      'languages': '#fa709a',
      'other': '#a8edea'
    };
    return colors[categoryId] || '#6c757d';
  }

  getLevelName(levelId: string): string {
    const levels: { [key: string]: string } = {
      'college': 'Collège',
      'lycee': 'Lycée',
      'superieur': 'Supérieur'
    };
    return levels[levelId] || 'Non spécifié';
  }

  getTypeName(typeId: string): string {
    const types: { [key: string]: string } = {
      'course': 'Cours',
      'exercise': 'Exercices',
      'summary': 'Résumé',
      'exam': 'Examen',
      'guide': 'Guide'
    };
    return types[typeId] || 'Autre';
  }

  getTypeIcon(typeId: string): string {
    const icons: { [key: string]: string } = {
      'course': 'fas fa-chalkboard-teacher',
      'exercise': 'fas fa-pencil-alt',
      'summary': 'fas fa-file-alt',
      'exam': 'fas fa-graduation-cap',
      'guide': 'fas fa-map'
    };
    return icons[typeId] || 'fas fa-file';
  }

  getTypeColor(typeId: string): string {
    const colors: { [key: string]: string } = {
      'course': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'exercise': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'summary': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'exam': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'guide': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    };
    return colors[typeId] || 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
  }

  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  private getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toUpperCase() || 'UNKNOWN';
  }
}
