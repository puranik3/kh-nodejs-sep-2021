const express = require( 'express' );
const authenticate = require( '../middleware/authenticate' );
const authorize = require( '../middleware/authorize' );
const { getUniversities } = require( '../controllers/admissions' );

const router = express.Router();

router.get( '/:year', authenticate, authorize( 'general' ), getUniversities );

module.exports = router;