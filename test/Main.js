import {Vector,Vector2, Vector4} from "../dist/Vector.js";
import {Matrix,SquareMatrix,SMatrix3, SMatrix4} from "../dist/Matrix.js";
let vec1 = new Vector2(-4,-4);
let vec2 = new Vector(2,1,0);

let j=0;
while(check())
{}

function check()
{
    console.log(j++);
    let arr = new Array();
for(let i=0;i<16;i++)
arr.push(Math.random()*100);
let vec3 = new Vector4(Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100);
let mat2 = SMatrix4.Custom(
    ...arr
);
let matGen = mat2.toGeneric();
if(!matGen.multVec(vec3.toGenVec()).compare(mat2.multVec(vec3).toGenVec()))
{
   console.log(matGen.multVec(vec3));
   console.log(mat2.multVec(vec3));
    return false;
}
return true;
}