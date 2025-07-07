import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ForumComponent } from './pages/forum/forum.component';
import { QaComponent } from './pages/qa/qa.component';
import { RessourcesComponent } from './pages/ressources/ressources.component';
import { BienEtreComponent } from './pages/bien-etre/bien-etre.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'qa', component: QaComponent },
  { path: 'ressources', component: RessourcesComponent },
  { path: 'bien-etre', component: BienEtreComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '/accueil' }
];
