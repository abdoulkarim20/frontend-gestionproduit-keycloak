import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './produit/produit.component';
import { AuthGuard } from './guards/security.guard';
import { CategorieComponent } from './categorie/categorie.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'produits', component: ProduitComponent,
    canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'categories', component: CategorieComponent,
    canActivate: [AuthGuard], data: { roles: ['ADMIN'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
