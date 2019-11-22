// import * as TMJ from './three.module';
// import { Water } from './Water2';
var camera, scene, renderer;
var theta = 0;

init();
animate();

function init() {
    //ĵ���� ũ��
    var width = window.innerWidth;
    var height = window.innerHeight;

    //������
    renderer = new THREE.WebGLRenderer({ antialias: true }); //antialias : �������� �����ڸ� ǥ�� �Ų��ϰ�
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    //���
    scene = new THREE.Scene;
    var penguin = drawPeng(0, 100, 100);
    scene.add(penguin);
    var seal = drawSeal(0, 100, -100);
    scene.add(seal);
    var bear = drawBear(0, -100, -100);
    scene.add(bear);
    var shark = drawShark(0, -100, 100);
    scene.add(shark);
    //��鿡 �޽� �߰�

    //ī�޶� ����
    //�þ�, ��Ⱦ��, ��ü�� ī�޶��� �����Ÿ�, �ִ� �Ÿ�
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.y = 300;
    camera.position.z = 0;
    camera.position.x = 300;
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);//��鿡 ī�޶� �߰�


    //���� �޽�
    var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.BackSide });
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

    scene.add(skybox);//��鿡 ��� �߰�


    //����
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(300, 200, 200);

    scene.add(pointLight);


    // var textureloader = new TMJ.TextureLoader();
    // textureLoader.load('./ocean/textures/floors/FloorsCheckerboard_S_Diffuse.jpg', function (map) {

    //     map.wrapS = THREE.RepeatWrapping;
    //     map.wrapT = THREE.RepeatWrapping;
    //     map.anisotropy = 16;
    //     map.repeat.set(4, 4);
    //     groundMaterial.map = map;
    //     groundMaterial.needsUpdate = true;

    // });

  


    /* Water */
    //처음 2개까지로만 크기 조절.

    var waterGeo = new THREE.PlaneGeometry(800, 2000, 50, 50);
    var waterMat = new THREE.MeshPhongMaterial({
        color: 0x3366CC,
        emissive: 0x009999,
        shading: THREE.FlatShading,
        shininess: 60,
        specular: 30,
        transparent: true
    });

    for (var j = 0; j < waterGeo.vertices.length; j++) {
        waterGeo.vertices[j].x = waterGeo.vertices[j].x + ((Math.random() * Math.random()) * 30);
        waterGeo.vertices[j].y = waterGeo.vertices[j].y + ((Math.random() * Math.random()) * 20);
    }

    var waterObj = new THREE.Mesh(waterGeo, waterMat);
    waterObj.position.z-=80
    scene.add(waterObj);



    var count = 0;

    //������
    var animate = function () {
        requestAnimationFrame(animate);

        var particle, i = 0;
        for (var ix = 0; ix < 50; ix++) {
            for (var iy = 0; iy < 50; iy++) {
                waterObj.geometry.vertices[i++].z = (Math.sin((ix + count) * 2) * 3) +
                    (Math.cos((iy + count) * 1.5) * 6);
                waterObj.geometry.verticesNeedUpdate = true;
            }
        }

        count += 0.02;

        
        theta += 0.01;
        //penguin.position.x = theta * 100;
        /*var temp = (theta * 10) % 4;
        temp = -1 * (temp - 2) * (temp - 2) + 4;
        penguin.position.z = temp * 20;*/
        

        //camera.position.set(400,200,200)
        camera.position.y = Math.cos(theta)*800;
        camera.position.x = Math.sin(theta)*800;
        camera.position.z = 300;
        camera.lookAt(0, 0, 0);


        renderer.render(scene, camera);
    }
    animate();
}



