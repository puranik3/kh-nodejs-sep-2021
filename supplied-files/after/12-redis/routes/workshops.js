const express = require( 'express' );
const { 
    getWorkshops,
    getWorkshopById,
    postWorkshop,
    patchWorkshop,
    postWorkshopMode,
    deleteWorkshop
} = require( '../controllers/workshops' );
const { authenticate, authorize } = require( '../utils/auth' );
const cache = require( '../middleware/cache' );

const router = express.Router();

router.get( '/', getWorkshops );

// KEY in Redis : 'workshops:abcd1234'
router.get( '/:id', cache( 'workshops', 'id' ), getWorkshopById );

router.post( '/', authenticate, postWorkshop );
router.patch( '/:id', authenticate, patchWorkshop );
router.post( '/:id/modes', authenticate, postWorkshopMode );
router.delete( '/:id', authenticate, authorize( 'admin' ), deleteWorkshop );

module.exports = router;