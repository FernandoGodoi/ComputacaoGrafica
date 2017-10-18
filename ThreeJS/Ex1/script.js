// Objeto cena é quem gerencia tudo que deve existir em uma cena
var cena = new THREE.Scene();
// Câmera é uma configuração sobre como e de que posição iremos observar a cena
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//renderizador utilizará a cena e a câera para exibir a imagem
var render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
//O canvas será conthuído pelo renderizador
var canvas = render.domElement;
document.body.appendChild(canvas);
//Todo objeto é composto de geometria e de mateiais!
var geometriaCubo = new THREE.BoxGeometry(1, 1, 1);
var materialCubo = new THREE.MeshLambertMaterial({ color: 0x59fd8b });
var cubo = new THREE.Mesh(geometriaCubo, materialCubo);
cena.add(cubo); //Adicionamos o cubo à cena
var geometriaEsfera = new THREE.SphereGeometry(2, 64, 64);
var materialEsfera = new THREE.MeshLambertMaterial({ color: 0xff0000 });
var esfera = new THREE.Mesh(geometriaEsfera, materialEsfera);
cena.add(esfera);
esfera.position.x += 3;
//Que tal uma luz ambiente com média intensidade?
var luzAmbiente = new THREE.AmbientLight(0x333333);
cena.add(luzAmbiente);
//Adicionamos um ponto de luz (uma lâmpada?)
var luzPonto = new THREE.PointLight(0x888888);
luzPonto.position.set(3, 5, 1);
cena.add(luzPonto);
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

//Atividade 2
var raio = 1;
for (var y = -1; y <= 1; y += 0.01) {
    var x = Math.sqrt(raio * raio - y * y);
    geometriaLinha.vertices.push(new THREE.Vector3(x, y, 0));
    geometriaLinha.vertices.push(new THREE.Vector3(-x, y, 0));
}



var linha = new THREE.Line(geometriaLinha, materialLinha);
cena.add(linha);
camera.position.z = 2;

function desenhar() {
    cubo.rotateX(Math.PI / 90);
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);

document.onkeydown = function(evt) {
    if (evt.keyCode == 65) { //A
        esfera.position.x -= 0.25
    }
    if (evt.keyCode == 68) { //D
        esfera.position.x += 0.25
    }
    if (evt.keyCode == 81) { //A
        luzPonto.position.x -= 0.25
    }
    if (evt.keyCode == 69) { //A
        luzPonto.position.x -= 0.25
    }
}





//Variáveis para avaliar o deslocamento do mouse
var xi;
var yi;

canvas.addEventListener("mousedown", function(e) {
    xi = e.offsetX;
    yi = e.offsetY;
}, false);
//Evento de movimento do mouse (se há botão pressionado)
canvas.addEventListener("mousemove", function(e) {
    if (e.buttons > 0) {
        camera.position.x = 8 * (xi - e.offsetX) / canvas.width;
        camera.position.y = 8 * (e.offsetY - yi) / canvas.height;
        var pos = new THREE.Vector3(cubo.position.x, cubo.position.y, cubo.position.z);
        camera.lookAt(pos);
    }
}, false);