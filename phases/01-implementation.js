class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    this.capacity = numBuckets;
    this.count = 0;
    this.data = new Array(numBuckets).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    let index = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);

    if (this.data[index]) {
      let curr = this.data[index];

      while (curr) {
        if (curr.key === key) {
          curr.value = value;
          return;
        }
        curr = curr.next;
      }

      newPair.next = this.data[index];
    }

    this.data[index] = newPair;
    this.count++;
  }


  read(key) {
    let index = this.hashMod(key);

    if (this.data[index] === null) {
      return undefined;

    } else if (this.data[index].next === null) {
      return this.data[index].value;

    } else {
      let curr = this.data[index];

      while (curr) {
        if (curr.key === key) {
          return curr.value;
        }
        curr = curr.next;
      }

      return undefined;
    }
  }


  resize() {
    // Your code here
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
