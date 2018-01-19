import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Product } from './product-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

interface Product {
  content: string;
  hearts: 0;
  time: number;
}

@Injectable()
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  noteDocument:   AngularFirestoreDocument<Node>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection('products', (ref) => ref.orderBy('time', 'desc').limit(5));
  }

  getData(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }

  getSnapshot(): Observable<Product[]> {
    // ['added', 'modified', 'removed']
    return this.productsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Product;
        return { id: a.payload.doc.id, content: data.content, hearts: data.hearts, time: data.time };
      });
    });
  }

  getProduct(id: string) {
    return this.afs.doc<Product>(`products/${id}`);
  }

  create(content: string) {
    const product = {
      content,
      hearts: 0,
      time: new Date().getTime(),
    };
    return this.productsCollection.add(Product);
  }

  updateProduct(id: string, data: Partial<Product>) {
    return this.getProduct(id).update(data);
  }

  deleteProduct(id: string) {
    return this.getProduct(id).delete();
  }
}
