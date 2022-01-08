import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnounceDriverPageRoutingModule } from './announce-driver-routing.module';

import { AnnounceDriverPage } from './announce-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AnnounceDriverPageRoutingModule,
  ],
  declarations: [AnnounceDriverPage],
})
export class AnnounceDriverPageModule {}
