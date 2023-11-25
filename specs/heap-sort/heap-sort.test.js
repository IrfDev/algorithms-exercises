/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
  const n = array.length;

  createMaxHeap(array);

  for (let i = n - 1; i > 0; i--) {
    // Swap root (maximum element) with the last element
    [array[0], array[i]] = [array[i], array[0]];

    // Heapify reduced heap
    heapify(array, i, 0);
  }

  return array;
};

const createMaxHeap = (array) => {
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, array.length, i);
  }

  return array;
};

const heapify = (array, n, i) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    // Swap and heapify the affected subtree
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, n, largest);
  }

  return array;
};

// unit tests
// do not modify the below code
test("heap sort", function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
