import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stopwatch'
})
export class StopwatchPipe implements PipeTransform {

  //第一个参数value 是带过滤的内容
  //第二个参数是第一个参数处理的条件，也就是参数
  transform(value: number, ...args: number[]): String {
    if (isNaN(value)) {
      return '--'
    } else {
      return this.dataFormat(value)
    }
  }

  dataFormat(seconds: number): string {
    let msg = 'H 时 m 分 s 秒'
    if (seconds || seconds === 0) {
      let hh = (seconds / 3600) >= 1 ? Math.floor(seconds / 3600) : 0;
      let mm = ((seconds - hh * 3600) / 60) >= 1 ? Math.floor((seconds - hh * 3600) / 60) : 0;
      let ss = seconds - hh * 3600 - mm * 60;
      let hour = this.padding(hh, 2, '0')
      let minute = this.padding(mm, 2, '0')
      let sec =  this.padding(ss, 2, '0')
      msg = msg.replace('H' , hour)
      msg = msg.replace('m' , minute)
      msg = msg.replace('s' , sec)
      return msg
    } else {
        return '——';
    }
  }

  padding(time: number, count: number, append: string): string {
    let timeStr = String(time)
    if (timeStr.length === count){
      return timeStr
    } else if(timeStr.length < count){
      // TODO
      return timeStr
    } else {
      return timeStr
    }
  }
}



