import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PostService } from '../../_services';
import { Post } from '../../classes';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostService]
})
export class ListComponent implements OnInit {
  posts: Post[] = [];
  post: Post;

  public displayedColumns = ['id', 'title', 'slug', 'edit', 'delete'];
  public dataSource = new MatTableDataSource<Post>();
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(
      (data: Post[]) => {
        this.dataSource.data = data;
      });
  }

  deletePost(post: Post) {
    const index = this.dataSource.data.findIndex(x => x.id === post.id);

    if (!post) return;

    this.postService.deletePost(post)
      .pipe(first())
      .subscribe(() => this.posts = this.posts.filter(x => x.id !== post.id));
    this.dataSource.data.splice(index, 1)
    this.dataSource._updateChangeSubscription();
  }
}
