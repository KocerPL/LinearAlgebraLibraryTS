import { Vector, Vector2, Vector3, Vector4 } from "./Vector.js";
//Contains: TODO: Matrix, SquareMatrix(short SMatrix), SMatrix2, SMatrix3, SMatrix4
/**
 *  Represents Matrix
 *
 */
export class Matrix {
    /** Array to hold the matrix values */
    storage;
    /** Count of columns in matrix */
    columns;
    /** Count of rows in matrix */
    rows;
    /**
     * Represents Matrix
     * @param {number} rowCount count of rows
     * @param {number} columnCount count of columns
     */
    constructor(rowCount, columnCount) {
        let arr = new Array(rowCount * columnCount);
        for (let i = 0; i < rowCount * columnCount; i++)
            arr[i] = 0;
        this.storage = Object.seal(arr);
        this.columns = columnCount;
        this.rows = rowCount;
    }
    /**
     * Returns a scalar in matrix at location x,y
     * @param {number} x Index of column(0-based)
     * @param {number} y Index of row(0-based)
     * @returns {number} Scalar at this location
     */
    get(x, y) {
        if (x >= this.columns || y >= this.rows || x < 0 || y < 0)
            throw new Error("X or Y argument exceeds Matrix bounds.");
        return this.storage[x + (y * this.columns)];
    }
    /**
     * Sets a scalar in matrix at location x,y
     * @param {number} x Index of column(0-based)
     * @param {number} y Index of row(0-based)
     * @param {number} value Scalar to set.
     */
    set(x, y, value) {
        if (x >= this.columns || y >= this.rows || x < 0 || y < 0)
            throw new Error("X or Y argument exceeds Matrix bounds.");
        this.storage[x + (y * this.columns)] = value;
    }
    /**
     * Gets Vector at location x
     * @param {number} x Index of column(0-based)
     * @returns {number} Vector at this column
     */
    getVector(x) {
        if (x >= this.columns || x < 0)
            throw new Error("X argument exceeds bounds of matrix.");
        let out = new Vector(this.rows);
        for (let i = 0; i < this.rows; i++)
            out[i] = this.storage[x + (i * this.columns)];
        return out;
    }
    /**
     * Sets Vector at location x
     * @param {number} x Index of column(0-based)
     * @param {Vector} vector Vector to set.
     */
    setVector(x, vector) {
        if (vector.length != this.rows)
            throw new Error("Cannot set a vector that has different length than the count of rows in Matrix.");
        if (x >= this.columns || x < 0)
            throw new Error("X argument exceeds bounds of matrix.");
        for (let i = 0; i < this.rows; i++)
            this.storage[x + (i * this.columns)] = vector[i];
    }
    /**
     * Converts matrix to Array
     * @returns {Array<number>} Array
     */
    toArray() {
        return new Array(...this.storage);
    }
    /**
   * Converts matrix to 2 dimensional array rows,columns
   * @returns {Array<number>} Array
   */
    to2DArray() {
        let out = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            out[i] = new Array(this.columns);
            for (let j = 0; j < this.columns; j++)
                out[i][j] = this.get(j, i);
        }
        return out;
    }
    /**
     * Returns all vectors from matrix in form of array
     * @returns {Array<Vector>} Array of vectors
     */
    toVectorArray() {
        let out = new Array(this.columns);
        for (let x = 0; x < this.columns; x++)
            out[x] = this.getVector(x);
        return out;
    }
    /**
     * Multiplies this*vector
     * @param {Vector} vector vector to multiply by this matrix
     * @returns {Vector} multiplied vector
     */
    multiplyVector(vector) {
        if (vector.length != this.columns)
            throw new Error("Cannot multiply vector that has different length than the count of columns in Matrix.");
        let out = new Vector(this.rows);
        for (let i = 0; i < this.rows; i++)
            out[i] = 0;
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.columns; i++)
                out[j] += vector[i] * this.get(i, j);
        }
        return out;
    }
    /**
     * Multiplies this*matrix
     * @param {Matrix} matrix Matrix to multiply this matrix by
     * @returns {Matrix} New multiplied matrix.
     */
    multiplyMatrix(matrix) {
        if (matrix.columns != this.rows)
            throw new Error("Cannot multiply two matrices if count of columns in second matrix is different than count of rows in first");
        let out = new Matrix(this.rows, this.columns);
        for (let i = 0; i < matrix.columns; i++) {
            out.setVector(i, this.multVec(matrix.getVector(i)));
        }
        return out;
    }
    /**
     * Multiplies this*matrix and saves result into this
     * @param {Matrix} matrix Matrix to multiply this matrix by
     */
    localMultiply(matrix) {
        if (matrix.columns != this.rows)
            throw new Error("Cannot multiply two matrices if count of columns in second matrix is different than count of rows in first");
        let out = new Matrix(this.rows, this.columns);
        for (let i = 0; i < matrix.columns; i++) {
            out.setVector(i, this.multVec(matrix.getVector(i)));
        }
        this.storage = out.storage;
    }
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
    multiply(matvec) {
        if (matvec instanceof Matrix)
            return this.multiplyMatrix(matvec);
        else
            return this.multVec(matvec);
    }
    //
    //Alliasses
    //
    /** @alias {@link multiplyVec} */
    multVec(vector) { return this.multiplyVector(vector); }
    /** @alias {@link multiplyMatrix} */
    multMat(matrix) { return this.multiplyMatrix(matrix); }
    /** @alias {@link multiply} */
    mult(matvec) { return this.multiply(matvec); }
    /** @alias {@link localMultiply} */
    locMult(matrix) { this.localMultiply(matrix); }
    /**
     * Creates a matrix with custom scalars
     * @param {number} rowCount number of rows
     * @param columnCount number of columns
     * @param {...number} scalars scalars to be placen in matrix
     * @returns new Matrix with this scalars
     */
    static CustomMatrix(rowCount, columnCount, ...scalars) {
        if (scalars.length < (rowCount * columnCount))
            throw new Error("Invalid count of scalars to create matrix");
        let mat = new Matrix(rowCount, columnCount);
        mat.storage = scalars;
        return mat;
    }
    /**
     * Converts matrix to square matrix IF it has same column count == row count
     * @returns {SquareMatrix} SquareMatrix
     */
    toSquareMatrix() {
        if (this.columns != this.rows)
            throw new Error("Cannot convert a matrix with different count of columns and rows into SquareMatrix");
        let sqrMat = new SquareMatrix(this.columns);
        sqrMat.storage = new Array(...this.storage);
        return sqrMat;
    }
    /**
     * Returns independent copy of this matrix
     * @returns {Matrix} new Matrix
     */
    copy() {
        let mat = new Matrix(this.rows, this.columns);
        mat.storage = new Array(...this.storage);
        return mat;
    }
    /**
     * Nicely show matrix in text;
     */
    toText() {
        let text = "";
        for (let j = 0; j < this.rows; j++) {
            for (let k = 0; k < this.columns; k++)
                text += "---";
            text += "\n";
            for (let i = 0; i < this.columns; i++)
                text += "|" + this.get(i, j) + "|";
            text += "\n";
        }
        for (let k = 0; k < this.columns; k++)
            text += "---";
        return text;
    }
    /**
     * Logs matrix into console
     */
    log() {
        console.log(this.toText());
    }
}
export class SquareMatrix extends Matrix {
    /**
     * Creates a same count of row and columns Matrix
     * @param size Count of rows and columns
     */
    constructor(size) {
        super(size, size);
    }
    /**
     * Creates identity matrix
     * @param size Size of matrix
     * @returns {SquareMatrix} New identity square matrix
     */
    static identity(size) {
        let mat = new SquareMatrix(size);
        for (let i = 0; i < size; i++)
            mat.set(i, i, 1);
        return mat;
    }
    /**
     * Finds determinant using Laplace expansion.
     * @returns {number} determinant
     */
    get determinant() {
        if (this.columns != this.rows)
            throw new Error("Couldnt find determinant in non square matrix.");
        if (this.columns == 1)
            return this.storage[0];
        if (this.columns == 2) {
            return (this.storage[0] * this.storage[3]) - (this.storage[1] * this.storage[2]);
        }
        let scalar = 1;
        let sum = 0;
        for (let i = 0; i < this.columns; i++) {
            let mat = new SquareMatrix(this.columns - 1);
            let ind = 0;
            for (let k = 0; k < this.columns; k++) {
                if (k == i)
                    continue;
                for (let l = 0; l < this.rows - 1; l++) {
                    mat.set(ind, l, this.get(k, l + 1));
                }
                ind++;
            }
            sum += scalar * this.get(i, 0) * mat.determinant;
            scalar *= -1;
        }
        return sum;
    }
    /**
     * Transposes a matrix
     * @returns {SquareMatrix} Transposed SquareMatrix
     */
    transpose() {
        let out = new SquareMatrix(this.columns);
        for (let i = 0; i < this.columns; i++)
            for (let j = 0; j < this.rows; j++) {
                out.set(i, j, this.get(j, i));
            }
        return out;
    }
    /**
     * Calculates minor matrix
     * @returns {SquareMatrix}
     */
    getMinor() {
        let out = new SquareMatrix(this.columns);
        for (let i = 0; i < this.columns; i++)
            for (let j = 0; j < this.columns; j++) {
                let scalars = new Array();
                for (let k = 0; k < this.columns; k++)
                    for (let l = 0; l < this.columns; l++) {
                        if (i == k || j == l)
                            continue;
                        scalars.push(this.get(l, k));
                    }
                let dMat = SquareMatrix.CustomMatrix(this.columns - 1, ...scalars);
                out.set(j, i, dMat.determinant);
            }
        return out;
    }
    /**
    * Calculates cofactor matrix
    * @returns {SquareMatrix}
    */
    getCofactor() {
        let out = new SquareMatrix(this.columns);
        let min = this.getMinor();
        for (let i = 0; i < this.columns; i++)
            for (let j = 0; j < this.columns; j++) {
                out.set(i, j, min.get(i, j) * ((i + j) % 2 == 0 ? 1 : -1));
            }
        return out;
    }
    /**
     * Caculates adjoint of matrix
     * @returns {SquareMatrix}
     */
    getAdjoint() {
        return this.getCofactor().transpose();
    }
    /**
     * Calculates inverse of matrix
     * @returns {SquareMatrix}
     */
    getInverse() {
        let adj = this.getAdjoint();
        let det = this.determinant;
        if (det == 0)
            throw new Error("There exist infinity of solutions in matrix with determinant equalling 0");
        for (let i = 0; i < this.columns; i++)
            for (let j = 0; j < this.columns; j++)
                adj.set(i, j, adj.get(i, j) / det);
        return adj;
    }
    /**
     * Compares 2 same size matrices
     * @param {SquareMatrix} matrix Matrix to compare
     * @returns {boolean}
     */
    compare(matrix) {
        if (matrix.columns != this.columns)
            throw new Error("Cannot compare two different matrices!");
        for (let i = 0; i < this.storage.length; i++)
            if (this.storage[i] != matrix.storage[i])
                return false;
        return true;
    }
    /**
    * Creates a matrix with custom scalars
    * @param {number} rowCount number of rows
    * @param columnCount number of columns
    * @param {...number} scalars scalars to be placen in matrix
    * @returns new Matrix with this scalars
    */
    static CustomMatrix(size, ...scalars) {
        if (scalars.length != (size ** 2))
            throw new Error("Invalid count of scalars to create matrix");
        let mat = new SquareMatrix(size);
        mat.storage = scalars;
        return mat;
    }
    /**
   * Returns independent copy of this SquareMatrix
   * @returns {SquareMatrix} new SquareMatrix
   */
    copy() {
        let mat = new SquareMatrix(this.rows);
        mat.storage = new Array(...this.storage);
        return mat;
    }
}
class SMatrix {
    /** @alias {@link multiplyMatrix} */
    multMat(matrix) { return this.multiplyMatrix(matrix); }
    ;
    /** @alias {@link multiply} */
    mult(matvec) { return this.multiply(matvec); }
    ;
    /** @alias {@link localMultiply} */
    locMult(matrix) { this.localMultiply(matrix); }
}
export class SMatrix2 {
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    constructor() {
    }
    get determinant() {
        return (this.a * this.d) - (this.b * this.c);
    }
    /**
     * Transposes a copy of this matrix
     * @returns {SMatrix2} transposed matrix
     */
    transpose() {
        let out = new SMatrix2();
        out.a = this.a;
        out.b = this.c;
        out.c = this.b;
        out.d = this.d;
        return out;
    }
    /**
     * Calculates a minor of this matrix;
     * @returns {SMatrix2} minor matrix
     */
    getMinor() {
        let out = new SMatrix2();
        out.a = this.d;
        out.b = this.c;
        out.c = this.b;
        out.d = this.a;
        return out;
    }
    /**
     * Calculates a cofactor matrix of this matrix;
     * @returns {SMatrix2} cofactor matrix
     */
    getCofactor() {
        let out = new SMatrix2();
        out.a = this.d;
        out.b = -this.c;
        out.c = -this.b;
        out.d = this.a;
        return out;
    }
    /**
     * Calculates a adjoint matrix of this matrix;
     * @returns {SMatrix2} adjoint matrix
     */
    getAdjoint() {
        let out = new SMatrix2();
        out.a = this.d;
        out.b = -this.b;
        out.c = -this.c;
        out.d = this.a;
        return out;
    }
    /**
     * Calculates inverse matrix of this matrix
     * @returns {SMatrix2} Inverse matrix
     */
    getInverse() {
        let out = new SMatrix2();
        let det = this.determinant;
        out.a = this.d / det;
        out.b = -this.b / det;
        out.c = -this.c / det;
        out.d = this.a / det;
        return out;
    }
    /**
     * @returns {Vector2} i vector in matrix
     */
    getIVector() {
        return new Vector2(this.a, this.c);
    }
    /**
    * @returns {Vector2} J vector in matrix
    */
    getJVector() {
        return new Vector2(this.b, this.d);
    }
    /**
   * Converts matrix to Array
   * @returns {Array<number>} Array
   */
    toArray() {
        return [this.a, this.b, this.c, this.d];
    }
    /**
   * Converts matrix to Array
   * @returns {Array<Array<number>>} Array
   */
    to2DArray() {
        return [[this.a, this.b], [this.c, this.d]];
    }
    /**
   * Converts matrix to vector array
   * @returns {Array<Vector2>} array
   */
    toVectorArray() {
        return [new Vector2(this.a, this.c), new Vector2(this.b, this.d)];
    }
    /**
     * Multiplies matrix*vector
     * @param {Vector2} vector Vector to multiply by
     * @returns {Vector2} product of multiplacation matrix*vector
     */
    multiplyVector(vector) {
        return new Vector2((vector.x * this.a) + (vector.y * this.b), (vector.x * this.c) + (vector.y * this.d));
    }
    /**
     * Multiplies this*matrix
     * @param {SMatrix2} matrix Matrix to multiply by
     * @returns {SMatrix2} product of this*matrix multiplication
     */
    multiplyMatrix(matrix) {
        let out = new SMatrix2();
        out.a = (matrix.a * this.a) + (matrix.c * this.b);
        out.b = (matrix.b * this.a) + (matrix.d * this.b);
        out.c = (matrix.a * this.c) + (matrix.c * this.d);
        out.d = (matrix.b * this.c) + (matrix.d * this.d);
        return out;
    }
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
    multiply(matvec) {
        if (matvec instanceof SMatrix2)
            return this.multiplyMatrix(matvec);
        else
            return this.multVec(matvec);
    }
    /**
     * Multiplies this*matrix and saves into matrix
     * @param {SMatrix2} matrix Matrix to multiply by
     */
    localMultiply(matrix) {
        let a = (matrix.a * this.a) + (matrix.c * this.b);
        let b = (matrix.b * this.a) + (matrix.d * this.b);
        let c = (matrix.a * this.c) + (matrix.c * this.d);
        let d = (matrix.b * this.c) + (matrix.d * this.d);
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    //
    //Alliasses
    //
    /** @alias {@link multiplyVec} */
    multVec(vector) { return this.multiplyVector(vector); }
    /** @alias {@link multiplyMatrix} */
    multMat(matrix) { return this.multiplyMatrix(matrix); }
    /** @alias {@link multiply} */
    mult(matvec) { return this.multiply(matvec); }
    /** @alias {@link localMultiply} */
    locMult(matrix) { this.localMultiply(matrix); }
    static Identity() {
        let out = new SMatrix2();
        out.a = 1;
        out.d = 1;
        return out;
    }
    static Custom(a, b, c, d) {
        let out = new SMatrix2();
        out.a = a;
        out.b = b;
        out.c = c;
        out.d = d;
        return out;
    }
    toGeneric() {
        return SquareMatrix.CustomMatrix(2, this.a, this.b, this.c, this.d);
    }
    toString() {
        let str = "=====\n";
        str += "|" + this.a + "|" + this.b + "|\n";
        str += "=====\n";
        str += "|" + this.c + "|" + this.d + "|\n";
        str += "=====\n";
        return str;
    }
    log() {
        console.log(this.toString());
    }
}
export class SMatrix3 {
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    e = 0;
    f = 0;
    g = 0;
    h = 0;
    i = 0;
    constructor() {
    }
    get determinant() {
        return (this.a * ((this.e * this.i) - (this.f * this.h))) - (this.b * ((this.d * this.i) - (this.g * this.f))) + (this.c * ((this.d * this.h) - (this.e * this.g)));
    }
    /**
     * Transposes a copy of this matrix
     * @returns {SMatrix3} transposed matrix
     */
    transpose() {
        let out = new SMatrix3();
        out.a = this.a;
        out.b = this.d;
        out.c = this.g;
        out.d = this.b;
        out.e = this.e;
        out.f = this.h;
        out.g = this.c;
        out.h = this.f;
        out.i = this.i;
        return out;
    }
    /**
     * Calculates a minor of this matrix;
     * @returns {SMatrix2} minor matrix
     */
    getMinor() {
        let out = new SMatrix3();
        out.a = (this.e * this.i) - (this.h * this.f);
        out.b = (this.d * this.i) - (this.g * this.f);
        out.c = (this.d * this.h) - (this.g * this.e);
        out.d = (this.b * this.i) - (this.h * this.c);
        out.e = (this.a * this.i) - (this.g * this.c);
        out.f = (this.a * this.h) - (this.b * this.g);
        out.g = (this.b * this.f) - (this.e * this.c);
        out.h = (this.a * this.f) - (this.d * this.c);
        out.i = (this.a * this.e) - (this.d * this.b);
        return out;
    }
    /**
     * Calculates a cofactor matrix of this matrix;
     * @returns {SMatrix3} cofactor matrix
     */
    getCofactor() {
        let out = new SMatrix3();
        out.a = (this.e * this.i) - (this.h * this.f);
        out.b = -((this.d * this.i) - (this.g * this.f));
        out.c = (this.d * this.h) - (this.g * this.e);
        out.d = -((this.b * this.i) - (this.h * this.c));
        out.e = (this.a * this.i) - (this.g * this.c);
        out.f = -((this.a * this.h) - (this.b * this.g));
        out.g = (this.b * this.f) - (this.e * this.c);
        out.h = -((this.a * this.f) - (this.d * this.c));
        out.i = (this.a * this.e) - (this.d * this.b);
        return out;
    }
    /**
     * Calculates a adjoint matrix of this matrix;
     * @returns {SMatrix3} adjoint matrix
     */
    getAdjoint() {
        let out = new SMatrix3();
        out.a = (this.e * this.i) - (this.h * this.f);
        out.d = -(this.d * this.i) + (this.g * this.f);
        out.g = (this.d * this.h) - (this.g * this.e);
        out.b = -(this.b * this.i) + (this.h * this.c);
        out.e = (this.a * this.i) - (this.g * this.c);
        out.h = -(this.a * this.h) + (this.b * this.g);
        out.c = (this.b * this.f) - (this.e * this.c);
        out.f = -(this.a * this.f) + (this.d * this.c);
        out.i = (this.a * this.e) - (this.d * this.b);
        return out;
    }
    /**
     * Calculates inverse matrix of this matrix
     * @returns {SMatrix3} Inverse matrix
     */
    getInverse() {
        let out = new SMatrix3();
        let det = this.determinant;
        out.a = ((this.e * this.i) - (this.h * this.f)) / det;
        out.d = (-(this.d * this.i) + (this.g * this.f)) / det;
        out.g = ((this.d * this.h) - (this.g * this.e)) / det;
        out.b = (-(this.b * this.i) + (this.h * this.c)) / det;
        out.e = ((this.a * this.i) - (this.g * this.c)) / det;
        out.h = (-(this.a * this.h) + (this.b * this.g)) / det;
        out.c = ((this.b * this.f) - (this.e * this.c)) / det;
        out.f = (-(this.a * this.f) + (this.d * this.c)) / det;
        out.i = ((this.a * this.e) - (this.d * this.b)) / det;
        return out;
    }
    /**
     * @returns {Vector3} i vector in matrix
     */
    getIVector() {
        return new Vector3(this.a, this.d, this.g);
    }
    /**
    * @returns {Vector3} j vector in matrix
    */
    getJVector() {
        return new Vector3(this.b, this.e, this.h);
    }
    /**
   * @returns {Vector3} k vector in matrix
   */
    getKVector() {
        return new Vector3(this.c, this.f, this.i);
    }
    /**
   * Converts matrix to Array
   * @returns {Array<number>} Array
   */
    toArray() {
        return [this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.h, this.i];
    }
    /**
   * Converts matrix to Array
   * @returns {Array<Array<number>>} Array
   */
    to2DArray() {
        return [[this.a, this.b, this.c], [this.d, this.e, this.f], [this.g, this.h, this.i]];
    }
    /**
   * Converts matrix to vector array
   * @returns {Array<Vector3>} array
   */
    toVectorArray() {
        return [new Vector3(this.a, this.d, this.g), new Vector3(this.b, this.e, this.h), new Vector3(this.c, this.f, this.i)];
    }
    /**
     * Multiplies matrix*vector
     * @param {Vector2} vector Vector to multiply by
     * @returns {Vector2} product of multiplacation matrix*vector
     */
    multiplyVector(vector) {
        return new Vector3((vector.x * this.a) + (vector.y * this.b) + (vector.z * this.c), (vector.x * this.d) + (vector.y * this.e) + (vector.z * this.f), (vector.x * this.g) + (vector.y * this.h) + (vector.z * this.i));
    }
    /**
     * Multiplies this*matrix
     * @param {SMatrix3} matrix Matrix to multiply by
     * @returns {SMatrix3} product of this*matrix multiplication
     */
    multiplyMatrix(matrix) {
        let out = new SMatrix3();
        out.a = (matrix.a * this.a) + (matrix.d * this.b) + (matrix.g * this.c);
        out.b = (matrix.b * this.a) + (matrix.e * this.b) + (matrix.h * this.c);
        out.c = (matrix.c * this.a) + (matrix.f * this.b) + (matrix.i * this.c);
        out.d = (matrix.a * this.d) + (matrix.d * this.e) + (matrix.g * this.f);
        out.e = (matrix.b * this.d) + (matrix.e * this.e) + (matrix.h * this.f);
        out.f = (matrix.c * this.d) + (matrix.f * this.e) + (matrix.i * this.f);
        out.g = (matrix.a * this.g) + (matrix.d * this.h) + (matrix.g * this.i);
        out.h = (matrix.b * this.g) + (matrix.e * this.h) + (matrix.h * this.i);
        out.i = (matrix.c * this.g) + (matrix.f * this.h) + (matrix.i * this.i);
        return out;
    }
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
    multiply(matvec) {
        if (matvec instanceof SMatrix3)
            return this.multiplyMatrix(matvec);
        else
            return this.multVec(matvec);
    }
    /**
     * Multiplies this*matrix and saves into matrix
     * @param {SMatrix3} matrix Matrix to multiply by
     */
    localMultiply(matrix) {
        let a = (matrix.a * this.a) + (matrix.d * this.b) + (matrix.g * this.c);
        let b = (matrix.b * this.a) + (matrix.e * this.b) + (matrix.h * this.c);
        let c = (matrix.c * this.a) + (matrix.f * this.b) + (matrix.i * this.c);
        let d = (matrix.a * this.d) + (matrix.d * this.e) + (matrix.g * this.f);
        let e = (matrix.b * this.d) + (matrix.e * this.e) + (matrix.h * this.f);
        let f = (matrix.c * this.d) + (matrix.f * this.e) + (matrix.i * this.f);
        let g = (matrix.a * this.g) + (matrix.d * this.h) + (matrix.g * this.i);
        let h = (matrix.b * this.g) + (matrix.e * this.h) + (matrix.h * this.i);
        let i = (matrix.c * this.g) + (matrix.f * this.h) + (matrix.i * this.i);
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
    }
    /**
     * Rotates this matrix and returns result
     * @param {number} angle Angle to rotate space by in radians
     * @returns {SMatrix3} Rotated matrix
     */
    rotate(angle) {
        return this.multMat(SMatrix3.Rotate(angle));
    }
    /**
   * Scales this matrix and returns result
   * @param {Vector2} scaler Angle to rotate space by in radians
   * @returns {SMatrix3} Rotated matrix
   */
    scale(scaler) {
        return SMatrix3.Custom(scaler.x, 0, 0, 0, scaler.y, 0, 0, 0, 1);
    }
    /**
    * Translates this matrix and returns result
    * @param {Vector2} pos Position to translate space
    * @returns {SMatrix3} Translated matrix
    */
    translate(pos) {
        return SMatrix3.Custom(1, 0, pos.x, 0, 1, pos.y, 0, 0, 1);
    }
    toString() {
        let txt = "=========\n";
        txt += "|" + this.a + "|" + this.b + "|" + this.c + "|\n";
        txt += "=========\n";
        txt += "|" + this.d + "|" + this.e + "|" + this.f + "|\n";
        txt += "=========\n";
        txt += "|" + this.g + "|" + this.h + "|" + this.i + "|\n";
        txt += "=========\n";
        return txt;
    }
    log() {
        console.log(this.toString());
    }
    //
    //Alliasses
    //
    /** @alias {@link multiplyVec} */
    multVec(vector) { return this.multiplyVector(vector); }
    /** @alias {@link multiplyMatrix} */
    multMat(matrix) { return this.multiplyMatrix(matrix); }
    /** @alias {@link multiply} */
    mult(matvec) { return this.multiply(matvec); }
    /** @alias {@link localMultiply} */
    locMult(matrix) { this.localMultiply(matrix); }
    static Identity() {
        let out = new SMatrix3();
        out.a = 1;
        out.e = 1;
        out.i = 1;
        return out;
    }
    static Custom(a, b, c, d, e, f, g, h, i) {
        let out = new SMatrix3();
        out.a = a;
        out.b = b;
        out.c = c;
        out.d = d;
        out.e = e;
        out.f = f;
        out.g = g;
        out.h = h;
        out.i = i;
        return out;
    }
    /**
     * Rotates space in 2d
     * @param angle Angle in radians
     * @returns {SMatrix3} Rotate matrix
     */
    static Rotate(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return SMatrix3.Custom(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
    }
    /**
     * Scales space in 2d
     * @param {Vector2} scaler
     * @returns {SMatrix3} Scale matrix
     */
    static Scale(scaler) {
        return SMatrix3.Custom(scaler.x, 0, 0, 0, scaler.y, 0, 0, 0, 1);
    }
    /**
     * Translates space in 2d
     * @param pos Position to translate by
     * @returns {SMatrix3} Translation matrix
     */
    static Translate(pos) {
        return SMatrix3.Custom(1, 0, pos.x, 0, 1, pos.y, 0, 0, 1);
    }
    toGeneric() {
        return SquareMatrix.CustomMatrix(3, this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.h, this.i);
    }
}
export class SMatrix4 {
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    e = 0;
    f = 0;
    g = 0;
    h = 0;
    i = 0;
    j = 0;
    k = 0;
    l = 0;
    m = 0;
    n = 0;
    o = 0;
    p = 0;
    constructor() {
    }
    get determinant() {
        return ((this.a * ((this.f * ((this.k * this.p) - (this.l * this.o))) - (this.g * ((this.j * this.p) - (this.l * this.n))) + (this.h * ((this.j * this.o) - (this.k * this.n)))))
            - (this.b * ((this.e * ((this.k * this.p) - (this.l * this.o))) - (this.g * ((this.i * this.p) - (this.m * this.l))) + (this.h * ((this.i * this.o) - (this.k * this.m)))))
            + (this.c * ((this.e * ((this.j * this.p) - (this.n * this.l))) - (this.f * ((this.i * this.p) - (this.m * this.l))) + (this.h * ((this.i * this.n) - (this.m * this.j)))))
            - (this.d * ((this.e * ((this.j * this.o) - (this.k * this.n))) - (this.f * ((this.i * this.o) - (this.k * this.m))) + (this.g * ((this.i * this.n) - (this.j * this.m))))));
    }
    /**
     * Transposes a copy of this matrix
     * @returns {SMatrix4} transposed matrix
     */
    transpose() {
        let out = new SMatrix4();
        out.a = this.a;
        out.b = this.e;
        out.c = this.i;
        out.d = this.m;
        out.e = this.b;
        out.f = this.f;
        out.g = this.j;
        out.h = this.n;
        out.i = this.c;
        out.j = this.g;
        out.k = this.k;
        out.l = this.o;
        out.m = this.d;
        out.n = this.h;
        out.o = this.l;
        out.p = this.p;
        return out;
    }
    /**
     * Calculates a minor of this matrix;
     * @returns {SMatrix4} minor matrix
     */
    getMinor() {
        let out = new SMatrix4();
        out.a = (this.f * ((this.k * this.p) - (this.o * this.l))) - (this.g * ((this.j * this.p) - (this.l * this.n))) + (this.h * ((this.j * this.o) - (this.n * this.k)));
        out.b = (this.e * ((this.k * this.p) - (this.o * this.l))) - (this.g * ((this.i * this.p) - (this.m * this.l))) + (this.h * ((this.i * this.o) - (this.m * this.k)));
        out.c = (this.e * ((this.j * this.p) - (this.n * this.l))) - (this.f * ((this.i * this.p) - (this.m * this.l))) + (this.h * ((this.i * this.n) - (this.m * this.j)));
        out.d = (this.e * ((this.j * this.o) - (this.n * this.k))) - (this.f * ((this.i * this.o) - (this.k * this.m))) + (this.g * ((this.i * this.n) - (this.j * this.m)));
        out.e = (this.b * ((this.k * this.p) - (this.o * this.l))) - (this.c * ((this.j * this.p) - (this.l * this.n))) + (this.d * ((this.j * this.o) - (this.n * this.k)));
        out.f = (this.a * ((this.k * this.p) - (this.o * this.l))) - (this.c * ((this.i * this.p) - (this.m * this.l))) + (this.d * ((this.i * this.o) - (this.m * this.k)));
        out.g = (this.a * ((this.j * this.p) - (this.n * this.l))) - (this.b * ((this.i * this.p) - (this.m * this.l))) + (this.d * ((this.i * this.n) - (this.m * this.j)));
        out.h = (this.a * ((this.j * this.o) - (this.n * this.k))) - (this.b * ((this.i * this.o) - (this.k * this.m))) + (this.c * ((this.i * this.n) - (this.m * this.j)));
        out.i = (this.b * ((this.g * this.p) - (this.o * this.h))) - (this.c * ((this.f * this.p) - (this.h * this.n))) + (this.d * ((this.f * this.o) - (this.n * this.g)));
        out.j = (this.a * ((this.g * this.p) - (this.o * this.h))) - (this.c * ((this.e * this.p) - (this.m * this.h))) + (this.d * ((this.e * this.o) - (this.m * this.g)));
        out.k = (this.a * ((this.f * this.p) - (this.n * this.h))) - (this.b * ((this.e * this.p) - (this.m * this.h))) + (this.d * ((this.e * this.n) - (this.m * this.f)));
        out.l = (this.a * ((this.f * this.o) - (this.n * this.g))) - (this.b * ((this.e * this.o) - (this.m * this.g))) + (this.c * ((this.e * this.n) - (this.m * this.f)));
        out.m = (this.b * ((this.g * this.l) - (this.k * this.h))) - (this.c * ((this.f * this.l) - (this.j * this.h))) + (this.d * ((this.f * this.k) - (this.j * this.g)));
        out.n = (this.a * ((this.g * this.l) - (this.k * this.h))) - (this.c * ((this.e * this.l) - (this.i * this.h))) + (this.d * ((this.e * this.k) - (this.i * this.g)));
        out.o = (this.a * ((this.f * this.l) - (this.j * this.h))) - (this.b * ((this.e * this.l) - (this.i * this.h))) + (this.d * ((this.e * this.j) - (this.i * this.f)));
        out.p = (this.a * ((this.f * this.k) - (this.j * this.g))) - (this.b * ((this.e * this.k) - (this.i * this.g))) + (this.c * ((this.e * this.j) - (this.i * this.f)));
        return out;
    }
    /**
     * Calculates a cofactor matrix of this matrix;
     * @returns {SMatrix4} cofactor matrix
     */
    getCofactor() {
        let out = this.getMinor();
        out.b *= -1;
        out.d *= -1;
        out.e *= -1;
        out.g *= -1;
        out.j *= -1;
        out.l *= -1;
        out.m *= -1;
        out.o *= -1;
        return out;
    }
    /**
     * Calculates a adjoint matrix of this matrix;
     * @returns {SMatrix4} adjoint matrix
     */
    getAdjoint() {
        return this.getCofactor().transpose();
    }
    /**
     * Calculates inverse matrix of this matrix
     * @returns {SMatrix4} Inverse matrix
     */
    getInverse() {
        let out = this.getAdjoint();
        let det = this.determinant;
        out.a /= det;
        out.b /= det;
        out.c /= det;
        out.d /= det;
        out.e /= det;
        out.f /= det;
        out.g /= det;
        out.h /= det;
        out.i /= det;
        out.j /= det;
        out.k /= det;
        out.l /= det;
        out.m /= det;
        out.n /= det;
        out.o /= det;
        out.p /= det;
        return out;
    }
    /**
     * @returns {Vector4} i vector in matrix
     */
    getIVector() {
        return new Vector4(this.a, this.e, this.i, this.m);
    }
    /**
    * @returns {Vector4} j vector in matrix
    */
    getJVector() {
        return new Vector4(this.b, this.f, this.j, this.n);
    }
    /**
   * @returns {Vector4} k vector in matrix
   */
    getKVector() {
        return new Vector4(this.c, this.g, this.k, this.o);
    }
    /**
 * @returns {Vector4} l vector in matrix
 */
    getLVector() {
        return new Vector4(this.d, this.h, this.l, this.p);
    }
    /**
   * Converts matrix to Array
   * @returns {Array<number>} Array
   */
    toArray() {
        return [this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.h, this.i, this.k, this.l, this.m, this.n, this.o, this.p];
    }
    /**
   * Converts matrix to Array
   * @returns {Array<Array<number>>} Array
   */
    to2DArray() {
        return [[this.a, this.b, this.c, this.d], [this.e, this.f, this.g, this.h], [this.i, this.j, this.k, this.l], [this.m, this.n, this.o, this.p]];
    }
    /**
   * Converts matrix to vector array
   * @returns {Array<Vector4>} array
   */
    toVectorArray() {
        return [this.getIVector(), this.getJVector(), this.getKVector(), this.getLVector()];
    }
    /**
     * Multiplies matrix*vector
     * @param {Vector4} vector Vector to multiply by
     * @returns {Vector4} product of multiplacation matrix*vector
     */
    multiplyVector(vector) {
        return new Vector4((vector.x * this.a) + (vector.y * this.b) + (vector.z * this.c) + (vector.w * this.d), (vector.x * this.e) + (vector.y * this.f) + (vector.z * this.g) + (vector.w * this.h), (vector.x * this.i) + (vector.y * this.j) + (vector.z * this.k) + (vector.w * this.l), (vector.x * this.m) + (vector.y * this.n) + (vector.z * this.o) + (vector.w * this.p));
    }
    /**
     * Multiplies this*matrix
     * @param {SMatrix4} matrix Matrix to multiply by
     * @returns {SMatrix3} product of this*matrix multiplication
     */
    multiplyMatrix(matrix) {
        let out = new SMatrix4();
        out.a = (matrix.a * this.a) + (matrix.e * this.b) + (matrix.i * this.c) + (matrix.m * this.d);
        out.b = (matrix.b * this.a) + (matrix.f * this.b) + (matrix.j * this.c) + (matrix.n * this.d);
        out.c = (matrix.c * this.a) + (matrix.g * this.b) + (matrix.k * this.c) + (matrix.o * this.d);
        out.d = (matrix.d * this.a) + (matrix.h * this.b) + (matrix.l * this.c) + (matrix.p * this.d);
        out.e = (matrix.a * this.e) + (matrix.e * this.f) + (matrix.i * this.g) + (matrix.m * this.h);
        out.f = (matrix.b * this.e) + (matrix.f * this.f) + (matrix.j * this.g) + (matrix.n * this.h);
        out.g = (matrix.c * this.e) + (matrix.g * this.f) + (matrix.k * this.g) + (matrix.o * this.h);
        out.h = (matrix.d * this.e) + (matrix.h * this.f) + (matrix.l * this.g) + (matrix.p * this.h);
        out.i = (matrix.a * this.i) + (matrix.e * this.j) + (matrix.i * this.k) + (matrix.m * this.l);
        out.j = (matrix.b * this.i) + (matrix.f * this.j) + (matrix.j * this.k) + (matrix.n * this.l);
        out.k = (matrix.c * this.i) + (matrix.g * this.j) + (matrix.k * this.k) + (matrix.o * this.l);
        out.l = (matrix.d * this.i) + (matrix.h * this.j) + (matrix.l * this.k) + (matrix.p * this.l);
        out.m = (matrix.a * this.m) + (matrix.e * this.n) + (matrix.i * this.o) + (matrix.m * this.p);
        out.n = (matrix.b * this.m) + (matrix.f * this.n) + (matrix.j * this.o) + (matrix.n * this.p);
        out.o = (matrix.c * this.m) + (matrix.g * this.n) + (matrix.k * this.o) + (matrix.o * this.p);
        out.p = (matrix.d * this.m) + (matrix.h * this.n) + (matrix.l * this.o) + (matrix.p * this.p);
        return out;
    }
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
    multiply(matvec) {
        if (matvec instanceof SMatrix4)
            return this.multiplyMatrix(matvec);
        else
            return this.multVec(matvec);
    }
    /**
     * Multiplies this*matrix and saves into matrix
     * @param {SMatrix4} matrix Matrix to multiply by
     */
    localMultiply(matrix) {
        let a = (matrix.a * this.a) + (matrix.e * this.b) + (matrix.i * this.c) + (matrix.m * this.d);
        let b = (matrix.b * this.a) + (matrix.f * this.b) + (matrix.j * this.c) + (matrix.n * this.d);
        let c = (matrix.c * this.a) + (matrix.g * this.b) + (matrix.k * this.c) + (matrix.o * this.d);
        let d = (matrix.d * this.a) + (matrix.h * this.b) + (matrix.l * this.c) + (matrix.p * this.d);
        let e = (matrix.a * this.e) + (matrix.e * this.f) + (matrix.i * this.g) + (matrix.m * this.h);
        let f = (matrix.b * this.e) + (matrix.f * this.f) + (matrix.j * this.g) + (matrix.n * this.h);
        let g = (matrix.c * this.e) + (matrix.g * this.f) + (matrix.k * this.g) + (matrix.o * this.h);
        let h = (matrix.d * this.e) + (matrix.h * this.f) + (matrix.l * this.g) + (matrix.p * this.h);
        let i = (matrix.a * this.i) + (matrix.e * this.j) + (matrix.i * this.k) + (matrix.m * this.l);
        let j = (matrix.b * this.i) + (matrix.f * this.j) + (matrix.j * this.k) + (matrix.n * this.l);
        let k = (matrix.c * this.i) + (matrix.g * this.j) + (matrix.k * this.k) + (matrix.o * this.l);
        let l = (matrix.d * this.i) + (matrix.h * this.j) + (matrix.l * this.k) + (matrix.p * this.l);
        let m = (matrix.a * this.m) + (matrix.e * this.n) + (matrix.i * this.o) + (matrix.m * this.p);
        let n = (matrix.b * this.m) + (matrix.f * this.n) + (matrix.j * this.o) + (matrix.n * this.p);
        let o = (matrix.c * this.m) + (matrix.g * this.n) + (matrix.k * this.o) + (matrix.o * this.p);
        let p = (matrix.d * this.m) + (matrix.h * this.n) + (matrix.l * this.o) + (matrix.p * this.p);
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
        this.j = j;
        this.k = k;
        this.l = l;
        this.m = m;
        this.n = n;
        this.o = o;
        this.p = p;
    }
    //
    // VISUALS
    //
    /**
     * Multiplies new Rotate matrix with this and returns result
     * @param {Vector3|Vector4} angles Angles to rotate by
     * @returns {SMatrix4} Rotated matrix
     */
    rotate(angles) {
        return this.multMat(SMatrix4.Rotate(angles));
    }
    /**
   * Multiplies this with new RotateX matrix and returns result
   * @param {number} angle Angles to rotate by on x axis
   * @returns {SMatrix4} Rotated matrix
   */
    rotateX(angle) {
        return this.multMat(SMatrix4.RotateX(angle));
    }
    /**
* Multiplies this with new RotateY matrix and returns result
* @param {number} angle Angles to rotate by on y axis
* @returns {SMatrix4} Rotated matrix
*/
    rotateY(angle) {
        return this.multMat(SMatrix4.RotateY(angle));
    }
    /**
* Multiplies this with new RotateZ matrix and returns result
* @param {number} angle Angles to rotate by on z axis
* @returns {SMatrix4} Rotated matrix
*/
    rotateZ(angle) {
        return this.multMat(SMatrix4.RotateZ(angle));
    }
    /**
     * Translates matrix
     * @param {Vector3|Vector4} pos Position to translate by
     */
    translate(pos) {
        return this.multMat(SMatrix4.Translate(pos));
    }
    /**
     * Scales this matrix
     * @param {Vector3|Vector4} pos Scale to scale in all axis
     */
    scale(pos) {
        return this.multMat(SMatrix4.Scale(pos));
    }
    /**
    * Multiplies new Rotate matrix with this and stores result in this
    * @param {Vector3|Vector4} angles Angles to rotate by
    */
    localRotate(angles) {
        this.localMultiply(SMatrix4.Rotate(angles));
    }
    toGeneric() {
        return SquareMatrix.CustomMatrix(4, this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.h, this.i, this.j, this.k, this.l, this.m, this.n, this.o, this.p);
    }
    toString() {
        let txt = "=========\n";
        txt += "|" + this.a + "|" + this.b + "|" + this.c + "|" + this.d + "|\n";
        txt += "=========\n";
        txt += "|" + this.e + "|" + this.f + "|" + this.g + "|" + this.h + "|\n";
        txt += "=========\n";
        txt += "|" + this.i + "|" + this.j + "|" + this.k + "|" + this.l + "|\n";
        txt += "=========\n";
        txt += "|" + this.m + "|" + this.n + "|" + this.o + "|" + this.p + "|\n";
        txt += "=========\n";
        return txt;
    }
    log() {
        console.log(this.toString());
    }
    //
    //Alliasses
    //
    /** @alias {@link multiplyVec} */
    multVec(vector) { return this.multiplyVector(vector); }
    /** @alias {@link multiplyMatrix} */
    multMat(matrix) { return this.multiplyMatrix(matrix); }
    /** @alias {@link multiply} */
    mult(matvec) { return this.multiply(matvec); }
    /** @alias {@link localMultiply} */
    locMult(matrix) { this.localMultiply(matrix); }
    static Identity() {
        let out = new SMatrix4();
        out.a = 1;
        out.f = 1;
        out.k = 1;
        out.p = 1;
        return out;
    }
    static Custom(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        let out = new SMatrix4();
        out.a = a;
        out.b = b;
        out.c = c;
        out.d = d;
        out.e = e;
        out.f = f;
        out.g = g;
        out.h = h;
        out.i = i;
        out.j = j;
        out.k = k;
        out.l = l;
        out.m = m;
        out.n = n;
        out.o = o;
        out.p = p;
        return out;
    }
    /**
     * Calculates perspective projection matrix
     * @param aspect Aspect ratio of screen space(height/width)
     * @param fov Field of view angle (In radians!!!)
     * @param near Near plane
     * @param far Far plane
     */
    static PerspectiveProjection(aspect, fov, near, far) {
        let plane = (far / (near * far));
        let offset = -plane * near;
        let f = 1 / Math.tan(fov);
        return SMatrix4.Custom(f * aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, plane, offset, 0, 0, 1, 0);
    }
    /**
     * Changes the roll, or rotates in x
     * @param {number} angle Angle to rotate by in radians
     * @returns {SMatrix4}
     */
    static RotateX(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return SMatrix4.Custom(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1);
    }
    /**
    * Changes the pitch, or rotates in y
    * @param {number} angle Angle to rotate by in radians
    * @returns {SMatrix4}
    */
    static RotateY(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return SMatrix4.Custom(cos, 0, cos, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1);
    }
    /**
   * Changes the yaw, or rotates in z
   * @param {number} angle Angle to rotate by in radians
   * @returns {SMatrix4}
   */
    static RotateZ(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return SMatrix4.Custom(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    /**
     * Rotates in 3d
     * @param {Vector3|Vector4} angles Angles of rotation in radians
     * @returns {SMatrix4} Matrix
     */
    static Rotate(angles) {
        let cosX = Math.cos(angles.x);
        let cosY = Math.cos(angles.y);
        let cosZ = Math.cos(angles.z);
        let sinX = Math.sin(angles.x);
        let sinY = Math.sin(angles.y);
        let sinZ = Math.sin(angles.z);
        return SMatrix4.Custom(cosZ * cosY, (cosZ * sinY * sinX) - (sinZ * sinX), (cosZ * sinY * cosX) + (sinZ * sinX), 0, sinZ * cosY, (sinZ * sinY * sinX) + (cosZ * cosX), (sinZ * sinY * cosX) - (cosZ * sinX), 0, -sinY, cosY * sinX, cosY * cosX, 0, 0, 0, 0, 1);
    }
    /**
     * Translates Matrix by Vector
     * @param {Vector3|Vector4} pos Position to translate matrix by
     * @returns {SMatrix4} Translation matrix
     */
    static Translate(pos) {
        return SMatrix4.Custom(1, 0, 0, pos.x, 0, 1, 0, pos.y, 0, 0, 1, pos.z, 0, 0, 0, 1);
    }
    /**
     * Scales Matrix by Vector
     * @param {Vector3|Vector4} scaler Position to translate matrix by
     * @returns {SMatrix4} Translation matrix
     */
    static Scale(scaler) {
        return SMatrix4.Custom(scaler.x, 0, 0, 0, 0, scaler.y, 0, 0, 0, 0, scaler.z, 0, 0, 0, 0, 1);
    }
    /**
     * Creates view matrix
     * @param pos Position to translate by
     * @param rotation Rotation to rotate matrix in radians
     * @param scale Scale to scale
     * @returns {SMatrix4} View Matrix
     */
    static View(pos, rotation, scale) {
        let iPos = pos.mult(-1);
        let iRot = rotation.mult(-1);
        let iScale = scale.invert();
        return SMatrix4.Rotate(iRot).multMat(SMatrix4.Scale(iScale)).multMat(SMatrix4.Translate(iPos));
    }
    static Transform(pos, rotation, scale) {
        return SMatrix4.Rotate(rotation).multMat(SMatrix4.Scale(scale)).multMat(SMatrix4.Translate(pos));
    }
}
//# sourceMappingURL=Matrix.js.map