import { Component } from '@angular/core';
import { SpinnerLoaderService } from '../spinner-loader.service';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrl: './spinner-loader.component.css'
})
export class SpinnerLoaderComponent {

  constructor(
    public spinnerLoaderService: SpinnerLoaderService
  ) {}

}
