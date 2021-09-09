const DbError = require('../../models/DbErrors');

exports.logErrorToDb = async (err, route, method) => {
    if (err.errorCode !== 'ECONNREFUSED') {
        try {
            let newDbError = DbError.create({
                errorCode: err.errorCode,
                errorMessage: err.msg,
                errorRoute: route,
                errorName: err.error,
                statusCode: err.statusCode,
                method,
                dbGeneratedError: err.dbGeneratedError
            })
            await newDbError.save();
        } catch (err) {
            console.log('Something crazy happened')
        }
    } else {
        return {
            connectionStatus: 'Not connected to database',
            msg: 'Something happened on the connection to db'
        }
        // Create function to add all connection issue db problems to a queue that will push to
        // that will update db when reconnected and will immediately send email notification.
    }
}