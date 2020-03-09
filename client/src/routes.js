/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/TableList.jsx";
import Maps from "views/Maps.jsx";
import Upgrade from "views/Upgrade.jsx";
import UserPage from "views/UserPage.jsx";
import CreateProduct from "containers/createProduct.container";
import Products from 'containers/products.container';
import ViewDetails from './components/viewDetails/ViewProducts';
import Orders from 'containers/Order.container'

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/products",
    name: "Products",
    icon: "design_app",
    component: Products,
    layout: "/admin",
    // subRoutes: [
    //   {
    //     path: "/visual",
    //     name: "Visualization",
    //     icon: "pe-7s-display1",
    //     component: Demo,
    //     layout: "/visual",
    //   }],
  },
  {
    path: "/product/create",
    name: "Create Product",
    icon: "design_app",
    component: CreateProduct,
    layout: "/admin"
  },
  
  {
    path: "/product/Orders",
    name: "Orders",
    icon: "design_app",
    component:Orders,
    layout: "/admin"
  },
  {
    path: "/product/update",
    name: "Update Product",
    icon: "design_app",
    hide: true,
    component: CreateProduct,
    layout: "/admin"
  },
  {
    path: "/product/view",
    name: "Update Product",
    icon: "design_app",
    hide: true,
    component: ViewDetails,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: Icons,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "location_map-big",
    component: Maps,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: Notifications,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: TableList,
    layout: "/admin",
    hide: true
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography,
    layout: "/admin",
    hide: true
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "objects_spaceship",
    component: Upgrade,
    layout: "/admin",
    hide: true
  }
];
export default dashRoutes;
