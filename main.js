var camera, scene, renderer;
var theta = 0;
var random_v = [];
var seal = [];
var bear = [];
var shark = [];
var seal_count = 0;
var bear_count = 0;
var shark_count = 0;
var penguin = [];
var random_distance = 0;

var superPenguinState = 0;
var currentSuperPenguinTime;

//meshs
var icebergs, penguin, seal, bear, shark, snowballs, item;
var snowCount = 10;

var collidableMeshList = [];

//size
var maxX = 2000, maxY = 2000, maxZ = 1000;

init();

//조합
function randCom(total, object) {
    //total개 중에 object개 뽑기

    var lotto = new Array(object);
    var count = 0;
    var overl = true;

    while (count < object) {
        var number = 0;
        number = parseInt(Math.random() * total) + 1;
        for (var i = 0; i < count; i++) {
            if (lotto[i] == number) {
                overl = false;
            }
        }
        if (overl) {
            lotto[count] = number;
            count++;
        }
        overl = true;
    }
    return lotto;
}
function collision() {
    firstBB = new THREE.Box3().setFromObject(penguin);

    for (index = 0; index < collidableMeshList.length; index++) {
        secondBB = new THREE.Box3().setFromObject(collidableMeshList[index]);
        var coll = firstBB.isIntersectionBox(secondBB);
        if (coll) {
            collidableMeshList.splice(index, 1);
            return 1;

        }

    }
    return 0;
}

//mesh remove
function remove(id) {
    scene.remove(scene.getObjectByName(id));
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! function random 부분
function random(random_v, i, j) {
    if (random_v == 0) {
        seal.push(drawSeal(400 * j, -600 - i * 450, -600));
        var position_seal = [seal[seal_count].position.x, seal[seal_count].position.y, seal[seal_count].position.z];

        seal[seal_count].rotation.z += 90 * Math.PI / 180;
        //seal[seal_count].position.y+=-800;
        seal[seal_count].position.z += 500;
        seal[seal_count].position.x -= 500;
        //seal[seal_count].position.y-=random_distance*400;

        scene.add(seal[seal_count]);
        seal_count++;

    }

    else if (random_v == 1) {
        bear.push(drawBear(400 * j, -600 - i * 450, -600));
        bear[bear_count].rotation.z += 90 * Math.PI / 180;
        bear[bear_count].position.z += 500;
        bear[bear_count].position.x -= 500;
        //bear[bear_count].position.y-=random_distance*400;
        scene.add(bear[bear_count]);
        bear_count++;


    }
    else if (random_v == 2) {
        shark.push(drawShark(400 * j, -600 - i * 450, -600));
        shark[shark_count].rotation.z += 90 * Math.PI / 180;
        shark[shark_count].position.z += 500;
        shark[shark_count].position.x -= 500;


        //shark[shark_count].position.y+=600+i*450;

        scene.add(shark[shark_count]);
        shark_count++;


    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!! function randommove 부분
function randommove(randomObject) {

    if (randomObject == 0) {
        var sealy = (theta * 200) % maxY + 100;
        for (var l = 0; l < seal_count; l++) {

            var speed;
            var line = seal[l].position.y;
            /*
            if(line>maxY)
            {seal[l].position.y%=maxY;
    
            }
            if(line < 200) speed = 3;
            else if(line >=200 && line <600) speed = 5;
            else if(line >=600 && line <1500) speed = 2;
    
            else speed = 7;
    */
            seal[l].position.y = sealy - 2000;
        }

    }

    else if (randomObject == 1) {

        var beary = (theta * 200) % maxY + 100;
        for (var l = 0; l < bear_count; l++) {
            bear[l].position.y = beary - 2100;
            var speed;
            var line = bear[l].position.x;
            if (line < 200) speed = 3;
            else if (line >= 200 && line < 600) speed = 5;
            else speed = 7;

        }

    }

    else if (randomObject == 2) {

        var sharky = (theta * 200) % maxY + 100;
        for (var l = 0; l < shark_count; l++) {
            shark[l].position.y = sharky - 3000
            var speed;
            var line = shark[l].position.x;
            if (line < 200) speed = 3;
            else if (line >= 200 && line < 600) speed = 5;
            else speed = 7;


        }
    }
}


//mesh 장면에 추가
function meshAdd() {
    /*iceberg*/
    icebergs = [];
    iceLoc = randCom(20, 10);
    for (var i = 0; i < 10; i++) {
        var ice = drawIce(iceLoc[i] * 100 - 50, 0, 0);
        icebergs.push(ice);
        scene.add(ice);
    }


    /*snowball*/
    //ver 1. create a snowball

    snowballs = [];
    for (var i = 0; i < snowCount; i++) {
        var snowball = drawSnowBall(Math.random() * maxX, Math.random() * maxY - 1000, 500);
        snowballs.push(snowball);
        scene.add(snowball);
    }

    penguin = drawPeng(0, 0, -40);
    penguin.scale.set(0.8, 0.8, 0.8);
    scene.add(penguin);


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    random_distance = Math.random() * 500 + 300;
    for (var a = 0; a < 5; a++) {
        for (var i = 0; i < 5; i++) {
            random_v.push(parseInt(Math.random() * 3));
            random(random_v[i + a * 5], i, a);

        }

        random_distance = Math.random() * 500 + 300;
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 188~202 번까지

    //cloud
    for (i = 0; i < 10; i++) {
        var cloud = drawCloud(500 * Math.random() * Math.pow(2, i), Math.random() * 300 * Math.pow(-1, i), Math.random() * 600);
        scene.add(cloud);
    }


    //items
    item = drawItem(0, 0, 40);
    scene.add(item);
    collidableMeshList.push(item)

}

//water 생성
function setWater() {
    /* Water */
    //처음 2개까지로만 크기 조절.
    var waterGeo = new THREE.PlaneGeometry(maxX, maxY, 50, 50);
    var waterMat = new THREE.MeshPhongMaterial({
        color: 0x3366CC,
        emissive: 0x009999,
        opacity: 0.5,
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
    return waterObj;
}



function init() {
    //size
    var width = window.innerWidth;
    var height = window.innerHeight;

    //render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    //mesh add
    scene = new THREE.Scene;
    meshAdd();

    //camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.set(-1000, -1000, 1000);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    //--배경

    var materialArray = [];
    var texture_ft = new THREE.TextureLoader().load('img/fadeaway_ft.jpg');
    var texture_bk = new THREE.TextureLoader().load('img/fadeaway_bk.jpg');
    var texture_up = new THREE.TextureLoader().load('img/fadeaway_up.jpg');
    var texture_dn = new THREE.TextureLoader().load('img/fadeaway_dn.jpg');
    var texture_rt = new THREE.TextureLoader().load('img/fadeaway_rt.jpg');
    var texture_lf = new THREE.TextureLoader().load('img/fadeaway_lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf, side: THREE.BackSide }));

    //여기까지----

    //background
    var skyboxGeometry = new THREE.BoxGeometry(maxX + 1, maxY + 1, maxZ);
    var skybox = new THREE.Mesh(skyboxGeometry, materialArray);
    skybox.position.set(1000, 50, 0);
    scene.add(skybox);



    //light
    //뒤쪽 조명
    var Light = new THREE.DirectionalLight(0xffffff, 0.8);
    //var pointLight = new THREE.PointLight(0xffffff);
    Light.position.set(-500, -250, 350);
    scene.add(Light);
    //앞쪽조명
    var Light2 = new THREE.DirectionalLight(0xffffff, 0.6);
    Light2.position.set(500, 250, 350);
    scene.add(Light2);
    //위쪽 조명
    var Light3 = new THREE.DirectionalLight(0xffffff, 0.1);
    Light3.position.set(0, 0, maxZ);
    scene.add(Light3);



    var waterObj = setWater();
    waterObj.position.set(1000, 50, -80);
    scene.add(waterObj);


    //움직임
    var animate = function () {
        setTimeout(
            requestAnimationFrame(animate), 100);
        theta += 0.01;

        //wave
        var particle, i = 0;
        var count = theta * 2;
        for (var ix = 0; ix < 50; ix++) {
            for (var iy = 0; iy < 50; iy++) {
                waterObj.geometry.vertices[i++].z = (Math.sin((ix + count) * 2) * 3) +
                    (Math.cos((iy + count) * 1.5) * 6);
                waterObj.geometry.verticesNeedUpdate = true;
            }
        }


        for (var i = 0; i < 26; i++) {

            randommove(random_v[i]);
        }
        //snowball
        for (var j = 0; j < snowCount; j++) {
            var speed = Math.random() * 30 + 1;
            if (snowballs[j].position.z <= -500) {
                snowballs[j].position.z = 500;
            }
            snowballs[j].position.z -= speed;
        }





        camera.position.set(5000, 0, 1500);
        //camera.position.y = Math.cos(theta)*2000;
        //camera.position.x = Math.sin(theta)*2000;
        camera.lookAt(0, 0, 0);


        movePengForward(penguin);
        //contraryPenguin(penguin);




        renderer.render(scene, camera);


        //충돌하면 return 1 그리고 list에서 해당 object 제외.
        //item effect
        if (collision() == 1) {
            //var itemRandNum = Math.floor(Math.random()*10);
            var itemRandNum = 0
            if (itemRandNum == 0) {
                superPenguinState = 1;
                scene.remove(item)
                superPenguin(penguin);
            }
            else if (itemRandNum == 1) {
                contraryPenguin(penguin);
            }
        }

    }

    animate();

    function movePengForward(penguin) {
        var xSpeed = 1;
        var ySpeed = 1;
        if (superPenguinState == 1) {
            xSpeed = 3;
            currentSuperPenguinTime = theta;
        }
        document.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {
            var keyCode = event.which;
            if (keyCode == 37)   //right
            {
                penguin.position.y += ySpeed / theta;
            }
            if (keyCode == 39)   //left
            {
                penguin.position.y -= ySpeed / theta;
            }
            if (keyCode == 38)   //front
            {
                //TODO:뛰는건 아직...
                /*
                //penguin move
                var pengx = (theta * 200) % maxX;
                penguin.position.x = pengx;
                pengx %= 100;
                var pengz = -1 * (pengx - 50) * (pengx - 50) + 2500;
                pengz /= 50;
                penguin.position.z = pengz;
    */
                penguin.position.x += xSpeed / theta;
                if (penguin.position.x > maxX) {
                    penguin.position.x %= maxX;
                }
            }
        }

        if (theta - currentSuperPenguinTime >= 0.01) {
            penguin.scale.set(0.8, 0.8, 0.8);
        }

    }

    function superPenguin(penguin) {
        penguin.scale.set(2.0, 2.0, 2.0);
    }
    function contraryPenguin(penguin, theta) {
        var xSpeed = 1;
        var ySpeed = 1;

        document.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {
            var keyCode = event.which;
            if (keyCode == 39)   //right
            {
                penguin.position.y += ySpeed / theta;
            }
            if (keyCode == 37)   //left
            {
                penguin.position.y -= ySpeed / theta;
            }
            if (keyCode == 38)   //front
            {
                //TODO:뛰는건 아직...
                /*
                //penguin move
                var pengx = (theta * 200) % maxX;
                penguin.position.x = pengx;
                pengx %= 100;
                var pengz = -1 * (pengx - 50) * (pengx - 50) + 2500;
                pengz /= 50;
                penguin.position.z = pengz;
    */
                penguin.position.x += xSpeed / theta;
                if (penguin.position.x > maxX) {
                    penguin.position.x %= maxX;
                }
            }
        }
    }
}