package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

func main() {
	url := os.Args[1] // Set URL
	key := os.Args[2] // Set KEY
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil) // http new request
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Add("Authorization", key) // http add header
	resp, err := client.Do(req)          // make the request
	if err != nil {
		log.Fatal(err)
	}
	http_status := strconv.Itoa(resp.StatusCode) // get status code
	if http_status != "200" {                    // check status code
		fmt.Print("Hey! We've got a error boss.\n")
	} else {
		fmt.Print("Told the servers to update!\n")
	}
	time.Sleep(24 * time.Hour) // sleep for 24 hours
}
