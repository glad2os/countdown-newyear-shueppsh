# В честь Юрия Степановича Рыбникова
## ШУЕ

```sh
 $ docker build -t glad2os/shueppsh .
 $ PORT=80
 $ docker run --name wtchat -p ${PORT}:${PORT} -e "PORT=${PORT}" -d glad2os/shueppsh
```

## ППШ

```sh
 $ curl -L localhost:${PORT}
```