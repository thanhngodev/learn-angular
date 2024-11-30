import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";

@Component({
  selector: "app-child-onpush",
  standalone: true,
  template: `
    <p>Child OnPush Component:</p>
    <p>Data from parent: {{ data.message }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildOnpushComponent {
  @Input() data!: { message: string };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    console.log("ChildOnPushComponent - ngOnChanges called");
  }

  refresh() {
    console.log('Manually refreshing OnPush component...');
    this.cdr.detectChanges();
  }
}
