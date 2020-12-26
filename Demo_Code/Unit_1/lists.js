var myList = [1,5,5,3,7,89,1,4,56,7,23];
isInList = myList.includes(89);
console.log(isInList); 

// Itterate throuhg list using for locp
for (var i=0;i<myList.length;i++){
	console.log(myList[i]);
}

// Find index of
console.log(myList.indexOf(7))
// Return -1 if not found
console.log(myList.indexOf(1000))


