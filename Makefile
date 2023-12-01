# The default commit message
MESSAGE = "updated: `date '+%Y-%m-%d %H:%M:%S'`"

# Push changes to the master branch
build-image:
	docker build . -t ccr.ccs.tencentyun.com/wwww/app:h5-latest
	docker push ccr.ccs.tencentyun.com/wwww/app:h5-latest

# Add all changes to the staging area
add:
	git add .

# Commit changes with the provided message
commit:
	git commit -m $(MESSAGE)

# Push changes to the master branch
push:
	git push origin gh-pages

# Run add, commit, and push in one command
all: add commit push