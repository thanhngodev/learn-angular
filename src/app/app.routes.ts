import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ShopComponent } from "./components/shop/shop.component";
import { ContactComponent } from "./components/contact/contact.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderInformationComponent } from "./components/order-information/order-information.component";
import { OrderConfirmComponent } from "./components/order-confirm/order-confirm.component";
import { OrderPaymentComponent } from "./components/order-payment/order-payment.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "shop", component: ShopComponent },
  { path: "contact", component: ContactComponent },
  {
    path: "order",
    component: OrderComponent,
    children: [
      {
        path: "information",
        component: OrderInformationComponent,
      },
      {
        path: "confirm",
        component: OrderConfirmComponent,
      },
      {
        path: "payment",
        component: OrderPaymentComponent,
      },
    ],
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" },
];
