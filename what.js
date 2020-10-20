var findDisappearedNumbers = function(nums) {
  if(!nums.length) return []
  nums.sort((a,b) => a-b);
  let arr = []
  if(nums[0] !== 1) arr.push(1);
   
  for(let i = 0; i < nums.length - 1;i++) {
    if(nums[i + 1] - nums[i] > 1 ) {
      for(let j = nums[i] + 1;j < nums[i + 1]; j++) {
        arr.push(j);
      }
    }
  }

  return arr;
};
console.log(findDisappearedNumbers([2,3,4,5,10]));