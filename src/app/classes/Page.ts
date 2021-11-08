export class Page {
    id: number;
    title: string;
    content: string;
    slug: string;

  constructor(id: number, title: string, content: string, slug: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.slug = slug;
  }
}
