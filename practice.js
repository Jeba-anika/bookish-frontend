function fixArray(arr){
    const arrWithoutDuplicateValue = arr.filter((item, index) => arr.indexOf(item) === index)
    const sortedArr = arrWithoutDuplicateValue.sort((a,b)=>(a-b))
    return sortedArr
}

let arr = [ 3, 26, 1, 2, 3, 44, 57, 87, 1 ];
let fixedArr = fixArray(arr);
console.log(fixedArr); 

function find_max(nums) {
    let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers
     for (let num of nums) {
    if (num > max_num) {
      max_num = num
    }
     }
   return max_num;
     }


console.log(find_max(arr))

console.log(Number.NEGATIVE_INFINITY)

function convert(val) {

  var suffiex = ["", "K", "M", "B", "T"];
  var sNum = Math.floor(("" + val).length / 3);

  var sVal = parseFloat((
    sNum !== 0 ? (val / Math.pow(1000, sNum)) : val).toPrecision(2));
  
  if (sVal % 1 != 0) {
      sVal = sVal.toFixed(1);
  }

  return sVal + suffiex[sNum];
}

console.log(convert(18580021));

