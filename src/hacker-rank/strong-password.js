// https://www.hackerrank.com/challenges/strong-password/problem
var expect = require('chai').expect;

function minimumNumber(n, password) {
  // Return the minimum number of characters to make the password strong

  let successConditions = 0;

  let conditionStatus = {
    isSpecialCharacters: false,
    isNumber: false,
    isUpperCase: false,
    isLowerCase: false
  };

  const possibleSuccessConditions = 4;

  let i = 0;
  const characters = Array.from(password);

  function matchFound(matchType) {
    if (!conditionStatus[matchType]) {
      conditionStatus[matchType] = true;
      successConditions++;
    }
  }

  while (successConditions !== 4 && i < characters.length) {
    const character = characters[i];

    if (isSpecialCharacters(character)) {
      matchFound('isSpecialCharacters');
    } else if (isNumber(character)) {
      matchFound('isNumber');
    } else {
      if (isUpperCase(character)) {
        matchFound('isUpperCase');
      }

      if (isLowerCase(character)) {
        matchFound('isLowerCase');
      }
    }

    i++;
  }

  let characterToAdd = possibleSuccessConditions - successConditions;

  if (characterToAdd + password.length < 6) {
    characterToAdd += 6 - characterToAdd - password.length;
  }

  return characterToAdd;
}

function isNumber(string) {
  return !Number.isNaN(Number(string));
}

function isUpperCase(string) {
  const upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return upper_case.includes(string);
}

function isLowerCase(string) {
  const lower_case = "abcdefghijklmnopqrstuvwxyz";

  return lower_case.includes(string);
}

function isSpecialCharacters(string) {
  const special_characters = "!@#$%^&*()-+";

  return special_characters.includes(string);
}

describe('Hacker Rank: Strong password', function () {
  it('should work', function () {
    expect(minimumNumber(3, 'Ab1')).to.equal(3);
    expect(minimumNumber(1, '#HackerRank')).to.equal(1);
    expect(minimumNumber(0, '')).to.equal(6);
    expect(minimumNumber(15, '!@A1aas fghjkl;')).to.equal(0);
    expect(minimumNumber(4, 'EKZy')).to.equal(2);
  });
});
