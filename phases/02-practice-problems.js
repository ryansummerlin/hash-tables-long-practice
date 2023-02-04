const common = require("mocha/lib/interfaces/common");

function anagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  let obj1 = {};
  let obj2 = {};

  for (let i = 0; i < str1.length; i++) {
    if (!obj1[str1[i]]) {
      obj1[str1[i]] = 1;
    } else {
      obj1[str1[i]]++;
    }

    if (!obj2[str2[i]]) {
      obj2[str2[i]] = 1;
    } else {
      obj2[str2[i]]++;
    }
  }

  let keys = Object.keys(obj1);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;

}

// I initially coded this using objects instead of sets. I realized this problem is actually more suited to using sets, so I went back
// and re wrote the function but I'll leave this here for posterity.

function commonElementsObject(arr1, arr2) {
  let commons = [];
  let obj1 = {};
  let obj2 = {};

  for (let i = 0; i < arr1.length; i++) {
    if (!obj1[arr1[i]]) {
      obj1[arr1[i]] = true;
    }
  }

  for (let i = 0; i < arr2.length; i++) {
    if (!obj2[arr2[i]]) {
      obj2[arr2[i]] = true;
    }
  }

  let keys = Object.keys(obj1)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (obj2[key]) {
      commons.push(parseInt(key, 10));
    }
  }

  return commons;
}

function commonElements(arr1, arr2) {
  let commons = [];
  let set1 = new Set;
  let set2 = new Set;

  for (let i = 0; i < arr1.length; i++) {
    set1.add(arr1[i]);
  }

  for (let i = 0; i < arr2.length; i++) {
    set2.add(arr2[i]);
  }

  set1.forEach(el => {
    if (set2.has(el)) {
      commons.push(el);
    }
  });

  return commons;

}


function duplicate(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (!obj[num]) {
      obj[num] = 1;
    } else {
      return num;
    }
  }
}


function twoSum(nums, target) {
  let diffSet = new Set;

  for (const num of nums) {
    diffSet.add(target - num);
  }

  diffSet.delete(target / 2);

  for (const num of nums) {
    if (diffSet.has(num)) {
      return true;
    }
  }

  return false;

}


function wordPattern(pattern, strings) {
  let patternObj = {};
  let stringSet = new Set;
  for (let i = 0; i < pattern.length; i++) {
    let char = pattern[i];
    if (!patternObj[char] && !stringSet.has(strings[i])) {
      patternObj[char] = strings[i];
      stringSet.add(strings[i]);
    }
  }

  let correctPattern = [];
  for (let i = 0; i < pattern.length; i++) {
    let char = pattern[i];
    correctPattern.push(patternObj[char]);
  }

  for (let i = 0; i < strings.length; i++) {
    if (strings[i] !== correctPattern[i]) {
      return false;
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
