import { Routes } from '@angular/router';
import { TnsCrudTestComponent } from './pages/tns-crud-test/tns-crud-test.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tns-crud-test',
    pathMatch: 'full',
  },
  { path: 'tns-crud-test', component: TnsCrudTestComponent },
];
