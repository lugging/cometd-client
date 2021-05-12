import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer'
import { BaseMessage, CometD, Message, SubscribeMessage, SubscriptionHandle } from 'cometd'
import AckExtension from 'cometd/AckExtension'
import TimeSyncExtension from 'cometd/TimeSyncExtension'
import BinaryExtension from 'cometd/BinaryExtension'
import { CometDConfig } from './Config';

@Component({
  selector: 'app-cometd',
  templateUrl: './cometd.component.html',
  styleUrls: ['./cometd.component.less']
})
export class CometdComponent implements OnInit {

  /**
   * 构造方法
   */
  constructor(){
    this.ds = []
    this.channels = []
    this.subscribeHandlerMap = new Map()
    this.datePipe = new DatePipe('en-US')
   }

  /**
   * 初始化方法
   */
  ngOnInit(): void {
    this.receiveCount = 0
    this.recevieBodySize = 0

    this.status = 'default'
    this.processingText = 'default'
    this.device = '21'
  }

  /**
   * 登录 cometd
   */
  login(): void {
    this.Comed = new CometD();
    this.Comed.configure({
      url: this.url,
      logLevel: 'debug',
      connectTimeout: 60
    });
    this.Comed.handshake({
      ext: {
        token: this.token,
        userLogin: this.userlogin,
        userFrom: this.userfrom,
        deviceType: this.device,
      }
    }, (message: BaseMessage) => {
      console.log(" handshake {} ", message)
      if ( message.successful ){
        this.status = 'success'
        this.processingText = 'connected'
        this.newTime = Date.now()
        this.countdown(1)
      } else {
        let errorObj = <any>message
        this.status = 'error'
        let errorMsg: string = errorObj.error || errorObj.failure.reason
        this.processingText = errorMsg
      }
    })
    this.Comed.registerExtension('ack', new AckExtension);
    this.Comed.registerExtension('timesync', new TimeSyncExtension);
    this.Comed.registerExtension('reload', new BinaryExtension);
  }

  /**
   * 登出 cometd
   */
  logout(): void {
    this.Comed.disconnect( (message: Message)=>{
      console.log(message)
      if ( message.successful ){
        this.status = 'default'
        this.processingText = 'disconnect'
        this.countdown(0)
      } else {
        let errorObj = <any>message
        this.status = 'error'
        let errorMsg: string = errorObj.error || errorObj.failure.reason
        this.processingText = errorMsg
      }
    })
  }

  /**
   * 订阅全部 channel
   */
  subscribeAll(): void {
    if (this.Comed == undefined){
      return
    } 
    if ( !this.Comed.isDisconnected){
      return
    }
    this.Comed.batch(()=> {
      this.channels.forEach(channel => {
        const subscribeHandler: SubscriptionHandle = this.Comed.subscribe( channel, (data)=> { 
          this.onMessage(data) 
        }, (message: SubscribeMessage)=> { 
          if (message.successful){
            console.log('subscribe successful', message.channel)
            this.subscribeHandlerMap.set(subscribeHandler.channel, subscribeHandler)
          }
        })
      })
    })
  }
  subscribe(channelData: string): void {
    if (this.Comed == undefined){
      return
    } 
    if ( !this.Comed.isDisconnected){
      return
    }
    this.Comed.batch(()=> {
        const subscribeHandler: SubscriptionHandle = this.Comed.subscribe( channelData, (data)=> { 
          this.onMessage(data) 
        }, (message: SubscribeMessage)=> { 
          if (message.successful){
            console.log('subscribe successful', message.channel)
            this.subscribeHandlerMap.set(subscribeHandler.channel, subscribeHandler)
          }
      })
    })
  }

  /**
   * 解订阅全部
   */
  unsubscribeAll(): void {
    if (this.Comed == undefined){
      return
    } 
    if ( !this.Comed.isDisconnected){
      return
    }
    this.Comed.batch(()=> {
      this.subscribeHandlerMap.forEach((handler, channelStr) => {
        this.Comed.unsubscribe( handler )
        console.log('unsubscribe successful', channelStr)
      })
    })
  }
  unsubscribe(channelData: string): void {
    if (this.Comed == undefined){
      return
    } 
    if ( !this.Comed.isDisconnected){
      return
    }
    this.Comed.batch(()=> {
      this.subscribeHandlerMap.forEach((handler, channelStr) => {
        if ( channelStr == channelData ){
          this.Comed.unsubscribe( handler )
          this.subscribeHandlerMap.delete(channelStr)
        }
      })
    })
  }


  /**
   * channel add
   */
  addRow(): void {

  }

  /**
   * 打开 弹框
   */
  open(): void {
    this.visible = true
  }

  /**
   *  关闭弹框
   */
  close(): void {
    this.visible = false
  }

  /**
   * config submit event
   */
  submitConfig(): void {
    this.visible = false
    let configJson : CometDConfig = {
      url : this.url,
      userlogin : this.userlogin,
      userfrom : this.userfrom,
      token : this.token,
      channels : this.channels
    }
    let configJsonStr = JSON.stringify(configJson)
    this.inputValue = configJsonStr
  }

  /**
   * 消息处理
   */
  onMessage(data: any): void {
    let jsonData = JSON.stringify(data)
    this.receiveCount ++
    this.recevieBodySize = jsonData.length + this.recevieBodySize
    console.log("<<<", jsonData)
    if ( data != undefined ){
      let itemData = new ItemData(data.channel, this.formatDateFun(), data.data)
      this.ds.unshift(itemData)
    }
  }

  /*
   * 获取当前时间
   */
  formatDateFun(): string {
    let today = new Date();
    return this.datePipe.transform(today, 'yyyy-MM-dd HH:mm:ss');
  }

  /**
   * 配置channel
   */
  configChannel(): void {
    this.channelVisible = true
  }

  /**
   * 计时器
   */
  countdown(flag: number): void {
    if ( flag == 1  ){
      window.clearInterval(this.timePromise)
      this.timePromise = setInterval(
        (success)=>{
          let time = (Date.now() - this.newTime) / 1000 
          this.connectionTime = Math.round(time)
        },1000)
    } else if( flag == 0 ){
      window.clearInterval(this.timePromise)
    }
  }

  /**
   *  配置文件 json 初始化
   */
  onInput(): void {
    let inputJsonStr = this.inputValue
    console.log('.....input ', inputJsonStr)
    if (inputJsonStr){
      let inputJson = JSON.parse(inputJsonStr)
      this.url = inputJson.url
      this.userlogin = inputJson.userlogin
      this.token = inputJson.token
      this.userfrom = inputJson.userfrom
      this.channels = inputJson.channels
    }
  }

  /**
   * 定时任务
   */
  timePromise : any;

  /**
   * 时间格式化工具
   */
  // private datePipe: DatePipe
  datePipe: DatePipe
  
  /**
   * 当前时间
   */
  newTime : number
  
  /**
   * 连接时间
   */
  connectionTime: number = 0

  // cometd实例
  Comed: CometD

  visible = false

  channelVisible = false

  placement: NzDrawerPlacement = 'top';

  isCollapsed = true

  value :string

  // cometd connected status
  status: string

  // cometd connected str
  processingText: string

  // 协议
  protocol :string
  
  // 请求全路径
  url :string

  // 登录账号
  userlogin :string
  
  // 验证token
  token :string
  
  // 用户来源
  userfrom :string
  
  // 设备类型
  device :string
  
  // 接收报文条数
  receiveCount: number
  
  // 接受报文总大小
  recevieBodySize: number
  
  // 连接持续时间
  deadline = Date.now()

  // 消息列表
  ds: Array<ItemData>

  /**
   * 订阅 channel列表
   */
  channels: Array<string>

  /**
   * 已订阅的channel列表
   */
   subscribeHandlerMap: Map<string, SubscriptionHandle>

  // 输入框
  inputValue: string
}

// cometd 推送的报文
class ItemData {
  constructor(channel :string, date: string, data: string ){
    this.channel = channel
    this.data = data
    this.date = date
  }
  channel: string
  date: string
  data: string
}