
var vid;
var playing = false;
var completion;

function setup() {
  // createCanvas(320, 180);
  createCanvas(800, 600);
  vid = createVideo("data/test.mp4");
  vid.size(800, 500); 
  vid.hide();
}

function draw() {
  background(50, 50);
  // imageMode(CENTER);
  image(vid, 0, 200);
}

function mousePressed() {
  if (!playing) {
    vid.play();
    playing = true;
  }
  else {
    vid.pause();
    playing = false;
  }
}