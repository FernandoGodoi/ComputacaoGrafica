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
//Que tal uma luz ambiente com média intensidade?
var luzAmbiente = new THREE.AmbientLight(0x333333);
cena.add(luzAmbiente);
//Adicionamos um ponto de luz (uma lâmpada?)
var luzPonto = new THREE.PointLight(0x888888);
luzPonto.position.set(3, 5, 1);
cena.add(luzPonto);

function gerarCilindroLinhas(raio = 1, altura = 2, pRaio = 8) {
    var geometria = new THREE.Geometry();
    for (var a = 0; a <= Math.PI * 2; a += (math.PI * 2) / pRaio) {
        var x = Math.sin(a) * raio;
        var z = Math.con(a) * raio;
        var v = new THREE.Vector3(x, -altura / 2, z);
        geometria.vertices.push(v);
        v = new THREE.Vector3(x, altura / 2, z);
        geometria.vertices.push(v);
    }
    return geometria;
}



function desenhar() {
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);