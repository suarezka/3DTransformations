/**
 * Created by Kaye on 2/13/17.
 * Created by Hans Dulimarta on 2/1/17.
 */

class Cylinder {
    /**
     * Create a 3D cylinder with tip at the Z+ axis and base on the XY plane
     * @param {Object} gl      the current WebGL context
     * @param {Number} radiusT  radius of the top
     * @param {Number} radiusB  radius of the bottom
     * @param {Number} height  height of the cone
     * @param {Number} subDiv  number of radial subdivision of the cone base
     * @param {Number} stacks  number of vertical stacks of cone
     * @param {vec3}   col1    color #1 to use
     * @param {vec3}   col2    color #2 to use
     */
    constructor(gl, radiusT, radiusB, height, subDiv, stacks, col1, col2) {

        /* if colors are undefined, generate random colors */
        if (typeof col1 === "undefined") col1 = vec3.fromValues(Math.random(), Math.random(), Math.random());
        if (typeof col2 === "undefined") col2 = vec3.fromValues(Math.random(), Math.random(), Math.random());
        let randColor = vec3.create();
        let vertices = [];
        this.vbuff = gl.createBuffer();

        //VERTICAL INTERVAL OF STACKS
        let div = height / stacks;

        /* Instead of allocating two separate JS arrays (one for position and one for color),
         in the following loop we pack both position and color
         so each tuple (x,y,z,r,g,b) describes the properties of a vertex
         */
        vertices.push(0, 0, height);
        /* tip of cone */
        vec3.lerp(randColor, col1, col2, Math.random());
        /* linear interpolation between two colors */
        vertices.push(randColor[0], randColor[1], randColor[2]);

        //Top of cyclinder
        for (let k = 0; k < subDiv; k++) {
            let angle = k * 2 * Math.PI / subDiv;
            let x = radiusT * Math.cos(angle);
            let y = radiusT * Math.sin(angle);

            /* the first three floats are 3D (x,y,z) position */
            vertices.push(x, y, height);
            /* perimeter of base */
            vec3.lerp(randColor, col1, col2, Math.random());
            /* linear interpolation between two colors */
            /* the next three floats are RGB */
            vertices.push(randColor[0], randColor[1], randColor[2]);
        }

        //More than 1 vertical subdivision
        if (stacks > 1) {
            let r = 0;
            let h = height;
            for (let i = 1; i < stacks; i++) {
                let n = (Math.abs(radiusT - radiusB));
                r = radiusT + (i * (n / stacks));
                h = height - (i * (height / stacks));

                for (let k = 0; k < subDiv; k++) {
                    let angle = k * 2 * Math.PI / subDiv;
                    let x = r * Math.cos(angle);
                    let y = r * Math.sin(angle);

                    vertices.push(x, y, h);
                    vec3.lerp(randColor, col1, col2, Math.random());

                    vertices.push(randColor[0], randColor[1], randColor[2]);
                }
            }
        }

        //Repeat steps for bottom of cylinder
        for (let k = 0; k < subDiv; k++) {
            let angle = k * 2 * Math.PI / subDiv;
            let x = radiusB * Math.cos(angle);
            let y = radiusB * Math.sin(angle);

            /* the first three floats are 3D (x,y,z) position */
            vertices.push(x, y, 0);
            /* perimeter of base */
            vec3.lerp(randColor, col1, col2, Math.random());
            /* linear interpolation between two colors */
            /* the next three floats are RGB */
            vertices.push(randColor[0], randColor[1], randColor[2]);
        }

        vertices.push(0, 0, 0);
        /* center of base */
        vec3.lerp(randColor, col1, col2, Math.random());
        /* linear interpolation between two colors */
        vertices.push(randColor[0], randColor[1], randColor[2]);


        /* copy the (x,y,z,r,g,b) sixtuplet into GPU buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuff);
        gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(vertices), gl.STATIC_DRAW);

        console.log(vertices);

        // Generate index order for top of cylinder
        let topIndex = [];
        topIndex.push(0);
        for (let k = 1; k <= subDiv; k++)
            topIndex.push(k);
        topIndex.push(1);
        this.topIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.topIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(topIndex), gl.STATIC_DRAW);

        // Generate index order for bottom of cylinder
        let botIndex = [];
        let n = (stacks * subDiv) + 1;
        botIndex.push(n + subDiv);
        for (let k = n + (subDiv - 1); k >= n; k--)
            botIndex.push(k);
        botIndex.push(n + (subDiv - 1));

        this.botIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.botIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(botIndex), gl.STATIC_DRAW);

        //Generate index for cylinder vertices
        let vertIndex = [];
        for (let k = 1; k < (stacks * subDiv) + 1; k++) {
            vertIndex.push(k);
            vertIndex.push(k + subDiv);

            if (k % subDiv == 0) {
                vertIndex.push(k - (subDiv - 1));
                vertIndex.push(k + 1);
            }
        }

        console.log(topIndex);
        console.log(botIndex);
        console.log(vertIndex);

        this.vertIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(vertIndex), gl.STATIC_DRAW);


        /* Put the indices as an array of objects. Each object has three attributes:
         primitive, buffer, and numPoints */
        this.indices = [{"primitive": gl.TRIANGLE_FAN, "buffer": this.topIdxBuff, "numPoints": topIndex.length},
                        {"primitive": gl.TRIANGLE_FAN, "buffer": this.botIdxBuff, "numPoints": botIndex.length},
                        {"primitive": gl.TRIANGLE_STRIP, "buffer": this.vertIdxBuff, "numPoints": vertIndex.length}];
    }

    /**
     * Draw the object
     * @param {Number} vertexAttr a handle to a vec3 attribute in the vertex shader for vertex xyz-position
     * @param {Number} colorAttr  a handle to a vec3 attribute in the vertex shader for vertex rgb-color
     * @param {Number} modelUniform a handle to a mat4 uniform in the shader for the coordinate frame of the model
     * @param {mat4} coordFrame a JS mat4 variable that holds the actual coordinate frame of the object
     */
    draw(vertexAttr, colorAttr, modelUniform, coordFrame) {
        /* copy the coordinate frame matrix to the uniform memory in shader */
        gl.uniformMatrix4fv(modelUniform, false, coordFrame);

        /* binder the (vertex+color) buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuff);

        /* with the "packed layout"  (x,y,z,r,g,b),
         the stride distance between one group to the next is 24 bytes */
        gl.vertexAttribPointer(vertexAttr, 3, gl.FLOAT, false, 24, 0);
        /* (x,y,z) begins at offset 0 */
        gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, false, 24, 12);
        /* (r,g,b) begins at offset 12 */

        for (let k = 0; k < this.indices.length; k++) {
            let obj = this.indices[k];
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.buffer);
            gl.drawElements(obj.primitive, obj.numPoints, gl.UNSIGNED_BYTE, 0);
        }
    }
}