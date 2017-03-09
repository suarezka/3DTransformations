/**
 * Created by kaye on 2/25/17.
 */
/**
 * Created by Hans Dulimarta on 2/16/17.
 */
class Pineapple {
    constructor (gl) {
        //Yellow + Brownish
        let baseColor = vec3.fromValues(1.0, 1.0, 0.0);
        let baseColor2 = vec3.fromValues(0.803922, 0.521569, 0.247059);

        //Green + Dark Green
        let crownColor = vec3.fromValues(0.0, 1.0, 0.0);
        let crownColor2 = vec3.fromValues(0.0, 0.392157, 0.0);


        this.base = new Cylinder(gl, 0.30, 0.25, 0.4, 16, 1, baseColor, baseColor2);
        this.top = new Cylinder(gl, 0.30, 0.25, 0.4, 16, 1, baseColor, baseColor2);
        this.crown = new Cone(gl, 0.2, 0.4, 15, 1, crownColor, crownColor2);
        this.c2 = new Cone(gl, 0.2, 0.4, 15, 1, crownColor, crownColor2);
        this.c3 = new Cone(gl, 0.2, 0.4, 15, 1, crownColor, crownColor2);
        this.sideCones = [
            new Cone(gl, 0.1, 0.4, 15, 1),
            new Cone(gl, 0.1, 0.4, 15, 1),
            new Cone(gl, 0.1, 0.4, 15, 1),
        ];

        //Side Cones
        let move = vec3.fromValues (0, 0, 0.2);
        this.sideConesTransfrom = mat4.create();
        mat4.rotateY(this.sideConesTransfrom, this.sideConesTransfrom, Math.PI / 2);
        let moveSide = mat4.fromTranslation(mat4.create(), move);
        mat4.multiply(this.sideConesTransfrom, moveSide, this.sideConesTransfrom);


        //Repositioning for Base and Top
        this.baseTransform = mat4.create();

        let moveUp = vec3.fromValues (0, 0, 0.8);
        this.topTransform = mat4.create();
        mat4.rotateY(this.topTransform, this.topTransform, Math.PI);
        let moveUpTop = mat4.fromTranslation(mat4.create(), moveUp);
        //crownTransform = moveUpCrown * crownTransform
        mat4.multiply (this.topTransform, moveUpTop, this.topTransform);


        //Repositioning Crown of Cones
        this.crownTransform = mat4.create();
        mat4.rotateY(this.crownTransform, this.crownTransform, Math.PI);

        let moveUp2 = vec3.fromValues(0, 0, 0.95);
        let moveUpCrown = mat4.fromTranslation(mat4.create(), moveUp2);

        //crownTransform = moveUpCrown * crownTransform
        mat4.multiply (this.crownTransform, moveUpCrown, this.crownTransform);


        //C2
        this.c2Transform = mat4.create();
        mat4.rotateY(this.c2Transform, this.c2Transform, Math.PI);

        let moveUp3 = vec3.fromValues(0, 0, 1.1);
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


        for (let k = 0; k < 3; k++) {
            mat4.mul (this.tmp, coordFrame, this.sideConesTransfrom);
            this.sideCones[k].draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        }

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