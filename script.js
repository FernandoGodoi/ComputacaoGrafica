//indica ao navegador para trabalhar estritamente com dados ja definidos
"use strict";
//recupera a referência ao objeto do canvas HTML
var canvas = document.getElementById("tela");
//recupera o contexto de desenho bidimencional do canvas
var ctx = canvas.getContext("2d"); //Nao utilizado em webGL
var x = 200,
    y = 100,
    larg = 20,
    alt = 20;
var ang = 0;
var vel = 0;
var x2 = 400,
    y2 = 100,
    larg = 30,
    alt = 30;
var ang2 = 0;

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255,128,0)";
    ctx.fillRect(x, y, larg, alt);
    requestAnimationFrame(desenhar);
}

function desenhar2() {
    var lado = 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(50, 50);
    ctx.fillStyle = "rgb(255,128,0)";
    ctx.fillRect(-lado / 2, -lado / 2, lado, lado);
    ctx.translate(100, 0);
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillRect(-lado / 2, -lado / 2, lado, lado);
    ctx.restore();
    ctx.save();
    ctx.translate(10, 10);
    ctx.fillStyle = "rgb(0,0,200)";
    ctx.fillRect(-lado / 2, -lado / 2, lado, lado);
    ctx.restore();
    requestAnimationFrame(desenhar2);
}

function desenhar3() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0,0,200)";
    ctx.strokeStyle = "rgb(255,128,0)";
    ctx.lineWidth = 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    y = y + vel;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 0);
    ctx.stroke();
    ctx.fillRect(-larg / 2, -alt / 2, larg, alt);
    ctx.restore();
    ctx.save();
    ctx.translate(x2, y2);
    ctx.rotate(ang2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 0);
    ctx.stroke();
    ctx.fillRect(-larg / 2, -alt / 2, larg, alt);
    ctx.restore();
    requestAnimationFrame(desenhar3);

}

function circulo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255,128,0)";
    ctx.arc(x, y, larg, 0, 2 * Math.PI);
    ctx.fill();
    requestAnimationFrame(circulo);
}

function triangulo() {

    ctx.beginPath();
    ctx.fillStyle = "rgb(255,128,0)";
    ctx.moveTo(100, 100);
    ctx.lineTo(50, 150);
    ctx.lineTo(150, 150);
    ctx.lineTo(100, 100);
    ctx.fill();
    ctx.closePath();
    requestAnimationFrame(triangulo);

}

function triangulo2() {

    ctx.clearRect(-canvas.width, -canvas.height, 2 * canvas.width, 2 * canvas.height);
    //ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,128,0)";
    ctx.moveTo(0, -50);
    ctx.lineTo(50, 50);
    ctx.lineTo(-50, 50);
    ctx.lineTo(0, -50);
    ctx.fill();
    ctx.closePath();
    requestAnimationFrame(triangulo2);

}

function mover(v1, v2) {
    x += (Math.cos(ang) * v1) + (-Math.sin(ang) * v2);
    y += (Math.sin(ang) * v1) + (Math.cos(ang) * v2);


}

function carro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    processaTecla();
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.moveTo(15, 15);
    ctx.lineTo(15, -15);
    ctx.lineTo(5, -15);
    ctx.lineTo(5, -50);
    ctx.lineTo(-5, -50);
    ctx.lineTo(-5, -15);
    ctx.lineTo(-15, -15);
    ctx.lineTo(-15, 15);
    ctx.lineTo(15, 15);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(110,110,110)";
    ctx.fillRect(-13, -45, 8, 12);
    ctx.fillRect(5, -45, 8, 12);
    ctx.fillRect(-23, -3, 8, 12);
    ctx.fillRect(15, -3, 8, 12);
    ctx.closePath();
    ctx.restore();
    requestAnimationFrame(carro);


}

//indica ao navegador o que executar quando estiver pronto para realizar uma nova renderizaçao
//requestAnimationFrame(desenhar);
//requestAnimationFrame(triangulo2);ctx.translate(320,240);
//requestAnimationFrame(desenhar2);
//requestAnimationFrame(desenhar3);
requestAnimationFrame(carro);

//tarefa1: verificar codigo de teclas das setas em evt.keyCode e fazer o retangulo mover com base na direção das setas.

/*
document.onkeydown = function (evt){
   console.log(evt.keyCode)
    
    if(evt.keyCode == 38){ctx.translate(0,-5);}
    if (evt.keyCode == 40){ctx.translate(0,5);}
    if(evt.keyCode == 37){ctx.translate(-5,0);}
    if (evt.keyCode == 39){ctx.translate(5,0);}
    if (evt.keyCode == 81){ctx.rotate(0.1 * Math.PI);}
    if (evt.keyCode == 69){ctx.rotate(-0.1 * Math.PI);}
}*/
/*
document.onkeydown = function (evt){
   console.log(evt.keyCode)
    
    if (evt.keyCode == 87){y = y-5;}
    if (evt.keyCode == 83){y = y+8;}
    if (evt.keyCode == 65){x = x-5;}
    if (evt.keyCode == 68){x = x+5;}
    if (evt.keyCode == 107){vel = vel+1;}
    if (evt.keyCode == 109){vel = vel-1;}
    if (evt.keyCode == 81){ang = ang + (0.1 * Math.PI);}
    if (evt.keyCode == 69){ang = ang - (0.1 * Math.PI);}
    if (evt.keyCode == 104){y2 = y2-5;}
    if (evt.keyCode == 101){y2 = y2+8;}
    if (evt.keyCode == 100){x2 = x2-5;}
    if (evt.keyCode == 102){x2 = x2+5;}
    if (evt.keyCode == 103){ang2 = ang2 + (0.1 * Math.PI);}
    if (evt.keyCode == 105){ang2 = ang2 - (0.1 * Math.PI);}
}
*/
var keys = [256];
var i = 0;
for (i = 0; i < 255; i++) {
    keys[i] = false;
}

document.onkeyup = function(evt) {
    keys[evt.keyCode] = false;
}

document.onkeydown = function(evt) {
    console.log(evt.keyCode);
    keys[evt.keyCode] = true;
}

function processaTecla() {
    if (keys[104]) { mover(0, -5) }
    if (keys[101]) { mover(0, 5); }
    if (keys[102]) { ang = ang + (0.02 * Math.PI); }
    if (keys[100]) { ang = ang - (0.02 * Math.PI); }
}