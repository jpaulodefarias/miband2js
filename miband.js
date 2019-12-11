const UUID_PRIMARY_SERVICE = "fee0"
const UUID_BASE = (x) => `0000${x}0000351221180009af100700`

class MiBand {
    constructor(peripheral) {
        this.device = peripheral
        this.info = {}
    }

    getInfo() {
        this.device.discoverAllServicesAndCharacteristics((error, services, characteristics) => {

            const ps = services.find(s => s.uuid === UUID_PRIMARY_SERVICE)
            // console.log(ps)

            const battery = ps.characteristics.find(c => c.uuid === UUID_BASE('0006'))
            battery.read((error, data) => {
                const res = Buffer.from(data)
                console.log('battery: ', `${res.readUInt8(1)}%`)
            })

            // const steps = ps.characteristics.find(c => c.uuid === UUID_BASE('0007'))
            // steps.read((error, data) => {
            //     const res = Buffer.from(data)
            //     console.log('steps: ', res.toString())
            // })

            // console.log(this.info)
        })

        // return "info"
    }
}

module.exports = MiBand