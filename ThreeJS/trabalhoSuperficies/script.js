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
var luzAmbiente = new THREE.AmbientLight(0xffffff);
cena.add(luzAmbiente);

var chaoGeometry = new THREE.PlaneGeometry(200, 200)
var chaoMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
var chao = new THREE.Mesh(chaoGeometry, chaoMaterial);
//chao.receiveShadow = true;
chao.rotation.x = -0.5 * Math.PI;
chao.position.y = -1;
cena.add(chao);

//Casa
function gerarCasa() {
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(-2.5, -1, 98));
    geo.vertices.push(new THREE.Vector3(-0.5, -1, 98));
    geo.vertices.push(new THREE.Vector3(-2.5, 4, 98));
    geo.vertices.push(new THREE.Vector3(-0.5, 4, 98));
    geo.vertices.push(new THREE.Vector3(-0.5, 1.5, 98));
    geo.vertices.push(new THREE.Vector3(0.5, 1.5, 98));
    geo.vertices.push(new THREE.Vector3(0.5, 4, 98)); //6
    geo.vertices.push(new THREE.Vector3(0.5, -1, 98));
    geo.vertices.push(new THREE.Vector3(2.5, -1, 98));
    geo.vertices.push(new THREE.Vector3(2.5, 4, 98));



    geo.faces.push(new THREE.Face3(0, 1, 2));
    geo.faces.push(new THREE.Face3(1, 2, 3));
    geo.faces.push(new THREE.Face3(4, 5, 3));
    geo.faces.push(new THREE.Face3(5, 6, 3));
    geo.faces.push(new THREE.Face3(7, 8, 6));
    geo.faces.push(new THREE.Face3(8, 9, 6));
    geo.computeFaceNormals();
    return geo;
}

var forma = new THREE.Mesh(gerarCasa(1, 1), new THREE.MeshPhongMaterial({ color: 0xeeee00 }));
//forma.material.wireframe = true;
forma.material.side = THREE.DoubleSide;
cena.add(forma);


camera.position.z = 120;

function desenhar() {
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);