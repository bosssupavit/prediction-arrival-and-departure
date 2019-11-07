import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StaticComponent } from './static/static.component';
import { CreditComponent } from './credit/credit.component';




const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#000000',
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'chasing-dots',
  delay: 0,
  fgsColor: '#ffa800',
  fgsPosition: 'center-center',
  fgsSize: 130,
  fgsType: 'square-jelly-box',
  gap: 24,
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(0,0,0,0.8)',
  pbColor: '#ffa800',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 500
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StaticComponent,
    CreditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
