function extendExceptionHandler($delegate, $log) {

    function handleException(exception, cause) {
        $delegate(exception, cause);

        var errorData = {
            exception: exception,
            cause: cause
        };

        var msg = 'Weather Web App Error: ' + exception.message;
        $log.debug(msg, errorData);
    }

    return handleException;
}
