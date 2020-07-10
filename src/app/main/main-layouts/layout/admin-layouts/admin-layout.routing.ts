import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NotificationComponent} from "./notification/notification.component";
import {AdminAuthGuard} from "../../../../commons/guards/admin-auth.guard";


export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-panel',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../../../admin-panel/admin-panel.module').then(a => a.AdminPanelModule)
  },
  {
    path: 'singers',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../../../items/singer/singer.module').then(s => s.SingerModule)
  },
  {
    path: 'songs',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../../../items/song/song.module').then(s => s.SongModule)
  },
  {
    path: 'musicians',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../../../items/musician/musician.module').then(m => m.MusicianModule)
  },
  {
    path: 'musics',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../../../items/music/music.module').then(m => m.MusicModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../../../auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    canActivate: [AdminAuthGuard]
  },
];
