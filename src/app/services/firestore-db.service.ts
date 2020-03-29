import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FirestoreDbService {
    private ollectionItemId:string;
    constructor(private db: AngularFirestore,
                private angularFireAuth: AngularFireAuth) {
    }

    getTodos(collectionId) {
        return this.db.collection(collectionId, ref => ref.where('owner', '==', this.angularFireAuth.auth.currentUser.email)).snapshotChanges().pipe(
            map(actions => {
                return actions.map(doc => {
                    const data = doc.payload.doc.data();
                    const id = doc.payload.doc.id;
                    console.log('id', id, 'data', data.valueOf());
                    return {id, ...data};
                });
            })
        );
    }

    getItems(collectionId) {
        return this.db.collection('todos').doc(collectionId).collection('items').snapshotChanges().pipe(
            map(actions => {
                return actions.map(doc => {
                    const data = doc.payload.doc.data();
                    const id = doc.payload.doc.id;
                    console.log('id2 ', id, 'data2 ', data.valueOf());
                    return {id, ...data};
                });
            })
        );
    }


    async insertTodo(collectionId, data) {
        try {
            const result = await this.db.collection(collectionId).add(data);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
    async insertItem(docId,data) {
        try {
            const result = await this.db.collection(`${'todos'}/${docId}/${'items'}`).add(data);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateData(collectionId, docId, updatedData) {
        try {
            const result = await this.db.doc(`${collectionId}/${docId}`).update(updatedData);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteTodo(collectionId, docId) {
        try {
            const result = await this.db.doc(`${collectionId}/${docId}`).delete();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

}
