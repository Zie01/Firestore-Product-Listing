import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ProductService } from './products.service';

import { ProductListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './products-detail/products-detail.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  providers: [ProductService],
})
export class NotesModule { }
