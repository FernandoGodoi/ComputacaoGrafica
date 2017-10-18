"use strict"
// Objeto cena é quem gerencia tudo que deve existir em uma cena
var cena = new THREE.Scene();
// Câmera é uma configuração sobre como e de que posição iremos observar a cena
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
//renderizador utilizará a cena e a câera para exibir a imagem
var render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
//O canvas será conthuído pelo renderizador
var canvas = render.domElement;
document.body.appendChild(canvas);
//Vamos desenhar a linha. quer dizer o circulo!
var materialLinha = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
var geometriaLinha = new THREE.Geometry();
/*
//Atividade 1
var raio = 1;
for (var ang = 0; ang <= Math.PI * 2; ang += Math.PI / 180) {
    var x = raio * Math.cos(ang);
    var y = raio * Math.sin(ang);
    geometriaLinha.vertices.push(new THREE.Vector3(x, y, 0));
}
var x = raio * Math.cos(ang);
var y = raio * Math.sin(ang);
geometriaLinha.vertices.push(new THREE.Vector3(x, y, 0));
*/
/*
//Atividade 2
var raio = 1;
for (var y = -1; y <= 1; y += 0.01) {
    var x = Math.sqrt(raio * raio - y * y);
    geometriaLinha.vertices.push(new THREE.Vector3(x, y, 0));
    geometriaLinha.vertices.push(new THREE.Vector3(-x, y, 0));
}
*/
/*
//Atividade 3 Herme
var p1 = new THREE.Vector3(-0.5, 0, 0);
var t1 = new THREE.Vector3(0, 2, 0);
var p2 = new THREE.Vector3(0.5, 0, 0);
var t2 = new THREE.Vector3(0, -2, 0);

for (var s = 0; s <= 1; s += 0.01) {
    var s2 = s * s;
    var s3 = s2 * s;
    var h1 = 2 * s3 - 3 * s2 + 1;
    var h2 = -2 * s3 + 3 * s2;
    var h3 = s3 - 2 * s2 + s;
    var h4 = s3 - s2;
    var pt = new THREE.Vector3(0, 0, 0);
    pt.add(p1.clone().multiplyScalar(h1));
    pt.add(p2.clone().multiplyScalar(h2));
    pt.add(t1.clone().multiplyScalar(h3));
    pt.add(t2.clone().multiplyScalar(h4));
    geometriaLinha.vertices.push(pt);
}
*/


//Atividade 4 Curva de Bezier
var curva = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-1, 1.3, 0),
    new THREE.Vector3(1, 1.3, 0),
    new THREE.Vector3(1, 0, 0)
);
geometriaLinha.vertices = curva.getPoints(500); //Resolucao
var linha = new THREE.Line(geometriaLinha, materialLinha);
cena.add(linha);
var curva2 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-1, -1.3, 0),
    new THREE.Vector3(1, -1.3, 0),
    new THREE.Vector3(1, 0, 0)
);
var geometriaLinha2 = new THREE.Geometry();
geometriaLinha2.vertices = curva2.getPoints(4); //Resolucao
var linha2 = new THREE.Line(geometriaLinha2, materialLinha);
cena.add(linha2);

/*
//Atividade 5 Spline

var curva = new THREE.SplineCurve([
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1.5, 0.5, 0),
    new THREE.Vector3(2, 0, 0)
]);

var caminho = new THREE.Path(curva.getPoints(50));
var geometriaLinha = caminho.createPointsGeometry(50);

var materialPonto = new THREE.PointsMaterial({ size: 10, sizeAttenuation: false });
for (let p of curva.points) {
    var geometriaPonto = new THREE.Geometry();
    geometriaPonto.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
    var ponto = new THREE.Points(geometriaPonto, materialPonto);
    cena.add(ponto);
}
*/

var linha = new THREE.Line(geometriaLinha, materialLinha);
cena.add(linha);
camera.position.z = 5;
var cima = false;

function iteracao() {

    if (curva.v1.y > 3 || curva.v1.y < 0) {
        cima = !cima;
    }
    if (cima) {
        curva.v1.y += 0.01;
        curva.v1.x -= 0.01;
        curva.v2.y -= 0.01;

    } else {
        curva.v1.y -= 0.01;
        curva.v1.x += 0.01;
        curva.v2.y += 0.01;
    }
    geometriaLinha.vertices = curva.getPoints(500); //Resolucao
    var linha = new THREE.Line(geometriaLinha, materialLinha);
    cena.add(linha);
    linha.geometry.verticesNeedUpdate = true;
}

function desenhar() {
    iteracao();
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);