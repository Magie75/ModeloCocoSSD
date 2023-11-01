imag = "";
object = [];
Status = "";

function preload() {
    imag = loadImage('dog_cat.jpg');
    //video = createVideo('video.mp4');
    video2 = createVideo('screen-capture.mp4');
    video = createVideo('video.mp4');
}

function setup() {
    canvas = createCanvas(540, 320);
    canvas.center();
    //objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    //objectDetector2 = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estado del modelo encendido";

    video.hide();

    video2.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estado del modelo encendido";
}

function stop() {
    video.stop();
    video.hide();
}

function start2() {
    //objectDetector2 = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estado del modelo encendido";
}

function stop2() {
    video2.stop();
    video2.hide();
}

function modelLoaded() {
    console.log("El modelo esta inicializado");
    Status = true;
    objectDetector.detect(video, gotResult);
   //objectDetector2.detect(video2, gotResult);

    video.loop();
    video.speed(1);
    video.volume(1);

    video2.loop();
    video2.speed(1);
    video2.volume(1);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }

    if (results) {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 540, 320);
    image(video2, 0, 0, 540, 320);
    if (Status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i = i + 1) {
            fill('cyan');
            porcentaje = floor(object[i].confidence * 100);
            //0.9 x 100 = 0.9, 09.0 y 090.0 = 90
            text(object[i].label + "" + porcentaje + "%", object[i].x + 15, object[i].y + 15);
            document.getElementById("number_of_objects").innerHTML = "Número de objetos detectados: "+ object.length;
            noFill();
            stroke('light_orange');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}
