//Contains: Vector, Vector2 , Vector3, Vector4 
/** Represents a generic Vector type, optimized for custom lengths, Based on typical arrays, but with added math functions for vectors */
export class Vector extends Array<number>
{
   
    /**
    * @constructor
    * @param {...number|number} elem count of scalars, or array of scalars to convert to vector
    */
    constructor(...elem:Array<number>)
    {
        super(...elem);
    }
    /**
     * Adds two vectors together, and returns new vector
     * @param   {Vector} vector Vector to be added
     * @returns {Vector} Sum of vectors
     */
    add(vector:Vector):Vector
    {
        if(vector.length!=this.length) console.log("Cannot add two vectors with different lengths!");
        let out = new Vector(this.length);
        for(let i=0;i<out.length;i++)
        out[i] = vector[i] + this[i];
        return out;
    }
    /**
     * Adds vector into {@this} vector
     * @param {Vector} vector Vector to be added 
     */
    localAdd(vector:Vector):void
    {
        if(vector.length!=this.length) console.log("Cannot add two vectors with different lengths!");
        for(let i=0;i<this.length;i++)
        this[i] += vector[i];
    }
      /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector} Vector multiplied by scalar
     */
    scale(scalar:number):Vector
    {
        let out = new Vector(this.length);
        for(let i=0;i<out.length;i++)
        out[i]= scalar* this[i];
        return out;
    }
    /**
     * Multiplies vector by scalar, and puts result into {@this}
     * @param {number} scalar 
     */
    localScale(scalar:number):void
    {
        for(let i=0;i<this.length;i++)
        this[i]*=scalar;
    }
    /**
     * Normalizes vector, and returns new vector with result
     * @returns {Vector} Normalized vector
     */
    normalize():Vector
    {
        //Unit Scalar.
        let z = 0;
        for(let i=0;i<this.length;i++)
        z+=this[i]**2;
        z=z**0.5;
        let out = this.clone();
        out.locMult(1/z);
        return out;
    }
    /**
     * Normalizes vector, and puts result into {@this}
     */
    localNormalize():void
    {
        let z = 0;
        for(let i=0;i<this.length;i++)
        z+=this[i]**2;
        z=z**0.5;
        this.locMult(1/z);
    }
    /**
     * Returns new vector with same scalars
     */
    clone():Vector
    {
        return new Vector(...this);
    }
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector} Absolute vector
     */
    absolute():Vector
    {
     let out  = new Vector(this.length);
     for(let i=0;i<out.length;i++)
     out[i] = Math.abs(this[i]);
        return out;
    }
    /**
    * Makes all scalars absolute, and puts result into {@this}
    */
    localAbsolute():void
    {
        for(let i=0;i<this.length;i++)
            this[i] = Math.abs(this[i]);
    }
    /**
     * Dot product of vectors
     * @param {Vector} vector Vector to project
     * @returns {number} Dot product (projection length*realLength)
     */
    dot(vector:Vector):number
    {
        if(vector.length!=this.length) throw new Error("Couldnt calculate dot product of two different length vectors!!");
        let out:number =0;
        for(let i=0;i<this.length;i++)
        out+=this[i]*vector[i];
        return out;
    }
    /**
     * Returns projection length of vector onto {@this}
     * @param {Vector} vector Vector to project
     * @returns {number} length of projection
     */
    projectionLength(vector:Vector):number
    {
        return this.dot(vector)/this.realLength();
    }
      /**
     * Returns the length in space of the vector
     * @returns {number} vector length
     */
      realLength():number
      {
        let squareSum:number=0;
        for(let i=0;i<this.length;i++)
            squareSum+=this[i]**2
        return squareSum**0.5;
      }
       /**
     * Returns true if all scalars of vector are matched
     * @param {Vector} vector Vector to compare
     * @returns {boolean} Boolean
     */
    compare(vector:Vector):boolean
    {
        if(vector.length!=this.length) console.log("Cannot compare two vectors with different lengths!");
        for(let i=0;i<vector.length;i++)
            if(this[i] != vector[i])
                return false;
        return true;
    }
    /**
     * Checks if vector is linearly dependent on another vector
     * @param {Vector} vector Vector to check depedency
     * @returns {boolean} Result of check
     */
    isLinearlyDependent(vector:Vector):boolean
    {
        if(vector.length!=this.length) console.log("Cannot check linear dependency on vectors with different lengths!");
        let v1 =   vector.normalize().absolute();
        let v2 = this.normalize().absolute();
        return v1.compare(v2);
    }
    /**
     * Converts this vector into {@link Vector2}, and returns new {@link Vector2} 
     */
    toVector2()
    {
        if(this.length<1) throw new Error("Cannot convert a vector with less than two scalars into Vector2");
        return new Vector2(this[0],this[1])
    }
    toVector3()
    {
        if(this.length<2) throw new Error("Cannot convert a vector with less than three scalars into Vector3");
        return new Vector3(this[0],this[1],this[2])
    }
    toVector4()
    {
        if(this.length<3) throw new Error("Cannot convert a vector with less than four scalars into Vector4");
        return new Vector4(this[0],this[1],this[2],this[3])
    }
    //
    //Alliasses
    //
    /** @alias {@link compare} */
    isSame(vector:Vector):boolean{ return this.compare(vector); }
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector:Vector):boolean { return this.isLinearlyDependent(vector); }
    /** @alias {@link toVector2} */
    toVec2():Vector2 {return this.toVector2();}
    /** @alias {@link localAbsolute} */
    locAbs():void {this.localAbsolute()}
    /** @alias {@link absolute} */
    abs():Vector {return this.absolute()}
    /** @alias {@link normalize} */
    norm():Vector {return this.normalize()}
    /** @alias {@link localNormalize} */
    locNorm():void {this.localNormalize()}
     /** @alias {@link clone} */
    copy():Vector { return this.clone(); }
    /** @alias {@link scale} */
    multiply(scalar:number):Vector { return  this.scale(scalar);}
    /** @alias {@link scale} */
    mult(scalar:number):Vector { return  this.scale(scalar);}
    /** @alias {@link localScale} */
    localMultiply(scalar:number):void {this.localScale(scalar);}
    /** @alias {@link localScale} */
    locMult(scalar:number):void {this.localScale(scalar);}
}
/** Represents a vector in 2d Space or 2 element Vector */
export class Vector2
{
    x:number;
    y:number;
    /**
    * @constructor
    * @param {number?} x first scalar
    * @param {number?} y second scalar
    */
    constructor(x?:number,y?:number)
    {
        this.x = x??0;
        this.y =y??0;
    }
     /**
     * Adds two vectors together, and returns new vector
     * @param   {Vector2} vector Vector to be added
     * @returns {Vector2} Sum of vectors
     */
    add(vector:Vector2):Vector2
    {
       return new Vector2(this.x+vector.x,this.y+vector.y);
    }
     /**
     * Adds vector into existing vector
     * @param {Vector2} vector Vector to be added 
     */
    localAdd(vector:Vector2):void
    {
        this.x+= vector.x;
        this.y+=vector.y;
    }
    /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector2} Vector multiplied by scalar
     */
    scale(scalar:number):Vector2
    {
       return new Vector2(scalar*this.x,this.y*scalar);
    }
     /**
     * Multiplies vector by scalar, and puts result into itself
     * @param {number} scalar 
     */
    localScale(scalar:number):void
    {
        this.x*=scalar;
        this.y*=scalar;
    }
     /**
     * Normalizes vector, and returns new vector with result
     * @returns {Vector2} Normalized vector
     */
    normalize():Vector2
    {
        let z =((this.x**2)+(this.y**2))**(0.5);
        return new Vector2(this.x/z,this.y/z);
    }
    /**
    * Normalizes vector, and puts result into itself
    */
    localNormalize():void
    {
        let z =((this.x**2)+(this.y**2))**(0.5);
        this.x /= z;
        this.y /=z;
    }
    /**
     * Returns new vector with same scalars
     */
    clone():Vector2
    {
        return new Vector2(this.x,this.y);
    }
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector2} Absolute vector
     */
    absolute():Vector2
    {
        return new Vector2(Math.abs(this.x),Math.abs(this.y));
    }
    /**
    * Makes all scalars absolute, and puts result into itself
    */
    localAbsolute():void
    {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
    }
    /**
     * Dot product of two vectors
     * @param vector Vector to project
     * @returns {number} dot product
     */
    dot(vector:Vector2):number
    {
        return (vector.x*this.x)+(vector.y*this.y);
    }
    /**
     * Projection length of vector projected onto @this
     * @param {Vector2} vector vector to project onto this
     * @returns {number} length of the projection 
     */
    projectionLength(vector:Vector2):number
    {
        return this.dot(vector)/this.realLength();
    }
    /**
     * Returns the length in 2d space of the vector
     * @returns {number} length in 2d space
     */
    realLength():number
    {
        return ((this.x**2)+(this.y**2))**0.5;
    }
     /**
     * Returns true if all scalars of vector are matched
     * @param {Vector2} vector Vector to compare
     * @returns {boolean} Boolean
     */
    compare(vector:Vector2):boolean
    {
        if(vector.x==this.x && vector.y==this.y)
            return true;
        return false;
    }
    /**
    * Checks if vector is linearly dependent on another vector
    * @param {Vector2} vector Vector to check depedency
    * @returns {boolean} Result of check
    */
    isLinearlyDependent(vector:Vector2):boolean
    {
        let v1 = vector.norm().abs();
        let v2 = this.norm().abs();
        return v1.compare(v2);
    }
    toGenericVector():Vector
    {
        return new Vector(this.x,this.y);
    }
    /**
     * Expands vector to 3d vector
     * @param {?number} z value to add at end of vector
     * @returns {Vector3} expanded vector
     */
    expand(z?:number):Vector3
    {
        return new Vector3(this.x,this.y,z??0);
    }
    //
    //Alliasses
    //
    /** @alias {@link compare} */
    isSame(vector:Vector2):boolean { return this.compare(vector); }
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector:Vector2):boolean { return this.isLinearlyDependent(vector) }
    /** @alias {@link toGenericVector} */
    toGenVec():Vector {return this.toGenericVector()}
    /** @alias {@link absolute} */
    abs():Vector2 { return this.absolute(); }
    /** @alias {@link localAbsolute} */
    locAbs():void { this.localAbsolute(); }
     /** @alias {@link normalize} */
    norm():Vector2 { return this.normalize(); }
    /** @alias {@link localNormalize} */
    locNorm():void { this.localNormalize(); }
    /** @alias {@link clone} */
    copy():Vector2 { return this.clone(); }
    /** @alias {@link scale} */
    multiply(scalar:number):Vector2 { return  this.scale(scalar); }
    /** @alias {@link scale} */
    mult(scalar:number):Vector2 { return  this.scale(scalar); }
    /** @alias {@link localScale} */
    localMultiply(scalar:number):void { this.localScale(scalar); }
     /** @alias {@link localScale} */
    locMult(scalar:number):void { this.localScale(scalar); }
    
}

/** Represents a vector in 3d Space or 3 element Vector */
export class Vector3
{
    x:number;
    y:number;
    z:number;
    /**
    * @constructor
    * @param {number?} x first scalar
    * @param {number?} y second scalar
    * @param {number?} z third scalar
    */
    constructor(x?:number,y?:number,z?:number)
    {
        this.x = x??0;
        this.y =y??0;
        this.z = z??0;
    }
     /**
     * Adds two vectors together, and returns new vector
     * @param   {Vector3} vector Vector to be added
     * @returns {Vector3} Sum of vectors
     */
    add(vector:Vector3):Vector3
    {
       return new Vector3(this.x+vector.x,this.y+vector.y,this.z+vector.z);
    }
     /**
     * Adds vector into existing vector
     * @param {Vector3} vector Vector to be added 
     */
    localAdd(vector:Vector3):void
    {
        this.x+= vector.x;
        this.y+=vector.y;
        this.z += vector.z;
    }
    /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector3} Vector multiplied by scalar
     */
    scale(scalar:number):Vector3
    {
       return new Vector3(scalar*this.x,this.y*scalar,this.z*scalar);
    }
     /**
     * Multiplies vector by scalar, and puts result into itself
     * @param {number} scalar 
     */
    localScale(scalar:number):void
    {
        this.x*=scalar;
        this.y*=scalar;
        this.z*=scalar;
    }
     /**
     * Normalizes vector, and returns new vector with result
     * @returns {Vector3} Normalized vector
     */
    normalize():Vector3
    {
        let div =this.realLength();
        return new Vector3(this.x/div,this.y/div,this.z/div);
    }
    /**
    * Normalizes vector, and puts result into itself
    */
    localNormalize():void
    {
        let div =this.realLength();
        this.x /= div;
        this.y /=div;
        this.z /=div;
    }
    /**
     * @returns {Vector3} new vector with same scalars
     */
    clone():Vector3
    {
        return new Vector3(this.x,this.y,this.z);
    }
    /**
     * Expands a vector to 4d vector
     * @param {?number} w Scalar to add at end of vector, if not defined, will add 0
     * @returns {Vector4} Expanded vector
     */
    expand(w?:number):Vector4
    {
        return new Vector4(this.x,this.y,this.z,w??0);
    }
    /**
     * Shrinks a vector to 2d vector(throws away last scalar)
     * @returns {Vector2} Shrinked vector
     */
    shrink():Vector2
    {
        return new Vector2(this.x,this.y);
    }
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector2} Absolute vector
     */
    absolute():Vector3
    {
        return new Vector3(Math.abs(this.x),Math.abs(this.y),Math.abs(this.z));
    }
    /**
    * Makes all scalars absolute, and puts result into itself
    */
    localAbsolute():void
    {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
    }
    /**
     * Dot product of two vectors
     * @param {Vector3} vector Vector to project
     * @returns {number} dot product
     */
    dot(vector:Vector3):number
    {
        return (vector.x*this.x)+(vector.y*this.y)+(vector.z*this.z);
    }
    /**
     * Cross product of two vectors
     * @param {Vector3} vector Vector to project
     * @returns {Vector3} cross product
     */
    cross(vector:Vector3):Vector3
    {
        let out = new Vector3();
        out.x = (this.y*vector.z)-(vector.y*this.z);
        out.y = (this.z*vector.x)-(vector.z*this.x);
        out.z = (this.x*vector.y)-(vector.x*this.y);
        return out;
    }
    /**
     * Projection length of vector projected onto @this
     * @param {Vector2} vector vector to project onto this
     * @returns {number} length of the projection 
     */
    projectionLength(vector:Vector3):number
    {
        return this.dot(vector)/this.realLength();
    }
    /**
     * Returns the length in 2d space of the vector
     * @returns {number} length in 2d space
     */
    realLength():number
    {
        return ((this.x**2)+(this.y**2)+(this.z**2))**0.5;
    }
     /**
     * Returns true if all scalars of vector are matched
     * @param {Vector3} vector Vector to compare
     * @returns {boolean} Boolean
     */
    compare(vector:Vector3):boolean
    {
        if(vector.x==this.x && vector.y==this.y && vector.z==this.z)
            return true;
        return false;
    }
    /**
    * Checks if vector is linearly dependent on another vector
    * @param {Vector2} vector Vector to check depedency
    * @returns {boolean} Result of check
    */
    isLinearlyDependent(vector:Vector3):boolean
    {
        let v1 = vector.norm().abs();
        let v2 = this.norm().abs();
        return v1.compare(v2);
    }
    /**
     * Inverts all scalars (1/s)
     * @returns {Vector3} Inverted vector
     */
    invert():Vector3
    {
        return new Vector3(1/this.x,1/this.y,1/this.z);
    }
    toGenericVector():Vector
    {
        return new Vector(this.x,this.y,this.z);
    }
    //
    //Alliasses
    //
    /** @alias {@link compare} */
    isSame(vector:Vector3):boolean { return this.compare(vector); }
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector:Vector3):boolean { return this.isLinearlyDependent(vector) }
    /** @alias {@link toGenericVector} */
    toGenVec():Vector {return this.toGenericVector()}
    /** @alias {@link absolute} */
    abs():Vector3 { return this.absolute(); }
    /** @alias {@link localAbsolute} */
    locAbs():void { this.localAbsolute(); }
     /** @alias {@link normalize} */
    norm():Vector3 { return this.normalize(); }
    /** @alias {@link localNormalize} */
    locNorm():void { this.localNormalize(); }
    /** @alias {@link clone} */
    copy():Vector3 { return this.clone(); }
    /** @alias {@link scale} */
    multiply(scalar:number):Vector3 { return  this.scale(scalar); }
    /** @alias {@link scale} */
    mult(scalar:number):Vector3 { return  this.scale(scalar); }
    /** @alias {@link localScale} */
    localMultiply(scalar:number):void { this.localScale(scalar); }
     /** @alias {@link localScale} */
    locMult(scalar:number):void { this.localScale(scalar); }
    
}
/** Represents a vector in 4d Space or 4 element Vector */
export class Vector4
{
    x:number;
    y:number;
    z:number;
    w:number;
    /**
    * @constructor
    * @param {number?} x first scalar
    * @param {number?} y second scalar
    * @param {number?} z third scalar
    * @param {number?} z fourth scalar
    */
    constructor(x?:number,y?:number,z?:number,w?:number)
    {
        this.x = x??0;
        this.y =y??0;
        this.z = z??0;
        this.w = w??0;
    }
     /**
     * Adds two vectors together, and returns new vector
     * @param   {Vector4} vector Vector to be added
     * @returns {Vector4} Sum of vectors
     */
    add(vector:Vector4):Vector4
    {
       return new Vector4(this.x+vector.x,this.y+vector.y,this.z+vector.z,this.w+vector.w);
    }
     /**
     * Adds vector into existing vector
     * @param {Vector4} vector Vector to be added 
     */
    localAdd(vector:Vector4):void
    {
        this.x+= vector.x;
        this.y+=vector.y;
        this.z += vector.z;
        this.w+= vector.w;
    }
    /**
     * Multiplies vector by scalar(number), and returns new vector
     * @param {number} scalar Scalar to multiply vector
     * @returns {Vector4} Vector multiplied by scalar
     */
    scale(scalar:number):Vector4
    {
       return new Vector4(scalar*this.x,this.y*scalar,this.z*scalar,scalar*this.w);
    }
     /**
     * Multiplies vector by scalar, and puts result into itself
     * @param {number} scalar 
     */
    localScale(scalar:number):void
    {
        this.x*=scalar;
        this.y*=scalar;
        this.z*=scalar;
        this.w*=scalar;
    }
     /**
     * Normalizes vector, and returns new vector with result
     * @returns {Vector4} Normalized vector
     */
    normalize():Vector4
    {
        let div =this.realLength();
        return new Vector4(this.x/div,this.y/div,this.z/div,this.w/div);
    }
    /**
    * Normalizes vector, and puts result into itself
    */
    localNormalize():void
    {
        let div =this.realLength();
        this.x /= div;
        this.y /=div;
        this.z /=div;
        this.w/=div;
    }
    /**
     * @returns {Vector3} new vector with same scalars
     */
    clone():Vector4
    {
        return new Vector4(this.x,this.y,this.z,this.w);
    }
    /**
     * Makes all scalars absolute, and returns result in new Vector
     * @returns {Vector2} Absolute vector
     */
    absolute():Vector4
    {
        return new Vector4(Math.abs(this.x),Math.abs(this.y),Math.abs(this.z),Math.abs(this.w));
    }
    /**
    * Makes all scalars absolute, and puts result into itself
    */
    localAbsolute():void
    {
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
    dot(vector:Vector4):number
    {
        return (vector.x*this.x)+(vector.y*this.y)+(vector.z*this.z)+(vector.w*this.w);
    }
    /**
     * Projection length of vector projected onto @this
     * @param {Vector4} vector vector to project onto this
     * @returns {number} length of the projection 
     */
    projectionLength(vector:Vector4):number
    {
        return this.dot(vector)/this.realLength();
    }
    /**
     * Returns the length in 2d space of the vector
     * @returns {number} length in 2d space
     */
    realLength():number
    {
        return ((this.x**2)+(this.y**2)+(this.z**2)+(this.w**2))**0.5;
    }
     /**
     * Returns true if all scalars of vector are matched
     * @param {Vector4} vector Vector to compare
     * @returns {boolean} Boolean
     */
    compare(vector:Vector4):boolean
    {
        if(vector.x==this.x && vector.y==this.y && vector.z==this.z && vector.w == this.w)
            return true;
        return false;
    }
    /**
    * Checks if vector is linearly dependent on another vector
    * @param {Vector2} vector Vector to check depedency
    * @returns {boolean} Result of check
    */
    isLinearlyDependent(vector:Vector4):boolean
    {
        let v1 = vector.norm().abs();
        let v2 = this.norm().abs();
        return v1.compare(v2);
    }
    toGenericVector():Vector
    {
        return new Vector(this.x,this.y,this.z,this.w);
    }
    invert():Vector4
    {
        return new Vector4(1/this.x,1/this.y,1/this.z,1/this.w);
    }
     /**
     * Shrinks a vector to 3d vector(throws away last scalar)
     * @returns {Vector3} Shrinked vector
     */
     shrink():Vector3
     {
         return new Vector3(this.x,this.y,this.z);
     }
    //
    //Alliasses
    //
    /** @alias {@link compare} */
    isSame(vector:Vector4):boolean { return this.compare(vector); }
    /** @alias {@link isLinearlyDependent} */
    isLinDep(vector:Vector4):boolean { return this.isLinearlyDependent(vector) }
    /** @alias {@link toGenericVector} */
    toGenVec():Vector {return this.toGenericVector()}
    /** @alias {@link absolute} */
    abs():Vector4 { return this.absolute(); }
    /** @alias {@link localAbsolute} */
    locAbs():void { this.localAbsolute(); }
     /** @alias {@link normalize} */
    norm():Vector4 { return this.normalize(); }
    /** @alias {@link localNormalize} */
    locNorm():void { this.localNormalize(); }
    /** @alias {@link clone} */
    copy():Vector4 { return this.clone(); }
    /** @alias {@link scale} */
    multiply(scalar:number):Vector4 { return  this.scale(scalar); }
    /** @alias {@link scale} */
    mult(scalar:number):Vector4 { return  this.scale(scalar); }
    /** @alias {@link localScale} */
    localMultiply(scalar:number):void { this.localScale(scalar); }
     /** @alias {@link localScale} */
    locMult(scalar:number):void { this.localScale(scalar); }
    
}