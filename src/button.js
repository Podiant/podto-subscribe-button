import EventEmitter from './events';
import routes from './routes';

class Button extends EventEmitter {
    constructor(element) {
        super()

        if(typeof(element) === 'string') {
            element = document.querySelector(element)
        }

        if(element === undefined || element === null) {
            throw new Error('Cannot find a DOM element to attach link button to')
        }

        element.addEventListener('click',
            (e) => {
                const url = element.getAttribute('href')
                const type = element.getAttribute('data-type')

                e.preventDefault()
                this.emit('run', [url, type])
            }
        )

        this.on('run',
            (url, type) => {
                let _routes = [...routes]

                const nextRoute = () => {
                    if(_routes.length) {
                        const route = _routes.shift()

                        console.debug('Trying ' + route.name + ' route')
                        new route(url, type).run().then(
                            console.info('Apparently that worked')
                        ).catch(
                            err => {
                                console.warn(route.name + ' route failed. ' + err.message)
                                nextRoute()
                            }
                        )
                    }
                }

                nextRoute()
            }
        )
    }
}

export default Button
