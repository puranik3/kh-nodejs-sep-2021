const getAdmissions = ( req, res, next ) => {
    res.json([
        {
            "name": "University A",
            "lastDate": "Apr 30 2022"
        }
    ]);
};

module.exports = {
    getAdmissions
};