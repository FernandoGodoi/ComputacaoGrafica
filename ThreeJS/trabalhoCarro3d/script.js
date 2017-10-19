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


//https://books.google.com.br/books?id=Zw08CgAAQBAJ&pg=PA81&lpg=PA81&dq=adicionando+textura+a+um+THREE.Mesh&source=bl&ots=9JlQFBPx6V&sig=DGvSG7crXJEXW1nkxfMQAgDoG-s&hl=pt-BR&sa=X&ved=0ahUKEwiOlomz6f3WAhUGQpAKHfFvAW8Q6AEIYDAN#v=onepage&q=adicionando%20textura%20a%20um%20THREE.Mesh&f=false
//Carro
var geometriaCarro = new THREE.BoxGeometry(0.5, 0.3, 0.2);
var textura = THREE.ImageUtils.loadTexture('car.png');
var materialCarro = new THREE.MeshLambertMaterial({ map:textura/*color: 0x59fd8b*/ });

var carro = new THREE.Mesh(geometriaCarro, materialCarro);
cena.add(carro); //Adicionamos o Carro à cena




//Luz
var luzAmbiente = new THREE.AmbientLight(0x333333);
cena.add(luzAmbiente);

var luzPonto = new THREE.PointLight(0x888888);
luzPonto.position.set(3, 5, 1);
cena.add(luzPonto);

//Curva
var curva = new THREE.SplineCurve([
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(1, 2.5, 0),
    new THREE.Vector3(2, 3.2, 0),
    new THREE.Vector3(3, 3.6, 0),
    new THREE.Vector3(3.5, 2, 0),
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(2, -2, 0),
    new THREE.Vector3(0, -2.8, 0),
    new THREE.Vector3(-1, -2, 0),
    new THREE.Vector3(-2, -1.5, 0),
    new THREE.Vector3(-3, 0, 0),
    new THREE.Vector3(-4, 1, 0),
    new THREE.Vector3(-4.3, 1.5, 0),
    new THREE.Vector3(-4, 3, 0),
    new THREE.Vector3(-3, 3.5, 0),
    new THREE.Vector3(-2, 2.5, 0),
    new THREE.Vector3(-1, 2.2, 0),
    new THREE.Vector3(0, 2, 0)
]);
var materialLinha = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
var caminho = new THREE.Path(curva.getPoints(1000));
var geometriaLinha = caminho.createPointsGeometry(1000);
var linha = new THREE.Line(geometriaLinha, materialLinha);
cena.add(linha);

// var i = 750;
// carro.rotateZ(Math.atan2((caminho.getPoints(0)[i].y-caminho.getPoints(0)[i-1].y),
// (caminho.getPoints(0)[i].x-caminho.getPoints(0)[i-1].x)));
// carro.position.x = caminho.getPoints(0)[i].x;
// carro.position.y = caminho.getPoints(0)[i].y;


//Camera
camera.position.z = 1 ;
camera.position.y = -5;
camera.rotateX(0.55*Math.PI);
var i = 0;

function desenhar() {
    // carro.position.x = caminho.getPoints(0)[i].x;
    // carro.position.y = caminho.getPoints(0)[i].y;
    // carro.rotateZ((Math.atan2(caminho.getPoints(0)[i+1].y-caminho.getPoints(0)[i].y),
    // (caminho.getPoints(0)[i+1].x-caminho.getPoints(0)[i].x))+
    //                (Math.atan2(caminho.getPoints(0)[i].y-caminho.getPoints(0)[i-1].y),
    // (caminho.getPoints(0)[i].x-caminho.getPoints(0)[i-1].x)));



    // console.log(i);
    // i++;



    carro.rotation.z = (Math.atan2((caminho.getPoints(0)[i + 1].y - caminho.getPoints(0)[i].y),
        (caminho.getPoints(0)[i + 1].x - caminho.getPoints(0)[i].x)));


    console.log(i + "   angulo:" + (Math.atan2((caminho.getPoints(0)[i + 1].y - caminho.getPoints(0)[i].y),
        (caminho.getPoints(0)[i + 1].x - caminho.getPoints(0)[i].x))));
    carro.position.x = caminho.getPoints(0)[i].x;
    carro.position.y = caminho.getPoints(0)[i].y;
    i++;
    if (i == 1000) {
        i = 0;
    }

    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);

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
        var pos = new THREE.Vector3(carro.position.x, carro.position.y, carro.position.z);
        camera.lookAt(pos);
    }
}, false);