(function () {
	let boundX = 300;
	let boundY = 150;
	let number = 50;

	let SlopeFindWay = new FindWaySlope(number, boundX, boundY);
	let SlopePointList = SlopeFindWay.getPointList();

	// slope draw circle
	(function(points){
		let pen = new fw_pen('slopeId');
		pen.drawPoints(points);
		let linkList = SlopeFindWay.getLinkList();

		let len = linkList.length;
		let i = 0;
		let inter = setInterval(()=>{
			if(i >= len){
				return clearInterval(inter)
			}
			pen.drawLine(linkList[i % len], linkList[(i + 1) % len]);
			i++;
		}, 250);
	})(SlopePointList);


	let MatrixFindWay = new FindWayMatrix(number, boundX, boundY, SlopePointList);
	let MatrixPointList = MatrixFindWay.getPointList();

	(function(points){
		let pen = new fw_pen('matrixId');
		pen.drawPoints(points);
		let linkList = MatrixFindWay.getLinkList();

		let len = linkList.length;
		let i = 0;
		let inter = setInterval(()=>{
			if(i >= len){
				return clearInterval(inter)
			}
			pen.drawLine(linkList[i % len], linkList[(i + 1) % len]);
			i++;
		}, 250)
	})(MatrixPointList)

})();


