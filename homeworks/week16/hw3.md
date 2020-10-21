```
1	var a = 1
2	function fn(){
3	  console.log(a)
4	  var a = 5
5	  console.log(a)
6	  a++
7	  var a
8	  fn2()
9	  console.log(a)
10	  function fn2(){
11	    console.log(a)
12	    a = 20
13	    b = 100
14	  }
15	}
16	fn()
17	console.log(a)
18	a = 10
19	console.log(a)
20	console.log(b)
```

>> 初始狀態
Global EC 
Global VO{
	fn:function
	a:undefined
}

### var a = 1
Global EC 
Global VO {
	a:undefined => 1
	fn:function
}

### fn()，console.log(a) => 印出 undefined
fn EC 
fn AO {
	a:undefined
	fn2:function
}

Global EC 
Global VO {
	a:1
	fn:function
}

### var a = 5 / console.log(a) => 印出 5
fn EC 
fn AO {
	a:undefined => 5
	fn2:function
}

Global EC 
Global VO {
	a:1
	fn:function
}

### a++ / var a
fn EC 
fn AO {
	a:5 => 6
	fn2:function
}

Global EC 
Global VO {
	a:1
	fn:function
}

### fn2() / console.log(a) => 印出 6
fn2 EC 
fn2 AO {
	
}

fn EC 
fn AO {
	a:6
	fn2:function
}

Global EC 
Global VO {
	a:1
	fn:function
}

### a = 20 / b= 100 
fn EC 
fn AO {
	a:6 => 20
	fn2:function
}

Global EC 
Global VO {
	fn:function
	a:1
	b:100
}

### console.log(a) => 印出 20

fn EC 
fn AO {
	a:20
	fn2:function
}

Global EC 
Global VO {
	a:1
	b:100
	fn:function
}

### console.log(a) => 印出 1

fn EC 
fn AO {
	a:6 => 20
	fn2:function
}

Global EC 
Global VO {
	a:1
	fn:function
}

### var a=10
fn EC 
fn VO {
	a:20
	fn2:function
}

Global EC 
Global VO {
	a:1 => 10
	fn:function
}

### console.log(a) => 印出 10
fn EC 
fn VO {
	a:20
	fn2:function
}

Global EC 
Global VO {
	a:1 => 10
	fn:function
}

### console.log(b) => 印出 100
fn EC 
fn VO {
	a:20
	fn2:function
}

Global EC 
Global VO {
	fn:function
	a:10
	b:100	
}

