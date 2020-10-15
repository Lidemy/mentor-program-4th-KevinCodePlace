```
	const obj = {
	  value: 1,
	  hello: function() {
	    console.log(this.value)
	  },
	  inner: {
	    value: 2,
	    hello: function() {
	      console.log(this.value)
	    }
	  }
	}
	  
	const obj2 = obj.inner
	const hello = obj.inner.hello
	obj.inner.hello() 
	obj2.hello()
	hello() 
```

this 是根據 「呼叫的情況」 而決定 this 的值

1. 在物件導向下，this 就是自己的 instance
2. 在非物件導向下
	- 嚴格模式（'user strict'）：this 是 undefined
	- 非嚴格模式：node.js 是 global、瀏覽器上是 window
3. 在 obj 下，將其轉為 .call() 的形式，this 是 .call() 內第一個參數。

### obj.inner.hello() => obj.inner.hello.call(obj.inner); 印出 2
### obj2.hello() => obj2.hello.call(obj2)；印出 2
### hello() => hello.call() 印出 undefined