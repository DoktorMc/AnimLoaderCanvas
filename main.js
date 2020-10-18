function loader(elem) {
  let $element = document.querySelector(elem);
  let $loaderContainer = document.createElement("div");
  $loaderContainer.style.cssText = `position: relative;
                                    display: inline-block;
                                    width: 50px;
                                    height: 50px;`;

  $element.append($loaderContainer);
  let $canv = document.createElement("canvas");
  let canvContF = $canv.getContext("2d");
  let canvContS = $canv.getContext("2d");
  let cWidth = $loaderContainer.offsetWidth;
  let cHeight = $loaderContainer.offsetHeight;

  $loaderContainer.append($canv);

  $canv.width = cWidth;
  $canv.height = cHeight;

  canvContF.fillStyle = "#ffffff";
  canvContF.fillRect(0, 0, 10, 10);

  canvContS.fillStyle = "#ffffff";
  canvContS.fillRect(40, 40, 10, 10);

  var deg = Math.PI / 180;
  let startTime = new Date().getTime();

  function rect(ctx, angle, x, y, w, h) {
    ctx.save();
    ctx.translate(x + w * 0.5, y + h * 0.5);
    ctx.rotate(angle);
    ctx.translate(-x - w * 0.5, -y - h * 0.5);
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }

  function rectMove() {
    let currTime = new Date().getTime();
    let progress = ((currTime - startTime) / 1000) * 1.1;

    canvContF.clearRect(0, 0, cWidth, cHeight);
    canvContS.clearRect(0, 0, cWidth, cHeight);
    if (progress >= 4) {
      startTime = new Date().getTime();
      progress = 0;
    } else if (progress <= 1) {
      rect(
        canvContF,
        progress * 90,
        progress * 40,
        0,
        10 - (progress * 10) / 3,
        10 - (progress * 10) / 3
      );
      rect(
        canvContS,
        progress * -90,
        40 - progress * 40,
        40,
        10 - (progress * 10) / 3,
        10 - (progress * 10) / 3
      );
    } else if (progress <= 2) {
      progress--;
      rect(
        canvContF,
        progress * -180,
        40,
        progress * 40,
        10 / 2 + (progress * 10) / 2,
        10 / 2 + (progress * 10) / 2
      );
      rect(
        canvContS,
        progress * 180,
        0,
        40 - progress * 40,
        10 / 2 + (progress * 10) / 2,
        10 / 2 + (progress * 10) / 2
      );
    } else if (progress <= 3) {
      progress -= 2;
      rect(
        canvContF,
        progress * 90,
        40 - progress * 40,
        40,
        10 - (progress * 10) / 3,
        10 - (progress * 10) / 3
      );
      rect(
        canvContS,
        progress * -90,
        progress * 40,
        0,
        10 - (progress * 10) / 3,
        10 - (progress * 10) / 3
      );
    } else if (progress < 4) {
      progress -= 3;
      rect(
        canvContF,
        progress * -180,
        0,
        40 - progress * 40,
        10 / 2 + (progress * 10) / 2,
        10 / 2 + (progress * 10) / 2
      );
      rect(
        canvContS,
        progress * 180,
        40,
        progress * 40,
        10 / 2 + (progress * 10) / 2,
        10 / 2 + (progress * 10) / 2
      );
    }

    requestAnimationFrame(rectMove);
  }
  rectMove();
}

loader("#plc");
