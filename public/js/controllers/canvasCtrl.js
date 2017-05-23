angular.module('app').controller('canvasCtrl', function($scope, mainService) {

  let canvas = angular.element(document.querySelector('#canvas'));
  $scope.elementColor = "white";

  $scope.myFunc = function(myE) {
    $scope.x = myE.clientX;
    $scope.y = myE.clientY;
  }


  $scope.startDraw = function(event) {
    $scope.showShadow = true;
    $scope.showShadow2 = false;
    $scope.tempXLocation = event.clientX;
    $scope.tempYLocation = event.clientY;

  }

  $scope.draw = function(event) {
    $scope.x1 = $scope.tempXLocation;
    $scope.y1 = $scope.tempYLocation;
    $scope.x2 = event.clientX;
    $scope.y2 = event.clientY;

    if ($scope.tempXLocation > event.clientX) {
      $scope.xLocation = event.clientX
    } else {
      $scope.xLocation = $scope.tempXLocation;
    }

    if ($scope.tempYLocation > event.clientY) {
      $scope.yLocation = event.clientY - 76
    } else {
      $scope.yLocation = $scope.tempYLocation - 76;
    }

    if ($scope.x2 > $scope.x1) {
      $scope.shapeWidth = $scope.x2 - $scope.x1;
    } else {
      $scope.shapeWidth = $scope.x1 - $scope.x2;
    }
    if ($scope.y2 > $scope.y1) {
      $scope.shapeHeight = $scope.y2 - $scope.y1;
    } else {
      $scope.shapeHeight = $scope.y1 - $scope.y2;
    }
  }

  $scope.endDraw = function(event) {
    $scope.showShadow = false;
    $scope.showShadow2 = true;
    $scope.shadowX = event.clientX - $scope.tempXLocation;
    $scope.shadowY = event.clientY - $scope.tempYLocation;
    // $scope.shadowXLocation = $scope.tempXLocation;
    // $scope.shadowYLocation = $scope.tempYLocation;

    if ($scope.tempXLocation > event.clientX) {
      $scope.shadowXLocation = event.clientX
    } else {
      $scope.shadowXLocation = $scope.tempXLocation;
    }

    if ($scope.tempYLocation > event.clientY) {
      $scope.shadowYLocation = event.clientY - 76
    } else {
      $scope.shadowYLocation = $scope.tempYLocation - 76;
    }

    if ($scope.x2 > $scope.x1) {
      $scope.shadowX = $scope.x2 - $scope.x1;
    } else {
      $scope.shadowX = $scope.x1 - $scope.x2;
    }
    if ($scope.y2 > $scope.y1) {
      $scope.shadowY = $scope.y2 - $scope.y1;
    } else {
      $scope.shadowY = $scope.y1 - $scope.y2;
    }

  }

  $scope.createTextBox = function() {
    canvas.append("<svg width='100%' height='100%'><g><rect x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move;' /><text x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " font-family='verdana' font-size='18'>Hello</text></g>   </svg>")
    $scope.showShadow2 = false;
  }

  $scope.createEllipse = function() {
    canvas.append("<svg width='100%' height='100%'><ellipse cx=" + ($scope.shadowXLocation + ($scope.shadowX / 2)) + " cy=" + ($scope.shadowYLocation + ($scope.shadowY / 2)) + " rx=" + ($scope.shadowX / 2) + " ry=" + ($scope.shadowY / 2) + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move;' />    </svg>")
    $scope.showShadow2 = false;
  }

  $scope.createCircle = function() {
    canvas.append("<svg width='100%' height='100%'><circle cx=" + ($scope.shadowXLocation + ($scope.shadowX / 2)) + " cy=" + ($scope.shadowYLocation + ($scope.shadowX / 2)) + " r=" + ($scope.shadowX / 2) + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move;' />    </svg>")
    $scope.showShadow2 = false;
  }

  $scope.createRoundedBox = function() {
    canvas.append("<svg width='100%' height='100%'><rect x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " rx='20' ry='20' width=" + $scope.shadowX + " height=" + $scope.shadowY + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move;' />    </svg>")
    $scope.showShadow2 = false;
  }

  $scope.createBox = function() {
    canvas.append("<svg width='100%' height='100%'><rect x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move;' />  </svg>")
    $scope.showShadow2 = false;
  }






////////////////////////////////////////////
//
//   var click=false; // flag to indicate when shape has been clicked
//     var clickX, clickY; // stores cursor location upon first click
//     var moveX=0, moveY=0; // keeps track of overall transformation
//     var lastMoveX=0, lastMoveY=0; // stores previous transformation (move)
//     function mouseDown(evt){
//         evt.preventDefault(); // Needed for Firefox to allow dragging correctly
//         click=true;
//         clickX = evt.clientX;
//         clickY = evt.clientY;
//         evt.target.setAttribute("fill","green");
//     }
//
//     function move(evt){
//         evt.preventDefault();
//         if(click){
//             moveX = lastMoveX + ( evt.clientX – clickX );
//             moveY = lastMoveY + ( evt.clientY – clickY );
//
//             evt.target.setAttribute("transform", "translate(" + moveX + "," + moveY + ")");
//         }
//     }
//
//     function endMove(evt){
//         click=false;
//         lastMoveX = moveX;
//         lastMoveY = moveY;
//         evt.target.setAttribute("fill","gray");
//     }
//
//
// // <svg width="800" height="600" style="border: 1px solid black; background: #E0FFFF;">
// // <circle id="mycirc" cx="60" cy="60" r="22" onmousedown='mouseDown(evt)' onmousemove='move(evt)' onmouseup='endMove(evt)' onmouseout='endMove(evt)' />
// // </svg>

})
