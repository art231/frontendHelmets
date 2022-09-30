export function progressBar(userColor, userProgress, userStrokeWidth, userTrailWidth) {

    let userOptions = {
        color: userColor,
        progress: userProgress,
        strokeWidth: userStrokeWidth,
        trailWidth: userTrailWidth,
    }

    let merge = window._.merge; // progressbar.js@1.0.0 version is used
    // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

    /*-----------------------------------------------
    |   Progress Circle
    -----------------------------------------------*/

    let progresCircle = $('#progressBar');

    if (progresCircle.length) {
        progresCircle.each(function (index, value) {
            let defaultOptions = {
                strokeWidth: 2,
                trailWidth: 2,
                trailColor: utils.grays['200'],
                easing: 'easeInOut',
                duration: 3000,
                svgStyle: {
                    'stroke-linecap': 'round',
                    display: 'block',
                    width: '100%'
                },
                text: {
                    autoStyleContainer: false
                },
                // Set default step function for all animate calls
                step: function step(state, circle) {
                    // Change stroke color during progress
                    // circle.path.setAttribute('stroke', state.color);
                    // Change stroke width during progress
                    // circle.path.setAttribute('stroke-width', state.width);
                    let percentage = Math.round(circle.value() * 100);
                    circle.setText("<span class='value'>" + percentage + "<b>%</b></span> <span>" + (userOptions.text || '') + "</span>");
                }
            }; // Assign default color for IE

            let color = userColor && userColor.includes('url');

            if (window.is.ie() && color) {
                userColor.color = utils.colors.primary;
            }

            let options = merge(defaultOptions, userOptions);
            let bar = new ProgressBar.Circle(value, options);
            let linearGradient = "<defs>\n          <linearGradient id=\"gradient\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\" gradientUnits=\"userSpaceOnUse\">\n            <stop offset=\"0%\" stop-color='#1970e2' />\n            <stop offset=\"100%\" stop-color='#4695ff' />\n          </linearGradient>\n        </defs>"; // Disable gradient color in IE

            !window.is.ie() && bar.svg.insertAdjacentHTML('beforeEnd', linearGradient);
            let playProgressTriggered = false;

            let progressCircleAnimation = function progressCircleAnimation() {
                if (!playProgressTriggered) {
                    if (utils.isScrolledIntoView(value) || utils.nua.match(/puppeteer/i)) {
                        bar.animate(options.progress / 100);
                        playProgressTriggered = true;
                    }
                }

                return playProgressTriggered;
            };

            progressCircleAnimation();
            utils.$window.scroll(function () {
                progressCircleAnimation();
            });
        });
    }
    /*-----------------------------------------------
    |   Progress Line
    -----------------------------------------------*/


    let progressLine = $('.progress-line');

    if (progressLine.length) {
        progressLine.each(function (index, value) {
            let $this = $(value);
            let options = $this.data('options');
            let bar = new ProgressBar.Line(value, {
                strokeWidth: 1,
                easing: 'easeInOut',
                duration: 3000,
                color: '#333',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: {
                    width: '100%',
                    height: '0.25rem',
                    'stroke-linecap': 'round',
                    'border-radius': '0.125rem'
                },
                text: {
                    style: {
                        transform: null
                    },
                    autoStyleContainer: false
                },
                from: {
                    color: '#aaa'
                },
                to: {
                    color: '#111'
                },
                step: function step(state, line) {
                    line.setText("<span class='value'>" + Math.round(line.value() * 100) + "<b>%</b></span> <span>" + options.text + "</span>");
                }
            });
            let playProgressTriggered = false;

            let progressLineAnimation = function progressLineAnimation() {
                if (!playProgressTriggered) {
                    if (utils.isScrolledIntoView(value) || utils.nua.match(/puppeteer/i)) {
                        bar.animate(options.progress / 100);
                        playProgressTriggered = true;
                    }
                }

                return playProgressTriggered;
            };

            progressLineAnimation();
            utils.$window.scroll(function () {
                progressLineAnimation();
            });
        });
    }
}
