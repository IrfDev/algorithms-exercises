// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  /*
    Algo:
      1. Iterate on degrees until you hit max degree separation
      2. For each iteration you'll iterate over the queue
      4. Add connections to the queue
      3. Add title to the list of titles for the current user
      4. When the queue finished
      4. You'll add the new connections to the queue 
      5. And add one degree of separation
  */
  let queue = [myId];
  let currentDegreeOfSeparation = 0;
  let titles = {};
  let usersReviewed = [];

  while (currentDegreeOfSeparation <= degreesOfSeparation) {
    const newUserQueue = [];

    while (queue.length) {
      let currentUserId = queue.shift();
      let currentUser = getUser(currentUserId);

      for (let index = 0; index < currentUser.connections.length; index++) {
        const element = currentUser.connections[index];

        if (!usersReviewed.includes(element)) {
          newUserQueue.push(element);
          usersReviewed.push(element);
        }
      }

      titles[currentUser.title] = titles[currentUser.title]
        ? titles[currentUser.title] + 1
        : 1;
    }
    queue = newUserQueue;
    currentDegreeOfSeparation++;
  }

  var maximumCount = 0;
  var mostCommonTitle = null;

  for (const jobTitle in titles) {
    if (Object.hasOwnProperty.call(titles, jobTitle)) {
      const element = titles[jobTitle];
      if (maximumCount < element) {
        maximumCount = element;
        mostCommonTitle = jobTitle;
      }
    }
  }

  return mostCommonTitle;
};

// unit tests
// do not modify the below code
describe("findMostCommonTitle", function () {
  // the getUser function and data comes from this CodePen: https://codepen.io/btholt/pen/NXJGwa?editors=0010
  test("user 30 with 2 degrees of separation", () => {
    expect(findMostCommonTitle(30, 2)).toBe("Librarian");
  });

  test("user 11 with 3 degrees of separation", () => {
    expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
  });

  test("user 307 with 4 degrees of separation", () => {
    // if you're failing here with "Clinical Specialist, you're probably not filtering users who
    // appear more than once in people's connections
    expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
  });
});

test.skip("extra credit", function () {
  test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
  });
});
