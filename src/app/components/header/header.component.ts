import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { NAV_MENU, ROUTE } from "../../common/route.common";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, MatButton, CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  
  router = inject(Router);

  get navMenu() {
    return NAV_MENU
  }

  onNavigateOrder() {
    this.router.navigate(["/order"]);
  }
}
