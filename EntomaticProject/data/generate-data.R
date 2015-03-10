library(rjson)

#select which data
wsn.data.file <- wsn.data.5.days[, c("counter", "sensor", "temperature", "relative.humidity", "light", "voltage")]
wsn.data.file$type = "data"
#sensor ids
wsn.data.file$sensor = round(runif(length(wsn.data.file$sensor), 0.50001, 5.499999))

#counters
wsn.data.file$counter[wsn.data.file$sensor == 5] = 50001:(50000 + sum(wsn.data.file$sensor == 5))
wsn.data.file$counter[wsn.data.file$sensor == 4] = 40001:(40000 + sum(wsn.data.file$sensor == 4))
wsn.data.file$counter[wsn.data.file$sensor == 3] = 30001:(30000 + sum(wsn.data.file$sensor == 3))
wsn.data.file$counter[wsn.data.file$sensor == 2] = 20001:(20000 + sum(wsn.data.file$sensor == 2))
wsn.data.file$counter[wsn.data.file$sensor == 1] = 10001:(10000 + sum(wsn.data.file$sensor == 1))

# considering 1% of missing values...
set.seed(1)
arr <- runif(round(0.01 * nrow(wsn.data.file)), 1, nrow(wsn.data.file))
wsn.data.file = wsn.data.file[-arr,] # remove those indexes

#save measurements to file
vals <- c()
for(i in seq(1, along.with = wsn.data.file$counter)) { 
        vals <- c(vals, toJSON(wsn.data.file[i,]))
        
}
fileConn<-file("measurements.txt")
write(vals, fileConn, sep = "\n")
close(fileConn)


#save sensors to file
vals <- c()
for(i in seq(1, nrow(sensors))) { 
        vals <- c(vals, toJSON(sensors[i,]))
        
}
fileConn<-file("sensors.txt")
write(vals, fileConn, sep = "\n", append=TRUE)
close(fileConn)