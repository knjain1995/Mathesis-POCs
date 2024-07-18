import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerLoaderService {

  // flag to activate loading spinner
  // Behaviour Subject casts message to all Observers at once (multicast)  
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() { }


}
