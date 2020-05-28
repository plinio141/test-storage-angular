import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  file: File;
  completed = false;
  uploadPercent: Observable<number>;

  constructor(
    private storage: AngularFireStorage
  ){}

  uploadFile() {
    this.completed = false;
    const filePath = this.file.name;
    const task = this.storage.upload(filePath, this.file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        this.completed = true;
      })
    )
    .subscribe();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

}
