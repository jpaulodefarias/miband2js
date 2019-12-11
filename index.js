const noble = require('noble')
const SERVICE_UUID = 'fee0'

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

        peripheral.discoverAllServicesAndCharacteristics((error, services, characteristics) => {
            for (const s of services) {
                console.log(`service: ${s}`);
            }

            for (const c of characteristics) {
                console.log(`characteristic: ${c}`);
            }
        })

        // peripheral.disconnect(error => {
        //     console.log('disconnected from peripheral: ' + peripheral.uuid);
        // });
    })
});