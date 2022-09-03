song1="";
song2="";
song1_status="";
song2_status="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
function preload(){
    song1 = loadSound("ryuk.mp3");
    song2 = loadSound("L.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet is Initialized');
}
function draw(){
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist>0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "L theme song is playing";
        }
    }
    if(scorerightwrist>0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Ryuk theme song is playing";
        }
    }
}
function gotPoses(results){
    if(results.length > 0){
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y" + rightWristY);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}