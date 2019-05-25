import { Routes } from "@angular/router";
import { ProductComponent } from "./product/product.component";
import { AuthGuard } from "./_guard/auth.guard";
import { LoginComponent } from "./login/login.component";
import { ProductAddComponent } from "./product/product-add/product-add.component";
import { CategoriesAddComponent } from "./product/categories-add/categories-add.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectDetailComponent } from "./projects/project-detail/project-detail.component";
import { ProjectAddComponent } from "./projects/project-add/project-add.component";
import { PhotoAddComponent } from "./projects/project-add/photo-add/photo-add.component";

export const appRoutes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: '' , redirectTo: 'product', pathMatch: 'full'  },
  {path: '' ,
   runGuardsAndResolvers: 'always' ,
  canActivate: [AuthGuard]  ,
  children: [
    {path: 'product' , component: ProductComponent},    ]
  },
  {path: 'product' , component: ProductComponent},
  {path: 'projects' , component: ProjectsComponent},
  {path: 'projectDetail/:id' , component: ProjectDetailComponent},
  {path: 'addPhoto/:id' , component: PhotoAddComponent},

  {path: 'projectAdd' , component: ProjectAddComponent},


  {path: 'productAdd' , component: ProductAddComponent},
  {path: 'categoryAdd' , component: CategoriesAddComponent},
  { path: "**", redirectTo: "product", pathMatch: "full" }
];