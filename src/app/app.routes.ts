import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ShopComponent } from "./components/shop/shop.component";
import { ContactComponent } from "./components/contact/contact.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderInformationComponent } from "./components/order-information/order-information.component";
import { OrderConfirmComponent } from "./components/order-confirm/order-confirm.component";
import { OrderPaymentComponent } from "./components/order-payment/order-payment.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ChangeDetectionComponent } from "./components/change-detection/change-detection.component";
import { ROUTE } from "./common/route.common";

export const routes: Routes = [
  { path: ROUTE.HOME, component: HomeComponent },
  { path: ROUTE.SHOP, component: ShopComponent },
  { path: ROUTE.CONTACT, component: ContactComponent },
  { path: ROUTE.CHANGE_DETECTION, component: ChangeDetectionComponent },
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
