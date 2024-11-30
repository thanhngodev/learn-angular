import { Component, Input } from "@angular/core";

@Component({
  selector: "app-child-default",
  standalone: true,
  template: `
    <p>Child Default Component:</p>
    <p>Data from parent: {{ data.message }}</p>
  `,
})
export class ChildDefaultComponent {
  @Input() data!: { message: string };

  ngOnChanges() {
    console.log("ChildDefaultComponent - ngOnChanges called");
  }
}
