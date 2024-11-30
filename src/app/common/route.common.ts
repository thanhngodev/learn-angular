export const ROUTE = {
  HOME: "",
  SHOP: "shop",
  CONTACT: "contact",
  ORDER: "order",
  ORDER_INFO: "information",
  ORDER_CONFIRM: "confirm",
  ORDER_PAYMENT: "payment",
  CHANGE_DETECTION: "change-detection"
};

export const NAV_MENU = [
  {
    routerLink: ROUTE.HOME,
    routerLinkActive: "active",
    label: "Home",
  },
  {
    routerLink: ROUTE.SHOP,
    routerLinkActive: "active",
    label: "Shop",
  },
  {
    routerLink: ROUTE.CONTACT,
    routerLinkActive: "active",
    label: "Contact",
  },
  {
    routerLink: ROUTE.CHANGE_DETECTION,
    routerLinkActive: "active",
    label: "Change Detection",
  },
];
