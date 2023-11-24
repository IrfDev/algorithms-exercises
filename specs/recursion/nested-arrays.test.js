/* 

  write a function that accepts an array that only contains
  two types of things: numbers and arrays. those nested arrays
  also only contain numbers and other, nested arrays.

  example: nestedAdd([1, 2, [3]]) = 6
           nestedAdd([[[2]], 1, [1, 3]]) = 7
 
 */

function nestedAdd(array) {
  var finalSum = 0;

  for (let index = 0; index < array.length; index++) {
    let element = array[index];
    let isArray = Array.isArray(element);

    // Base case
    if (isArray) {
      finalSum += nestedAdd(element);
    } else {
      finalSum += element;
    }
  }

  return finalSum;
}

test("nested arrays addition", () => {
  expect(nestedAdd([1, 2, 3])).toEqual(6);
  expect(nestedAdd([1, [2], 3])).toEqual(6);
  expect(nestedAdd([[[[[[[[[5]]]]]]]]])).toEqual(5);
  expect(nestedAdd([10, [12, 14, [1], [16, [20]]], 10, 11])).toEqual(94);
});
