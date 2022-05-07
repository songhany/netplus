package backend

import (
    "context"
    "fmt"

    "netplus/constants"

    "github.com/olivere/elastic/v7"
)

var (
    ESBackend *ElasticsearchBackend
)

type ElasticsearchBackend struct {
    client *elastic.Client
}