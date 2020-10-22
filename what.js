var findDisappearedNumbers = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[Math.abs(nums[i]) - 1] > 0) {
      nums[Math.abs(nums[i]) - 1] *= -1
    }
  }

  console.log(nums);
  let arr = []
  for (let j = 0; j < nums.length; j++) {
    if(nums[j] > 0) {
      arr.push(j + 1);
    }
  }
  return arr
};

console.log(findDisappearedNumbers([4,3,2,7,8,2,3,1]));
