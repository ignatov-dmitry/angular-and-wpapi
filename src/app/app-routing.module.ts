import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const postsModule = () => import('./components/posts/posts.module').then(x => x.PostsModule);
const pagesModule = () => import('./components/pages/pages.module').then(x => x.PagesModule);

const routes: Routes = [
  { path: 'posts', loadChildren: postsModule },
  { path: 'pages', loadChildren: pagesModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
