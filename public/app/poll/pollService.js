angular.module('parrotPollApp')
    .service('pollService', ['dataFactory', function(dataFactory) {

        this.getMaxPaginas = function functionName(pollsPorPagina, callBack) {
            dataFactory.getCountPolls()
                .then(function(res) {
                    callBack(Math.floor(res.data / pollsPorPagina));
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.getPoll = function(idPoll, callBack) {
            dataFactory.getPoll(idPoll)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.getPolls = function(limit, skip, callBack) {
            dataFactory.getPolls(limit, skip)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.ResultsCount = function(reference, callBack) {
            dataFactory.getResultsCount(reference)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.getResults = function(reference, callBack) {
            dataFactory.getResults(reference)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.validatePoll = function(poll) {
            var result = true;
            poll.questions.forEach(function(element, index) {
                var r = false;
                element.answers.forEach(function(item, i) {
                    r = r || item.selected || (item.selected !== undefined);
                });
                if (!r) result = false;
            });
            return result;
        };

        this.savePollResult = function(poll, callBack) {
            dataFactory.getUser()
                .then(function(res) {
                    poll.userResult = res.data;
                    dataFactory.postPollResult(poll)
                        .then(function(res) {
                            callBack();
                        });
                }, function(res) {
                    dataFactory.postPollResult(poll)
                        .then(function(res) {
                            callBack();
                        });
                });
        };

    }]);
