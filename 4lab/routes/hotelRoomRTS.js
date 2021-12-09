const Router = require('express')
const router = new Router()
const hotelRoomController = require('../controller/hotelRoomCTRL')

router.post('/hotelRoom', hotelRoomController.createhotelRoom)
router.get('/hotelRoom/:id', hotelRoomController.gethotelRoom)
router.get('/hotelRoom', hotelRoomController.geAllhotelRooms)
router.put('/hotelRoomupdate', hotelRoomController.updatehotelRoom)
router.delete('/hotelRoomdel/:id', hotelRoomController.deletehotelRoom)

module.exports = router