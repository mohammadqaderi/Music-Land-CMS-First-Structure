import {RouteInfo} from "./route-info.interface";
/*
design_app
users_single-02
ui-2_settings-90
ui-1_bell-53
users_circle-08
media-2_note-03
media-2_note-03
tech_headphones
tech_headphones
*/
export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'fas fa-tachometer-alt', class: ''},
  {path: '/admin-panel/profile', title: 'Profile', icon: 'fas fa-id-badge', class: ''},
  {path: '/admin-panel/settings', title: 'Settings', icon: 'fas fa-cogs', class: ''},
  {path: '/notifications', title: 'Notifications', icon: 'far fa-bell', class: ''},
  {path: '/admin-panel/system-users', title: 'System Users', icon: 'fas fa-users', class: ''},
  {path: '/songs', title: 'Songs', icon: 'fas fa-music', class: ''},
  {path: '/musics', title: 'Musics', icon: 'fas fa-music', class: ''},
  {path: '/singers/all-singers', title: 'Singers', icon: 'fas fa-microphone', class: ''},
  {path: '/musicians/all-musicians', title: 'Musicians', icon: 'fas fa-microphone', class: ''},
];
