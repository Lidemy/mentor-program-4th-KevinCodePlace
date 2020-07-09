function reverse(str) {
  var s=''
  for(var i=str.length-1;i>=0;i--){
  	s += str[i];
  }
  console.log(s);
}

reverse('yoyoyo');
reverse('hello');
reverse('1abc2');
reverse('1,2,3,2,1');

