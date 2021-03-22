"use strict";
class fw_pen{
	constructor(canvasId){
		let c = document.getElementById(canvasId);
		this.cxt = c.getContext('2d');

		this.cxt.fillStyle = '#f00'
	}

	drawPoints(pointList){
		pointList.forEach(point =>{
			this.cxt.fillRect(point.x, point.y, 4, 2)
		})
	}

	drawLine(beginPoint, endPoint){
		this.cxt.beginPath();
		this.cxt.moveTo(beginPoint.x, beginPoint.y);
		this.cxt.lineTo(endPoint.x, endPoint.y);
		this.cxt.stroke();

	}
}