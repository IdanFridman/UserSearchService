var index = "tikal";
var type = "employee";
ElasticSearchClient = require('elasticsearchclient');
var Q = require('q');


var serverOptions = {
    host: 'localhost',
    port: 9200
};

var elasticSearchClient = new ElasticSearchClient(serverOptions);

function performSearch(field, term) {
    if (field === undefined) {
        field = "_all";
    }

    var deferred = Q.defer();
    console.log("Request handler 'search' was called.");
    var qryObj =
    {
        "query": {
            "match": {}
        }
    };
    qryObj.query.match[field] = term;
    elasticSearchClient.search(index, type, qryObj).
        on('data', function (data) {
            console.log(data)
            deferred.resolve(JSON.parse(data));
        })
        .on('error', function (err) {
            console.log(err);
            return deferred.resolve(err);
        })
        .exec();
    return deferred.promise;
}

function performIndex(doc) {

    var deferred = Q.defer();
    if (doc == null) {
        throw "doc param null";
    }

    console.log("doc=" + doc);
    elasticSearchClient.index(index, type, JSON.parse(doc), null, null)
        .on('data', function (data) {
            console.log(data)
            deferred.resolve(JSON.parse(data));
        })
        .exec();
    return deferred.promise;
}

exports.performSearch = performSearch;
exports.performIndex = performIndex;




