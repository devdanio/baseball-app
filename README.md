## Directions

$ docker build -t baseball-stats-db .
$ docker run -d --name baseball-stats-postgres -p 5432:5432 baseball-stats-db
