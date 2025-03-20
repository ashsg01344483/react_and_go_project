FROM golang:1.24.1-alpine

WORKDIR /app

# 必要なツールをインストール
RUN apk add --no-cache git && \
    go install github.com/cosmtrek/air@v1.42.0

ENV PATH="/root/go/bin:$PATH"

COPY go.mod go.sum ./
RUN go mod download

COPY . .

CMD ["air"]
