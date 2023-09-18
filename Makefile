# Push changes to the master branch
build:
	docker build . -t ccr.ccs.tencentyun.com/wwww/app:h5-latest
	docker push ccr.ccs.tencentyun.com/wwww/app:h5-latest
