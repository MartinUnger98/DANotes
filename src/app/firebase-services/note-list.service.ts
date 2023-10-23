import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore , collection, collectionData} from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normNotes: Note[] = [];

  items$;
  items;

  firestore: Firestore = inject(Firestore);

  constructor() { 
    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe( (list) => {
    	list.forEach(element => {
        console.log(element);
      });
    });
    this.items.unsubscribe();
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
