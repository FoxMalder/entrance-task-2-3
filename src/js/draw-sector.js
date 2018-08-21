function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag;

    if(startAngle > endAngle) // to count always clockwise
      largeArcFlag = endAngle - startAngle <= 180 ? "1" : "0";
    else
      largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

export default function drawSector(el){
  let svg = el.querySelector('.circle-indicator__diagram'),
      width = parseInt(svg.getAttribute("width"), 10),
      height = parseInt(svg.getAttribute("height"), 10),
      pathActive = el.querySelector('.circle-indicator__active'),
      pathInactive = el.querySelector('.circle-indicator__inactive'),
      strokeWidth = parseInt(pathActive.getAttribute('stroke-width'), 10),
      radius = parseInt((height / 2) - (strokeWidth / 2),10),
      percentage = svg.getAttribute("data-percent")

      pathActive.setAttribute("d", describeArc(110, 110, 100, 210, 92)); // x, y, radius, startAngle, endAngle
      pathInactive.setAttribute("d", describeArc(110, 110, 100, 92, 150)); // x, y, radius, startAngle, endAngle
  
}