import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingBarService } from '../../services/loading-bar.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [MatProgressBarModule, NgIf, AsyncPipe],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss',
})
export class LoadingBarComponent {
  constructor(private loadingBarService: LoadingBarService) {}

  get loading$(): Observable<boolean> {
    return this.loadingBarService.loadding$;
  }
}
