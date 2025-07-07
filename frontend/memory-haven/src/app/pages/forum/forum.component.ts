import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  discussionCount: number;
  lastActivity: string;
}

interface Discussion {
  id: string;
  title: string;
  preview: string;
  author: string;
  categoryId: string;
  createdAt: string;
  replies: number;
  views: number;
  upvotes: number;
  downvotes: number;
  isResolved: boolean;
  isPinned: boolean;
}

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit {

  // Search and Filter Properties
  searchQuery = '';
  selectedSort = 'recent';
  selectedCategory = '';

  // Forum Statistics
  forumStats = {
    totalDiscussions: 284,
    activeUsers: 47
  };

  // State Properties
  hasMoreDiscussions = true;
  filteredDiscussions: Discussion[] = [];

  // Categories Data
  categories: Category[] = [
    {
      id: 'math',
      name: 'Mathématiques',
      description: 'Algèbre, géométrie, analyse et statistiques',
      icon: 'fas fa-calculator',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      discussionCount: 127,
      lastActivity: 'Il y a 2 min'
    },
    {
      id: 'french',
      name: 'Français',
      description: 'Littérature, grammaire et expression écrite',
      icon: 'fas fa-book-open',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      discussionCount: 89,
      lastActivity: 'Il y a 15 min'
    },
    {
      id: 'sciences',
      name: 'Sciences',
      description: 'Physique, chimie, biologie et sciences de la terre',
      icon: 'fas fa-atom',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      discussionCount: 156,
      lastActivity: 'Il y a 5 min'
    },
    {
      id: 'history',
      name: 'Histoire',
      description: 'Histoire mondiale, française et contemporaine',
      icon: 'fas fa-landmark',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      discussionCount: 73,
      lastActivity: 'Il y a 1h'
    },
    {
      id: 'languages',
      name: 'Langues',
      description: 'Anglais, espagnol, allemand et autres langues',
      icon: 'fas fa-globe',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      discussionCount: 95,
      lastActivity: 'Il y a 30 min'
    },
    {
      id: 'other',
      name: 'Autres',
      description: 'Philosophie, économie, arts et discussions générales',
      icon: 'fas fa-ellipsis-h',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      discussionCount: 64,
      lastActivity: 'Il y a 45 min'
    }
  ];

  // Discussions Data
  discussions: Discussion[] = [
    {
      id: '1',
      title: 'Comment résoudre les équations du second degré ?',
      preview: 'Je bloque sur les exercices avec discriminant négatif...',
      author: 'Sarah M.',
      categoryId: 'math',
      createdAt: 'Il y a 2 heures',
      replies: 12,
      views: 89,
      upvotes: 15,
      downvotes: 2,
      isResolved: true,
      isPinned: false
    },
    {
      id: '2',
      title: 'Analyse littéraire de "L\'Étranger" de Camus',
      preview: 'Quelqu\'un peut-il m\'aider à comprendre les thèmes principaux ?',
      author: 'Thomas L.',
      categoryId: 'french',
      createdAt: 'Il y a 5 heures',
      replies: 8,
      views: 67,
      upvotes: 22,
      downvotes: 1,
      isResolved: false,
      isPinned: true
    },
    {
      id: '3',
      title: 'Lois de Newton - Exercices pratiques',
      preview: 'Partage d\'exercices corrigés sur la mécanique classique',
      author: 'Dr. Martin',
      categoryId: 'sciences',
      createdAt: 'Il y a 1 jour',
      replies: 25,
      views: 156,
      upvotes: 34,
      downvotes: 3,
      isResolved: false,
      isPinned: true
    },
    {
      id: '4',
      title: 'Première Guerre mondiale - Chronologie',
      preview: 'Recherche des ressources pour réviser les dates importantes',
      author: 'Emma K.',
      categoryId: 'history',
      createdAt: 'Il y a 3 heures',
      replies: 6,
      views: 43,
      upvotes: 9,
      downvotes: 0,
      isResolved: false,
      isPinned: false
    },
    {
      id: '5',
      title: 'Irregular verbs en anglais - Méthodes de mémorisation',
      preview: 'Quelles sont vos techniques pour retenir les verbes irréguliers ?',
      author: 'Alex R.',
      categoryId: 'languages',
      createdAt: 'Il y a 6 heures',
      replies: 18,
      views: 98,
      upvotes: 27,
      downvotes: 2,
      isResolved: true,
      isPinned: false
    }
  ];

  ngOnInit() {
    this.filteredDiscussions = [...this.discussions];
  }

  // Search and Filter Methods
  onSearch() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  onCategoryFilter() {
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = [...this.discussions];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(discussion => 
        discussion.title.toLowerCase().includes(query) ||
        discussion.preview.toLowerCase().includes(query) ||
        discussion.author.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(discussion => 
        discussion.categoryId === this.selectedCategory
      );
    }

    // Apply sorting
    switch (this.selectedSort) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.upvotes + b.views) - (a.upvotes + a.views));
        break;
      case 'answered':
        filtered = filtered.filter(d => d.replies > 0);
        break;
      case 'unanswered':
        filtered = filtered.filter(d => d.replies === 0);
        break;
    }

    this.filteredDiscussions = filtered;
  }

  // Navigation Methods
  openNewTopicModal() {
    console.log('Opening new topic modal...');
    // TODO: Implement modal logic
  }

  scrollToCategories() {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openDiscussion(discussionId: string) {
    console.log('Opening discussion:', discussionId);
    // TODO: Navigate to discussion detail page
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.applyFilters();
    
    // Scroll to discussions section
    const element = document.querySelector('.discussions-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Action Methods
  voteDiscussion(discussionId: string, voteType: 'up' | 'down') {
    const discussion = this.discussions.find(d => d.id === discussionId);
    if (discussion) {
      if (voteType === 'up') {
        discussion.upvotes++;
      } else {
        discussion.downvotes++;
      }
      this.applyFilters();
    }
  }

  refreshDiscussions() {
    console.log('Refreshing discussions...');
    // TODO: Implement refresh logic
    this.applyFilters();
  }

  loadMoreDiscussions() {
    console.log('Loading more discussions...');
    // TODO: Implement pagination logic
    this.hasMoreDiscussions = false;
  }

  // Helper Methods
  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Non catégorisé';
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.color : '#6c757d';
  }
}
