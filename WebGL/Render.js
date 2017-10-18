"use strict"
class Render {
    constructor(canvasID) {
            this.ang = Math.PI * 0.1;
            this.canvas = document.getElementById(canvasID);
            try {
                this.gl = this.canvas.getContext("webgl");
                this.gl.viewport(0, 0, this.canvas.width, this.gl.canvas.height);
            } catch (e) {
                var msg = "Error WenGL: " + e.toString();
                alert(msg);
                throw Error(msg);
            }
            if (!this.gl) {
                console.error("Erro ao iniciar o WebGL");
                return
            }
            var vertexShaderSource = document.getElementById("meu-vertex-shader").text;
            var fragmentShaderSource = document.getElementById("meu-fragment-shader").text;

            // criamos os shaders GLSL: upload do fonte e compilamos

            var vertexShader = Render.createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
            var fragmentShader = Render.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);

            //ligamos os dois shaders em um programa
            this.programa = Render.createProgram(this.gl, vertexShader, fragmentShader);
            //PRocuramos a posição de memoria dos dados do vertice
            this.positionAttributeLocation = this.gl.getAttribLocation(this.programa, "posicao");
            //Criamos um buffer para inserir as coordenadas nele
            this.positionBuffer = this.gl.createBuffer();
            //Associamos o buffer criado a ARRAY_BUFFER
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

            this.gl.useProgram(this.programa);
            // Recuperamos o local da variavel uniform cahama u_escala
            this.matrixLocation = this.gl.getUniformLocation(this.programa, "u_escala");
            //criamos a matriz que será multiplicada pelos vertices
            /*this.matriz = [this.canvas.height / this.canvas.width, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];*/
            this.matriz = [
                0.9998, 0.0174, 0, 0, -0.0174, 0.9998, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];

        } //fim do construtor
    draw() {

        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        //Escolhe qual programa utilizar
        this.gl.useProgram(this.programa);
        //Realiza uploa da matrizz de transformacao para u_escala
        this.matriz = this.rotacionarY(this.ang);
        this.ang += Math.PI / 180;
        this.gl.uniformMatrix4fv(this.matrixLocation, false, this.matriz);
        var positions = [0, 0, 0, 0, 0.5, 0, 0.5, 0, 0];
        //COlocamos as coordenadas no buffer
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
        //Ativa o atributo
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);
        //Associa ao position buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        //Explica como usar os dados do positionBuffer
        var size = 3; //3 compones por iteração
        var type = this.gl.FLOAT; // os dados são 32bit floats
        var normalize = false; //sem normalizar os dados
        var stride = 0; //0 - espoço entre dados (usado para representar cores, por exemplo))
        var offset = 0; //posição inivial do buffer
        this.gl.vertexAttribPointer(this.positionArrtibuteLocation, size, type, normalize,
            stride, offset);

        //desenhar!
        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        this.gl.drawArrays(primitiveType, offset, count);
    }
    rotacionarZ(ang) {
        var c = Math.cos(ang);
        var s = Math.sin(ang);
        return [
            c, s, 0, 0, -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

    }
    rotacionarX(ang) {
        var c = Math.cos(ang);
        var s = Math.sin(ang);
        return [
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        ];

    }
    rotacionarY(ang) {
        var c = Math.cos(ang);
        var s = Math.sin(ang);
        return [
            c, 0, s, 0,
            0, 1, 0, 0, -s, 0, c, 0,
            0, 0, 0, 1
        ];

    }

    static createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(gl.getShaderInfolog(shader));
        gl.deleteShader(shader);
    }
    static createProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        console.log(gl.getShaderInfolog(program));
        gl.deleteShader(program);
    }




} //fim da classe render