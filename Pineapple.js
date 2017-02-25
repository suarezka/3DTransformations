/**
 * Created by kaye on 2/25/17.
 */
/**
 * Created by Hans Dulimarta on 2/16/17.
 */
class Pineapple {
    constructor (gl) {
        this.base = new Cylinder(gl, 0.28, 0.23, 0.4, 16, 1);
        this.top = new Cylinder(gl, 0.23, 0.28, 0.4, 16, 1);
        this.crown = new Cone(gl, 0.2, 0.4, 12, 1);
        this.c2 = new Cone(gl, 0.2, 0.4, 12, 1);
        this.c3 = new Cone(gl, 0.2, 0.4, 12, 1);

        //Repositioning for Base and Top
        this.baseTransform = mat4.create();
        let moveUp = vec3.fromValues (0, 0, 0.4);
        this.topTransform = mat4.create();
        mat4.translate (this.topTransform, this.topTransform, moveUp);

        //Repositioning Crown of Cones
        this.crownTransform = mat4.create();
        mat4.rotateY(this.crownTransform, this.crownTransform, Math.PI);

        let moveUp2 = vec3.fromValues(0, 0, 1.0);
        let moveUpCrown = mat4.fromTranslation(mat4.create(), moveUp2);

        //crownTransform = moveUpCrown * crownTransform
        mat4.multiply (this.crownTransform, moveUpCrown, this.crownTransform);


        //C2
        this.c2Transform = mat4.create();
        mat4.rotateY(this.c2Transform, this.c2Transform, Math.PI);

        let moveUp3 = vec3.fromValues(0, 0, 1.15);
        let moveUpC2 = mat4.fromTranslation(mat4.create(), moveUp3);

        //crownTransform = moveUpCrown * crownTransform
        mat4.multiply (this.c2Transform, moveUpC2, this.c2Transform);


        //C3
        this.c3Transform = mat4.create();
        mat4.rotateY(this.c3Transform, this.c3Transform, Math.PI);

        let moveUp4 = vec3.fromValues(0, 0, 1.25);
        let moveUpC3 = mat4.fromTranslation(mat4.create(), moveUp4);

        //crownTransform = moveUpCrown * crownTransform
        mat4.multiply (this.c3Transform, moveUpC3, this.c3Transform);




        this.tmp = mat4.create();
    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.mul (this.tmp, coordFrame, this.baseTransform);
        this.base.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.topTransform);
        this.top.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.crownTransform);
        this.crown.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.c2Transform);
        this.c2.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.c3Transform);
        this.c3.draw(vertexAttr, colorAttr, modelUniform, this.tmp);


    }
}