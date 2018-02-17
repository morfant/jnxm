var playing = false;
var input, button, greeting;
var charLength = 0;
var binNum = 0;
var binName = "";
var binPrinting = false;
var binPrintInterval = 100; //ms
var binText;
var inputPosX = 450;
var inputPosY = 500;
var greet = "넥슨컴퓨터박물관에 오신 것을 환영합니다.\n\n이름을 입력하세요."
var greeting_posY = 200;
var enterInput = false;
var textVelY = 20;
var cnt = 0;
var charIdx = 0;
var fontWidth = 30;
var charXPoses;

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

      // trigger recursive function
      if (!binPrinting) {
        binPrinting = true;
        printBins();
      }

    }
  }

  push();
  translate(width/2, greeting_posY);
  text(greet, 0, 0);
  pop();

  if (binPrinting) {
    for (var i = 0; i < cnt; i++) {
      var posX = (width - (fontWidth * binNum)) / 2; // console.log(posX);
      text(binName[i], posX + i * fontWidth, 600);

      stroke(255);
      if (i == cnt - 1) line(charXPoses[charIdx], 150, posX + i * fontWidth, 550)
    }
  }


  // console.log(binName);
  // binText.html(binName);
  // console.log("draw()");
}

function printBins() {
  cnt++;
  if (binName[cnt] == ' ') charIdx++;
  if (cnt < binNum) setTimeout(printBins, binPrintInterval);
}

function keyTyped() {

  if (keyCode === ENTER) {
    enterInput = true;

    var str = input.value();
    charLength = str.length;

    analyzeText(str);
    binNum = binNum + (charLength - 1); // add num of space
    console.log("binNum: " + binNum);

    charXPoses = [];
    // charXPoses
    if (charLength == 1) {
      charXPoses[0] = width/2;
    } else if (charLength == 2) {
      charXPoses[0] = width/2 - (fontWidth);
      charXPoses[1] = width/2 + (fontWidth);
    } else if (charLength == 3) {
      charXPoses[0] = width/2 - (fontWidth + fontWidth/2);
      charXPoses[1] = width/2;
      charXPoses[2] = width/2 + (fontWidth + fontWidth/2);
    } else if (charLength == 4) {
      charXPoses[0] = width/2 - (fontWidth * 2);
      charXPoses[1] = width/2 - (fontWidth * 1);
      charXPoses[2] = width/2 + (fontWidth * 1);
      charXPoses[3] = width/2 + (fontWidth * 2);
    }



    binName = text2Binary(str);
    console.log("binName: " + binName);
    // console.log(binName[binNum-1]);

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

