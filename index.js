const noble = require('noble')
const SERVICE_UUID = 'fee0'
const MiBand = require('./miband')

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

    peripheral.connect(error => {
        console.log('connected to peripheral: ' + peripheral.uuid);

        const miband = new MiBand(peripheral)
        // console.log(miband.getInfo());
        miband.getInfo()

        // peripheral.disconnect(error => {
        //     console.log('disconnected from peripheral: ' + peripheral.uuid);
        // });
    })
});