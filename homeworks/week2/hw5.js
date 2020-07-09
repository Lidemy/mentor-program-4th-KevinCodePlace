function join(arr, concatStr) {
  var arr_ans='';
  for(var i=0;i<arr.length;i++){
  	if(arr.length==1 || i!=(arr.length-1)){
  		arr_ans += (arr[i]+concatStr);
  	}else{
  		arr_ans += arr[i];
  	}
  }
  return arr_ans;
}

function repeat(str, times) {
  var str_ans='';
  for(var i=1;i<=times;i++){
  	str_ans+=str;
  }
  return str_ans;

}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));

console.log(join([1, 2, 3], ''));//正確回傳值：123
console.log(join(["a", "b", "c"], "!"));//正確回傳值：a!b!c
console.log(join(["a", 1, "b", 2, "c", 3], ','));//正確回傳值：a,1,b,2,c,3

console.log(repeat('yoyo', 2));//正確回傳值：yoyoyoyo

