
/**
 * ObjectControls
 * @constructor
 * @param camera - reference to the camera.
 * @param domElement - reference to the renderer's dom element.
 * @param objectToMove - reference the object to control.
 */
 function ObjectControls(camera, domElement, objectToMove) {

    /**
    * setObjectToMove
    * @description changes the object to control
    * @param newMesh
    **/
    this.setObjectToMove = function (newMesh) {
      mesh = newMesh;
    };
  
    /**
    * setZoomSpeed
    * @description sets a custom zoom speed (0.1 == slow  1 == fast)
    * @param newZoomSpeed
    **/
    this.setZoomSpeed = function (newZoomSpeed) {
      zoomSpeed = newZoomSpeed;
    };
  
    /**
    * setDistance
    * @description set the zoom range distance
    * @param {number} min
    * @param {number} max 
    **/
    this.setDistance = function (min, max) {
      minDistance = min;
      maxDistance = max;
    };
  
    /**
    * setRotationSpeed
    * @param {number} newRotationSpeed - (1 == fast)  (0.01 == slow)
    **/
    this.setRotationSpeed = function (newRotationSpeed) {
      rotationSpeed = newRotationSpeed;
    };
  
    /**
    * setRotationSpeedTouchDevices
    * @param {number} newRotationSpeed - (1 == fast)  (0.01 == slow)
    **/
    this.setRotationSpeedTouchDevices = function (newRotationSpeed) {
      rotationSpeedTouchDevices = newRotationSpeed;
    };
  
    this.enableVerticalRotation = function () {
      verticalRotationEnabled = true;
    };
  
    this.disableVerticalRotation = function () {
      verticalRotationEnabled = false;
    };
  
    this.enableHorizontalRotation = function () {
      horizontalRotationEnabled = true;
    };
  
    this.disableHorizontalRotation = function () {
      horizontalRotationEnabled = false;
    };
  
    this.setMaxVerticalRotationAngle = function (min, max) {
      MAX_ROTATON_ANGLES.x.from = min;
      MAX_ROTATON_ANGLES.x.to = max;
      MAX_ROTATON_ANGLES.x.enabled = true;
    };
  
    this.setMaxHorizontalRotationAngle = function (min, max) {
      MAX_ROTATON_ANGLES.y.from = min;
      MAX_ROTATON_ANGLES.y.to = max;
      MAX_ROTATON_ANGLES.y.enabled = true;
    };
  
    this.disableMaxHorizontalAngleRotation = function () {
      MAX_ROTATON_ANGLES.y.enabled = false;
    };
  
    this.disableMaxVerticalAngleRotation = function () {
      MAX_ROTATON_ANGLES.x.enabled = false;
    };
  
    this.disableZoom = function() {
      zoomEnabled = false;
    }
  
    this.enableZoom = function() {
      zoomEnabled = true;
    }
  
    domElement = (domElement !== undefined) ? domElement : document;
  
    /********************* Private control variables *************************/
  
    const MAX_ROTATON_ANGLES = {
      x: {
        // Vertical from bottom to top.
        enabled: true,
        from: Math.PI,
        to: Math.PI
      },
      y: {
        // Horizontal from left to right.
        enabled: true,
        from: Math.PI ,
        to: Math.PI
      },
      z: {
        enabled: true,
        from: Math.PI,
        to: Math.PI
      },
    };
  
    let
      flag,
      mesh = objectToMove,
      maxDistance = 15,
      minDistance = 6,
      zoomSpeed = 0.5,
      rotationSpeed = 0.05,
      rotationSpeedTouchDevices = 0.05,
      isDragging = true,
      verticalRotationEnabled = true,
      horizontalRotationEnabled = true,
      zoomEnabled = false,
      mouseFlags = { MOUSEDOWN: 0, MOUSEMOVE: 1 },
      previousMousePosition = { x: 0, y: 0 },
      prevZoomDiff = { X: null, Y: null },
      /**
      * CurrentTouches
      * length 0 : no zoom
      * length 2 : is zoomming
      */
      currentTouches = [];
  
    /***************************** Private shared functions **********************/
  
    function zoomIn() {
      camera.position.z -= zoomSpeed;
    }
  
    function zoomOut() {
      camera.position.z += zoomSpeed;
    }
  
    /**
     * isWithinMaxAngle
     * @description Checks if the rotation in a specific axe is within the maximum
     * values allowed.
     * @param delta is the difference of the current rotation angle and the
     *     expected rotation angle
     * @param axe is the axe of rotation: x(vertical rotation), y (horizontal
     *     rotation)
     * @return true if the rotation with the new delta is included into the
     *     allowed angle range, false otherwise
     */
    function isWithinMaxAngle(delta, axe) {
      if (MAX_ROTATON_ANGLES[axe].enabled) {
        
        const condition = ((MAX_ROTATON_ANGLES[axe].from * -1) <
          (mesh.rotation[axe] + delta)) &&
          ((mesh.rotation[axe] + delta) < MAX_ROTATON_ANGLES[axe].to);
        return condition ? true : false;
      }
      return true;
    }
  
    function resetMousePosition() {
      previousMousePosition = { x: 0, y: 0 };
    }
  
    /******************  MOUSE interaction functions - desktop  *****/
    function mouseDown(e) {
      isDragging = true;
      flag = mouseFlags.MOUSEDOWN;
    }
  
    function mouseMove(e) {
      e.preventDefault()
      if (isDragging && e.shiftKey) {
        const deltaMove = {
          x: e.offsetX - previousMousePosition.x,
          y: e.offsetY - previousMousePosition.y
        };
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
  
        if (horizontalRotationEnabled && deltaMove.x !== 0)
        // && (Math.abs(deltaMove.x) > Math.abs(deltaMove.y))) {
        // enabling this, the mesh will rotate only in one specific direction
        // for mouse movement
        {
          if (!isWithinMaxAngle(Math.sign(deltaMove.x) * rotationSpeed, 'y'))
            return;
          mesh.rotation.y += Math.sign(deltaMove.x) * rotationSpeed;
          flag = mouseFlags.MOUSEMOVE;
        }
  
        if (verticalRotationEnabled && deltaMove.y !== 0)
        // &&(Math.abs(deltaMove.y) > Math.abs(deltaMove.x)) //
        // enabling this, the mesh will rotate only in one specific direction for
        // mouse movement
        {   
          if (!isWithinMaxAngle(Math.sign(deltaMove.y) * rotationSpeed, 'x'))
            return;
          mesh.rotation.x += Math.sign(deltaMove.y) * rotationSpeed;
          flag = mouseFlags.MOUSEMOVE;
        }
      } 
      // To rotate over Z
      if (isDragging && e.ctrlKey) {
        const deltaMove = {
          x: e.offsetX - previousMousePosition.x,
          y: e.offsetY - previousMousePosition.y
        };
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
        
        if (horizontalRotationEnabled && deltaMove.x !== 0 ){   
          if (!isWithinMaxAngle(Math.sign(deltaMove.x) * rotationSpeed, 'z'))
            return;
          mesh.rotation.z += Math.sign(deltaMove.x) * rotationSpeed;
          flag = mouseFlags.MOUSEMOVE;
        }
      }
    }
  
    function mouseUp() {
      isDragging = true;
      resetMousePosition();
    }
  
    function wheel(e) {
      if(!zoomEnabled) return;
      const delta = e.wheelDelta ? e.wheelDelta : e.deltaY * -1;
      if (delta > 0 && camera.position.z > minDistance) {
        zoomIn();
      } else if (delta < 0 && camera.position.z < maxDistance) {
        zoomOut();
      }
    }
    /****************** TOUCH interaction functions - mobile  *****/
  
    function onTouchStart(e) {
      e.preventDefault();
      flag = mouseFlags.MOUSEDOWN;
      if (e.touches.length === 2) {
        prevZoomDiff.X = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
        prevZoomDiff.Y = Math.abs(e.touches[0].clientY - e.touches[1].clientY);
        currentTouches = new Array(2);
      } else {
        previousMousePosition = { x: e.touches[0].pageX, y: e.touches[0].pageY };
      }
    }
  
    function onTouchEnd(e) {
      prevZoomDiff.X = null;
      prevZoomDiff.Y = null;
  
      /* If you were zooming out, currentTouches is updated for each finger you
       * leave up the screen so each time a finger leaves up the screen,
       * currentTouches length is decreased of a unit. When you leave up both 2
       * fingers, currentTouches.length is 0, this means the zoomming phase is
       * ended.
       */
      if (currentTouches.length > 0) {
        currentTouches.pop();
      } else {
        currentTouches = [];
      }
      e.preventDefault();
      if (flag === mouseFlags.MOUSEDOWN) {
        // TouchClick
        // You can invoke more other functions for animations and so on...
      } else if (flag === mouseFlags.MOUSEMOVE) {
        // Touch drag
        // You can invoke more other functions for animations and so on...
      }
      resetMousePosition();
    }
  
    function onTouchMove(e) {
      e.preventDefault();
      flag = mouseFlags.MOUSEMOVE;
      // Touch zoom.
      // If two pointers are down, check for pinch gestures.
      if (e.touches.length === 2 && zoomEnabled) {
        currentTouches = new Array(2);
        // Calculate the distance between the two pointers.
        const curDiffX = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
        const curDiffY = Math.abs(e.touches[0].clientY - e.touches[1].clientY);
  
        if (prevZoomDiff && prevZoomDiff.X > 0 && prevZoomDiff.Y > 0) {
          if ((curDiffX > prevZoomDiff.X) && (curDiffY > prevZoomDiff.Y) &&
            (camera.position.z > minDistance)) {
            zoomIn();
          } else if (
            curDiffX < prevZoomDiff.X && camera.position.z < maxDistance &&
            curDiffY < prevZoomDiff.Y) {
            zoomOut();
          }
        }
        // Cache the distance for the next move event.
        prevZoomDiff.X = curDiffX;
        prevZoomDiff.Y = curDiffY;
  
        // Touch Rotate.
      } else if (currentTouches.length === 0) {
        prevZoomDiff.X = null;
        prevZoomDiff.Y = null;
        const deltaMove = {
          x: e.touches[0].pageX - previousMousePosition.x,
          y: e.touches[0].pageY - previousMousePosition.y
        };
        previousMousePosition = { x: e.touches[0].pageX, y: e.touches[0].pageY };
  
        if (horizontalRotationEnabled && deltaMove.x !== 0) {
          if (!isWithinMaxAngle(
            Math.sign(deltaMove.x) * rotationSpeedTouchDevices, 'y'))
            return;
          mesh.rotation.y += Math.sign(deltaMove.x) * rotationSpeedTouchDevices;
        }
  
        if (verticalRotationEnabled && deltaMove.y !== 0) {
          if (!isWithinMaxAngle(
            Math.sign(deltaMove.y) * rotationSpeedTouchDevices, 'x'))
            return;
          mesh.rotation.x += Math.sign(deltaMove.y) * rotationSpeedTouchDevices;
        }
      }
    }
  
    /********************* Event Listeners *************************/
  
    /** Mouse Interaction Controls (rotate & zoom, desktop **/
    // Mouse - move
    domElement.addEventListener('mousedown', mouseDown, false);
    domElement.addEventListener('mousemove', mouseMove, false);
    domElement.addEventListener('keydown', mouseMove, false);
    domElement.addEventListener('mouseup', mouseUp, false);
    domElement.addEventListener('mouseout', mouseUp, false);
  
    // Mouse - zoom
    domElement.addEventListener('wheel', wheel, false);
  
    /** Touch Interaction Controls (rotate & zoom, mobile) **/
    // Touch - move
    domElement.addEventListener('touchstart', onTouchStart, false);
    domElement.addEventListener('touchmove', onTouchMove, false);
    domElement.addEventListener('touchend', onTouchEnd, false);
  
  };
  
export {ObjectControls};
 