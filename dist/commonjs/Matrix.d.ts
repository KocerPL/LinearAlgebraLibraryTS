import { Vector, Vector2, Vector3, Vector4 } from "./Vector.js";
/**
 *  Represents Matrix
 *
 */
export declare class Matrix {
    /** Array to hold the matrix values */
    protected storage: Array<number>;
    /** Count of columns in matrix */
    protected columns: number;
    /** Count of rows in matrix */
    protected rows: number;
    /**
     * Represents Matrix
     * @param {number} rowCount count of rows
     * @param {number} columnCount count of columns
     */
    constructor(rowCount: number, columnCount: number);
    /**
     * Returns a scalar in matrix at location x,y
     * @param {number} x Index of column(0-based)
     * @param {number} y Index of row(0-based)
     * @returns {number} Scalar at this location
     */
    get(x: number, y: number): number;
    /**
     * Sets a scalar in matrix at location x,y
     * @param {number} x Index of column(0-based)
     * @param {number} y Index of row(0-based)
     * @param {number} value Scalar to set.
     */
    set(x: number, y: number, value: number): void;
    /**
     * Gets Vector at location x
     * @param {number} x Index of column(0-based)
     * @returns {number} Vector at this column
     */
    getVector(x: number): Vector;
    /**
     * Sets Vector at location x
     * @param {number} x Index of column(0-based)
     * @param {Vector} vector Vector to set.
     */
    setVector(x: number, vector: Vector): void;
    /**
     * Converts matrix to Array
     * @returns {Array<number>} Array
     */
    toArray(): Array<number>;
    /**
   * Converts matrix to 2 dimensional array rows,columns
   * @returns {Array<number>} Array
   */
    to2DArray(): Array<Array<number>>;
    /**
     * Returns all vectors from matrix in form of array
     * @returns {Array<Vector>} Array of vectors
     */
    toVectorArray(): Array<Vector>;
    /**
     * Multiplies this*vector
     * @param {Vector} vector vector to multiply by this matrix
     * @returns {Vector} multiplied vector
     */
    multiplyVector(vector: Vector): Vector;
    /**
     * Multiplies this*matrix
     * @param {Matrix} matrix Matrix to multiply this matrix by
     * @returns {Matrix} New multiplied matrix.
     */
    multiplyMatrix(matrix: Matrix): Matrix;
    /**
     * Multiplies this*matrix and saves result into this
     * @param {Matrix} matrix Matrix to multiply this matrix by
     */
    localMultiply(matrix: Matrix): void;
    /**
     *
     * Multiplies this*matrix
     * @param {Matrix} matvec Matrix to multiply this matrix by
     * @returns {Matrix} New multiplied matrix.
     *
     * @also
     *
     * Multiplies this*vector
     * @param {Vector} matvec vector to multiply by this matrix
     * @returns {Vector} multiplied vector
     */
    multiply(matvec: Matrix | Vector): Matrix | Vector;
    /** @alias {@link multiplyVec} */
    multVec(vector: Vector): Vector;
    /** @alias {@link multiplyMatrix} */
    multMat(matrix: Matrix): Matrix;
    /** @alias {@link multiply} */
    mult(matvec: Vector | Matrix): Vector | Matrix;
    /** @alias {@link localMultiply} */
    locMult(matrix: Matrix): void;
    /**
     * Creates a matrix with custom scalars
     * @param {number} rowCount number of rows
     * @param columnCount number of columns
     * @param {...number} scalars scalars to be placen in matrix
     * @returns new Matrix with this scalars
     */
    static CustomMatrix(rowCount: number, columnCount: number, ...scalars: Array<number>): Matrix;
    /**
     * Converts matrix to square matrix IF it has same column count == row count
     * @returns {SquareMatrix} SquareMatrix
     */
    toSquareMatrix(): SquareMatrix;
    /**
     * Returns independent copy of this matrix
     * @returns {Matrix} new Matrix
     */
    copy(): Matrix;
    /**
     * Nicely show matrix in text;
     */
    toText(): string;
    /**
     * Logs matrix into console
     */
    log(): void;
}
export declare class SquareMatrix extends Matrix {
    /**
     * Creates a same count of row and columns Matrix
     * @param size Count of rows and columns
     */
    constructor(size: number);
    /**
     * Creates identity matrix
     * @param size Size of matrix
     * @returns {SquareMatrix} New identity square matrix
     */
    static identity(size: number): SquareMatrix;
    /**
     * Finds determinant using Laplace expansion.
     * @returns {number} determinant
     */
    get determinant(): number;
    /**
     * Transposes a matrix
     * @returns {SquareMatrix} Transposed SquareMatrix
     */
    transpose(): SquareMatrix;
    /**
     * Calculates minor matrix
     * @returns {SquareMatrix}
     */
    getMinor(): SquareMatrix;
    /**
    * Calculates cofactor matrix
    * @returns {SquareMatrix}
    */
    getCofactor(): SquareMatrix;
    /**
     * Caculates adjoint of matrix
     * @returns {SquareMatrix}
     */
    getAdjoint(): SquareMatrix;
    /**
     * Calculates inverse of matrix
     * @returns {SquareMatrix}
     */
    getInverse(): SquareMatrix;
    /**
     * Compares 2 same size matrices
     * @param {SquareMatrix} matrix Matrix to compare
     * @returns {boolean}
     */
    compare(matrix: SquareMatrix): boolean;
    /**
    * Creates a matrix with custom scalars
    * @param {number} rowCount number of rows
    * @param columnCount number of columns
    * @param {...number} scalars scalars to be placen in matrix
    * @returns new Matrix with this scalars
    */
    static CustomMatrix(size: number, ...scalars: Array<number>): SquareMatrix;
    /**
   * Returns independent copy of this SquareMatrix
   * @returns {SquareMatrix} new SquareMatrix
   */
    copy(): Matrix;
}
declare abstract class SMatrix {
    abstract get determinant(): number;
    abstract transpose(): SMatrix;
    abstract getMinor(): SMatrix;
    abstract getCofactor(): SMatrix;
    abstract getAdjoint(): SMatrix;
    abstract getInverse(): SMatrix;
    abstract multiplyVector(vector: any): any;
    abstract multiplyMatrix(matrix: any): any;
    abstract multiply(matvec: any): any;
    abstract localMultiply(matrix: SMatrix): void;
    abstract toArray(): Array<number>;
    abstract to2DArray(): Array<Array<number>>;
    abstract toVectorArray(): Array<any>;
    abstract toGeneric(): SquareMatrix;
    abstract log(): void;
    abstract toString(): string;
    abstract multVec(vector: any): any;
    /** @alias {@link multiplyMatrix} */
    multMat(matrix: SMatrix): SMatrix;
    /** @alias {@link multiply} */
    mult(matvec: any): any;
    /** @alias {@link localMultiply} */
    locMult(matrix: SMatrix): void;
}
export declare class SMatrix2 implements SMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    constructor();
    get determinant(): number;
    /**
     * Transposes a copy of this matrix
     * @returns {SMatrix2} transposed matrix
     */
    transpose(): SMatrix2;
    /**
     * Calculates a minor of this matrix;
     * @returns {SMatrix2} minor matrix
     */
    getMinor(): SMatrix2;
    /**
     * Calculates a cofactor matrix of this matrix;
     * @returns {SMatrix2} cofactor matrix
     */
    getCofactor(): SMatrix2;
    /**
     * Calculates a adjoint matrix of this matrix;
     * @returns {SMatrix2} adjoint matrix
     */
    getAdjoint(): SMatrix2;
    /**
     * Calculates inverse matrix of this matrix
     * @returns {SMatrix2} Inverse matrix
     */
    getInverse(): SMatrix2;
    /**
     * @returns {Vector2} i vector in matrix
     */
    getIVector(): Vector2;
    /**
    * @returns {Vector2} J vector in matrix
    */
    getJVector(): Vector2;
    /**
   * Converts matrix to Array
   * @returns {Array<number>} Array
   */
    toArray(): Array<number>;
    /**
   * Converts matrix to Array
   * @returns {Array<Array<number>>} Array
   */
    to2DArray(): Array<Array<number>>;
    /**
   * Converts matrix to vector array
   * @returns {Array<Vector2>} array
   */
    toVectorArray(): Array<Vector2>;
    /**
     * Multiplies matrix*vector
     * @param {Vector2} vector Vector to multiply by
     * @returns {Vector2} product of multiplacation matrix*vector
     */
    multiplyVector(vector: Vector2): Vector2;
    /**
     * Multiplies this*matrix
     * @param {SMatrix2} matrix Matrix to multiply by
     * @returns {SMatrix2} product of this*matrix multiplication
     */
    multiplyMatrix(matrix: SMatrix2): SMatrix2;
    /**
   *
   * Multiplies this*matrix
   * @param {SMatrix2} matvec Matrix to multiply this matrix by
   * @returns {SMatrix2} New multiplied matrix.
   *
   * @also
   *
   * Multiplies this*vector
   * @param {Vector2} matvec vector to multiply by this matrix
   * @returns {Vector2} multiplied vector
   */
    multiply(matvec: SMatrix2 | Vector2): SMatrix2 | Vector2;
    /**
     * Multiplies this*matrix and saves into matrix
     * @param {SMatrix2} matrix Matrix to multiply by
     */
    localMultiply(matrix: SMatrix2): void;
    /** @alias {@link multiplyVec} */
    multVec(vector: Vector2): Vector2;
    /** @alias {@link multiplyMatrix} */
    multMat(matrix: SMatrix2): SMatrix2;
    /** @alias {@link multiply} */
    mult(matvec: Vector2 | SMatrix2): Vector2 | SMatrix2;
    /** @alias {@link localMultiply} */
    locMult(matrix: SMatrix2): void;
    static Identity(): SMatrix2;
    static Custom(a: number, b: number, c: number, d: number): SMatrix2;
    toGeneric(): SquareMatrix;
    toString(): string;
    log(): void;
}
export declare class SMatrix3 implements SMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: number;
    h: number;
    i: number;
    constructor();
    get determinant(): number;
    /**
     * Transposes a copy of this matrix
     * @returns {SMatrix3} transposed matrix
     */
    transpose(): SMatrix3;
    /**
     * Calculates a minor of this matrix;
     * @returns {SMatrix2} minor matrix
     */
    getMinor(): SMatrix3;
    /**
     * Calculates a cofactor matrix of this matrix;
     * @returns {SMatrix3} cofactor matrix
     */
    getCofactor(): SMatrix3;
    /**
     * Calculates a adjoint matrix of this matrix;
     * @returns {SMatrix3} adjoint matrix
     */
    getAdjoint(): SMatrix3;
    /**
     * Calculates inverse matrix of this matrix
     * @returns {SMatrix3} Inverse matrix
     */
    getInverse(): SMatrix3;
    /**
     * @returns {Vector3} i vector in matrix
     */
    getIVector(): Vector3;
    /**
    * @returns {Vector3} j vector in matrix
    */
    getJVector(): Vector3;
    /**
   * @returns {Vector3} k vector in matrix
   */
    getKVector(): Vector3;
    /**
   * Converts matrix to Array
   * @returns {Array<number>} Array
   */
    toArray(): Array<number>;
    /**
   * Converts matrix to Array
   * @returns {Array<Array<number>>} Array
   */
    to2DArray(): Array<Array<number>>;
    /**
   * Converts matrix to vector array
   * @returns {Array<Vector3>} array
   */
    toVectorArray(): Array<Vector3>;
    /**
     * Multiplies matrix*vector
     * @param {Vector2} vector Vector to multiply by
     * @returns {Vector2} product of multiplacation matrix*vector
     */
    multiplyVector(vector: Vector3): Vector3;
    /**
     * Multiplies this*matrix
     * @param {SMatrix3} matrix Matrix to multiply by
     * @returns {SMatrix3} product of this*matrix multiplication
     */
    multiplyMatrix(matrix: SMatrix3): SMatrix3;
    /**
   *
   * Multiplies this*matrix
   * @param {SMatrix3} matvec Matrix to multiply this matrix by
   * @returns {SMatrix3} New multiplied matrix.
   *
   * @also
   *
   * Multiplies this*vector
   * @param {Vector3} matvec vector to multiply by this matrix
   * @returns {Vector3} multiplied vector
   */
    multiply(matvec: SMatrix3 | Vector3): SMatrix3 | Vector3;
    /**
     * Multiplies this*matrix and saves into matrix
     * @param {SMatrix3} matrix Matrix to multiply by
     */
    localMultiply(matrix: SMatrix3): void;
    /**
     * Rotates this matrix and returns result
     * @param {number} angle Angle to rotate space by in radians
     * @returns {SMatrix3} Rotated matrix
     */
    rotate(angle: number): SMatrix3;
    /**
   * Scales this matrix and returns result
   * @param {Vector2} scaler Angle to rotate space by in radians
   * @returns {SMatrix3} Rotated matrix
   */
    scale(scaler: Vector2): SMatrix3;
    /**
    * Translates this matrix and returns result
    * @param {Vector2} pos Position to translate space
    * @returns {SMatrix3} Translated matrix
    */
    translate(pos: Vector2): SMatrix3;
    toString(): string;
    log(): void;
    /** @alias {@link multiplyVec} */
    multVec(vector: Vector3): Vector3;
    /** @alias {@link multiplyMatrix} */
    multMat(matrix: SMatrix3): SMatrix3;
    /** @alias {@link multiply} */
    mult(matvec: Vector3 | SMatrix3): Vector3 | SMatrix3;
    /** @alias {@link localMultiply} */
    locMult(matrix: SMatrix3): void;
    static Identity(): SMatrix3;
    static Custom(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): SMatrix3;
    /**
     * Rotates space in 2d
     * @param angle Angle in radians
     * @returns {SMatrix3} Rotate matrix
     */
    static Rotate(angle: number): SMatrix3;
    /**
     * Scales space in 2d
     * @param {Vector2} scaler
     * @returns {SMatrix3} Scale matrix
     */
    static Scale(scaler: Vector2): SMatrix3;
    /**
     * Translates space in 2d
     * @param pos Position to translate by
     * @returns {SMatrix3} Translation matrix
     */
    static Translate(pos: Vector2): SMatrix3;
    toGeneric(): SquareMatrix;
}
export declare class SMatrix4 implements SMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: number;
    h: number;
    i: number;
    j: number;
    k: number;
    l: number;
    m: number;
    n: number;
    o: number;
    p: number;
    constructor();
    get determinant(): number;
    /**
     * Transposes a copy of this matrix
     * @returns {SMatrix4} transposed matrix
     */
    transpose(): SMatrix4;
    /**
     * Calculates a minor of this matrix;
     * @returns {SMatrix4} minor matrix
     */
    getMinor(): SMatrix4;
    /**
     * Calculates a cofactor matrix of this matrix;
     * @returns {SMatrix4} cofactor matrix
     */
    getCofactor(): SMatrix4;
    /**
     * Calculates a adjoint matrix of this matrix;
     * @returns {SMatrix4} adjoint matrix
     */
    getAdjoint(): SMatrix4;
    /**
     * Calculates inverse matrix of this matrix
     * @returns {SMatrix4} Inverse matrix
     */
    getInverse(): SMatrix4;
    /**
     * @returns {Vector4} i vector in matrix
     */
    getIVector(): Vector4;
    /**
    * @returns {Vector4} j vector in matrix
    */
    getJVector(): Vector4;
    /**
   * @returns {Vector4} k vector in matrix
   */
    getKVector(): Vector4;
    /**
 * @returns {Vector4} l vector in matrix
 */
    getLVector(): Vector4;
    /**
   * Converts matrix to Array
   * @returns {Array<number>} Array
   */
    toArray(): Array<number>;
    /**
   * Converts matrix to Array
   * @returns {Array<Array<number>>} Array
   */
    to2DArray(): Array<Array<number>>;
    /**
   * Converts matrix to vector array
   * @returns {Array<Vector4>} array
   */
    toVectorArray(): Array<Vector4>;
    /**
     * Multiplies matrix*vector
     * @param {Vector4} vector Vector to multiply by
     * @returns {Vector4} product of multiplacation matrix*vector
     */
    multiplyVector(vector: Vector4): Vector4;
    /**
     * Multiplies this*matrix
     * @param {SMatrix4} matrix Matrix to multiply by
     * @returns {SMatrix3} product of this*matrix multiplication
     */
    multiplyMatrix(matrix: SMatrix4): SMatrix4;
    /**
   *
   * Multiplies this*matrix
   * @param {SMatrix4} matvec Matrix to multiply this matrix by
   * @returns {SMatrix4} New multiplied matrix.
   *
   * @also
   *
   * Multiplies this*vector
   * @param {Vector4} matvec vector to multiply by this matrix
   * @returns {Vector4} multiplied vector
   */
    multiply(matvec: SMatrix4 | Vector4): SMatrix4 | Vector4;
    /**
     * Multiplies this*matrix and saves into matrix
     * @param {SMatrix4} matrix Matrix to multiply by
     */
    localMultiply(matrix: SMatrix4): void;
    /**
     * Multiplies new Rotate matrix with this and returns result
     * @param {Vector3|Vector4} angles Angles to rotate by
     * @returns {SMatrix4} Rotated matrix
     */
    rotate(angles: Vector3 | Vector4): SMatrix4;
    /**
   * Multiplies this with new RotateX matrix and returns result
   * @param {number} angle Angles to rotate by on x axis
   * @returns {SMatrix4} Rotated matrix
   */
    rotateX(angle: number): SMatrix4;
    /**
* Multiplies this with new RotateY matrix and returns result
* @param {number} angle Angles to rotate by on y axis
* @returns {SMatrix4} Rotated matrix
*/
    rotateY(angle: number): SMatrix4;
    /**
* Multiplies this with new RotateZ matrix and returns result
* @param {number} angle Angles to rotate by on z axis
* @returns {SMatrix4} Rotated matrix
*/
    rotateZ(angle: number): SMatrix4;
    /**
     * Translates matrix
     * @param {Vector3|Vector4} pos Position to translate by
     */
    translate(pos: Vector3 | Vector4): SMatrix4;
    /**
     * Scales this matrix
     * @param {Vector3|Vector4} pos Scale to scale in all axis
     */
    scale(pos: Vector3 | Vector4): SMatrix4;
    /**
    * Multiplies new Rotate matrix with this and stores result in this
    * @param {Vector3|Vector4} angles Angles to rotate by
    */
    localRotate(angles: Vector3 | Vector4): void;
    toGeneric(): SquareMatrix;
    toString(): string;
    log(): void;
    /** @alias {@link multiplyVec} */
    multVec(vector: Vector4): Vector4;
    /** @alias {@link multiplyMatrix} */
    multMat(matrix: SMatrix4): SMatrix4;
    /** @alias {@link multiply} */
    mult(matvec: Vector4 | SMatrix4): Vector4 | SMatrix4;
    /** @alias {@link localMultiply} */
    locMult(matrix: SMatrix4): void;
    static Identity(): SMatrix4;
    static Custom(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number): SMatrix4;
    /**
     * Calculates perspective projection matrix
     * @param aspect Aspect ratio of screen space(height/width)
     * @param fov Field of view angle (In radians!!!)
     * @param near Near plane
     * @param far Far plane
     */
    static PerspectiveProjection(aspect: number, fov: number, near: number, far: number): SMatrix4;
    /**
     * Changes the roll, or rotates in x
     * @param {number} angle Angle to rotate by in radians
     * @returns {SMatrix4}
     */
    static RotateX(angle: number): SMatrix4;
    /**
    * Changes the pitch, or rotates in y
    * @param {number} angle Angle to rotate by in radians
    * @returns {SMatrix4}
    */
    static RotateY(angle: number): SMatrix4;
    /**
   * Changes the yaw, or rotates in z
   * @param {number} angle Angle to rotate by in radians
   * @returns {SMatrix4}
   */
    static RotateZ(angle: number): SMatrix4;
    /**
     * Rotates in 3d
     * @param {Vector3|Vector4} angles Angles of rotation in radians
     * @returns {SMatrix4} Matrix
     */
    static Rotate(angles: Vector3 | Vector4): SMatrix4;
    /**
     * Translates Matrix by Vector
     * @param {Vector3|Vector4} pos Position to translate matrix by
     * @returns {SMatrix4} Translation matrix
     */
    static Translate(pos: Vector3 | Vector4): SMatrix4;
    /**
     * Scales Matrix by Vector
     * @param {Vector3|Vector4} scaler Position to translate matrix by
     * @returns {SMatrix4} Translation matrix
     */
    static Scale(scaler: Vector3 | Vector4): SMatrix4;
    /**
     * Creates view matrix
     * @param pos Position to translate by
     * @param rotation Rotation to rotate matrix in radians
     * @param scale Scale to scale
     * @returns {SMatrix4} View Matrix
     */
    static View(pos: Vector3 | Vector4, rotation: Vector3 | Vector4, scale: Vector3 | Vector4): SMatrix4;
    static Transform(pos: Vector3, rotation: Vector3, scale: Vector3): SMatrix4;
}
export {};
