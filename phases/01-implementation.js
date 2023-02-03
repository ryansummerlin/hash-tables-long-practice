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
    if ((this.count / this.capacity) >= 0.7) {
      this.resize();
    }

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

    } else if (this.data[index].key === key) {
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
    this.capacity *= 2;
    this.count = 0;
    let oldData = this.data;
    this.data = new Array(this.capacity).fill(null);

    for (let i = 0; i < oldData.length; i++) {
      let pair = oldData[i];
      while (pair) {
        this.insert(pair.key, pair.value);
        pair = pair.next;
      }
    }
  }

  // I know it's sort of violating DRY but I think adding the "Key not found" message inside the first if statement
  // makes the code a bit more readable.
  delete(key) {
    let index = this.hashMod(key);
    if (!this.data[index]) {
      return 'Key not found';
    } else if (this.data[index].key === key) {
      this.data[index] = this.data[index].next;
      this.count--;
    } else {
      let curr = this.data[index];
      while (curr.next) {
        if (curr.next.key === key) {
          curr.next = curr.next.next;
          this.count--;
          return;
        }
      }
    }

    return 'Key not found';
  }
}


module.exports = HashTable;
