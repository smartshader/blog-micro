#!/usr/bin/env bash

cd ../posts || exit
docker build -t smartshader/posts .

cd ../comments || exit
docker build -t smartshader/comments .

cd ../eventbus || exit
docker build -t smartshader/eventbus .

cd ../moderation || exit
docker build -t smartshader/moderation .

cd ../query || exit
docker build -t smartshader/query .

cd ../infra || exit
kubectl apply -f k8s/.

kubectl rollout restart deployment
