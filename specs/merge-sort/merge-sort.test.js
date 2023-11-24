/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  if (nums.length < 2) {
    return nums;
  }

  let firstListLength = Math.floor(nums.length / 2);

  let firstList = nums.slice(0, firstListLength);
  let secondList = nums.slice(firstListLength);

  return mergeList(mergeSort(firstList), mergeSort(secondList));
};

const mergeList = (firstList, secondList) => {
  console.log("START", firstList, secondList);
  let concatList = [];

  while (firstList.length && secondList.length) {
    if (firstList[0] <= secondList[0]) {
      concatList.push(firstList.shift());
    } else {
      concatList.push(secondList.shift());
    }
  }

  console.log("End", concatList);

  return concatList.concat(firstList, secondList);
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  console.log("starting");
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
