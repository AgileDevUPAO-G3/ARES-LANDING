import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MesasDisponiblesComponent } from './pages/mesas-disponibles/mesas-disponibles.component';

@NgModule({
  declarations: [
    AppComponent,
    MesasDisponiblesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
