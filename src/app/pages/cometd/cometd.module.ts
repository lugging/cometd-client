import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CometdComponent } from './cometd.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzButtonModule} from 'ng-zorro-antd/button'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzCommentModule } from 'ng-zorro-antd/comment'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select'
import { NzSliderModule } from 'ng-zorro-antd/slider'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzStatisticModule } from 'ng-zorro-antd/statistic'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzListModule } from 'ng-zorro-antd/list'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzTableModule } from 'ng-zorro-antd/table'
import { StopwatchPipe } from '../pipe/stopwatch.pipe'

@NgModule({
  declarations: [CometdComponent, StopwatchPipe],
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzSwitchModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzGridModule,
    NzInputModule,
    NzCommentModule,
    NzEmptyModule,
    NzTreeSelectModule,
    NzSliderModule,
    NzSelectModule,
    NzRadioModule,
    NzSpaceModule,
    NzLayoutModule,
    NzIconModule,
    NzSpinModule,
    NzMenuModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzStatisticModule,
    NzBadgeModule,
    NzListModule,
    ScrollingModule,
    NzModalModule,
    NzTableModule
  ]
})
export class CometdModule { }
