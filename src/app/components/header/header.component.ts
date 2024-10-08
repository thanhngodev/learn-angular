import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { ROUTE } from "../../common/route.common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, MatButton],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  
  router = inject(Router);

  get route() {
    return ROUTE
  }

  onNavigateOrder() {
    this.router.navigate(["/order"]);
  }
}
