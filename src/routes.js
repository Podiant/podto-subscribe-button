import EventEmitter from './events';

class Route extends EventEmitter {
    constructor(name, url, type='application/xml') {
        super()

        this.name = name
        this.url = url
        this.type = type
        this.timeout = null
    }

    run = () => {
        throw new Error('Method not implemented')
    }

    navigate = (url) => {
        this.emit('navigating')

        return new Promise(
            (resolve, reject) => {
                window.location = url
                this.timeout = setTimeout(
                    () => {
                        reject('URL timed out')
                    },
                    300
                )
            }
        )
    }
}

class MobileRoute extends Route {
    constructor(url, type) {
        super('mobile', url, type)
    }

    run = async () => {
        return this.navigate(
            'podto:' +
            'url=' + encodeURIComponent(this.url) +
            (this.type ? '&type=' + encodeURIComponent(this.type) : '')
        )
    }
}

class DesktopRoute extends Route {
    constructor(url, type) {
        super('desktop', url, type)
    }

    run = async () => {
        return this.navigate(
            'web+podto:' +
            'url=' + encodeURIComponent(this.url) +
            (this.type ? '&type=' + encodeURIComponent(this.type) : '')
        )
    }
}

class RawRoute extends Route {
    constructor(url, type) {
        super('raw', url, type)
    }

    run = async () => {
        return this.navigate(this.url)
    }
}

const routes = [
    MobileRoute,
    DesktopRoute,
    RawRoute
]

export default routes
