import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnounceClientPageRoutingModule } from './announce-client-routing.module';

import { AnnounceClientPage } from './announce-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AnnounceClientPageRoutingModule,
  ],
  declarations: [AnnounceClientPage],
})
export class AnnounceClientPageModule {}
