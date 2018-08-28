var largeArcFlagA, largeArcFlagI;

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle, largeArcFlag){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle)

    /*if(startAngle > endAngle) // to count always clockwise
      largeArcFlag = endAngle - startAngle <= 180 ? "1" : "0";
    else
      largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";*/


    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
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
      startAngle = 210; //, endAngle = 150;
      let middlePoint;

      if( percentage < 50){
          largeArcFlagA = 0
          largeArcFlagI = 1
          middlePoint = (startAngle - (1.5 * percentage)).toFixed(0);
      } else {
          largeArcFlagA = 1
          largeArcFlagI = 0
          middlePoint = (1.5 * (percentage - 50)).toFixed(0);
      }
      console.log(middlePoint);

      //pathActive.setAttribute("d", describeArc(110, 110, 100, 210, 90)); // x, y, radius, startAngle, endAngle
      //pathInactive.setAttribute("d", describeArc(110, 110, 100, 90, 150)); // x, y, radius, startAngle, endAngle

      pathActive.setAttribute("d", describeArc(110, 110, 100, 210, middlePoint, largeArcFlagA)); // x, y, radius, startAngle, endAngle
      pathInactive.setAttribute("d", describeArc(110, 110, 100, middlePoint, 150, largeArcFlagI)); // x, y, radius, startAngle, endAngle

}
