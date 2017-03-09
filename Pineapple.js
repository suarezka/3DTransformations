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

        //Pipe Color
        let pipeColor = vec3.fromValues(0.117647, 0.564706, 1);
        let windowColor = vec3.fromValues(0.529412, 0.807843, 0.980392);


        this.base = new Cylinder(gl, 0.20, 0.15, 0.2, 16, baseColor, baseColor2);
        this.top = new Cylinder(gl, 0.20, 0.15, 0.2, 16, baseColor, baseColor2);
        this.c1 = new Cone(gl, 0.12, 0.2, 15, 1, crownColor, crownColor2);
        this.c2 = new Cone(gl, 0.11, 0.2, 15, 1, crownColor, crownColor2);
        this.c3 = new Cone(gl, 0.1, 0.2, 15, 1, crownColor, crownColor2);
        this.pipe1 = new Cylinder(gl, 0.01, 0.01, 0.2, 15, pipeColor, pipeColor);
        this.pipe2 = new Cylinder(gl, 0.05, 0.01, 0.1, 15, pipeColor, pipeColor);
        this.window1 = new Torus(gl, 0.04, 0.02, 10, 10, pipeColor, windowColor);
        this.window2 = new Torus(gl, 0.035, 0.02, 10, 10, pipeColor, windowColor);


        //Repositioning for Base and Top
        this.baseTransform = mat4.create();

        let moveUp = vec3.fromValues (0, 0, 0.2);
        this.topTransform = mat4.create();
        mat4.rotateY(this.topTransform, this.topTransform, Math.PI);
        let moveUpTop = mat4.fromTranslation(mat4.create(), moveUp);
        //crownTransform = moveUpCrown * crownTransform
        mat4.multiply (this.topTransform, moveUpTop, this.topTransform);

        //Side Pipe
        let move = vec3.fromValues (0, 0.15, 0.24);
        this.pipe1Transform = mat4.create();
        mat4.rotateX(this.pipe1Transform, this.pipe1Transform, Math.PI / 2);
        let moveSide = mat4.fromTranslation(mat4.create(), move);
        mat4.multiply(this.pipe1Transform, moveSide, this.pipe1Transform);

        this.pipe2Transform = mat4.create();
        mat4.fromTranslation(this.pipe2Transform, vec3.fromValues(0, 0.23, 0.28));

        //Windows
        this.window1Transform = mat4.create();
        mat4.rotateY(this.window1Transform, this.window1Transform, Math.PI / 3);
        let moveWindow = mat4.fromTranslation(mat4.create(), vec3.fromValues(0.15, -0.07, 0.24));
        mat4.multiply(this.window1Transform, moveWindow, this.window1Transform);

        this.window2Transform = mat4.create();
        mat4.rotateY(this.window2Transform, this.window2Transform, Math.PI / 3);
       // mat4.rotateZ(this.window2Transform, this.window2Transform, Math.PI);
        let moveWindow2 = mat4.fromTranslation(mat4.create(), vec3.fromValues(0.18, 0.07, 0.04));
        mat4.multiply(this.window2Transform, moveWindow2, this.window2Transform);

        //Repositioning C1 of Cones
        this.c1Transform = mat4.create();
        mat4.rotateY(this.c1Transform, this.c1Transform, Math.PI);

        let moveUp2 = vec3.fromValues(0, 0, 0.4);
        let moveUpC1 = mat4.fromTranslation(mat4.create(), moveUp2);

        //crownTransform = moveUpCrown * crownTransform
        mat4.multiply (this.c1Transform, moveUpC1, this.c1Transform);


        //C2
        this.c2Transform = mat4.create();
        mat4.rotateY(this.c2Transform, this.c2Transform, Math.PI);

        let moveUp3 = vec3.fromValues(0, 0, 0.5);
        let moveUpC2 = mat4.fromTranslation(mat4.create(), moveUp3);

        //crownTransform = moveUpCrown * crownTransform
        mat4.multiply (this.c2Transform, moveUpC2, this.c2Transform);


        //C3
        this.c3Transform = mat4.create();
        mat4.rotateY(this.c3Transform, this.c3Transform, Math.PI);

        let moveUp4 = vec3.fromValues(0, 0, 0.6);
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

        mat4.mul (this.tmp, coordFrame, this.pipe1Transform);
        this.pipe1.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.pipe2Transform);
        this.pipe2.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.window1Transform);
        this.window1.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.window2Transform);
        this.window2.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.c1Transform);
        this.c1.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.c2Transform);
        this.c2.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.c3Transform);
        this.c3.draw(vertexAttr, colorAttr, modelUniform, this.tmp);


    }
}