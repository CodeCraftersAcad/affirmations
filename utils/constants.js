module.exports = {
    error: {
        SERVER_ERROR: 'Something went wrong',
        INVALID_REQUEST: 'Invalid Request'
    },
    quotes: {
        QUOTES_FOUND: 'Quotes found',
        QUOTE_CREATED: 'Quote created',
        QUOTE_EXISTS: 'A quote with that text already exists',
        QUOTE_NOT_FOUND: 'Quote not found please try again or contact support if the problem persists',
        QUOTE_UPDATED: 'Quote updated',
        QUOTE_DELETED: 'Quote deleted',
        NOT_USER_QUOTE: 'This quote does not belong to you'
    },
    articles: {
        ARTICLES_FOUND: 'Found articles',
        ARTICLE_NOT_FOUND: 'Article not found please try again or contact support if the problem persists',
    },
    user: {
        USER_ALREADY_EXISTS: 'A user already exist with this email',
        PASSWORD_ERROR: 'Password must be between 6 and 20 characters',
        NO_USER_FOUND: 'No user was found with this username and password',
        EMPTY_USERNAME_PASSWORD: 'Please enter a username and password',
        MUST_LOGIN: 'You must be logged in to preform this action',
        EMAIL_NOT_VALID: 'An email is required for this action',
        PASSWORD_RESET_CONFIRMED: 'An email has been sent with instructions to reset your password',
        PASSWORD_RESET_ACTIVE: 'You have already requested to reset your password. Please check your email for your' +
            'password reset link. This link will be active for 15 minutes',
        PASSWORD_UPDATED: 'Your password has been updated',
        INVALID_TOKEN: 'Invalid token provided. Please try again or contact support if' +
            ' the problem persists',
        USER_SUCCESSFULLY_UPDATED: 'You have updated your information',
        USER_UPDATE_ERROR: 'Could not update user with this information. Please try again or contact support if' +
            ' the problem persists',
        USER_DELETE_ERROR: 'Could not delete your user information. Please try again or contact support if' +
            ' the problem persists',
        USER_SUCCESSFULLY_DELETED: 'Your account has been deleted. We hope to see you again soon'
    },
    membership: {
        BASIC_MEMBERSHIP: 'basic',
        PREMIUM_MEMBERSHIP: 'premium',
        MEMBERSHIP_LENGTH_MONTH: 'month',
        MEMBERSHIP_LENGTH_YEAR: 'year'
    },
    route: {
        METHOD_GET: 'GET',
        METHOD_POST: 'POST',
        METHOD_PUT: 'PUT',
        METHOD_DELETE: 'DELETE',

    }

}