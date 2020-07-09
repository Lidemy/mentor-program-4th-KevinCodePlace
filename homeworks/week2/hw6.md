``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1.Function 沒人 call 不會先跑，於是第一步是先執行 isValid([3, 5, 8, 13, 22, 35])
2.回到 function isValid(arr)，此時 arr 是 [3, 5, 8, 13, 22, 35]
3.執行迴圈 i=0 判斷 i 是否小於 arr.length=6，是，往下執行
4.arr[0]=6 不符合 if (arr[i] <= 0) return 'invalid' 描述繼續執行，進入下次迴圈前 i++，i=1
5.執行迴圈 i=1 判斷 i 是否小於 arr.length=6，是，往下執行
6.arr[1]=5 不符合 if (arr[i] <= 0) return 'invalid' 描述繼續執行，進入下次迴圈前 i++，i=2
7.執行迴圈 i=2 判斷 i 是否小於 arr.length=6，是，往下執行
8.arr[2]=8 不符合 if (arr[i] <= 0) return 'invalid' 描述繼續執行，進入下次迴圈前 i++，i=3
9.執行迴圈 i=3 判斷 i 是否小於 arr.length=6，是，往下執行
10.arr[3]=13 不符合 if (arr[i] <= 0) return 'invalid' 描述繼續執行，進入下次迴圈前 i++，i=4
11.執行迴圈 i=4 判斷 i 是否小於 arr.length=6，是，往下執行
12.arr[4]=22 不符合 if (arr[i] <= 0) return 'invalid' 描述繼續執行，進入下次迴圈前 i++，i=5
13.執行迴圈 i=5 判斷 i 是否小於 arr.length=6，是，往下執行
14.arr[5]=35 不符合 if (arr[i] <= 0) return 'invalid' 描述繼續執行，進入下次迴圈前 i++，i=6
15.執行迴圈 i=6 判斷 i 是否小於 arr.length=6，否，跳出迴圈

16.執行第二個迴圈，i=2，判斷 i 是否小於 arr.length=6，是，往下執行
17.判斷 if(arr[2] !== arr[1] + arr[0]))（8!=5+3）否，跳過 if，結束這一圈迴圈，進入下次迴圈前 i++，i=3
18 執行第二個迴圈，i=3，判斷 i 是否小於 arr.length=6，是，往下執行
19.判斷 if(arr[3] !== arr[2] + arr[1]))（13!=5+8）否，跳過 if，結束這一圈迴圈，進入下次迴圈前 i++，i=4
20.執行第二個迴圈，i=4，判斷 i 是否小於 arr.length=6，是，往下執行
21.判斷 if(arr[4] !== arr[3] + arr[2]))（22!=8+13）是，return 'invalid'
22.結束程式