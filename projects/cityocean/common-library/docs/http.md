## Http Module

### 模块的引入
参数参照 `CommonlibraryModule` 里的定义
```typescript
  @NgModule({
    imports: [
      CommonLibraryModule.forRoot({
        messageService: MessageService,
        environment,
      })
  })
```

### http 请求回调的处理
目前 http 拦截器会对 abp 的返回进行处理
```typescript
http.subscribe(res => {
    // 只有请求成功，及服务器正常返回数据才执行 success 回调
    // 这里不再进行是否请求成功的判断，所有错误在 error 回调处理
    process(res);
  }, error => {
    // 在这里处理：
    // http 请求错误、服务器返回错误 eg：请求参数错误
    throw error;
  })
```

