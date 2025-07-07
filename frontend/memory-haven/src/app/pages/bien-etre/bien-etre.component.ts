import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Mood {
  value: string;
  label: string;
  emoji: string;
}

interface BreathingExercise {
  id: string;
  name: string;
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
}

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

interface Quote {
  text: string;
  author: string;
}

interface JournalEntry {
  content: string;
  stressLevel: number;
  mood: string;
  activities: string[];
  date?: string;
}

interface WellnessActivity {
  id: string;
  name: string;
  icon: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-bien-etre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bien-etre.component.html',
  styleUrl: './bien-etre.component.scss',
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
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateY(-50px)', opacity: 0 }))
      ])
    ])
  ]
})
export class BienEtreComponent implements OnInit, OnDestroy {

  // Mood Tracking
  selectedMood = '';
  moods: Mood[] = [
    { value: 'very-happy', label: 'Très joyeux', emoji: '😄' },
    { value: 'happy', label: 'Joyeux', emoji: '😊' },
    { value: 'neutral', label: 'Neutre', emoji: '😐' },
    { value: 'sad', label: 'Triste', emoji: '😢' },
    { value: 'very-sad', label: 'Très triste', emoji: '😭' }
  ];

  // Breathing Exercise Properties
  showBreathingExercise = false;
  isBreathingActive = false;
  breathingPhase: 'inhale' | 'hold' | 'exhale' = 'inhale';
  breathingCount = 0;
  breathingCycleCount = 0;
  private breathingInterval?: number;

  breathingExercises: BreathingExercise[] = [
    { id: '1', name: '4-7-8 Relaxation', inhaleTime: 4, holdTime: 7, exhaleTime: 8 },
    { id: '2', name: 'Box Breathing', inhaleTime: 4, holdTime: 4, exhaleTime: 4 },
    { id: '3', name: 'Simple Breathing', inhaleTime: 4, holdTime: 0, exhaleTime: 6 }
  ];

  // Music Player Properties
  currentTrack?: MusicTrack;
  currentTime = 0;
  isPlaying = false;
  private audioInterval?: number;

  musicTracks: MusicTrack[] = [
    { id: '1', title: 'Sounds of Rain', artist: 'Nature Sounds', duration: 300, url: '' },
    { id: '2', title: 'Classical Meditation', artist: 'Peaceful Piano', duration: 240, url: '' },
    { id: '3', title: 'Ocean Waves', artist: 'Natural Ambience', duration: 360, url: '' },
    { id: '4', title: 'Forest Birds', artist: 'Nature Collection', duration: 280, url: '' }
  ];

  // Quotes
  currentQuote: Quote = {
    text: 'Le succès n\'est pas final, l\'échec n\'est pas fatal : c\'est le courage de continuer qui compte.',
    author: 'Winston Churchill'
  };

  quotes: Quote[] = [
    {
      text: 'Le succès n\'est pas final, l\'échec n\'est pas fatal : c\'est le courage de continuer qui compte.',
      author: 'Winston Churchill'
    },
    {
      text: 'La seule façon de faire du bon travail est d\'aimer ce que vous faites.',
      author: 'Steve Jobs'
    },
    {
      text: 'L\'éducation est l\'arme la plus puissante qu\'on puisse utiliser pour changer le monde.',
      author: 'Nelson Mandela'
    },
    {
      text: 'Ce qui ne vous tue pas vous rend plus fort.',
      author: 'Friedrich Nietzsche'
    },
    {
      text: 'Le seul moyen de faire un excellent travail est d\'aimer ce que vous faites.',
      author: 'Steve Jobs'
    }
  ];

  // Journal Properties
  showJournal = false;
  journalEntry: JournalEntry = {
    content: '',
    stressLevel: 5,
    mood: '',
    activities: []
  };

  recentJournalEntries: (JournalEntry & { date: string })[] = [
    {
      content: 'Journée productive aujourd\'hui. J\'ai réussi à terminer mes devoirs de mathématiques.',
      stressLevel: 3,
      mood: 'happy',
      activities: ['study', 'exercise'],
      date: 'Hier'
    },
    {
      content: 'Examen de français demain, un peu stressé mais bien préparé.',
      stressLevel: 6,
      mood: 'neutral',
      activities: ['study', 'meditation'],
      date: 'Il y a 2 jours'
    }
  ];

  wellnessActivities: WellnessActivity[] = [
    { id: 'study', name: 'Étude', icon: 'fas fa-book' },
    { id: 'exercise', name: 'Exercice', icon: 'fas fa-running' },
    { id: 'meditation', name: 'Méditation', icon: 'fas fa-om' },
    { id: 'music', name: 'Musique', icon: 'fas fa-music' },
    { id: 'nature', name: 'Nature', icon: 'fas fa-tree' },
    { id: 'friends', name: 'Amis', icon: 'fas fa-users' },
    { id: 'reading', name: 'Lecture', icon: 'fas fa-book-open' },
    { id: 'art', name: 'Art créatif', icon: 'fas fa-palette' }
  ];

  // Quick Actions
  quickActions: QuickAction[] = [
    {
      id: 'breathing',
      title: 'Respiration 2 min',
      description: 'Exercice rapide de respiration',
      icon: 'fas fa-lungs',
      color: '#4facfe'
    },
    {
      id: 'stretch',
      title: 'Étirements',
      description: 'Étirements simples au bureau',
      icon: 'fas fa-child',
      color: '#43e97b'
    },
    {
      id: 'mindfulness',
      title: 'Pleine conscience',
      description: 'Moment de conscience présente',
      icon: 'fas fa-brain',
      color: '#f093fb'
    },
    {
      id: 'gratitude',
      title: 'Gratitude',
      description: 'Note 3 choses positives',
      icon: 'fas fa-heart',
      color: '#fa709a'
    }
  ];

  ngOnInit() {
    this.currentTrack = this.musicTracks[0];
    this.startAudioTimer();
  }

  ngOnDestroy() {
    this.clearBreathingInterval();
    this.clearAudioInterval();
  }

  // Mood Selection
  selectMood(moodValue: string) {
    this.selectedMood = moodValue;
    console.log('Mood selected:', moodValue);
    // TODO: Save mood to backend
  }

  // Breathing Exercise Methods
  startBreathingExercise() {
    this.showBreathingExercise = true;
    this.resetBreathingExercise();
  }

  stopBreathingExercise() {
    this.showBreathingExercise = false;
    this.isBreathingActive = false;
    this.clearBreathingInterval();
    this.resetBreathingExercise();
  }

  startBreathingCycle() {
    this.isBreathingActive = true;
    this.breathingPhase = 'inhale';
    this.breathingCount = 4;
    this.startBreathingTimer();
  }

  pauseBreathingExercise() {
    this.isBreathingActive = false;
    this.clearBreathingInterval();
  }

  startSpecificExercise(exerciseId: string) {
    const exercise = this.breathingExercises.find(e => e.id === exerciseId);
    if (exercise) {
      this.startBreathingExercise();
      // TODO: Use specific exercise timing
    }
  }

  private startBreathingTimer() {
    this.clearBreathingInterval();
    
    this.breathingInterval = setInterval(() => {
      this.breathingCount--;
      
      if (this.breathingCount <= 0) {
        this.nextBreathingPhase();
      }
    }, 1000);
  }

  private nextBreathingPhase() {
    switch (this.breathingPhase) {
      case 'inhale':
        this.breathingPhase = 'hold';
        this.breathingCount = 4;
        break;
      case 'hold':
        this.breathingPhase = 'exhale';
        this.breathingCount = 6;
        break;
      case 'exhale':
        this.breathingCycleCount++;
        if (this.breathingCycleCount >= 10) {
          this.stopBreathingExercise();
          return;
        }
        this.breathingPhase = 'inhale';
        this.breathingCount = 4;
        break;
    }
  }

  private resetBreathingExercise() {
    this.breathingPhase = 'inhale';
    this.breathingCount = 4;
    this.breathingCycleCount = 0;
  }

  private clearBreathingInterval() {
    if (this.breathingInterval) {
      clearInterval(this.breathingInterval);
      this.breathingInterval = undefined;
    }
  }

  getBreathingPhaseText(): string {
    switch (this.breathingPhase) {
      case 'inhale': return 'Inspirez';
      case 'hold': return 'Retenez';
      case 'exhale': return 'Expirez';
      default: return '';
    }
  }

  // Music Player Methods
  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startAudioTimer();
    } else {
      this.clearAudioInterval();
    }
    console.log('Music', this.isPlaying ? 'playing' : 'paused');
  }

  previousTrack() {
    const currentIndex = this.musicTracks.findIndex(t => t.id === this.currentTrack?.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : this.musicTracks.length - 1;
    this.currentTrack = this.musicTracks[previousIndex];
    this.currentTime = 0;
  }

  nextTrack() {
    const currentIndex = this.musicTracks.findIndex(t => t.id === this.currentTrack?.id);
    const nextIndex = currentIndex < this.musicTracks.length - 1 ? currentIndex + 1 : 0;
    this.currentTrack = this.musicTracks[nextIndex];
    this.currentTime = 0;
  }

  openMusicLibrary() {
    console.log('Opening music library...');
    // TODO: Implement music library modal
  }

  private startAudioTimer() {
    this.clearAudioInterval();
    
    if (this.isPlaying && this.currentTrack) {
      this.audioInterval = setInterval(() => {
        this.currentTime++;
        if (this.currentTime >= this.currentTrack!.duration) {
          this.nextTrack();
        }
      }, 1000);
    }
  }

  private clearAudioInterval() {
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
      this.audioInterval = undefined;
    }
  }

  // Quote Methods
  getNewQuote() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.currentQuote = this.quotes[randomIndex];
  }

  shareQuote() {
    const text = `"${this.currentQuote.text}" - ${this.currentQuote.author}`;
    navigator.clipboard.writeText(text).then(() => {
      console.log('Quote copied to clipboard');
      // TODO: Show toast notification
    });
  }

  saveQuote() {
    console.log('Quote saved:', this.currentQuote);
    // TODO: Save to favorites
  }

  // Journal Methods
  openJournal() {
    this.showJournal = true;
  }

  closeJournal() {
    this.showJournal = false;
  }

  toggleActivity(activityId: string) {
    const index = this.journalEntry.activities.indexOf(activityId);
    if (index > -1) {
      this.journalEntry.activities.splice(index, 1);
    } else {
      this.journalEntry.activities.push(activityId);
    }
  }

  resetJournalEntry() {
    this.journalEntry = {
      content: '',
      stressLevel: 5,
      mood: '',
      activities: []
    };
  }

  saveJournalEntry() {
    if (this.journalEntry.content.trim()) {
      const entry = {
        ...this.journalEntry,
        date: new Date().toLocaleDateString('fr-FR')
      };
      
      this.recentJournalEntries.unshift(entry);
      console.log('Journal entry saved:', entry);
      
      this.resetJournalEntry();
      this.closeJournal();
      
      // TODO: Save to backend
    }
  }

  // Quick Actions
  executeQuickAction(actionId: string) {
    switch (actionId) {
      case 'breathing':
        this.startBreathingExercise();
        break;
      case 'stretch':
        console.log('Starting stretch routine...');
        // TODO: Implement stretch guide
        break;
      case 'mindfulness':
        console.log('Starting mindfulness exercise...');
        // TODO: Implement mindfulness guide
        break;
      case 'gratitude':
        this.openJournal();
        break;
    }
  }

  openQuickWellness() {
    console.log('Opening quick wellness menu...');
    // TODO: Implement quick wellness modal
  }
}
