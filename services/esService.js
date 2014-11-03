var index = "idan";
var type = "transactionTest";
ElasticSearchClient = require('elasticsearchclient');
var Q = require('q');
sss

var serverOptions = {
    host: 'localhost',
    port: 9200
};

var elasticSearchClient = new ElasticSearchClient(serverOptions);

function performSearch(termToSearch) {

    var deferred = Q.defer();
    console.log("Request handler 'search' was called.");
    var qryObj = {
        "query" : {
            "term" : { "_all":termToSearch }
        }
    };
    elasticSearchClient.search(index, type, qryObj).
        on('data', function (data) {
            // console.log(data)
            deferred.resolve(JSON.parse(data));
        })
        .on('error', function (err) {
            console.log(err);
            return deferred.resolve(err);
        })
        .exec();
    return  deferred.promise;
}

exports.performSearch = performSearch;



