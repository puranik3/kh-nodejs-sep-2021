const express = require( 'express' );
const { 
    getWorkshops,
    getWorkshopById,
    postWorkshop,
    patchWorkshop,
    postWorkshopMode,
    deleteWorkshop
} = require( '../controllers/workshops' );

const router = express.Router();

router.get( '/', getWorkshops );
router.get( '/:id', getWorkshopById );
router.post( '/', postWorkshop );
router.patch( '/:id', patchWorkshop );
router.post( '/:id/modes', postWorkshopMode );
router.delete( '/:id', deleteWorkshop );

module.exports = router;