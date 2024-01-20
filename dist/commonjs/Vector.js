"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector4 = exports.Vector3 = exports.Vector2 = exports.Vector = void 0;
//Contains: Vector, Vector2 , Vector3, Vector4 
/** Represents a generic Vector type, optimized for custom lengths, Based on typical arrays, but with added math functions for vectors */
class Vector extends Array {
    /**
    * @constructor
    * @param {...number|number} elem count of scalars, or array of scalars to convert to vector
    */
    constructor(...elem) {
        super(...elem);
    }
    /**
     * Adds two vectors together, and returns new vector
     * @param   {Vector} vector Vector to be added
     * @returns {Vector} Sum of vectors
     */
    add(vector) {
        if (vector.length != this.length)
            console.log("Cannot add two vectors with different lengths!");
        let out = new Vector(this.length);
        for (let i = 0; i < out.length; i++)
            out[i] = vector[i] + this[i];
        return out;
    }
    /**
     * Adds vector into {@this} vector
     * @param {Vector} vector Vector to be added
     */
    localAdd(vector) {
        if (vector.length != this.length)
            console.log("Cannot add two vectors with different lengths!");
        for (let i = 0; i < this.length; i++)
            this[i] += vector[i];
    }
    /**
   * Multiplies vector by scalar(number), and returns new vector
   * @param {number} scalar Scalar to multiply vector
   * @returns {Vector} Vector multiplied by scalar
   */
    scale(scalar) {
        let out = new Vector(this.length);
        for (let i = 0; i < out.length; i++)
            out[i] = scalar * this[i];
        return out;
    }
    /**
     * Multiplies vector by scalar, and puts result into {@this}
     * @param {number} scalar
     */
    localScale(scalar) {
        for (let i = 0; i < this.length; i++)
            this[i] *= scalar;
    }
    /**
     * Normalizes vector, and returns new vector with result
     * @returns {Vector} Normalized vector
     */
    normalize() {
        //Unit Scalar.
        let z = 0;
        for (let i = 0; i < this.length; i++)
            z += this[i] ** 2;
        z = z ** 0.5;
        let out = this.clone();
        out.locMult(1 / z);
        return out;
    }
    /**
     * Normalizes vector, and puts result into {@this}
     */
    localNormalize() {
        let z = 0;
        for (let i = 0; i < this.length; i++)
            z += this[i] ** 2;
        z = z ** 0.5;
        this.locMult(1 / z);
    }
    /**
     * Returns new vector with same scalars
     */
    clone() {
        return new Vector(...this);
    }
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector} Absolute vector
     */
    absolute() {
        let out = new Vector(this.length);
        for (let i = 0; i < out.length; i++)
            out[i] = Math.abs(this[i]);
        return out;
    }
    /**
    * Makes all scalars absolute, and puts result into {@this}
    */
    localAbsolute() {
        for (let i = 0; i < this.length; i++)
            this[i] = Math.abs(this[i]);
    }
    /**
     * Dot product of vectors
     * @param {Vector} vector Vector to project
     * @returns {number} Dot product (projection length*realLength)
     */
    dot(vector) {
        if (vector.length != this.length)
            throw new Error("Couldnt calculate dot product of two different length vectors!!");
        let out = 0;
        for (let i = 0; i < this.length; i++)
            out += this[i] * vector[i];
        return out;
    }
    /**
     * Returns projection length of vector onto {@this}
     * @param {Vector} vector Vector to project
     * @returns {number} length of projection
     */
    projectionLength(vector) {
        return this.dot(vector) / this.realLength();
    }
    /**
   * Returns the length in space of the vector
   * @returns {number} vector length
   */
    realLength() {
        let squareSum = 0;
        for (let i = 0; i < this.length; i++)
            squareSum += this[i] ** 2;
        return squareSum ** 0.5;
    }
    /**
  * Returns true if all scalars of vector are matched
  * @param {Vector} vector Vector to compare
  * @returns {boolean} Boolean
  */
    compare(vector) {
        if (vector.length != this.length)
            console.log("Cannot compare two vectors with different lengths!");
        for (let i = 0; i < vector.length; i++)
            if (this[i] != vector[i])
                return false;
        return true;
    }
    /**
     * Checks if vector is linearly dependent on another vector
     * @param {Vector} vector Vector to check depedency
     * @returns {boolean} Result of check
     */
    isLinearlyDependent(vector) {
        if (vector.length != this.length)
            console.log("Cannot check linear dependency on vectors with different lengths!");
        let v1 = vector.normalize().absolute();
        let v2 = this.normalize().absolute();
        return v1.compare(v2);
    }
    /**
     * Converts this vector into {@link Vector2}, and returns new {@link Vector2}
     */
    toVector2() {
        if (this.length < 1)
            throw new Error("Cannot convert a vector with less than two scalars into Vector2");
        return new Vector2(this[0], this[1]);
    }
    toVector3() {
        if (this.length < 2)
            throw new Error("Cannot convert a vector with less than three scalars into Vector3");
        return new Vector3(this[0], this[1], this[2]);
    }
    toVector4() {
        if (this.length < 3)
            throw new Error("Cannot convert a vector with less than four scalars into Vector4");
        return new Vector4(this[0], this[1], this[2], this[3]);
    }
    //
    //Alliasses
    //
    /** @alias {@link compare} */
    isSame(vector) { return this.compare(vector); }
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector) { return this.isLinearlyDependent(vector); }
    /** @alias {@link toVector2} */
    toVec2() { return this.toVector2(); }
    /** @alias {@link localAbsolute} */
    locAbs() { this.localAbsolute(); }
    /** @alias {@link absolute} */
    abs() { return this.absolute(); }
    /** @alias {@link normalize} */
    norm() { return this.normalize(); }
    /** @alias {@link localNormalize} */
    locNorm() { this.localNormalize(); }
    /** @alias {@link clone} */
    copy() { return this.clone(); }
    /** @alias {@link scale} */
    multiply(scalar) { return this.scale(scalar); }
    /** @alias {@link scale} */
    mult(scalar) { return this.scale(scalar); }
    /** @alias {@link localScale} */
    localMultiply(scalar) { this.localScale(scalar); }
    /** @alias {@link localScale} */
    locMult(scalar) { this.localScale(scalar); }
}
exports.Vector = Vector;
/** Represents a vector in 2d Space or 2 element Vector */
class Vector2 {
    x;
    y;
    /**
    * @constructor
    * @param {number?} x first scalar
    * @param {number?} y second scalar
    */
    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }
    /**
    * Adds two vectors together, and returns new vector
    * @param   {Vector2} vector Vector to be added
    * @returns {Vector2} Sum of vectors
    */
    add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }
    /**
    * Adds vector into existing vector
    * @param {Vector2} vector Vector to be added
    */
    localAdd(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector2} Vector multiplied by scalar
     */
    scale(scalar) {
        return new Vector2(scalar * this.x, this.y * scalar);
    }
    /**
    * Multiplies vector by scalar, and puts result into itself
    * @param {number} scalar
    */
    localScale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    /**
    * Normalizes vector, and returns new vector with result
    * @returns {Vector2} Normalized vector
    */
    normalize() {
        let z = ((this.x ** 2) + (this.y ** 2)) ** (0.5);
        return new Vector2(this.x / z, this.y / z);
    }
    /**
    * Normalizes vector, and puts result into itself
    */
    localNormalize() {
        let z = ((this.x ** 2) + (this.y ** 2)) ** (0.5);
        this.x /= z;
        this.y /= z;
    }
    /**
     * Returns new vector with same scalars
     */
    clone() {
        return new Vector2(this.x, this.y);
    }
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector2} Absolute vector
     */
    absolute() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }
    /**
    * Makes all scalars absolute, and puts result into itself
    */
    localAbsolute() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
    }
    /**
     * Dot product of two vectors
     * @param vector Vector to project
     * @returns {number} dot product
     */
    dot(vector) {
        return (vector.x * this.x) + (vector.y * this.y);
    }
    /**
     * Projection length of vector projected onto @this
     * @param {Vector2} vector vector to project onto this
     * @returns {number} length of the projection
     */
    projectionLength(vector) {
        return this.dot(vector) / this.realLength();
    }
    /**
     * Returns the length in 2d space of the vector
     * @returns {number} length in 2d space
     */
    realLength() {
        return ((this.x ** 2) + (this.y ** 2)) ** 0.5;
    }
    /**
    * Returns true if all scalars of vector are matched
    * @param {Vector2} vector Vector to compare
    * @returns {boolean} Boolean
    */
    compare(vector) {
        if (vector.x == this.x && vector.y == this.y)
            return true;
        return false;
    }
    /**
    * Checks if vector is linearly dependent on another vector
    * @param {Vector2} vector Vector to check depedency
    * @returns {boolean} Result of check
    */
    isLinearlyDependent(vector) {
        let v1 = vector.norm().abs();
        let v2 = this.norm().abs();
        return v1.compare(v2);
    }
    toGenericVector() {
        return new Vector(this.x, this.y);
    }
    /**
     * Expands vector to 3d vector
     * @param {?number} z value to add at end of vector
     * @returns {Vector3} expanded vector
     */
    expand(z) {
        return new Vector3(this.x, this.y, z ?? 0);
    }
    //
    //Alliasses
    //
    /** @alias {@link compare} */
    isSame(vector) { return this.compare(vector); }
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector) { return this.isLinearlyDependent(vector); }
    /** @alias {@link toGenericVector} */
    toGenVec() { return this.toGenericVector(); }
    /** @alias {@link absolute} */
    abs() { return this.absolute(); }
    /** @alias {@link localAbsolute} */
    locAbs() { this.localAbsolute(); }
    /** @alias {@link normalize} */
    norm() { return this.normalize(); }
    /** @alias {@link localNormalize} */
    locNorm() { this.localNormalize(); }
    /** @alias {@link clone} */
    copy() { return this.clone(); }
    /** @alias {@link scale} */
    multiply(scalar) { return this.scale(scalar); }
    /** @alias {@link scale} */
    mult(scalar) { return this.scale(scalar); }
    /** @alias {@link localScale} */
    localMultiply(scalar) { this.localScale(scalar); }
    /** @alias {@link localScale} */
    locMult(scalar) { this.localScale(scalar); }
}
exports.Vector2 = Vector2;
/** Represents a vector in 3d Space or 3 element Vector */
class Vector3 {
    x;
    y;
    z;
    /**
    * @constructor
    * @param {number?} x first scalar
    * @param {number?} y second scalar
    * @param {number?} z third scalar
    */
    constructor(x, y, z) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.z = z ?? 0;
    }
    /**
    * Adds two vectors together, and returns new vector
    * @param   {Vector3} vector Vector to be added
    * @returns {Vector3} Sum of vectors
    */
    add(vector) {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
    /**
    * Adds vector into existing vector
    * @param {Vector3} vector Vector to be added
    */
    localAdd(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }
    /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector3} Vector multiplied by scalar
     */
    scale(scalar) {
        return new Vector3(scalar * this.x, this.y * scalar, this.z * scalar);
    }
    /**
    * Multiplies vector by scalar, and puts result into itself
    * @param {number} scalar
    */
    localScale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
    }
    /**
    * Normalizes vector, and returns new vector with result
    * @returns {Vector3} Normalized vector
    */
    normalize() {
        let div = this.realLength();
        return new Vector3(this.x / div, this.y / div, this.z / div);
    }
    /**
    * Normalizes vector, and puts result into itself
    */
    localNormalize() {
        let div = this.realLength();
        this.x /= div;
        this.y /= div;
        this.z /= div;
    }
    /**
     * @returns {Vector3} new vector with same scalars
     */
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    /**
     * Expands a vector to 4d vector
     * @param {?number} w Scalar to add at end of vector, if not defined, will add 0
     * @returns {Vector4} Expanded vector
     */
    expand(w) {
        return new Vector4(this.x, this.y, this.z, w ?? 0);
    }
    /**
     * Shrinks a vector to 2d vector(throws away last scalar)
     * @returns {Vector2} Shrinked vector
     */
    shrink() {
        return new Vector2(this.x, this.y);
    }
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector2} Absolute vector
     */
    absolute() {
        return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }
    /**
    * Makes all scalars absolute, and puts result into itself
    */
    localAbsolute() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
    }
    /**
     * Dot product of two vectors
     * @param {Vector3} vector Vector to project
     * @returns {number} dot product
     */
    dot(vector) {
        return (vector.x * this.x) + (vector.y * this.y) + (vector.z * this.z);
    }
    /**
     * Cross product of two vectors
     * @param {Vector3} vector Vector to project
     * @returns {Vector3} cross product
     */
    cross(vector) {
        let out = new Vector3();
        out.x = (this.y * vector.z) - (vector.y * this.z);
        out.y = (this.z * vector.x) - (vector.z * this.x);
        out.z = (this.x * vector.y) - (vector.x * this.y);
        return out;
    }
    /**
     * Projection length of vector projected onto @this
     * @param {Vector2} vector vector to project onto this
     * @returns {number} length of the projection
     */
    projectionLength(vector) {
        return this.dot(vector) / this.realLength();
    }
    /**
     * Returns the length in 2d space of the vector
     * @returns {number} length in 2d space
     */
    realLength() {
        return ((this.x ** 2) + (this.y ** 2) + (this.z ** 2)) ** 0.5;
    }
    /**
    * Returns true if all scalars of vector are matched
    * @param {Vector3} vector Vector to compare
    * @returns {boolean} Boolean
    */
    compare(vector) {
        if (vector.x == this.x && vector.y == this.y && vector.z == this.z)
            return true;
        return false;
    }
    /**
    * Checks if vector is linearly dependent on another vector
    * @param {Vector2} vector Vector to check depedency
    * @returns {boolean} Result of check
    */
    isLinearlyDependent(vector) {
        let v1 = vector.norm().abs();
        let v2 = this.norm().abs();
        return v1.compare(v2);
    }
    /**
     * Inverts all scalars (1/s)
     * @returns {Vector3} Inverted vector
     */
    invert() {
        return new Vector3(1 / this.x, 1 / this.y, 1 / this.z);
    }
    toGenericVector() {
        return new Vector(this.x, this.y, this.z);
    }
    //
    //Alliasses
    //
    /** @alias {@link compare} */
    isSame(vector) { return this.compare(vector); }
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector) { return this.isLinearlyDependent(vector); }
    /** @alias {@link toGenericVector} */
    toGenVec() { return this.toGenericVector(); }
    /** @alias {@link absolute} */
    abs() { return this.absolute(); }
    /** @alias {@link localAbsolute} */
    locAbs() { this.localAbsolute(); }
    /** @alias {@link normalize} */
    norm() { return this.normalize(); }
    /** @alias {@link localNormalize} */
    locNorm() { this.localNormalize(); }
    /** @alias {@link clone} */
    copy() { return this.clone(); }
    /** @alias {@link scale} */
    multiply(scalar) { return this.scale(scalar); }
    /** @alias {@link scale} */
    mult(scalar) { return this.scale(scalar); }
    /** @alias {@link localScale} */
    localMultiply(scalar) { this.localScale(scalar); }
    /** @alias {@link localScale} */
    locMult(scalar) { this.localScale(scalar); }
}
exports.Vector3 = Vector3;
/** Represents a vector in 4d Space or 4 element Vector */
class Vector4 {
    x;
    y;
    z;
    w;
    /**
    * @constructor
    * @param {number?} x first scalar
    * @param {number?} y second scalar
    * @param {number?} z third scalar
    * @param {number?} z fourth scalar
    */
    constructor(x, y, z, w) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.z = z ?? 0;
        this.w = w ?? 0;
    }
    /**
    * Adds two vectors together, and returns new vector
    * @param   {Vector4} vector Vector to be added
    * @returns {Vector4} Sum of vectors
    */
    add(vector) {
        return new Vector4(this.x + vector.x, this.y + vector.y, this.z + vector.z, this.w + vector.w);
    }
    /**
    * Adds vector into existing vector
    * @param {Vector4} vector Vector to be added
    */
    localAdd(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        this.w += vector.w;
    }
    /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector4} Vector multiplied by scalar
     */
    scale(scalar) {
        return new Vector4(scalar * this.x, this.y * scalar, this.z * scalar, scalar * this.w);
    }
    /**
    * Multiplies vector by scalar, and puts result into itself
    * @param {number} scalar
    */
    localScale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
    }
    /**
    * Normalizes vector, and returns new vector with result
    * @returns {Vector4} Normalized vector
    */
    normalize() {
        let div = this.realLength();
        return new Vector4(this.x / div, this.y / div, this.z / div, this.w / div);
    }
    /**
    * Normalizes vector, and puts result into itself
    */
    localNormalize() {
        let div = this.realLength();
        this.x /= div;
        this.y /= div;
        this.z /= div;
        this.w /= div;
    }
    /**
     * @returns {Vector3} new vector with same scalars
     */
    clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector2} Absolute vector
     */
    absolute() {
        return new Vector4(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z), Math.abs(this.w));
    }
    /**
    * Makes all scalars absolute, and puts result into itself
    */
    localAbsolute() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        this.w = Math.abs(this.w);
    }
    /**
     * Dot product of two vectors
     * @param {Vector4} vector Vector to project
     * @returns {number} dot product
     */
    dot(vector) {
        return (vector.x * this.x) + (vector.y * this.y) + (vector.z * this.z) + (vector.w * this.w);
    }
    /**
     * Projection length of vector projected onto @this
     * @param {Vector4} vector vector to project onto this
     * @returns {number} length of the projection
     */
    projectionLength(vector) {
        return this.dot(vector) / this.realLength();
    }
    /**
     * Returns the length in 2d space of the vector
     * @returns {number} length in 2d space
     */
    realLength() {
        return ((this.x ** 2) + (this.y ** 2) + (this.z ** 2) + (this.w ** 2)) ** 0.5;
    }
    /**
    * Returns true if all scalars of vector are matched
    * @param {Vector4} vector Vector to compare
    * @returns {boolean} Boolean
    */
    compare(vector) {
        if (vector.x == this.x && vector.y == this.y && vector.z == this.z && vector.w == this.w)
            return true;
        return false;
    }
    /**
    * Checks if vector is linearly dependent on another vector
    * @param {Vector2} vector Vector to check depedency
    * @returns {boolean} Result of check
    */
    isLinearlyDependent(vector) {
        let v1 = vector.norm().abs();
        let v2 = this.norm().abs();
        return v1.compare(v2);
    }
    toGenericVector() {
        return new Vector(this.x, this.y, this.z, this.w);
    }
    invert() {
        return new Vector4(1 / this.x, 1 / this.y, 1 / this.z, 1 / this.w);
    }
    /**
    * Shrinks a vector to 3d vector(throws away last scalar)
    * @returns {Vector3} Shrinked vector
    */
    shrink() {
        return new Vector3(this.x, this.y, this.z);
    }
    //
    //Alliasses
    //
    /** @alias {@link compare} */
    isSame(vector) { return this.compare(vector); }
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector) { return this.isLinearlyDependent(vector); }
    /** @alias {@link toGenericVector} */
    toGenVec() { return this.toGenericVector(); }
    /** @alias {@link absolute} */
    abs() { return this.absolute(); }
    /** @alias {@link localAbsolute} */
    locAbs() { this.localAbsolute(); }
    /** @alias {@link normalize} */
    norm() { return this.normalize(); }
    /** @alias {@link localNormalize} */
    locNorm() { this.localNormalize(); }
    /** @alias {@link clone} */
    copy() { return this.clone(); }
    /** @alias {@link scale} */
    multiply(scalar) { return this.scale(scalar); }
    /** @alias {@link scale} */
    mult(scalar) { return this.scale(scalar); }
    /** @alias {@link localScale} */
    localMultiply(scalar) { this.localScale(scalar); }
    /** @alias {@link localScale} */
    locMult(scalar) { this.localScale(scalar); }
}
exports.Vector4 = Vector4;
//# sourceMappingURL=Vector.js.map