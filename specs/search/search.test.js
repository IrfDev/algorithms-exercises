// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
//
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
  let findedIndex = undefined;
  var currentIndex = 0;

  while (currentIndex < array.length - 1 || typeof findedIndex === "number") {
    let currentElement = array[currentIndex];

    if (currentElement.id === id) {
      findedIndex = currentIndex;
    }

    currentIndex++;
  }

  return typeof findedIndex === "number" ? array[findedIndex] : "";
}

function binarySearch(id, array) {
  var minLimit = 0;
  var maxLimit = array.length - 1;
  var findedIndex = null;

  while (typeof findedIndex !== "number") {
    var currentMiddleIndex = Math.floor(minLimit + maxLimit / 2);
    var currentMiddleElement = array[currentMiddleIndex];

    if (currentMiddleElement === id) {
      findedIndex = currentMiddleIndex;
    } else if (currentMiddleElement < id) {
      minLimit = currentMiddleIndex;

      if (minLimit === 0) {
        findedIndex = -1;
      }
    } else {
      maxLimit = currentMiddleIndex;
      if (maxLimit === array.length - 1) {
        findedIndex = -1;
      }
    }
  }

  return findedIndex === -1 ? findedIndex : array[findedIndex];
}

// unit tests
// do not modify the below code
test("linear search", function () {
  const lookingFor = { id: 5, name: "Brian" };
  expect(
    linearSearch(5, [
      { id: 1, name: "Sam" },
      { id: 11, name: "Sarah" },
      { id: 21, name: "John" },
      { id: 10, name: "Burke" },
      { id: 13, name: "Simona" },
      { id: 31, name: "Asim" },
      { id: 6, name: "Niki" },
      { id: 19, name: "Aysegul" },
      { id: 25, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 2, name: "Marc" },
      { id: 51, name: "Chris" },
      lookingFor,
      { id: 14, name: "Ben" },
    ]),
  ).toBe(lookingFor);
});

test("binary search", function () {
  const lookingFor = { id: 23, name: "Brian" };
  expect(
    binarySearch(23, [
      { id: 1, name: "Sam" },
      { id: 3, name: "Sarah" },
      { id: 5, name: "John" },
      { id: 6, name: "Burke" },
      { id: 10, name: "Simona" },
      { id: 12, name: "Asim" },
      { id: 13, name: "Niki" },
      { id: 15, name: "Aysegul" },
      { id: 17, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 19, name: "Marc" },
      { id: 21, name: "Chris" },
      lookingFor,
      { id: 24, name: "Ben" },
    ]),
  ).toBe(lookingFor);
});
