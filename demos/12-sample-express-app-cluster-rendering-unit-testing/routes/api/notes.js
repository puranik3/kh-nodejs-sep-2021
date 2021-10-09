const express = require( 'express' );
const { getNotes, postNotes } = require( '../../controllers/api/notes' );

const router = express.Router();

router.get( '/', getNotes );
router.post( '/', postNotes );

module.exports = router;