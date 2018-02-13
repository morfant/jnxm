
var vid;
var playing = false;
var completion;
var input, button, greeting;
var textLength = 0;
var binName = "";
var binText;
var inputPosX = 450;
var inputPosY = 500;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');

  // video
  // vid = createVideo("data/test.mp4");
  // vid.size(800, 600); 
  // vid.hide();

  // text input
  greeting = createElement('h2', '넥슨컴퓨터박물관에 오신 것을 환영합니다. </br> </br> 이름을 입력하세요.');
  greeting.position(300, 80);
  greeting.class("greeting-text");

  input = createInput();
  input.position(inputPosX, inputPosY);
  input.attribute('maxlength', '4');
  input.class("textField"); // see data/style.css

  // submit button
  // button = createButton('submit');
  // button.position(input.x + input.width, 165);
  // button.mousePressed(greet); // function to run when click submit

  textAlign(CENTER);
  textSize(50);

  binText = createElement('h2');
  binText.position(inputPosX, inputPosY + 200);
  binText.id("binText");

}

function draw() {
  background(89, 89, 89);
  // imageMode(CENTER);
  // image(vid, 0, 0); // set video position
  var t = selectAll('.textField');

  // console.log(binName);
  binText.html(binName);

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

function keyTyped() {

  if (keyCode === ENTER) {
    var str = select('.textField').elt.value;
    textLength = str.length;
    console.log(textLength);
    console.log("enter!");
    console.log("value: " + str);
    // korToUnicode();
    binName = text2Binary(str);
    console.log("binName: " + binName);

  } else if (keyCode === 32) {
    console.log("sp");
  }

}

// full screen
function keyPressed() {
  if (key === 'f' || key === 'F') {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}


// function replaceAll(strTemp, strValue1, strValue2){ 
// 	console.log(strTemp);
//   while(1){
//     if( strTemp.indexOf(strValue1) != -1 )
//       strTemp = strTemp.replace(strValue1, strValue2);
//     else
//       break;
//   }
//   return strTemp;
// }

// function unicodeToKor(){
//   //유니코드 -> 한글
//   var str=document.getElementById("a").value;
//   document.getElementById("b").value=unescape(replaceAll(str, "\\", "%"));
// }

// function korToUnicode(){
//   //한글 -> 유니코드
//   var str = select('.textField').elt.value;
//   // var rslt = escape(replaceAll(str, "\\", "%"));
//   var rslt = escape(str);

//   console.log("escaped: " + rslt);
//   var unicodes = specialCharRemove(rslt);
//   console.log("specialchar removed: " + unicodes);
//   arr_unicode = unicodes.split("u");
//   console.log("splited: " + arr_unicode);

// }

function text2Binary(string) {
  return string.split('').map(function (char) {
      return char.charCodeAt(0).toString(2);
  }).join(' ');
}

// function specialCharRemove(str) {
//   var tstr = str;
//   var pattern = /[^(a-zA-Z0-9)]/gi;   // 특수문자 제거
   
//   //var pattern = /[^(0-9)]/gi;   // 숫자이외는 제거
   
//   if(pattern.test(tstr)){
//     tstr = tstr.replace(pattern,"");
//   }
//   return tstr;
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
