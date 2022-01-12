import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProfileService } from '../service/profile.service';
import { Profile } from './profil.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profiles$: Observable<Profile[]>;

  constructor(
    private profileService: ProfileService, 
    private loadingCtrl: LoadingController,
 
    ) { }

  async ngOnInit() {
   const loading = await  this.loadingCtrl.create({message: 'Loading ...'});
   loading.present();
   this.profiles$ = this.profileService.getProfile().pipe(
    tap(annonces =>{
      loading.dismiss();
      return annonces;
    })
   )
   console.log(this.profiles$);
  }
}
