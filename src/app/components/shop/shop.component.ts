import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  users$: Observable<UserModel[]> = new Observable<UserModel[]>();
  newUsers$: Observable<UserModel[]> = new Observable<UserModel[]>();

  _appService = inject(AppService);
  
  constructor() {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.users$ = this._appService.getUsers().pipe(shareReplay(1));
    this.newUsers$ = this.users$.pipe(
      map((item) => item.filter((x) => parseInt(x.id) % 2 === 0))
    );
  }
}
