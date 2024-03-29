import { Injectable } from '@angular/core';
import { BehaviorSubject, EmptyError, Observable } from 'rxjs';
import { BlockType, ElementBlock, EmptyBlock, GridBlock, HeadingBlock, ImageBlock, isGridBlock, isSectionBlock, SectionBlock, TextBlock } from '../entities/blocks';
import { EmptyBlockClass, SectionBlockClass } from '../entities/classes';
import { EXAMPLE_PAGE } from '../entities/mock';
import { Page } from '../entities/page';
import { ActiveElementService } from './active-element.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private activeElementService: ActiveElementService) { }

  private _page$ = new BehaviorSubject<Page>(EXAMPLE_PAGE);

  selectElement(el: Page) {
    this._page$.next(el)
  }

  get page$(): Observable<Page> {
    return this._page$
  }

  setItem() {
    console.log("123");
  }

  changeBlock(block: ElementBlock) {
    const path = this.activeElementService.path;
    const sections = this._page$.value.sections;
    let parent: ElementBlock[] = sections;
    for (let index of path) {
      const child: ElementBlock = parent[index];
      if (isSectionBlock(child) || (isGridBlock(child) && index === path.length - 1)) {
        parent = child.children;
      } else {
        parent[index] = block;
        this.activeElementService.selectElement(block, path)
      }
    }
  }

  deleteBlock() {
    let isGrid = false;
    const path = this.activeElementService.path;
    const sections = this._page$.value.sections;
    let parent: ElementBlock[] = sections;
    console.log(path)
    const lastIndex = path[path.length - 1]

    for (let index of path.slice(0, path.length - 1)) {
      const child: ElementBlock = parent[index];
      if (isSectionBlock(child) || isGridBlock(child)) {
        isGrid = isGridBlock(child)
        parent = child.children;
      }
    }
    if (isGrid) {
      parent[lastIndex] = new EmptyBlockClass('1234')
    } else {
      parent.splice(lastIndex, 1)
    }
    this.activeElementService.deselectElement();
  }

  appendElement(block: (TextBlock | HeadingBlock | ImageBlock | GridBlock | SectionBlock | EmptyBlock)) {
    console.log(block)
    if (isSectionBlock(block)) {
      this._page$.next({
        ...this._page$.value,
        sections: this._page$.value.sections.concat(block)
      })
      console.log(this._page$.value)
    } else {
      const sections = this._page$.value.sections.slice();
      const section = sections[sections.length - 1];
      sections[sections.length - 1] = new SectionBlockClass(section.id, section.children.concat(block))
      this._page$.next({
        ...this._page$.value,
        sections
      })
    }
  }
  addElement(block: (TextBlock | HeadingBlock | ImageBlock | GridBlock | SectionBlock | EmptyBlock), path: number[]) {
    const sections = this._page$.value.sections;
    let parent: ElementBlock[] = sections;
    let insertIndex = path[path.length - 1]       //insertIndex = last in path
    for (let index of path.slice(0, path.length - 1)) {
      const child = parent[index];
      if (isSectionBlock(child) || isGridBlock(child)) {
        parent = child.children;
      }
    }
    if (parent[insertIndex] === undefined){
      parent.splice(insertIndex, +(parent[insertIndex-1].type === BlockType.Empty), block)
    } else{
      parent.splice(insertIndex, +(parent[insertIndex].type === BlockType.Empty), block)
    }
    console.log(block, path)
  }
}
