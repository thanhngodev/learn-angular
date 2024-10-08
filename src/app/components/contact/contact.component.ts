import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { UserModel } from '../../models/user.model';
import { AppService } from '../../services/app.service';

export interface IAnimals {
  name: string;
  age: number;
}

export const newCat: IAnimals = {
  name: 'Thomas Boo',
  age: 10,
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatButton, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  count = signal<number>(0);
  cat = signal<IAnimals>({
    name: 'Thomas Tom',
    age: 0,
  });

  catNews = signal<IAnimals[]>([]);
  userSelected = signal<UserModel | null>(null);

  isCheck = signal<boolean>(false);

  doubleCount = computed<number>(() => this.count() * 2);
  oldCat = computed<boolean>(() =>
    this.isCheck() ? this.cat().age > 12 : false
  );

  users: any;
  queryUserSelected$ = toObservable(this.userSelected);
  _appService = inject(AppService);

  constructor() {
    this.getList();
    effect(() => {
      // when state value signal changed work
      console.log('Changed signal');
      console.log(this.cat());
    });
  }

  onClickCount() {
    // c1
    // this.count.set(10);

    // c2
    this.count.update((prev) => prev + 1);
  }

  onClickCat() {
    // c1
    // this.cat.set(newCat);
    // c2
    this.cat.update((prev) => ({ ...prev, age: prev.age + 1 }));
    this.isCheck.set(true);
  }

  onClickSelected(user: UserModel | null = null) {
    this.userSelected.update(() => user);
  }

  getList() {
    this.users = toSignal(this._appService.getUsers(), { initialValue: [] });
    this.queryUserSelected$.subscribe(console.log);
  }
}
