/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.
	
	2. Create different buckets for each digit from 0-9
	3. Take the active index digit for each item and put them in the buckets
	4. Then re-arrange the items based on the order in the buckets, starting from 0 and ending in the number 9, from top to bottom
	5. Then decrease the index by 1
Continue untill the active index is 0
*/

function radixSort(array) {
  let initialBuckets = Array(9);
  //1. Take an active index and check the digit of the number you're comparing.
  //	a. This active index needs to be the latest possible digit
  var newArray = array;
  var highestIndex = getHighestIndex(array);
  var activeIndex = 0;

  console.log("STARTING", highestIndex, activeIndex);

  while (activeIndex < highestIndex) {
    for (let index = 0; index < newArray.length; index++) {
      const element = newArray[index];

      const stringElement = element.toString();

      const arrayElement = Array.from(stringElement);

      const activeIndexDigit = arrayElement.length - 1 - activeIndex;

      const activeDigit = Number(arrayElement[activeIndexDigit]);

      if (!Boolean(activeDigit)) {
        if (!Array.isArray(initialBuckets[0])) {
          initialBuckets[0] = [];
        }
        initialBuckets[0].push(element);
      } else {
        if (!Array.isArray(initialBuckets[activeIndexDigit])) {
          initialBuckets[activeIndexDigit] = [];
        }

        initialBuckets[activeIndexDigit].push(element);
      }
    }

    newArray = [];

    for (let index = 0; index < initialBuckets.length; index++) {
      const digitArray = initialBuckets[index];

      if (Array.isArray(digitArray) && digitArray.length) {
        for (let index = 0; index < digitArray.length; index++) {
          const currentItem = digitArray[index];

          newArray.push(currentItem);
        }
      }

      initialBuckets[index] = [];
    }

    activeIndex++;
  }

  return newArray;
}

function getHighestIndex(array) {
  var higherIndex = 0;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    let numberOfDigits = 0;
    let currentDivisionResult = element;

    while (currentDivisionResult !== 1) {
      currentDivisionResult = Math.floor(currentDivisionResult / 10);
      numberOfDigits++;
    }

    if (numberOfDigits > higherIndex) {
      higherIndex = numberOfDigits;
    }
  }

  return higherIndex;
}

// unit tests
// do not modify the below code
/* test("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
 */