var playing = false;
var input, button, greeting;
var charLength = 0;
var binNum = 0;
var binName = "";
var binPrinting = false;
var numbersPrinted = false;
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
var firstCharBin;
var first = true;

function setup() {
 
  frameRate(30); // Attempt to refresh at starting FPS
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');

  // Text Input 
  input = createInput();
  input.attribute('maxlength', '4');
  input.class("text-field"); // see data/style.css

  // Binary result text
  // binText = createElement('h2');
  // binText.position(inputPosX, inputPosY + 200);
  // binText.id("binText");

}

function draw() {
  background(89, 89, 89);
  // background(21, 21, 21);

  // greeting text
  fill(250);
  noStroke();
  // fill(113, 246, 79);
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

      stroke(113, 246, 79, 100);
      if (!numbersPrinted) {
        if (i == cnt - 1) line(charXPoses[charIdx], 150, posX + i * fontWidth, 550)
      }
    }

    for (var i = 0; i < cnt; i++) {
      // console.log(binName[i]);
      if (binName[i] == '0'){
        // rect
        noStroke();
        fill(0);
        rect(posX + (i-0.5) * (fontWidth), 620, 30, 30);

        // pulse
        stroke(255, 200);
        line(posX + (i-0.5) * (fontWidth), 700, posX + (i+0.5) * (fontWidth), 700);
        if (binName[i-1] == '1') {
          line(posX + (i-0.5) * (fontWidth), 700, posX + (i-0.5) * (fontWidth), 670);
        }

        // punch hole
        // noStroke();
        ellipse(posX + i * fontWidth, 730, 20, 20);
      } else if (binName[i] == '1'){

        // rect
        noStroke();
        fill(255);
        rect(posX + (i-0.5) * (fontWidth), 620, 30, 30);

        // pulse
        stroke(255, 200);
        line(posX + (i-0.5) * (fontWidth), 670, posX + (i+0.5) * (fontWidth), 670);
        if (binName[i-1] == '0') {
          line(posX + (i-0.5) * (fontWidth), 670, posX + (i-0.5) * (fontWidth), 700);
        }

        // punch hole
        // noStroke();
        // ellipse(posX + i * fontWidth, 730, 20, 20);

      } else if (binName[i] == ' ') {
        // console.log("except: " + binName[i]);
      }
    }

    // draw barcode
    /*
    if (numbersPrinted) {
      console.log("draw barcode");
      var img = createElement('img');
      img.id("barcode");
      var posX = (width - (30 * binNum)) / 2;
      img.position(posX, 760);
      // img.position(0, 760);

      JsBarcode("#barcode", binName, {
        format: "CODE128",
        background: "#595959",
        lineColor: "white",
        width:3,
        height:50,
        displayValue: false,
        fontSize: 36
      });

      numbersPrinted = false;
    }
    */

  }


  // console.log(binName);
  // binText.html(binName);
  // console.log("draw()");
}


function reset() {

  // Text Input 
  input = createInput();
  input.attribute('maxlength', '4');
  input.class("text-field"); // see data/style.css

  enterInput = false;
  binPrinting = false;
  numbersPrinted = false;


}


function printBins() {
  cnt++;
  if (binName[cnt] == ' ') charIdx++;

  if (cnt < binNum) {
    setTimeout(printBins, binPrintInterval);
  } else {
    numbersPrinted = true; // it's going to print barcode image
    console.log("numbersPrinted: " + numbersPrinted);
  }
}

function keyTyped() {

  if (keyCode === ENTER) {
    enterInput = true;

    binNum = 0;
    binName = null;

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
    console.log("firstCharBin: " + firstCharBin);
    // console.log(binName[binNum-1]);

  } else if (keyCode === 32) {
    console.log("sp");
  } else if (keyCode === CONTROL) { // delete key
    console.log("reset()");
    reset();
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
    if (first){
      firstCharBin = char.charCodeAt(0).toString(2);
      first = false;
    }
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

