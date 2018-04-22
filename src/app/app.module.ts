import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducer as workspaceReducer } from './store/entities/workspace/workspace.reducer';
import { NavigationModule } from './navigation/navigation.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      workspaces: workspaceReducer
    }),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25}) : [],
    NavigationModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
