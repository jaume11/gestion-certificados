import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginMainComponent } from './login-main/login-main.component';
import { RegisterMainComponent } from './register-main/register-main.component';
import { ViewMainComponent } from './view-main/view-main.component';
import { JiraUsersConfigComponent } from './jira-users-config/jira-users-config.component';
import { RouteGuardsGuard as AuthGuard } from './guards/route-guards.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { CantAccessGuard } from './guards/cant-access.guard';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DetailCertificateComponent } from './detail-certificate/detail-certificate.component';

const routes: Routes = [
  { path: 'login', component: LoginMainComponent },
  { path: 'register', component: RegisterMainComponent, canActivate: [CantAccessGuard],
    data: { expectedRole: ['1'] }},
  { path: 'uploadFile', component: UploadFileComponent, canActivate: [CantAccessGuard], 
    data: { expectedRole: ['1'] }},
  { path: 'detailCertificate', component: DetailCertificateComponent, canActivate: [AuthGuard]},
  { path: 'main', component: ViewMainComponent, canActivate: [AuthGuard] },
  { path: 'jiraUsersConfig', component: JiraUsersConfigComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotfoundComponent, pathMatch: 'full' },
  { path: '**' || '', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
