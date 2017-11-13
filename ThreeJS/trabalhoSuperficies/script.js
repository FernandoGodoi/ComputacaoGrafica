"use strict"
// Objeto cena é quem gerencia tudo que deve existir em uma cena
var cena = new THREE.Scene();
// Câmera é uma configuração sobre como e de que posição iremos observar a cena
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
//renderizador utilizará a cena e a câera para exibir a imagem
var render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
render.shadowMapEnabled = true;
//O canvas será conthuído pelo renderizador
var canvas = render.domElement;
document.body.appendChild(canvas);
//Que tal uma luz ambiente com média intensidade?
var luzAmbiente = new THREE.AmbientLight(0x333333);
cena.add(luzAmbiente);
//Loader
var loader = new THREE.TextureLoader();

//Luz Ponto
var light = new THREE.PointLight(0xFFFFFF);
light.position.set(20, 40, -15);
light.castShadow = true;
light.shadowDarkness = 0.5;
light.shadowCameraVisible = true;
light.shadowCameraRight = 5;
light.shadowCameraLeft = -5;
light.shadowCameraTop = 5;
light.shadowCameraBottom = -5;
cena.add(light);


var chaoGeometry = new THREE.BoxGeometry(200, 1, 200)
var chaoMaterial = new THREE.MeshLambertMaterial({ map: loader.load('Rua2.png') });
chaoMaterial.map.wrapS = chaoMaterial.map.wrapT = THREE.RepeatWrapping;
chaoMaterial.map.repeat.set(2, 2);
var chao = new THREE.Mesh(chaoGeometry, chaoMaterial);
chao.position.y = -1;
chao.receiveShadow = true;
cena.add(chao);

//Casa
function gerarCasa(x, z, material, lado) {
    var geo = new THREE.Geometry();



    if (lado == 1) {
        //Frente
        geo.vertices.push(new THREE.Vector3(-2.5 + x, -1, 5 + z));
        geo.vertices.push(new THREE.Vector3(-0.5 + x, -1, 5 + z));
        geo.vertices.push(new THREE.Vector3(-2.5 + x, 4, 5 + z));
        geo.vertices.push(new THREE.Vector3(-0.5 + x, 4, 5 + z));
        geo.vertices.push(new THREE.Vector3(-0.5 + x, 1.5, 5 + z));
        geo.vertices.push(new THREE.Vector3(0.5 + x, 1.5, 5 + z));
        geo.vertices.push(new THREE.Vector3(0.5 + x, 4, 5 + z)); //6
        geo.vertices.push(new THREE.Vector3(0.5 + x, -1, 5 + z));
        geo.vertices.push(new THREE.Vector3(2.5 + x, -1, 5 + z));
        geo.vertices.push(new THREE.Vector3(2.5 + x, 4, 5 + z));


        //Fundos
        geo.vertices.push(new THREE.Vector3(-2.5 + x, -1, -5 + z));
        geo.vertices.push(new THREE.Vector3(-2.5 + x, 4, -5 + z));
        geo.vertices.push(new THREE.Vector3(2.5 + x, -1, -5 + z));
        geo.vertices.push(new THREE.Vector3(2.5 + x, 4, -5 + z));

        geo.vertices.push(new THREE.Vector3(0 + x, 5, 4.5 + z));
        geo.vertices.push(new THREE.Vector3(0 + x, 5, -4.5 + z));
        geo.faces.push(new THREE.Face3(14, 2, 9));
        geo.faces.push(new THREE.Face3(15, 13, 11));
        geo.faces.push(new THREE.Face3(2, 11, 14));
        geo.faces.push(new THREE.Face3(14, 11, 15));
        geo.faces.push(new THREE.Face3(9, 14, 13));
        geo.faces.push(new THREE.Face3(13, 14, 15));
    } else {
        //Frente
        geo.vertices.push(new THREE.Vector3(-2.5 + x, -1, -5 + z));
        geo.vertices.push(new THREE.Vector3(-0.5 + x, -1, -5 + z));
        geo.vertices.push(new THREE.Vector3(-2.5 + x, 4, -5 + z));
        geo.vertices.push(new THREE.Vector3(-0.5 + x, 4, -5 + z));
        geo.vertices.push(new THREE.Vector3(-0.5 + x, 1.5, -5 + z));
        geo.vertices.push(new THREE.Vector3(0.5 + x, 1.5, -5 + z));
        geo.vertices.push(new THREE.Vector3(0.5 + x, 4, -5 + z)); //6
        geo.vertices.push(new THREE.Vector3(0.5 + x, -1, -5 + z));
        geo.vertices.push(new THREE.Vector3(2.5 + x, -1, -5 + z));
        geo.vertices.push(new THREE.Vector3(2.5 + x, 4, -5 + z));


        //Fundos
        geo.vertices.push(new THREE.Vector3(-2.5 + x, -1, 5 + z));
        geo.vertices.push(new THREE.Vector3(-2.5 + x, 4, 5 + z));
        geo.vertices.push(new THREE.Vector3(2.5 + x, -1, 5 + z));
        geo.vertices.push(new THREE.Vector3(2.5 + x, 4, 5 + z));

        geo.vertices.push(new THREE.Vector3(0 + x, 5, -4.5 + z));
        geo.vertices.push(new THREE.Vector3(0 + x, 5, 4.5 + z));
        geo.faces.push(new THREE.Face3(14, 2, 9));
        geo.faces.push(new THREE.Face3(15, 13, 11));
        geo.faces.push(new THREE.Face3(2, 11, 14));
        geo.faces.push(new THREE.Face3(14, 11, 15));
        geo.faces.push(new THREE.Face3(9, 14, 13));
        geo.faces.push(new THREE.Face3(13, 14, 15));


    }
    geo.faces.push(new THREE.Face3(0, 1, 2));
    geo.faces.push(new THREE.Face3(1, 3, 2));
    geo.faces.push(new THREE.Face3(4, 5, 3));
    geo.faces.push(new THREE.Face3(5, 6, 3));
    geo.faces.push(new THREE.Face3(7, 8, 6));
    geo.faces.push(new THREE.Face3(8, 9, 6));

    geo.faces.push(new THREE.Face3(11, 12, 10));
    geo.faces.push(new THREE.Face3(13, 12, 11));



    //laterais
    geo.faces.push(new THREE.Face3(10, 0, 11));
    geo.faces.push(new THREE.Face3(11, 0, 2));
    geo.faces.push(new THREE.Face3(8, 12, 9));
    geo.faces.push(new THREE.Face3(9, 12, 13));

    //Telhado





    geo.computeFaceNormals();
    var casa = new THREE.Mesh(geo, material)
    casa.material.side = THREE.DoubleSide;
    return casa;
}

//https://www.pinterest.co.kr/geovanimuraro/texturas-trabalho-up/
//Material
var materialTijolo = new THREE.MeshLambertMaterial({ map: loader.load('textura_tijolos.jpg') })
var materialPredio = new THREE.MeshLambertMaterial({ map: loader.load('predio.jpg') })
var materialPredio2 = new THREE.MeshLambertMaterial({ map: loader.load('predio2.jpg') })
var materialPredio3 = new THREE.MeshLambertMaterial({ map: loader.load('predio3.jpg') })
var materialPredio4 = new THREE.MeshLambertMaterial({ map: loader.load('predioVidros.jpg') })
materialPredio4.map.wrapS = materialPredio4.map.wrapT = THREE.RepeatWrapping;
materialPredio4.map.repeat.set(1, 4);


var materialCasa = new THREE.MeshPhongMaterial({ color: 0x333333 });






//adiciona Predio
function gerarPredio(x, z, material, altura) {
    var boxGeometria = new THREE.BoxGeometry(5, altura, 10);
    var box = new THREE.Mesh(boxGeometria, material);
    box.position.x = x;
    box.position.y = altura / 2 - 1;
    box.position.z = z;
    box.castShadow = true;
    box.receiveShadow = false;
    return box;
}

// Add
//Predios
cena.add(gerarPredio(10, 65, materialPredio, 10));
cena.add(gerarPredio(50, 65, materialPredio, 10));
cena.add(gerarPredio(-10, 65, materialPredio2, 10));
cena.add(gerarPredio(0, 65, materialPredio3, 10));
cena.add(gerarPredio(-20, 65, materialPredio4, 30));
//Casas
cena.add(gerarCasa(30, 65, materialCasa, 0));
cena.add(gerarCasa(30, 38, materialCasa, 1));


//forma.material.wireframe = true;


camera.position.z = 50;

function desenhar() {
    render.render(cena, camera);
    processaTecla();
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);


var xi;
var yi;

canvas.addEventListener("mousedown", function(e) {
    xi = e.offsetX;
    yi = e.offsetY;
}, false);
canvas.addEventListener("mousemove", function(e) {
    if (e.buttons > 0) {
        camera.position.x = 30 * (xi - e.offsetX) / canvas.width;
        camera.position.y = 50 * (e.offsetY - yi) / canvas.height;
    }
}, false);

var keys = [256];
var i = 0;
for (i = 0; i < 255; i++) {
    keys[i] = false;
}

document.onkeyup = function(evt) {
    keys[evt.keyCode] = false;
}

document.onkeydown = function(evt) {
    keys[evt.keyCode] = true;
}

function processaTecla() {
    if (keys[104]) { camera.position.z += 0.5; }
    if (keys[101]) { camera.position.z -= 0.5; }
    if (keys[102]) { camera.rotation.y -= 0.02 * Math.PI; }
    if (keys[100]) { camera.rotation.y += 0.02 * Math.PI; }
}