buildTag := $(shell date +%Y%m%d%H%M)
commit = `git rev-parse HEAD`
version = `git rev-parse --short HEAD`
releaseImage = "ccr.ccs.tencentyun.com/wwww/app:h5-${buildTag}"

.PHONY: build
build:
	docker build . -t ${releaseImage} --build-arg build_date=$(buildTag) --build-arg version=$(version) --build-arg commit=$(commit)  -f Dockerfile
	docker push ${releaseImage}
