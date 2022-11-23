FROM ccr.ccs.tencentyun.com/wwww/app:nginx

ENV WORKSPACE=/usr/share/nginx/html

WORKDIR $WORKSPACE

COPY . /usr/share/nginx/html

EXPOSE 80