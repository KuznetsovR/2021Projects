import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PageRendererComponent } from './page-renderer/page-renderer.component';
import { ElementRendererComponent } from './element-renderer/element-renderer.component';
import { ElementOptionsComponent } from './element-options/element-options.component';
import { ActiveElementService } from './services/active-element.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular//platform-browser/animations';
import { TextBlockRendererComponent } from './element-renderer/block-renderers/text-block.renderer/text-block.renderer.component';
import { HeadingBlockRendererComponent } from './element-renderer/block-renderers/heading-block.renderer/heading-block.renderer.component';
import { SectionBlockRendererComponent } from './element-renderer/block-renderers/section-block.renderer/section-block.renderer.component';
import { HeadingOptionsComponent } from './element-options/heading-options/heading-options.component';
import { ChoosePanelComponent } from './choose-panel/choose-panel.component';
import { ImgRendererComponent } from './element-renderer/block-renderers/img-renderer/img-renderer.component';
import { QuillModule } from 'ngx-quill';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ElementTextEditorComponent } from './element-text-editor/element-text-editor.component';
import { FormsModule } from '@angular/forms';
import { ImageOptionsComponent } from './element-options/image-options/image-options.component';
import { GridBlockRendererComponent } from './element-renderer/block-renderers/grid-block.renderer/grid-block.renderer.component';
import { GridOptionsComponent } from './element-options/grid-options/grid-options.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropAreaComponent } from './drop-area/drop-area.component';
import { EmptyBlockRendererComponent } from './element-renderer/block-renderers/empty-block.renderer/empty-block.renderer.component';


@NgModule({
  declarations: [
    AppComponent,
    PageRendererComponent,
    ElementRendererComponent,
    ElementOptionsComponent,
    TextBlockRendererComponent,
    HeadingBlockRendererComponent,
    SectionBlockRendererComponent,
    HeadingOptionsComponent,
    ChoosePanelComponent,
    ImgRendererComponent,
    ElementTextEditorComponent,
    ImageOptionsComponent,
    GridBlockRendererComponent,
    GridOptionsComponent,
    DropAreaComponent,
    EmptyBlockRendererComponent, 
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    FormsModule,
    DragDropModule
  ],
  providers: [ActiveElementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
