```
1	console.log(1)
2	setTimeout(() => {
3	  console.log(2)
4	}, 0)
5	console.log(3)
6	setTimeout(() => {
7	  console.log(4)
8	}, 0)
9	console.log(5)
```

整個作業流程會經過三個地方

1. Call Stack：正在處理的程序
2. Web APIs：如 DOM、EventListener
3. CallBack Queue：待處理的 Callback Function

以及 event loop 會持續檢查並採先進先出（FIFO），當 Call Stack 為空時把 Task Queue 的 Callback function 丟進 Call stack 處理

> 執行到 1 
Call Stack：console.log(1)
Call Stack 清空 console.log(1) => 印出 1

> 執行到 2
Call Stack：setTimeout(() => {console.log(2)}, 0)
Web APIs：執行 setTimeout(() => {console.log(2)}, 0) 
Call Stack：清除 setTimeout(() => {console.log(2)}, 0)
0 秒之後 Task Queue：console.log(2)

> 執行到 5
Call Stack：console.log(3)
Call Stack 清空 console.log(3) => 印出 3

> 執行到 6
Callstack：setTimeout(() => {console.log(4)}, 0)
Web APIs：執行 setTimeout(() => {console.log(4)}, 0) 
0 秒之後 Task Queue：console.log(4)

> 執行到 9
Call Stack：console.log(5)
Call Stack 清空 console.log(5) => 印出 5

Event loop 將 Callback function 一一執行

Call Stack：console.log(2)
Call Stack 清空 console.log(2) => 印出 2

Call Stack：console.log(3)
Call Stack 清空 console.log(4) => 印出 4

最後印出依順序為 => 1、3、5、2、4