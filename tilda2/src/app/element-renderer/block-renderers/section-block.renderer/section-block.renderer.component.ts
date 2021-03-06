import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementBlock, SectionBlock } from 'src/app/entities/blocks';
import { DndService } from 'src/app/services/dnd.service';

@Component({
  selector: 'app-section-block-renderer',
  templateUrl: './section-block.renderer.component.html',
  styleUrls: ['./section-block.renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionBlockRendererComponent implements OnInit {
  @Input() block: SectionBlock;
  @Output() selectElement = new EventEmitter<{block: ElementBlock, path: number[]}>()
  @Output() blockDrop = new EventEmitter<number[]>()
  constructor(
    private dndService: DndService
  ) { }

  onElementClick(event: MouseEvent){
    event.stopPropagation();
    this.selectElement.emit({block: this.block, path: []});
  }
  onChildClick(block: ElementBlock, path: number[], index: number){
    this.selectElement.emit({block, path: [index, ...path]});
  }
  onBlockDrop(path: number[], index: number){
    this.blockDrop.emit([index, ...path])
  }
  ngOnInit(): void {
  }

}
