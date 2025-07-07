import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  id: string;
  title: string;
  preview: string;
  description: string;
  author: string;
  authorReputation: number;
  category: string;
  createdAt: string;
  votes: number;
  answers: number;
  views: number;
  isAnswered: boolean;
  isFeatured: boolean;
  isBookmarked: boolean;
  userVote?: 'up' | 'down';
  tags: string[];
}

interface NewQuestion {
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qa.component.html',
  styleUrl: './qa.component.scss'
})
export class QaComponent implements OnInit {

  // Form Properties
  showQuestionForm = false;
  newQuestion: NewQuestion = {
    title: '',
    description: '',
    category: ''
  };

  // Search and Filter Properties
  searchQuery = '';
  selectedSort = 'recent';
  selectedCategory = '';

  // State Properties
  hasMoreQuestions = true;
  filteredQuestions: Question[] = [];

  // Statistics
  qaStats = {
    totalQuestions: 456,
    resolvedQuestions: 78
  };

  // Questions Data
  questions: Question[] = [
    {
      id: '1',
      title: 'Comment résoudre les équations du second degré avec discriminant négatif ?',
      preview: 'Je n\'arrive pas à comprendre ce qui se passe quand le discriminant est négatif. Y a-t-il des solutions ?',
      description: 'Je travaille sur un exercice de mathématiques et je tombe sur une équation du second degré où le discriminant est négatif...',
      author: 'Sarah M.',
      authorReputation: 245,
      category: 'math',
      createdAt: 'Il y a 2 heures',
      votes: 15,
      answers: 3,
      views: 89,
      isAnswered: true,
      isFeatured: false,
      isBookmarked: false,
      userVote: undefined,
      tags: ['équations', 'second-degré', 'discriminant']
    },
    {
      id: '2',
      title: 'Analyse de "L\'Étranger" de Camus : thèmes principaux ?',
      preview: 'J\'ai du mal à identifier les thèmes centraux du roman. Quelqu\'un peut-il m\'éclairer sur l\'absurdité et l\'aliénation ?',
      description: 'Pour mon exposé de français, je dois analyser les thèmes principaux de L\'Étranger...',
      author: 'Thomas L.',
      authorReputation: 189,
      category: 'french',
      createdAt: 'Il y a 4 heures',
      votes: 22,
      answers: 5,
      views: 134,
      isAnswered: true,
      isFeatured: true,
      isBookmarked: true,
      userVote: 'up',
      tags: ['littérature', 'camus', 'existentialisme']
    },
    {
      id: '3',
      title: 'Lois de Newton : comment appliquer la 2e loi en pratique ?',
      preview: 'Je comprends la théorie F=ma mais j\'ai des difficultés avec les exercices pratiques.',
      description: 'Dans mes exercices de physique, j\'arrive à identifier les forces mais j\'ai du mal à appliquer F=ma...',
      author: 'Alex R.',
      authorReputation: 156,
      category: 'sciences',
      createdAt: 'Il y a 6 heures',
      votes: 18,
      answers: 7,
      views: 203,
      isAnswered: true,
      isFeatured: false,
      isBookmarked: false,
      userVote: undefined,
      tags: ['physique', 'mécanique', 'newton']
    },
    {
      id: '4',
      title: 'Première Guerre mondiale : causes du déclenchement ?',
      preview: 'Quels sont les facteurs qui ont mené à la Première Guerre mondiale ? L\'attentat de Sarajevo suffit-il à expliquer ?',
      description: 'Pour mon devoir d\'histoire, je dois expliquer les causes de la Première Guerre mondiale...',
      author: 'Emma K.',
      authorReputation: 234,
      category: 'history',
      createdAt: 'Il y a 8 heures',
      votes: 12,
      answers: 4,
      views: 87,
      isAnswered: false,
      isFeatured: false,
      isBookmarked: false,
      userVote: undefined,
      tags: ['guerre-mondiale', 'causes', 'histoire-moderne']
    },
    {
      id: '5',
      title: 'Conjugaison anglaise : Present Perfect vs Past Simple',
      preview: 'Je confonds toujours ces deux temps. Quand utiliser "I have done" vs "I did" ?',
      description: 'En anglais, j\'ai beaucoup de mal à faire la différence entre le Present Perfect et le Past Simple...',
      author: 'Marie D.',
      authorReputation: 178,
      category: 'languages',
      createdAt: 'Il y a 12 heures',
      votes: 25,
      answers: 9,
      views: 167,
      isAnswered: true,
      isFeatured: false,
      isBookmarked: true,
      userVote: 'up',
      tags: ['anglais', 'conjugaison', 'temps']
    },
    {
      id: '6',
      title: 'Gestion du stress pendant les examens : techniques efficaces ?',
      preview: 'J\'ai tendance à paniquer pendant les examens. Quelles sont vos techniques pour rester calme ?',
      description: 'Malgré mes révisions, je stresse énormément pendant les examens et cela affecte mes performances...',
      author: 'Lucas B.',
      authorReputation: 98,
      category: 'other',
      createdAt: 'Il y a 1 jour',
      votes: 31,
      answers: 12,
      views: 289,
      isAnswered: true,
      isFeatured: true,
      isBookmarked: false,
      userVote: undefined,
      tags: ['stress', 'examens', 'bien-être']
    }
  ];

  ngOnInit() {
    this.filteredQuestions = [...this.questions];
  }

  // Form Methods
  toggleQuestionForm() {
    this.showQuestionForm = !this.showQuestionForm;
    if (this.showQuestionForm) {
      setTimeout(() => {
        const formElement = document.querySelector('.question-form-section');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  submitQuestion() {
    if (this.newQuestion.title && this.newQuestion.description) {
      const question: Question = {
        id: (this.questions.length + 1).toString(),
        title: this.newQuestion.title,
        preview: this.newQuestion.description.substring(0, 100) + '...',
        description: this.newQuestion.description,
        author: 'Vous',
        authorReputation: 50,
        category: this.newQuestion.category || 'other',
        createdAt: 'À l\'instant',
        votes: 0,
        answers: 0,
        views: 1,
        isAnswered: false,
        isFeatured: false,
        isBookmarked: false,
        userVote: undefined,
        tags: []
      };

      this.questions.unshift(question);
      this.applyFilters();
      this.resetForm();
      this.showQuestionForm = false;

      console.log('Question publiée:', question);
    }
  }

  resetForm() {
    this.newQuestion = {
      title: '',
      description: '',
      category: ''
    };
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
    let filtered = [...this.questions];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(question => 
        question.title.toLowerCase().includes(query) ||
        question.preview.toLowerCase().includes(query) ||
        question.author.toLowerCase().includes(query) ||
        question.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(question => 
        question.category === this.selectedCategory
      );
    }

    // Apply sorting
    switch (this.selectedSort) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views + b.votes) - (a.views + a.votes));
        break;
      case 'votes':
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case 'unanswered':
        filtered = filtered.filter(q => q.answers === 0);
        break;
    }

    this.filteredQuestions = filtered;
  }

  // Navigation Methods
  scrollToQuestions() {
    const element = document.getElementById('questions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openQuestion(questionId: string) {
    console.log('Opening question:', questionId);
    // TODO: Navigate to question detail page
  }

  // Action Methods
  voteQuestion(questionId: string, voteType: 'up' | 'down') {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      // Remove previous vote if exists
      if (question.userVote === 'up') {
        question.votes--;
      } else if (question.userVote === 'down') {
        question.votes++;
      }

      // Apply new vote
      if (question.userVote === voteType) {
        // Remove vote if clicking the same button
        question.userVote = undefined;
      } else {
        question.userVote = voteType;
        if (voteType === 'up') {
          question.votes++;
        } else {
          question.votes--;
        }
      }

      this.applyFilters();
    }
  }

  shareQuestion(questionId: string) {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      const url = `${window.location.origin}/qa/${questionId}`;
      navigator.clipboard.writeText(url).then(() => {
        console.log('URL copiée dans le presse-papiers');
        // TODO: Show toast notification
      });
    }
  }

  bookmarkQuestion(questionId: string) {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.isBookmarked = !question.isBookmarked;
      console.log('Question bookmarked:', question.isBookmarked);
    }
  }

  refreshQuestions() {
    console.log('Refreshing questions...');
    // TODO: Implement refresh logic
    this.applyFilters();
  }

  loadMoreQuestions() {
    console.log('Loading more questions...');
    // TODO: Implement pagination logic
    this.hasMoreQuestions = false;
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
}
