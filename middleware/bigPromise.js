/*
We always write controllers inside
1. try catch or 
2. async - await or 
3. promise
*/

module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);
