/** Represents a generic Vector type, optimized for custom lengths, Based on typical arrays, but with added math functions for vectors */
export declare class Vector extends Array<number> {
    /**
    * @constructor
    * @param {...number|number} elem count of scalars, or array of scalars to convert to vector
    */
    constructor(...elem: Array<number>);
    /**
     * Adds two vectors together, and returns new vector
     * @param   {Vector} vector Vector to be added
     * @returns {Vector} Sum of vectors
     */
    add(vector: Vector): Vector;
    /**
     * Adds vector into {@this} vector
     * @param {Vector} vector Vector to be added
     */
    localAdd(vector: Vector): void;
    /**
   * Multiplies vector by scalar(number), and returns new vector
   * @param {number} scalar Scalar to multiply vector
   * @returns {Vector} Vector multiplied by scalar
   */
    scale(scalar: number): Vector;
    /**
     * Multiplies vector by scalar, and puts result into {@this}
     * @param {number} scalar
     */
    localScale(scalar: number): void;
    /**
     * Normalizes vector, and returns new vector with result
     * @returns {Vector} Normalized vector
     */
    normalize(): Vector;
    /**
     * Normalizes vector, and puts result into {@this}
     */
    localNormalize(): void;
    /**
     * Returns new vector with same scalars
     */
    clone(): Vector;
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector} Absolute vector
     */
    absolute(): Vector;
    /**
    * Makes all scalars absolute, and puts result into {@this}
    */
    localAbsolute(): void;
    /**
     * Dot product of vectors
     * @param {Vector} vector Vector to project
     * @returns {number} Dot product (projection length*realLength)
     */
    dot(vector: Vector): number;
    /**
     * Returns projection length of vector onto {@this}
     * @param {Vector} vector Vector to project
     * @returns {number} length of projection
     */
    projectionLength(vector: Vector): number;
    /**
   * Returns the length in space of the vector
   * @returns {number} vector length
   */
    realLength(): number;
    /**
  * Returns true if all scalars of vector are matched
  * @param {Vector} vector Vector to compare
  * @returns {boolean} Boolean
  */
    compare(vector: Vector): boolean;
    /**
     * Checks if vector is linearly dependent on another vector
     * @param {Vector} vector Vector to check depedency
     * @returns {boolean} Result of check
     */
    isLinearlyDependent(vector: Vector): boolean;
    /**
     * Converts this vector into {@link Vector2}, and returns new {@link Vector2}
     */
    toVector2(): Vector2;
    toVector3(): Vector3;
    toVector4(): Vector4;
    /** @alias {@link compare} */
    isSame(vector: Vector): boolean;
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector: Vector): boolean;
    /** @alias {@link toVector2} */
    toVec2(): Vector2;
    /** @alias {@link localAbsolute} */
    locAbs(): void;
    /** @alias {@link absolute} */
    abs(): Vector;
    /** @alias {@link normalize} */
    norm(): Vector;
    /** @alias {@link localNormalize} */
    locNorm(): void;
    /** @alias {@link clone} */
    copy(): Vector;
    /** @alias {@link scale} */
    multiply(scalar: number): Vector;
    /** @alias {@link scale} */
    mult(scalar: number): Vector;
    /** @alias {@link localScale} */
    localMultiply(scalar: number): void;
    /** @alias {@link localScale} */
    locMult(scalar: number): void;
}
/** Represents a vector in 2d Space or 2 element Vector */
export declare class Vector2 {
    x: number;
    y: number;
    /**
    * @constructor
    * @param {number?} x first scalar
    * @param {number?} y second scalar
    */
    constructor(x?: number, y?: number);
    /**
    * Adds two vectors together, and returns new vector
    * @param   {Vector2} vector Vector to be added
    * @returns {Vector2} Sum of vectors
    */
    add(vector: Vector2): Vector2;
    /**
    * Adds vector into existing vector
    * @param {Vector2} vector Vector to be added
    */
    localAdd(vector: Vector2): void;
    /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector2} Vector multiplied by scalar
     */
    scale(scalar: number): Vector2;
    /**
    * Multiplies vector by scalar, and puts result into itself
    * @param {number} scalar
    */
    localScale(scalar: number): void;
    /**
    * Normalizes vector, and returns new vector with result
    * @returns {Vector2} Normalized vector
    */
    normalize(): Vector2;
    /**
    * Normalizes vector, and puts result into itself
    */
    localNormalize(): void;
    /**
     * Returns new vector with same scalars
     */
    clone(): Vector2;
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector2} Absolute vector
     */
    absolute(): Vector2;
    /**
    * Makes all scalars absolute, and puts result into itself
    */
    localAbsolute(): void;
    /**
     * Dot product of two vectors
     * @param vector Vector to project
     * @returns {number} dot product
     */
    dot(vector: Vector2): number;
    /**
     * Projection length of vector projected onto @this
     * @param {Vector2} vector vector to project onto this
     * @returns {number} length of the projection
     */
    projectionLength(vector: Vector2): number;
    /**
     * Returns the length in 2d space of the vector
     * @returns {number} length in 2d space
     */
    realLength(): number;
    /**
    * Returns true if all scalars of vector are matched
    * @param {Vector2} vector Vector to compare
    * @returns {boolean} Boolean
    */
    compare(vector: Vector2): boolean;
    /**
    * Checks if vector is linearly dependent on another vector
    * @param {Vector2} vector Vector to check depedency
    * @returns {boolean} Result of check
    */
    isLinearlyDependent(vector: Vector2): boolean;
    toGenericVector(): Vector;
    /**
     * Expands vector to 3d vector
     * @param {?number} z value to add at end of vector
     * @returns {Vector3} expanded vector
     */
    expand(z?: number): Vector3;
    /** @alias {@link compare} */
    isSame(vector: Vector2): boolean;
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector: Vector2): boolean;
    /** @alias {@link toGenericVector} */
    toGenVec(): Vector;
    /** @alias {@link absolute} */
    abs(): Vector2;
    /** @alias {@link localAbsolute} */
    locAbs(): void;
    /** @alias {@link normalize} */
    norm(): Vector2;
    /** @alias {@link localNormalize} */
    locNorm(): void;
    /** @alias {@link clone} */
    copy(): Vector2;
    /** @alias {@link scale} */
    multiply(scalar: number): Vector2;
    /** @alias {@link scale} */
    mult(scalar: number): Vector2;
    /** @alias {@link localScale} */
    localMultiply(scalar: number): void;
    /** @alias {@link localScale} */
    locMult(scalar: number): void;
}
/** Represents a vector in 3d Space or 3 element Vector */
export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    /**
    * @constructor
    * @param {number?} x first scalar
    * @param {number?} y second scalar
    * @param {number?} z third scalar
    */
    constructor(x?: number, y?: number, z?: number);
    /**
    * Adds two vectors together, and returns new vector
    * @param   {Vector3} vector Vector to be added
    * @returns {Vector3} Sum of vectors
    */
    add(vector: Vector3): Vector3;
    /**
    * Adds vector into existing vector
    * @param {Vector3} vector Vector to be added
    */
    localAdd(vector: Vector3): void;
    /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector3} Vector multiplied by scalar
     */
    scale(scalar: number): Vector3;
    /**
    * Multiplies vector by scalar, and puts result into itself
    * @param {number} scalar
    */
    localScale(scalar: number): void;
    /**
    * Normalizes vector, and returns new vector with result
    * @returns {Vector3} Normalized vector
    */
    normalize(): Vector3;
    /**
    * Normalizes vector, and puts result into itself
    */
    localNormalize(): void;
    /**
     * @returns {Vector3} new vector with same scalars
     */
    clone(): Vector3;
    /**
     * Expands a vector to 4d vector
     * @param {?number} w Scalar to add at end of vector, if not defined, will add 0
     * @returns {Vector4} Expanded vector
     */
    expand(w?: number): Vector4;
    /**
     * Shrinks a vector to 2d vector(throws away last scalar)
     * @returns {Vector2} Shrinked vector
     */
    shrink(): Vector2;
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector2} Absolute vector
     */
    absolute(): Vector3;
    /**
    * Makes all scalars absolute, and puts result into itself
    */
    localAbsolute(): void;
    /**
     * Dot product of two vectors
     * @param {Vector3} vector Vector to project
     * @returns {number} dot product
     */
    dot(vector: Vector3): number;
    /**
     * Cross product of two vectors
     * @param {Vector3} vector Vector to project
     * @returns {Vector3} cross product
     */
    cross(vector: Vector3): Vector3;
    /**
     * Projection length of vector projected onto @this
     * @param {Vector2} vector vector to project onto this
     * @returns {number} length of the projection
     */
    projectionLength(vector: Vector3): number;
    /**
     * Returns the length in 2d space of the vector
     * @returns {number} length in 2d space
     */
    realLength(): number;
    /**
    * Returns true if all scalars of vector are matched
    * @param {Vector3} vector Vector to compare
    * @returns {boolean} Boolean
    */
    compare(vector: Vector3): boolean;
    /**
    * Checks if vector is linearly dependent on another vector
    * @param {Vector2} vector Vector to check depedency
    * @returns {boolean} Result of check
    */
    isLinearlyDependent(vector: Vector3): boolean;
    /**
     * Inverts all scalars (1/s)
     * @returns {Vector3} Inverted vector
     */
    invert(): Vector3;
    toGenericVector(): Vector;
    /** @alias {@link compare} */
    isSame(vector: Vector3): boolean;
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector: Vector3): boolean;
    /** @alias {@link toGenericVector} */
    toGenVec(): Vector;
    /** @alias {@link absolute} */
    abs(): Vector3;
    /** @alias {@link localAbsolute} */
    locAbs(): void;
    /** @alias {@link normalize} */
    norm(): Vector3;
    /** @alias {@link localNormalize} */
    locNorm(): void;
    /** @alias {@link clone} */
    copy(): Vector3;
    /** @alias {@link scale} */
    multiply(scalar: number): Vector3;
    /** @alias {@link scale} */
    mult(scalar: number): Vector3;
    /** @alias {@link localScale} */
    localMultiply(scalar: number): void;
    /** @alias {@link localScale} */
    locMult(scalar: number): void;
}
/** Represents a vector in 4d Space or 4 element Vector */
export declare class Vector4 {
    x: number;
    y: number;
    z: number;
    w: number;
    /**
    * @constructor
    * @param {number?} x first scalar
    * @param {number?} y second scalar
    * @param {number?} z third scalar
    * @param {number?} z fourth scalar
    */
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
    * Adds two vectors together, and returns new vector
    * @param   {Vector4} vector Vector to be added
    * @returns {Vector4} Sum of vectors
    */
    add(vector: Vector4): Vector4;
    /**
    * Adds vector into existing vector
    * @param {Vector4} vector Vector to be added
    */
    localAdd(vector: Vector4): void;
    /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector4} Vector multiplied by scalar
     */
    scale(scalar: number): Vector4;
    /**
    * Multiplies vector by scalar, and puts result into itself
    * @param {number} scalar
    */
    localScale(scalar: number): void;
    /**
    * Normalizes vector, and returns new vector with result
    * @returns {Vector4} Normalized vector
    */
    normalize(): Vector4;
    /**
    * Normalizes vector, and puts result into itself
    */
    localNormalize(): void;
    /**
     * @returns {Vector3} new vector with same scalars
     */
    clone(): Vector4;
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector2} Absolute vector
     */
    absolute(): Vector4;
    /**
    * Makes all scalars absolute, and puts result into itself
    */
    localAbsolute(): void;
    /**
     * Dot product of two vectors
     * @param {Vector4} vector Vector to project
     * @returns {number} dot product
     */
    dot(vector: Vector4): number;
    /**
     * Projection length of vector projected onto @this
     * @param {Vector4} vector vector to project onto this
     * @returns {number} length of the projection
     */
    projectionLength(vector: Vector4): number;
    /**
     * Returns the length in 2d space of the vector
     * @returns {number} length in 2d space
     */
    realLength(): number;
    /**
    * Returns true if all scalars of vector are matched
    * @param {Vector4} vector Vector to compare
    * @returns {boolean} Boolean
    */
    compare(vector: Vector4): boolean;
    /**
    * Checks if vector is linearly dependent on another vector
    * @param {Vector2} vector Vector to check depedency
    * @returns {boolean} Result of check
    */
    isLinearlyDependent(vector: Vector4): boolean;
    toGenericVector(): Vector;
    invert(): Vector4;
    /**
    * Shrinks a vector to 3d vector(throws away last scalar)
    * @returns {Vector3} Shrinked vector
    */
    shrink(): Vector3;
    /** @alias {@link compare} */
    isSame(vector: Vector4): boolean;
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector: Vector4): boolean;
    /** @alias {@link toGenericVector} */
    toGenVec(): Vector;
    /** @alias {@link absolute} */
    abs(): Vector4;
    /** @alias {@link localAbsolute} */
    locAbs(): void;
    /** @alias {@link normalize} */
    norm(): Vector4;
    /** @alias {@link localNormalize} */
    locNorm(): void;
    /** @alias {@link clone} */
    copy(): Vector4;
    /** @alias {@link scale} */
    multiply(scalar: number): Vector4;
    /** @alias {@link scale} */
    mult(scalar: number): Vector4;
    /** @alias {@link localScale} */
    localMultiply(scalar: number): void;
    /** @alias {@link localScale} */
    locMult(scalar: number): void;
}
