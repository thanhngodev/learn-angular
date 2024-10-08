import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingBarService {
  private loading = new BehaviorSubject<boolean>(false);
  loadding$ = this.loading.asObservable();

  constructor() {}

  controlProgressing(loading: boolean) {
    console.log("controlProgressing: ", loading);
    
    this.loading.next(loading);
  }
}
