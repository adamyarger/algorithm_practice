/**
 * Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.


Example:

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
 */

/**
 * Initialize your data structure here.
 * 
 * this is a trie
 * start class with dict of all letters
 */
var WordDictionary = function () {
  this.root = new Node()
};

function Node() {
  this.isWord = false
  // defaultdict(Node)
}

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  // if . found it counts as match
  // mark dict with another node
  let cur = this.root
  for (char of word) {
    // no in will also include things from the prototype chain, use hasOwnProperty to be safer
    if (!(char in cur)) {
      // create it
      cur[char] = new Node()
    }
    cur = cur[char]
  }
  cur.isWord = true
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  return this.dfs(word, 0, this.root)
};

WordDictionary.prototype.dfs = function (word, index, node) {
  const letter = word[index]

  if (index === word.length) {
    return node.isWord
  }

  if (letter === '.') {
    for (const key in node) {
      if (this.dfs(word, index + 1, node[key])) return true
    }
  } else if (node[letter]) {
    return this.dfs(word, index + 1, node[letter])
  }

  return false
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

var obj = new WordDictionary()
obj.addWord('dude')
obj.addWord('dave')
obj.addWord('hello')
// console.log(obj)
console.log(obj.search('dave'))
console.log(obj.search('.av.'))
console.log(obj.search('hell.'))