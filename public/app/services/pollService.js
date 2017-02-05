angular.module('parrotPollApp')
    .service('pollService', ['dataFactory', function(dataFactory) {

        this.getMaxPaginas = function functionName(pollsPorPagina, callBack) {
            dataFactory.getCountPolls()
                .then(function(res) {
                    callBack(Math.floor(res.data / pollsPorPagina));
                });
        };

        this.getPoll = function(idPoll, callBack) {
            dataFactory.getPoll(idPoll)
                .then(function(res) {
                    callBack(res.data);
                });
        };

        this.getPolls = function(limit, skip, callBack) {
            dataFactory.getPolls(limit, skip)
                .then(function(res) {
                    callBack(res.data);
                });
        };

        this.ResultsCount = function(reference, callBack) {
            dataFactory.getResultsCount(reference)
                .then(function(res) {
                    callBack(res.data);
                });
        };

        this.getResults = function(reference, callBack) {
            dataFactory.getResults(reference)
                .then(function(res) {
                    callBack(res.data);
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
