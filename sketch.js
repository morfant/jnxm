var serial;
var portName = "/dev/cu.usbmodem1461";
var msg_date;


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
var textMag = 0;
var binNumMag = 0;


function setup() {
 
  var d = new Date();
  msg_date = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
  console.log(msg_date);

  frameRate(30); // Attempt to refresh at starting FPS
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');


  serial = new p5.SerialPort();
  console.log(serial.list());
  serial.open(portName);



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

  // greeting text 
  textSize(50);
  push();
  translate(width/2, greeting_posY);
  text(greet, 0, 0);
  pop();

  if (enterInput) {
    var name = input.value();
    input.remove();

    // textSize(50 + textMag);
    textSize(50 + binNumMag);
    push();
    translate(width/2, greeting_posY + 300);
    text(name, 0, 0);
    pop();

    greeting_posY -= textVelY/2;
    if (textMag < 50) textMag += 5;

    // phase of animation
    if (greeting_posY < -150 && numbersPrinted == false) {
      greet = "";
      textVelY = 0; // velocity Y is zero = will not move anymore

      // trigger recursive function
      if (!binPrinting) {
        binPrinting = true;
        printBins();
      }

    } else if (numbersPrinted) {
      if (greeting_posY < 150) {
        // textVelY = -10;
        // textMag += 10;
      } else {
        textVelY = 0;
      }

    }

  }

  if (binPrinting) {
    for (var i = 0; i < cnt; i++) {
      var posX = (width - (fontWidth * binNum)) / 2; // console.log(posX);

      // textSize(50 + binNumMag);
      textSize(50);
      text(binName[i], posX + i * fontWidth, 600);

      // bin number pointing line
      stroke(113, 246, 79, 100);
      if (!numbersPrinted) {
        if (i == cnt - 1) line(charXPoses[charIdx], 150, posX + i * fontWidth, 550)
      }
    }

    for (var i = 0; i < cnt; i++) {
      // console.log(binName[i]);
      if (binName[i] == '0'){
        binNumMag = 0;
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
        binNumMag = 200;

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

    if (numbersPrinted) {
      binNumMag = 0;


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

  greet = "넥슨컴퓨터박물관에 오신 것을 환영합니다.\n\n이름을 입력하세요."

  // recreate Text Input 
  // console.log(select('.text-field'));
  if (select('.text-field') == null) {
    input = createInput();
    input.attribute('maxlength', '4');
    input.class("text-field"); // see data/style.css
  }

  enterInput = false;
  binPrinting = false;
  numbersPrinted = false;
  greeting_posY = 200;
  textVelY = 20;
  textMag = 0;

}


function printBins() {
  console.log("printBins()");
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
    console.log("enter input!");
    enterInput = true;

    // reset variables
    binNum = 0;
    binName = null;
    cnt = 0;
    charIdx = 0;


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
    console.log(msg_date);
    serial.write(msg_date);

  } else if (keyCode === BACKSPACE) {
    console.log("reset()");
    reset();
  } else {
    // console.log(keyCode);
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

