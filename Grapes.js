/**
 * Created by Hans Dulimarta on 2/16/17.
 */
class Grapes {
  constructor (gl) {

    //Purple
      let grapeColor = vec3.fromValues(0.627451, 0.12549, 0.941176);

    this.grape = new Sphere(gl, 0.1, 16, 16, grapeColor, grapeColor);
   // this.crown = new Torus(gl, 0.15, 0.05, 30, 10);
   // this.gem = new Cube(gl, 0.15, 2);

    this.grapeTransform = mat4.create();
    //mat4.rotateX(this.grapeTransform, this.grapeTransform, Math.PI/2);
   // let moveUp = vec3.fromValues (0, 0, 1.0);
   // this.crownTransform = mat4.create();
   // mat4.translate (this.crownTransform, this.crownTransform, moveUp);
   // let angle = Math.acos(1/Math.sqrt(3));
   // this.gemTransform = mat4.create();
   // let axisRot = vec3.fromValues(1, 1, 0);
   // mat4.fromRotation(this.gemTransform, angle, axisRot);
   // let moveItUp = mat4.fromTranslation(mat4.create(), moveUp);

    // genTransform = moveItUp * gemTransform
   // mat4.multiply (this.gemTransform, moveItUp, this.gemTransform);
    this.tmp = mat4.create();
  }

  draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
    mat4.mul (this.tmp, coordFrame, this.grapeTransform);
    this.grape.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

   // mat4.mul (this.tmp, coordFrame, this.crownTransform);
   // this.crown.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

  //  mat4.mul (this.tmp, coordFrame, this.gemTransform);
   // this.gem.draw(vertexAttr, colorAttr, modelUniform, this.tmp);
  }
}
