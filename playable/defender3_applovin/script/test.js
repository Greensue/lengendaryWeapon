function product(arr){
	a = arr.filter(function(x){
		return x%2==0;
	})
	return a
}
console.log(product([1,2,3,4]))