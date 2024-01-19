const express = require('express')
router = express.Router()

const { UdpServerHandler } = require('../receiverudp/serverfuncs');

router.get('ask/video/:id', (req, res) => {
	const command = req.params.id
	UdpServerHandler(command);
	res.send('starting');
})

module.exports = router;

