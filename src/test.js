let a = {first: 1};
const b = a;
b.second = 2;

(function() {
let b = a;

b.third = 3;
console.log(b);
})();

console.log(b);