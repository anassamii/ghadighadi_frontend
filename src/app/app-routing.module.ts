import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'announce-client',
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
