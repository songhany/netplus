package main

import (
    "fmt"
    "log"
    "net/http" 

    "netplus/backend"  
    "netplus/handler"   
)
func main() {
    fmt.Println("started-service")
    backend.InitElasticsearchBackend()
    log.Fatal(http.ListenAndServe(":8080", handler.InitRouter()))
}