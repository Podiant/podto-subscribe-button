class EventEmitter {
    constructor() {
        let _callbacks = {}

        this.on = (e, callback) => {
            if(_callbacks[e] === undefined) {
                _callbacks[e] = []
            }

            _callbacks[e].push(callback)
            return this
        }

        this.off = (e, callback) => {
            if(_callbacks[e] === undefined) {
                return
            }

            const index = _callbacks[e].indexOf(callback)

            if(index > -1) {
                _callbacks[e].splice(index, 1)
            }

            return this
        }

        this.emit = (e, args) => {
            if(_callbacks[e] === undefined) {
                return
            }

            let value = null

            _callbacks[e].forEach(
                (ev) => {
                    value = ev.apply(this, args)
                }
            )

            return value
        }
    }
}

export default EventEmitter
