exports.dbErrorHandling = (err) => {
    try {
        switch (err.name) {
            case 'MongoError': {
                let fields = `${Object.values(err.keyValue)} ${Object.keys(err.keyValue)}`;
                return {
                    error: err.name,
                    errorCode: err.code,
                    statusCode: 500,
                    msg: `A user with ${fields} already exists`,
                    dbGeneratedError: err.message
                }
            }
            case 'Error': {
                return {
                    errorName: err.name,
                    errorCode: err.code,
                    errorMessage: err.message
                }
            }
            default: {
                return {
                    msg: 'Something bad happened'
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}