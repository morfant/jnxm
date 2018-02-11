
var vid;
var playing = false;
var completion;
var input, button, greeting;
var fullScr = true;

function setup() {
  // createCanvas(320, 180);
  createCanvas(800, 600);

  // video
  vid = createVideo("data/test.mp4");
  vid.size(800, 600); 
  vid.hide();

  // text input
  greeting = createElement('h2', '넥슨컴퓨터박물관에 오신 것을 환영합니다. </br> 이름을 입력하세요.');
  greeting.position(20, 5);

  input = createInput();
  input.position(20, 165);
  input.attribute('maxlength', '4');
  input.class("textField"); // see data/style.css

  // submit button
  // button = createButton('submit');
  // button.position(input.x + input.width, 165);
  // button.mousePressed(greet); // function to run when click submit

  textAlign(CENTER);
  textSize(50);
}

function draw() {
  background(50, 50);
  // imageMode(CENTER);
  image(vid, 0, 0); // set video position
  var t = selectAll('.textField');
}

function greet() {
  var name = input.value();
  greeting.html('hello '+name+'!');
  input.value('');

  for (var i=0; i<200; i++) {
    push();
    fill(random(255), 255, 255);
    translate(random(width), random(height));
    rotate(random(2*PI));
    text(name, 0, 0);
    pop();
  }
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

// full screen
function keyPressed() {
  if (key === 'f' || key === 'F') {
    var fs = fullscreen();
    fullscreen(!fs);
  }
  else if (keyCode === ENTER) {
    console.log(select('.textField').elt.value);

  }
}