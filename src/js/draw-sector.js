function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = (angleInDegrees-240) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);
    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
}

export default function drawSector(el){
  let svg = el.querySelector('.circle-indicator__diagram'),
      //width = parseInt(svg.getAttribute("width"), 10),
      //height = parseInt(svg.getAttribute("height"), 10),
      pathActive = el.querySelector('.circle-indicator__active'),
      pathInactive = el.querySelector('.circle-indicator__inactive'),
      //strokeWidth = parseInt(pathActive.getAttribute('stroke-width'), 10),
      //radius = parseInt((height / 2) - (strokeWidth / 2),10),
      percentage = svg.getAttribute("data-percent"),
      startAngle = 0; //, endAngle = 150;
      let middlePoint;

      /*if( percentage < 50){
          middlePoint = (startAngle - (1.5 * percentage)).toFixed(0);
      } else {
          middlePoint = (3 * (percentage - 50)).toFixed(0);
      }*/
      middlePoint = percentage * 3;

      //pathActive.setAttribute("d", describeArc(110, 110, 100, 210, 90)); // x, y, radius, startAngle, endAngle
      //pathInactive.setAttribute("d", describeArc(110, 110, 100, 90, 150)); // x, y, radius, startAngle, endAngle

      pathActive.setAttribute("d", describeArc(110, 110, 100, 0, middlePoint)); // x, y, radius, startAngle, endAngle
      pathInactive.setAttribute("d", describeArc(110, 110, 100, middlePoint, 300)); // x, y, radius, startAngle, endAngle

}
