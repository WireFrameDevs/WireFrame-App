angular.module('app').controller('canvasCtrl', function ($scope, mainService, $document) {

  let canvas = angular.element(document.querySelector('#canvas'));
  let toolbar = angular.element(document.querySelector('#toolbar'));

  $scope.elementColor = "white";

  $scope.myFunc = function (myE) {
    $scope.x = myE.clientX;
    $scope.y = myE.clientY;
  }

  $scope.number = 1;


  // $scope.createToolbar = function() {
  //   toolbar.append("<div style='position: absolute; top: " + $scope.shadowYLocation + "; left: " + $scope.shadowXLocation + "> <h1>It is a-me, Mario!</h1></div>")
  // }

  // $scope.createToolbar();


  $scope.startDraw = function (event) {
    $scope.toolbarShow = false;
    $scope.x1 = 0;
    $scope.x2 = 0;
    $scope.y1 = 0;
    $scope.y2 = 0;
    $scope.tempXLocation = 0;
    $scope.tempYLocation = 0;
    $scope.shadowX = 0;
    $scope.shadowY = 0;
    $scope.shapeHeight = 0;
    $scope.shapeWidth = 0;
    $scope.showShadow = false;
    $scope.showShadow2 = false;
    $scope.tempXLocation = event.clientX;
    $scope.tempYLocation = event.clientY;
    $scope.toolbarShow = false;
    event.preventDefault();
    $document.on("mousemove", draw);
  }

  function draw(event) {
    $scope.showShadow = true;
    $scope.showShadow2 = false;
    $scope.x1 = $scope.tempXLocation;
    $scope.y1 = $scope.tempYLocation;
    $scope.x2 = event.clientX;
    $scope.y2 = event.clientY;

    if ($scope.tempXLocation >= event.clientX) {
      $scope.xLocation = event.clientX
    } else {
      $scope.xLocation = $scope.tempXLocation;
    }

    if ($scope.tempYLocation >= event.clientY) {
      $scope.yLocation = event.clientY - 60
    } else {
      $scope.yLocation = $scope.tempYLocation - 60;
    }

    if ($scope.x2 >= $scope.x1) {
      $scope.shapeWidth = $scope.x2 - $scope.x1;
    } else {
      $scope.shapeWidth = $scope.x1 - $scope.x2;
    }
    if ($scope.y2 >= $scope.y1) {
      $scope.shapeHeight = $scope.y2 - $scope.y1;
    } else {
      $scope.shapeHeight = $scope.y1 - $scope.y2;
    }
  }

  $scope.endDraw = function (event) {
    $scope.showShadow = false;
    $scope.showShadow2 = true;
    $scope.shadowX = event.clientX - $scope.tempXLocation;
    $scope.shadowY = event.clientY - $scope.tempYLocation;

    if ($scope.tempXLocation >= event.clientX) {
      $scope.shadowXLocation = event.clientX
    } else {
      $scope.shadowXLocation = $scope.tempXLocation;
    }

    if ($scope.tempYLocation >= event.clientY) {
      $scope.shadowYLocation = event.clientY - 60
    } else {
      $scope.shadowYLocation = $scope.tempYLocation - 60;
    }

    if ($scope.x2 >= $scope.x1) {
      $scope.shadowX = $scope.x2 - $scope.x1;
    } else {
      $scope.shadowX = $scope.x1 - $scope.x2;
    }
    if ($scope.y2 >= $scope.y1) {
      $scope.shadowY = $scope.y2 - $scope.y1;
    } else {
      $scope.shadowY = $scope.y1 - $scope.y2;
    }
    let shadowYtoolbar = $scope.shadowYLocation.toString() + "px";
    let shadowXtoolbar = $scope.shadowXLocation.toString() + "px";
    $scope.toolbarStyle = {
      "position": "absolute",
      "top": shadowYtoolbar,
      "left": shadowXtoolbar
    }

    $document.unbind("mousemove", draw);
    if ($scope.shadowX > 5 || $scope.shadowY > 5) {
      $scope.toolbarShow = true;
    }

  }

  $scope.createBox = function () {
    canvas.append("<svg class='draggable' width='100%' height='100%'><rect x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move'; id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "' />  </svg>")
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
  }


  $scope.createEllipse = function () {
    canvas.append("<svg width='100%' height='100%'><ellipse cx=" + ($scope.shadowXLocation + ($scope.shadowX / 2)) + " cy=" + ($scope.shadowYLocation + ($scope.shadowY / 2)) + " rx=" + ($scope.shadowX / 2) + " ry=" + ($scope.shadowY / 2) + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move;' />    </svg>")
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
  }

  $scope.createCircle = function () {
    canvas.append("<svg width='100%' height='100%'><circle cx=" + ($scope.shadowXLocation + ($scope.shadowX / 2)) + " cy=" + ($scope.shadowYLocation + ($scope.shadowX / 2)) + " r=" + ($scope.shadowX / 2) + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move;' />    </svg>")
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
  }

  $scope.createRoundedBox = function () {
    canvas.append("<svg width='100%' height='100%'><rect x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " rx='20' ry='20' width=" + $scope.shadowX + " height=" + $scope.shadowY + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move;' />    </svg>")
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
  }

  // $scope.createBox = function () {
  //   $scope.boxid = "a" + $scope.number++;
  //   canvas.append("<svg ng-click='shapeclick' width='100%' height='100%'><rect ng-mouseover='mouseenter($event)' ng-mouseleave=mouseleave($event) id= " + $scope.boxid + " x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " style='fill:" + $scope.elementColor + ";stroke:black;stroke-width:1;opacity:0.8;cursor:move;' />  </svg>")
  //   $scope.showShadow2 = false;
  //   $scope.toolbarShow = false;
  //   $document.ready();
  // }

  // $scope.shapeclick = function(event) {
  //   $scope.boxid = $(event.target).attr("id");
  //   console.log($scope.boxid);
  // }
  $scope.mouseenter = function (event) {
    // console.log(event);
    console.log("mouse enter");
    $document.on('mousedown', mousedown);
    $document.on('mouseup', mouseup);
  }
//    $scope.startDraw = function (event) {
// -    $scope.showShadow = true;
// +    $scope.toolbarShow = false;
// +    $scope.x1 = 0;
// +    $scope.x2 = 0;
// +    $scope.y1 = 0;
// +    $scope.y2 = 0;
// +    $scope.tempXLocation = 0;
// +    $scope.tempYLocation = 0;
// +    $scope.shadowX = 0;
// +    $scope.shadowY = 0;
// +    $scope.shapeHeight = 0;
// +    $scope.shapeWidth = 0;
// +    $scope.showShadow = false;
//      $scope.showShadow2 = false;
//      $scope.tempXLocation = event.clientX;
//      $scope.tempYLocation = event.clientY;
// +    $scope.toolbarShow = false;
// +    event.preventDefault();
// +    $document.on("mousemove", draw);
})
