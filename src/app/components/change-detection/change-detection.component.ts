import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { ChildDefaultComponent } from "./child-default/child-default.component";
import { ChildOnpushComponent } from "./child-onpush/child-onpush.component";

@Component({
  selector: "app-change-detection",
  standalone: true,
  imports: [
    MatButton,
    CommonModule,
    ChildDefaultComponent,
    ChildOnpushComponent,
  ],
  template: `
    <h2 class="text-[36px] font-bold uppercase w-full text-center">
      Change Detection Demo
    </h2>
    <div class="gap-4 flex w-full justify-center m-4">
      <button mat-raised-button (click)="changeParentData()">
        Change Parent
      </button>
      <button mat-raised-button (click)="changeParentDataWithNewObject()">
        Change Parent New
      </button>
    </div>
    <div class="gap-4 flex w-full justify-center m-4">
      <button mat-raised-button (click)="forceCheck(1)">
        Force Trigger <br />
        Change Reference
      </button>
      <button mat-raised-button (click)="forceCheck(2)">
        Force Trigger <br />
        All Tree Component
      </button>
      <button mat-raised-button (click)="forceCheck(3)">
        Force Trigger <br />
        OnPush
      </button>
    </div>
    <div class="gap-4 flex w-full justify-center flex-col m-4">
      <div class="bg-red-200 rounded-md p-5">
        <h2 class="text-[20px] font-bold uppercase w-full">Default Child</h2>
        <app-child-default [data]="parentData"></app-child-default>
      </div>
      <div class="bg-slate-200 rounded-md p-5">
        <h2 class="text-[20px] font-bold uppercase w-full">OnPush Child</h2>
        <app-child-onpush [data]="parentData"></app-child-onpush>
      </div>
    </div>
  `,
})
export class ChangeDetectionComponent {
  parentData = { message: "Initial Parent Data" };

  @ViewChild(ChildOnpushComponent) onPushChild!: ChildOnpushComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  changeParentData() {
    this.parentData.message = "Updated Parent Data";
    console.log("Parent Data (same reference):", this.parentData);
  }

  changeParentDataWithNewObject() {
    this.parentData = { message: "Updated Parent Data (New Object)" };
    console.log("Parent Data (new reference):", this.parentData);
  }

  forceCheck(type: number = 1) {
    console.log("Manually triggering change detection...");
    switch (type) {
      case 1:
        this.parentData = { ...this.parentData };
        this.cdr.detectChanges();
        break;
      case 2:
        this.cdr.markForCheck();
        break;
      case 3:
        this.onPushChild.refresh();
        break;
      default:
        break;
    }
  }
}
