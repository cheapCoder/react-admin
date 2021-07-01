class Name extends Array {
  add = function () {
    console.log(this);
  }
}

(new Name).add()