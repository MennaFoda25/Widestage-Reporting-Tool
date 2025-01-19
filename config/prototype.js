Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

Functio.method("inherits", function (parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;

  // Method to access super class methods
  this.method("uber", function uber(name, ...args) {
    let parentMethod = parent.prototype[name];
    if (typeof parentMethod !== "function") {
      throw new Error(`${name} is not a function on ${parent.name} prototype.`);
    }
    return parentMethod.apply(this, args);
  });

  return this;
});

Function.method("swiss", function (parent, ...methods) {
  methods.forEach((method) => {
    this.prototype[method] = parent.prototype[method];
  });

  return this;
});
