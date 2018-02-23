import Button from './button';

(
    function(fn) {
        if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
)(
    () => {
        document.querySelectorAll('[data-action="podto:subscribe"]').forEach(
            element => {
                const button = new Button(element)
            }
        )
    }
)
