function capitalize(str) {
	var s=''
	if(97<=str.charCodeAt(0) && str.charCodeAt(0)<=122){
		s+= String.fromCharCode(str.charCodeAt(0)-32)
	}else{
		s+= String.fromCharCode(str.charCodeAt(0))
	}
	for(var i=1;i<str.length;i++){
	
		s+= str[i];
	}
	return s;
}

console.log(capitalize('nick'));
console.log(capitalize('Nick'));
console.log(capitalize(',hello'));
