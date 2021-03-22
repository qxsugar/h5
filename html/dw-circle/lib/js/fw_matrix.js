'use strict';
class FindWayMatrix {
    constructor(pointNumber, boundX, boundY, pointList) {
        this._boundX = boundX;
        this._boundY = boundY;
        this._pointList = [];

        if (pointList) {
            this._pointList = pointList
        } else {
            for (let i = 0; i < pointNumber; i++) {
                this._pointList.push({
                    x: Math.round(Math.abs(Math.random() * boundX - 21) + 10),
                    y: Math.round(Math.abs(Math.random() * boundY - 21) + 10)
                })
            }
        }

        this._initMap(this._pointList, boundX, boundY);
    }

    _initMap(pointList, boundX, boundY) {
        this._pointList = pointList;
        this._flagMap = [];
        for (let y = 0; y < boundY; y++) {
            this._flagMap.push(new Array(boundX));
        }
        pointList.forEach(point => {
            this._flagMap[point.y][point.x] = 1;
        });
    }

    getPointList() {
        return this._pointList;
    }

    Next(linkList, begin, end, flag) {
        linkList.push(begin);
        let maxY = Math.max(begin.y, end.y);
        let minY = Math.min(begin.y, end.y);
        let maxX = Math.max(begin.x, end.x);
        let minX = Math.min(begin.x, end.x);

        switch (flag) {
            case 1:
                for (let y = minY; y < maxY; y++) {
                    for (let x = maxX; x > minX; x--) {
                        if (this._flagMap[y][x] == 1 && (x != begin.x && y != begin.y)) {
                            let point = {x: x, y: y};
                            return this.Next(linkList, point, end, flag);
                        }
                    }
                }
                break;
            case 2:
                for (let x = maxX; x > minX; x--) {
                    for (let y = minY; y < maxY; y++) {
                        if (this._flagMap[y][x] == 1 && (x != begin.x && y != begin.y)) {
                            let point = {x: x, y: y};
                            return this.Next(linkList, point, end, flag);
                        }
                    }
                }
                break;
            case 3:
                for (let y = maxY; y > minY; y--) {
                    for (let x = minX; x < maxX; x++) {
                        if (this._flagMap[y][x] == 1 && (x != begin.x && y != begin.y)) {
                            let point = {x: x, y: y};
                            return this.Next(linkList, point, end, flag);
                        }
                    }
                }
                break;
            case 4:
                for (let x = minX; x < maxX; x++) {
                    for (let y = maxY; y > minY; y--) {
                        if (this._flagMap[y][x] == 1 && (x != begin.x && y != begin.y)) {
                            let point = {x: x, y: y};
                            return this.Next(linkList, point, end, flag);
                        }
                    }
                }
                break;
            default:
                break;
        }
        linkList.push(end);
    }

    getBoundList(boundX, boundY) {
        let Top = [];
        let Right = [];
        let Bottom = [];
        let Left = [];

        let flagTop = true;
        let flagBottom = true;
        for (let y = 0; y < boundY; y++) {
            if (flagTop) {
                for (let x = 0; x < boundX; x++) {
                    if (this._flagMap[y][x] == 1) {
                        Top.push({x: x, y: y});
                        flagTop = false;
                    }
                }
            }

            if (flagBottom) {
                let bY = boundY - y - 1;
                for (let x = boundX; x >= 0; x--) {
                    if (this._flagMap[bY][x] == 1) {
                        Bottom.push({x: x, y: bY});
                        flagBottom = false;
                    }
                }
            }
        }

        let flagLeft = true;
        let flagRight = true;
        for (let x = 0; x < boundX; x++) {
            if (flagRight) {
                let bX = boundX - x - 1;
                for (let y = 0; y < boundY; y++) {
                    if (this._flagMap[y][bX] == 1) {
                        Right.push({x: bX, y: y});
                        flagRight = false;
                    }
                }
            }

            if (flagLeft) {
                for (let y = boundY - 1; y >= 0; y--) {
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

    getLinkList() {
        let boundList = this.getBoundList(this._boundX, this._boundY);
        let linkList = [];
        let top;
        let right;
        let bottom;
        let left;


        boundList.Top.forEach(point => {
            linkList.push(point)
        });
        top = linkList.pop();
        right = boundList.Right.shift();
        this.Next(linkList, top, right, 1);
        boundList.Right.forEach(point => {
            linkList.push(point)
        });
        right = linkList.pop();
        bottom = boundList.Bottom.shift();
        this.Next(linkList, right, bottom, 2);
        boundList.Bottom.forEach(point => {
            linkList.push(point)
        });
        bottom = linkList.pop();
        left = boundList.Left.shift();
        this.Next(linkList, bottom, left, 3);
        boundList.Left.forEach(point => {
            linkList.push(point);
        });
        top = linkList.shift();
        left = linkList.pop();
        this.Next(linkList, left, top, 4);

        return linkList
    }
}