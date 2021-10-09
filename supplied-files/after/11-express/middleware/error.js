// 404 error handler (if no other route matches this will and it serves an error response)
// We do not specify the path here - so for every request this shall be matched (if none of the earlier ones matched)
function pageNotFound( req, res, next ) {
    const error = new Error( 'Page not found' );
    error.status = 404;
    
    // control goes directly to the error handler middleware since we pass an error object
    next( error );
}

function errorHandler( err, req, res, next ) {
    res.status( err.status || 500 );
    res.json({
        message: err.message
    });
}

module.exports = {
    pageNotFound,
    errorHandler
};