import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { NgxEditorModule } from 'ngx-editor';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesAddComponent } from './product/categories-add/categories-add.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { LOCALE_ID } from '@angular/core';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { ProjectAddComponent } from './projects/project-add/project-add.component';
import { PhotoAddComponent } from './projects/project-add/photo-add/photo-add.component';
import { TechnicalInfoComponent } from './TechnicalInfo/TechnicalInfo.component';
import { ImageUploadModule } from "angular2-image-upload";
import { ProjectUpdateComponent } from './projects/project-update/project-update.component';

registerLocaleData(localeTr, 'tr');
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      ProductComponent,
      LoginComponent,
      ProductAddComponent,
      CategoriesAddComponent,
      ProjectsComponent,
      ProjectDetailComponent,
      ProjectAddComponent,
      PhotoAddComponent,
      TechnicalInfoComponent,
      ProjectUpdateComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgxEditorModule,
      ImageUploadModule.forRoot(),
      ReactiveFormsModule,
      MatTabsModule,
      BrowserAnimationsModule,
      FileUploadModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule
   ],
   providers: [
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
