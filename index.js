const noble = require('noble')
const SERVICE_UUID = "fee0"

noble.on('stateChange', state => {
    console.log(state)

    if (state === 'poweredOn') {
        console.log('scan...')
        // noble.startScanning()
        noble.startScanning([SERVICE_UUID], false)
    } else {
        noble.stopScanning()
    }
})

noble.on('discover', peripheral => {
    // console.log(`${peripheral}`)
    console.log(`${peripheral.address} ${peripheral.advertisement.localName}`)
});