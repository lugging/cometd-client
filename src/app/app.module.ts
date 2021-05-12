import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { CometdModule } from './pages/cometd/cometd.module';

registerLocaleData(zh);

// @NgModule 接收一个元数据对象，告诉Angular 如何编译和启动应用
@NgModule({
  // 引入当前项目运行的组件，自定义组件都需要引入并且在这里声明
  // 不需要在组件中依赖注入管道，一旦定义，就是在模块全局范围中使用
  declarations: [
    AppComponent
  ],
  // 当前项目依赖哪些模块
  // 如果要引入双向绑定，则需要引入FormModule
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CometdModule
  ],
  // 定义服务
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  // 默认启动哪个组件
  bootstrap: [AppComponent]
})
export class AppModule { }
