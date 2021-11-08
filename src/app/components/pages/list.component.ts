import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PageService } from '../../_services';
import { Page } from '../../classes';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['./pages.component.css'],
  providers: [PageService]
})
export class ListComponent implements OnInit {
  pages: Page[] = [];
  page: Page;

  public displayedColumns = ['id', 'title', 'slug', 'edit', 'delete'];
  public dataSource = new MatTableDataSource<Page>();
  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService.getPages().subscribe(
      (data: Page[]) => {
        this.dataSource.data = data;
      });
  }

  deletePage(page: Page) {
    const index = this.dataSource.data.findIndex(x => x.id === page.id);

    if (!page) return;

    this.pageService.deletePage(page)
      .pipe(first())
      .subscribe(() => this.pages = this.pages.filter(x => x.id !== page.id));
    this.dataSource.data.splice(index, 1)
    this.dataSource._updateChangeSubscription();
  }
}
