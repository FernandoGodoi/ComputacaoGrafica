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

//Carro
var geometriaCarro = new THREE.BoxGeometry(0.5, 0.3, 0.2);
var materialCarro = new THREE.MeshLambertMaterial({ color: 0x59fd8b });
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



//Camera
camera.position.z = 4;
var i = 0;

function desenhar() {
    carro.position.x = caminho.getPoints(0)[i].x;
    carro.position.y = caminho.getPoints(0)[i].y;
    i++;
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