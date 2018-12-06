var ctracker; // face tracking
var videoInput;
var xPosRectMask = 10; // rectange boo x position
var xStepRectMask = 100; // rectange boo x step

var imgDogNose, imgDogEarRight, imgDogEarLeft;
var emojiFace;

function preload() {
  imgDogNose = loadImage("assets/dog-nose.png");
  imgDogEarRight = loadImage("assets/dog-ear-right.png");
  imgDogEarLeft = loadImage("assets/dog-ear-left.png");
  emojiFace = loadImage("assets/tiger-face.png");
}

function setup() {
  
  // camera capture
  videoInput = createCapture();
  videoInput.size(800, 600);
  videoInput.position(0, 0);
  videoInput.loop();

  var cnv = createCanvas(800, 600);
  cnv.position(0,0);

  // tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
}

function draw() {
  clear();
  noStroke();
  //drawDogFace();

  drawEmoji();
}

function drawEmoji() {
  var positions = ctracker.getCurrentPosition();
  if (positions != false) {
    push();
    translate(-100, -100);
    image(emojiFace, positions[62][0], positions[62][1]);
    pop();
  }
}

function drawDogFace() {
  var positions = ctracker.getCurrentPosition();
  if (positions != false) {
    for (var i = 0; i < positions.length; i++) {
      if (i == 62) {
        push();
        translate(-57, -20);
        image(imgDogNose, positions[i][0], positions[i][1]);
        pop();
      }
      if (i == 20) {
        push();
        translate(-100, -150);
        image(imgDogEarRight, positions[i][0], positions[i][1]);
        pop();
      }
      if (i == 16) {
          push();
          translate(-20, -150);
          image(imgDogEarLeft, positions[i][0], positions[i][1]);
          pop();
      }
    }
  }
}