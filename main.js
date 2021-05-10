status = "";
objects = [];
function preload(){}
function setup(){
    canvas = createCanvas("480,380");
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function draw(){
    image(video,0,0,480,380);
    if(status !=""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object mentioned Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects are : "+objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+""+percent+"%"+objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].length);
        }
    }
    if(objects[i].label == result){
        video.stop();
        objectDetector.detect(gotResult);
    }
    else{
        document.getElementById("status").innerHTML = result + "found";
    }
}
function starti(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    result = document.getElementById("input").value;
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(result);
    synth.start(utterThis);
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}