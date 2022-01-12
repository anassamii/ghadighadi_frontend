import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'thanks',
    loadChildren: () =>
      import('./thanks/thanks.page.module').then((m) => m.ThanksPageModule),
  },
  {
    path: 'announce-client',
    loadChildren: () =>
      import('./announce-client/announce-client.module').then(
        (m) => m.AnnounceClientPageModule
      ),
  },
  {
    path: 'announce-driver',
    loadChildren: () =>
      import('./announce-driver/announce-driver.module').then(
        (m) => m.AnnounceDriverPageModule
      ),
  },
  
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
