'use strict';
class FindWaySlope {
    constructor(pointNumber, boundX, boundY, pointList) {
        this._boundX = boundX;
        this._boundY = boundY;
        this._pointList = [];

        if(pointList){
            this._pointList = pointList;
        }else {

            for (let i = 0; i < pointNumber; i++) {
                this._pointList.push({
                    x: Math.round(Math.abs(Math.random() * boundX - 21) + 10),
                    y: Math.round(Math.abs(Math.random() * boundY - 21) + 10)
                })
            }
        }

        this._initMap(this._pointList, this._boundX, this._boundY)
    }

    _initMap(pointList, boundX, boundY) {
        this._flagMap = [];
        for (let y = 0; y < boundY; y++) {
            this._flagMap.push(new Array(boundX));
        }
        pointList.forEach(point => {
            this._flagMap[point.y][point.x] = 1;
        });
    }

    static _countSlope(pointBegin, pointEnd) {
        return Math.abs((pointBegin.y - pointEnd.y) / (pointBegin.x - pointEnd.x));
    }

    getPointList() {
        return this._pointList
    }

    getBoundList() {
        let Top = [];
        let Right = [];
        let Bottom = [];
        let Left = [];

        let flagTop = true;
        let flagBottom = true;
        for (let y = 0; y < this._boundY; y++) {
            if (flagTop) {
                for (let x = 0; x < this._boundX; x++) {
                    if (this._flagMap[y][x] == 1) {
                        Top.push({x: x, y: y});
                        flagTop = false;
                    }
                }
            }

            if (flagBottom) {
                let by = this._boundY - y - 1;
                for (let x = this._boundX; x >= 0; x--) {
                    if (this._flagMap[by][x] == 1) {
                        Bottom.push({x: x, y: by});
                        flagBottom = false;
                    }
                }
            }
        }

        let flagLeft = true;
        let flagRight = true;
        for (let x = 0; x < this._boundX; x++) {
            if (flagRight) {
                let bx = this._boundX - x - 1;
                for (let y = 0; y < this._boundY; y++) {
                    if (this._flagMap[y][bx] == 1) {
                        Right.push({x: bx, y: y});
                        flagRight = false;
                    }
                }
            }

            if (flagLeft) {
                for (let y = this._boundY - 1; y >= 0; y--) {
                    if (this._flagMap[y][x] == 1) {
                        Left.push({x: x, y: y});
                        flagLeft = false;
                    }
                }
            }
        }

        return {
            Top: Top,
            Right: Right,
            Bottom: Bottom,
            Left: Left
        }
    }

    Next(linkList, begin, end, flag){
        linkList.push(begin);

        let niceSlope = 0;
        let nicePoint = '';
        let maxY = Math.max(begin.y, end.y);
        let minY = Math.min(begin.y, end.y);
        let maxX = Math.max(begin.x, end.x);
        let minX = Math.min(begin.x, end.x);

        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                if (this._flagMap[y][x] == 1 && (x != begin.x && y != begin.y)) {
                    let point = {x: x, y: y};
                    let cSlope = FindWaySlope._countSlope(begin, point);
                    if (flag) {
                        if (cSlope < niceSlope || niceSlope == 0) {
                            niceSlope = cSlope;
                            nicePoint = point;
                        }
                    } else {
                        if (cSlope > niceSlope || niceSlope == 0) {
                            niceSlope = cSlope;
                            nicePoint = point;
                        }
                    }
                }
            }
        }

        // 如果有最优点 递归
        if (niceSlope != 0) {
            return this.Next(linkList, nicePoint, end, flag);
        }
        linkList.push(end)
    }

    getLinkList(){
        let boundList = this.getBoundList(this._boundX, this._boundY);
        let linkList = [];
        let top;
        let right;
        let bottom;
        let left;

        // 右上角
        boundList.Top.forEach(point => {
            linkList.push(point);
        });
        top = linkList.pop();
        right = boundList.Right.shift();
        this.Next(linkList, top, right, true);
        boundList.Right.forEach(point => {
            linkList.push(point)
        });

        // 右下角
        right = linkList.pop();
        bottom = boundList.Bottom.shift();
        this.Next(linkList, right, bottom, false);
        boundList.Bottom.forEach(point => {
            linkList.push(point);
        });

        // 左下角
        bottom = linkList.pop();
        left = boundList.Left.shift();
        this.Next(linkList, bottom, left, true);
        boundList.Left.forEach(point => {
            linkList.push(point)
        });

        // 左上角
        left = linkList.pop();
        top = linkList.shift();
        this.Next(linkList, left, top, false);

        return linkList;
    }
}