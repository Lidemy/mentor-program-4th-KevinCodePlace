```
1	for(var i=0; i<5; i++) {
2	  console.log('i: ' + i)
3	  setTimeout(() => {
4	    console.log(i)
5	  }, i * 1000)
6	}
```

整個作業流程會經過三個地方

1. Call Stack：正在處理的程序
2. Web APIs：如 DOM、EventListener
3. CallBack Queue：待處理的 Callback Function

以及 event loop 會持續檢查並採先進先出（FIFO），當 Call Stack 為空時把 Task Queue 的 Callback function 丟進 Call stack 處理

> 執行到 1 
Call Stack： for(var i=0; i<5; i++) {...} // 此時 i = 0

> 執行到 2
Call Stack： console.log('i: ' + i)
Call Stack：清空 console.log('i: ' + i) // 印出 i：0

> 執行到 3
Call Stack：setTimeout(() => {console.log(i)}, i * 1000)
Web APIs：執行 setTimeout(() => {console.log(i)}, i * 1000)
Call Stack：清除 執行 setTimeout(() => {console.log(i)}, i * 1000)
i * 1000秒之後 Task Queue：console.log(i) //第一個

> 執行到 1 
Call Stack： for(var i=0; i<5; i++) {...} // 此時 i = 1

> 執行到 2
Call Stack： console.log('i: ' + i)
Call Stack：清空 console.log('i: ' + i) // 印出 i：1

> 執行到 3
Call Stack：setTimeout(() => {console.log(i)}, i * 1000)
Web APIs：執行 setTimeout(() => {console.log(i)}, i * 1000)
Call Stack：清除 執行 setTimeout(() => {console.log(i)}, i * 1000)
i * 1000秒之後 Task Queue：console.log(i) //第二個

> 執行到 1 
Call Stack： for(var i=0; i<5; i++) {...} // 此時 i = 2

> 執行到 2
Call Stack： console.log('i: ' + i)
Call Stack：清空 console.log('i: ' + i) // 印出 i：2

> 執行到 3
Call Stack：setTimeout(() => {console.log(i)}, i * 1000)
Web APIs：執行 setTimeout(() => {console.log(i)}, i * 1000)
Call Stack：清除 執行 setTimeout(() => {console.log(i)}, i * 1000)
i * 1000秒之後 Task Queue：console.log(i) //第三個

> 執行到 1 
Call Stack： for(var i=0; i<5; i++) {...} // 此時 i = 3

> 執行到 2
Call Stack： console.log('i: ' + i)
Call Stack：清空 console.log('i: ' + i) // 印出 i：3

> 執行到 3
Call Stack：setTimeout(() => {console.log(i)}, i * 1000)
Web APIs：執行 setTimeout(() => {console.log(i)}, i * 1000)
Call Stack：清除 執行 setTimeout(() => {console.log(i)}, i * 1000)
i * 1000秒之後 Task Queue：console.log(i) //第四個

> 執行到 1 
Call Stack： for(var i=0; i<5; i++) {...} // 此時 i = 4

> 執行到 2
Call Stack： console.log('i: ' + i)
Call Stack：清空 console.log('i: ' + i) // 印出 i：4

> 執行到 3
Call Stack：setTimeout(() => {console.log(i)}, i * 1000)
Web APIs：執行 setTimeout(() => {console.log(i)}, i * 1000)
Call Stack：清除 執行 setTimeout(() => {console.log(i)}, i * 1000)
i * 1000秒之後 Task Queue：console.log(i)  //第五個

> 執行到 1 
Call Stack： for(var i=0; i<5; i++) {...} // 此時 i = 5 跳出迴圈

Event loop 將 Callback function 一一執行
//第一個 
Call Stack：console.log(i)
Call Stack 清空 console.log(i) => 印出 5

//第二個 
Call Stack：console.log(i)
Call Stack 清空 console.log(i) => 印出 5

//第三個 
Call Stack：console.log(i)
Call Stack 清空 console.log(i) => 印出 5

//第四個 
Call Stack：console.log(i)
Call Stack 清空 console.log(i) => 印出 5

//第五個 
Call Stack：console.log(i)
Call Stack 清空 console.log(i) => 印出 5

最後印出依順序為 => 
i：０
i：１
i：２
i：３
i：４
５
５
５
５
５



