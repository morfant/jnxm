var playing = false;
var input, button, greeting;
var charLength = 0;
var binNum = 0;
var binName = "";
var binNamePrinted = false;
var binText;
var inputPosX = 450;
var inputPosY = 500;
var prevEvent = 0;
var greet = "넥슨컴퓨터박물관에 오신 것을 환영합니다.\n\n이름을 입력하세요."
var greeting_posY = 200;
var enterInput = false;
var textVelY = 20;

function setup() {
 
  frameRate(30); // Attempt to refresh at starting FPS
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');

  // Text Input 
  input = createInput();
  input.attribute('maxlength', '4');
  input.class("text-field"); // see data/style.css

  // Binary result text
  binText = createElement('h2');
  binText.position(inputPosX, inputPosY + 200);
  binText.id("binText");

}

function draw() {
  background(89, 89, 89);

  // greeting text
  fill(250);
  textAlign(CENTER);
  textSize(50);

  if (enterInput) {
    var name = input.value();
    input.remove();

    push();
    translate(width/2, greeting_posY + 300);
    text(name, 0, 0);
    pop();

    greeting_posY -= textVelY;

    // phase of animation
    if (greeting_posY < -150) {
      textVelY = 0;

      if (!binNamePrinted) {
        for (var i = 0; i < binNum; i++) {
          console.log(binName[i]);
          text(binName[i], 100 + i * 10, 600);
        }
        binNamePrinted = true;
      }

    }
  }

  push();
  translate(width/2, greeting_posY);
  text(greet, 0, 0);
  pop();

  // console.log(binName);
  // binText.html(binName);

}

function keyTyped() {

  if (keyCode === ENTER) {
    enterInput = true;

    var str = input.value();
    charLength = str.length;

    analyzeText(str);
    console.log("binNum: " + binNum);

    binName = text2Binary(str);
    console.log("binName: " + binName);

  } else if (keyCode === 32) {
    console.log("sp");
  }

}

function analyzeText(string) {
  string.split('').map(function (char) {
    var b = char.charCodeAt(0).toString(2).length;
    binNum += b;
  });
}



function text2Binary(string) {
  return string.split('').map(function (char) {
      return char.charCodeAt(0).toString(2);
  }).join(' ');
}

// full screen
function keyPressed() {
  if (key === 'f' || key === 'F') {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
}

