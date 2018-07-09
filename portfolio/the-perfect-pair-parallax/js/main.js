/* global TweenMax */
/* global TimelineMax */
/* global ScrollMagic */
/* global Modernizr */
/* global Power0 */
/* global Power1 */
/* global Power2 */
/* global Power4 */
/* global Linear */
/* global Back */

$(function($) { // Init ScrollMagic
    var controller = new ScrollMagic.Controller();

    // get all slides
    var slides = ["#slide01", "#slide02", "#slide03", "#slide04", "#slide05"];

    // get all headers in slides that trigger animation
    var headers = ["#intro header", "#slide01 header", "#slide02 header", "#slide03 header", "#slide04 header", "#slide05 header"];

    // get all break up sections
    var breakSections = ["#cb01", "#cb02", "#cb02", "#cb03", "#cb04", "#cb05", "#cb06"];

    // number of loaded images for preloader progress
    var loadedCount = 0; //current number of images loaded
    var imagesToLoad = $('.bcg').not('.skip').length; //number of slides with .bcg container
    var loadingProgress = 0; //timeline progress - starts at 0

    ($('.bcg').not('.skip')).imagesLoaded({
        background: true
    }).progress(function(instance, image) {
        loadProgress();
    });

    function loadProgress(imgLoad, image) {
        //one more image has been loaded
        loadedCount++;
        //console.log(loadedCount);

        loadingProgress = (loadedCount / imagesToLoad);

        //console.log(loadingProgress);

        // GSAP timeline for our progress bar
        TweenMax.to(progressTl, 0.7, { progress: loadingProgress, ease: Linear.easeNone });

    }

    //progress animation instance.
    var progressTl = new TimelineMax({ paused: true, onUpdate: progressUpdate, onComplete: loadComplete });

    progressTl
    //tween the progress bar width
        .to($('.progress span'), 1, { width: 100, ease: Linear.easeNone });

    //as the progress bar witdh updates and grows we put the precentage loaded in the screen
    function progressUpdate() {
        //the percentage loaded based on the tween's progress
        loadingProgress = Math.round(progressTl.progress() * 100);
        //we put the percentage in the screen
        $(".txt-perc").text(loadingProgress + '%');

    }

    function loadComplete() {

        // preloader out
        var preloaderOutTl = new TimelineMax();

        preloaderOutTl
            .to($('.progress'), 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn })
            .to($('.txt-perc'), 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn }, 0.1)
            .set($('body'), { className: '-=is-loading' })
            .set($('#intro'), { className: '+=is-loaded' })
            .to($('#preloader'), 0.7, { yPercent: 100, ease: Power4.easeInOut })
            .set($('#preloader'), { className: '+=is-hidden' })
            .from($('#intro .title'), 1, { autoAlpha: 0, ease: Power1.easeOut }, '-=0.2')
            .from($('#intro .title-light'), 0.2, { autoAlpha: 0, ease: Power1.easeOut }, '+=0.2')
            .to($('#intro .title-light'), 0.2, { autoAlpha: 1, ease: Power1.easeOut }, '+=0.2')
            .fromTo($('#intro .title-light'), 0.1, { autoAlpha: 0 }, { autoAlpha: 1 })
            .fromTo($('#intro .title-light'), 0.5, { autoAlpha: 0 }, { autoAlpha: 1 })
            .fromTo($('#intro .title-light'), 0.1, { autoAlpha: 0 }, { autoAlpha: 1 }, '+=0.2');
        //console.log(preloaderOutTl);
        return preloaderOutTl;
    }

    $('#slide03').on('click', function() {
        window.open('http://www.converse.com/us/en_us/c/converse');
    });

    // Enable ScrollMagic only for desktop, disable on touch and mobile devices
    if (!Modernizr.touch) {

        // SCENE 1
        // create scenes for each of the headers
        headers.forEach(function(header, index) {

            // number for highlighting scenes
            var num = index + 1;

            // make scene
            var headerScene = new ScrollMagic.Scene({
                    triggerElement: header, // trigger CSS animation when header is in the middle of the viewport 
                    offset: -95 // offset triggers the animation 95 earlier then middle of the viewport, adjust to your liking
                })
                .setClassToggle('#slide0' + num, 'is-active') // set class to active slide
                //.addIndicators({ triggerElement: header })
                .addTo(controller); // add indicators (requires plugin), use for debugging
        });

        // SCENE 2
        // change color of the nav for dark content blocks
        breakSections.forEach(function(breakSection, index) {

            // number for highlighting scenes
            var breakID = $(breakSection).attr('id');

            // make scene
            var breakScene = new ScrollMagic.Scene({
                    triggerElement: breakSection, // trigger CSS animation when header is in the middle of the viewport 
                    triggerHook: 0.75
                })
                .setClassToggle('#' + breakID, 'is-active') // set class to active slide
                .on("enter", function(event) {
                    $('nav').attr('class', 'is-light');
                })
                .addTo(controller);
        });

        // SCENE 3
        // change color of the nav back to dark
        slides.forEach(function(slide, index) {
            //console.log("looping slides");

            var slideScene = new ScrollMagic.Scene({
                    triggerElement: slide // trigger CSS animation when header is in the middle of the viewport
                })
                .on("enter", function(event) {
                    $('nav').removeAttr('class');
                })
                .addTo(controller);
        });

        // SCENE 4 - parallax effect on each of the slides with bcg
        // move bcg container when slide gets into the view
        slides.forEach(function(slide, index) {

            var $bcg = $(slide).find('.bcg');

            var slideParallaxScene = new ScrollMagic.Scene({
                    triggerElement: slide,
                    triggerHook: 1,
                    duration: "100%"
                })
                .setTween(TweenMax.from($bcg, 1, { scale: 1.2, y: '-100%', autoAlpha: 0.3, ease: Power0.easeNone }))
                .addTo(controller);
        });

        var resetGif = function($bcgGif) {
            console.log($bcgGif);
            var image;
            if ($bcgGif[0].nodeName == 'IMG') {
                image = $bcgGif.attr('src');
                $bcgGif.attr('src', '');
                $bcgGif.attr('src', image);
            } else {

                var gif = $bcgGif[0];
                image = window.getComputedStyle(gif, null).backgroundImage;
                //console.log(image);
                gif.style.backgroundImage = null;
                //console.log(gif.style);
                gif.style.backgroundImage = image;
            }
        }

        // SCENE 5 - parallax effect on the intro slide
        // move bcg container when intro gets out of the the view

        /*var introTl = new TimelineMax();
        introTl
            .to($('#intro header, .scroll-hint'), 0.2, { autoAlpha: 0, ease: Power1.easeNone })
            .to($('#intro'), 0.7, { autoAlpha: 0.5, ease: Power1.easeNone }, 0);

        var introScene = new ScrollMagic.Scene({
                triggerElement: '#intro',
                triggerHook: 0,
                duration: '100%'
            })
            .setTween(introTl)
            .addTo(controller);*/

        // SLIDE 1 NICK CATCHDUBS -->

        var pinScene02Tl = new TimelineMax();
        pinScene02Tl
            .fromTo($('#slide01 section'), 1, { autoAlpha: 0, y: '+20' }, { autoAlpha: 1, y: '0' }, '+=0')
            .to($('#slide01 .timestamp'), 1, { autoAlpha: 1, ease: Power1.easeOut })
            .fromTo($('#slide01 #nick-logo'), 0.5, { y: '+500', ease: Power1.easeOut }, { y: '0' }, '-=1')
            .to($('#slide01 .videoWrap'), 1, { y: '-100', ease: Power1.easeOut });


        var pinScene02 = new ScrollMagic.Scene({
                triggerElement: '#slide01',
                triggerHook: 0,
                duration: '200%'
            })
            .setPin('#slide01')
            .setTween(pinScene02Tl)
            .addTo(controller);

        // SLIDE 2: ST MARKS COMIC BOOK STORE / FOOLS GOLD STORE-->

        var $comicTimestamp = $('#slide02 #comic-book');
        var $comicQuote = $('#slide02 .comic-quote');
        var $foamHand = $('#slide02 #foam-hand');
        var $s2bcg = $('#slide02 .bcg');

        var pinScene03Tl = new TimelineMax();
        pinScene03Tl
            .fromTo($comicTimestamp, 1, { y: '+=20' }, { autoAlpha: 1, ease: Power1.easeOut })
            .to($comicQuote, 1, { autoAlpha: 1, ease: Power1.easeOut })
            .to([$comicQuote, $comicTimestamp], 1, { autoAlpha: 0, ease: Power1.easeOut }, "+=1")
            .to($s2bcg, 1, { marginTop: '-75%', ease: Power1.easeOut }, '-=0.5')
            .to($foamHand, 1, { marginTop: '-5%', ease: Power2.easeOut, onComplete: resetGif, onCompleteParams: [$('#slide02 #foam-hand-img')] }, '-=1.5')
            .to($('#slide02 #gold-store'), 1, { autoAlpha: 1, ease: Power1.easeOut }, '-=0.5')
            .to($('#slide02 #fools-gold-pinball'), 1, { autoAlpha: 1, ease: Power1.easeOut }, '-=0.5');

        var pinScene03 = new ScrollMagic.Scene({
                triggerElement: '#slide02',
                triggerHook: 0,
                duration: '500%'
            })
            .setPin('#slide02')
            .setTween(pinScene03Tl)
            .addTo(controller);

        // <!-- SLIDE 3 CONVERSE SNEAKERS -->

        var pinScene04Tl = new TimelineMax();
        pinScene04Tl
            .fromTo($('#slide03 header'), 1, { y: '+=20' }, { y: 0, autoAlpha: 1, ease: Power1.easeOut })
            .fromTo($('#slide03 section'), 1, { y: '+=20' }, { y: 0, autoAlpha: 1, ease: Power1.easeOut }) //.set($('#slide03 header'), { autoAlpha: 1 }, '+=2.5');
            .to($('#slide03 section'), 1, { autoAlpha: 1 });
        var pinScene04 = new ScrollMagic.Scene({
                triggerElement: '#slide03',
                triggerHook: 0,
                duration: '150%'
            })
            .setPin('#slide03')
            .setTween(pinScene04Tl)
            .addTo(controller);

        // SLIDE 4: SUNSHINE PINBALL BAR

        var pinScene05Tl = new TimelineMax();
        pinScene05Tl
            .to($('#slide04'), 0.4, { autoAlpha: 1 })
            .fromTo($('#slide04 header'), 0.7, { y: '+=20' }, { y: 0, autoAlpha: 1, ease: Power1.easeOut })
            .to($('#slide04 #playing-pinball'), 1, { top: '105px', ease: Power1.easeOut })
            //.to($('#slide04 #pinball-triangle'), 1, { top: '-15%', ease: Power1.easeOut }, '-=2')
            .fromTo($('#slide04 section'), 1, { y: '+=200' }, { y: '100', autoAlpha: 1, ease: Power1.easeOut }, '-=0.2')
            .to($('#slide04 section'), 1, { y: '-200px', ease: Power1.easeOut })
            .to($('#slide04 #pinball-triangle'), 1, { top: '-75%', ease: Power1.easeIn }, '-=2');

        var pinScene05 = new ScrollMagic.Scene({
                triggerElement: '#slide04',
                triggerHook: 0,
                //offset: '-100vh',
                duration: '200%'
            })
            .setPin('#slide04')
            .setTween(pinScene05Tl)
            .addTo(controller);

        // SLIDE 5: SPACE PIT STUDIOS

        var pinScene06Tl = new TimelineMax();
        pinScene06Tl
            .fromTo($('#slide05 header'), 0.7, { y: '+=20' }, { y: 0, autoAlpha: 1, ease: Power1.easeOut, onComplete: resetGif, onCompleteParams: [$('#slide05 #slide5bcg')] })
            .fromTo($('#slide05 section'), 0.6, { y: '+=20' }, { autoAlpha: 1, ease: Power1.easeOut })
            .to($('#slide05 section'), 0.5, { y: '-100px', ease: Power1.easeOut }); //.set($('#slide05 header'), { autoAlpha: 1 }, '+=2.5');

        var pinScene06 = new ScrollMagic.Scene({
                triggerElement: '#slide05',
                triggerHook: 0,
                //offset: '-100%',
                duration: '100%'
            })
            .setPin('#slide05')
            .setTween(pinScene06Tl)
            .addTo(controller);

        // change behaviour of controller to animate scroll instead of jump
        controller.scrollTo(function(newpos) {
            TweenMax.to(window, 1, { scrollTo: { y: newpos }, ease: Power1.easeInOut });
        });
    }

    //var playinTl = new TimelineMax({ paused: true, repeat: -1, repeatDelay: 0 });

    /*var request = new XMLHttpRequest();
    request.open('GET', 'http://media.spinmediacdn.com/AdTech/Converse/the-perfect-pair-parallax/img/04_Tick_Tick_Bounce.mp3', true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        // Create offline context
        var OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        var offlineContext = new OfflineContext(2, 30 * 44100, 44100);

        offlineContext.decodeAudioData(request.response, function(buffer) {

            // Create buffer source
            var source = offlineContext.createBufferSource();
            source.buffer = buffer;

            // Beats, or kicks, generally occur around the 100 to 150 hz range.
            // Below this is often the bassline.  So let's focus just on that.

            // First a lowpass to remove most of the song.

            var lowpass = offlineContext.createBiquadFilter();
            lowpass.type = "lowpass";
            lowpass.frequency.value = 150;
            lowpass.Q.value = 1;

            // Run the output of the source through the low pass.

            source.connect(lowpass);

            // Now a highpass to remove the bassline.

            var highpass = offlineContext.createBiquadFilter();
            highpass.type = "highpass";
            highpass.frequency.value = 100;
            highpass.Q.value = 1;

            // Run the output of the lowpass through the highpass.

            lowpass.connect(highpass);

            // Run the output of the highpass through our offline context.

            highpass.connect(offlineContext.destination);

            // Start the source, and render the output into the offline conext.

            source.start(0);
            offlineContext.startRendering();
        });

        offlineContext.oncomplete = function(e) {
            var buffer = e.renderedBuffer;
            var peaks = getPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]);
            var groups = getIntervals(peaks);

            var top = groups.sort(function(intA, intB) {
                return intB.count - intA.count;
            }).splice(0, 5);

            var bpm = Math.round(top[0].tempo);

            var bps = bpm / 60;

            var bpDot;

            if (bpm < 100) {
                bpDot = bps / 4;
            } else {
                bpDot = bps / 2;
            }

            console.log("BPM is: " + bpm);
            console.log("BPS: " + bps);
            console.log("BPDot: " + bpDot);
            /*playinTl
                .to($('#playingTicks span').eq(0), bpDot, { opacity: 1 })
                .to($('#playingTicks span').eq(0), bpDot, { opacity: 0 })
                .to($('#playingTicks span').eq(1), bpDot, { opacity: 1 })
                .to($('#playingTicks span').eq(1), bpDot, { opacity: 0 })
                .to($('#playingTicks span').eq(2), bpDot, { opacity: 1 })
                .to($('#playingTicks span').eq(2), bpDot, { opacity: 0 })
                .to($('#playingTicks span').eq(3), bpDot, { opacity: 1 })
                .to($('#playingTicks span').eq(3), bpDot, { opacity: 0 });
        }
    }
    request.send();*/

    $('#catVideo')[0].play();

    var v = null;
    var lastEl;
    var lastElparentId;

    var visualize = function() {
        var el = $('#playingCircles')[0];
        var id = el.parentNode.id;
        var circleRender = playingCircles();
        if (!v) { v = new Visualization({ renderer: circleRender }); }
        v.setRenderer(circleRender);
        if (v.isPlaying()) {
            if (lastElparentId === id) {
                v.stop();
                el.style.backgroundColor = 'rgba(0,0,0,0.5)';
            } else {
                lastEl.style.backgroundColor = 'rgba(0,0,0,0.5)';
                el.style.backgroundColor = 'rgba(0,0,0,0)';
            }
        } else {
            v.start();
            el.style.backgroundColor = 'rgba(0,0,0,0)';
        }
        lastElparentId = id;
        lastEl = el;
    };

    $('#playBtn').on('click', function() {
        //$('#playSong')[0].play();
        //playinTl.play();
        visualize();
        this.style.display = 'none'; //('display', 'none');
        $('#pauseBtn').css('display', 'block');
    });
    $('#pauseBtn').on('click', function() {
        //$('#playSong')[0].pause();
        //playinTl.pause();
        visualize();
        this.style.display = 'none'; //('display', 'none');
        $('#playBtn').css('display', 'block');
    });

}(jQuery));

function Visualization(config) {
    var audio, audioStream, analyser, source, audioCtx, canvasCtx, frequencyData, running = false,
        renderer = config.renderer,
        width = config.width || 360,
        height = config.height || 360;
    var init = function() {
        audio = document.getElementById('playSong');
        audio.crossOrigin = "anonymous";
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;
        frequencyData = new Uint8Array(analyser.frequencyBinCount);
        renderer.init({ count: analyser.frequencyBinCount, width: width, height: height });
    };
    this.start = function() {
        audio.play();
        running = true;
        renderFrame();
    };
    this.stop = function() {
        running = false;
        audio.pause();
    };
    this.setRenderer = function(r) {
        if (!r.isInitialized()) { r.init({ count: analyser.frequencyBinCount, width: width, height: height }); }
        renderer = r;
    };
    this.isPlaying = function() {
        return running;
    }
    var renderFrame = function() {
        analyser.getByteFrequencyData(frequencyData);
        renderer.renderFrame(frequencyData);
        if (running) {
            requestAnimationFrame(renderFrame);
        }
    };
    init();
}

function playingCircles() {
    var circles = [];
    var initialized = false;
    var height = 0;
    var width = 0;
    var init = function(config) {
        var count = config.count;
        width = config.width;
        height = config.height;
        var circleMaxWidth = (width * 0.66) >> 0;
        var circlesEl = document.getElementById('playingCircles');
        for (var i = 0; i < count; i++) {
            var node = document.createElement('div');
            node.style.width = node.style.height = (i / count * circleMaxWidth) + 'px';
            node.classList.add('circle');
            circles.push(node);
            circlesEl.appendChild(node);
        }
        initialized = true;
    };
    var max = 256;
    var renderFrame = function(frequencyData) {
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            circle.style.cssText = '-webkit-transform:scale(' + ((frequencyData[i] / max)) + ')';
        }
    };
    return {
        init: init,
        isInitialized: function() {
            return initialized;
        },
        renderFrame: renderFrame
    }
}
/*
function getPeaks(data) {

    // What we're going to do here, is to divide up our audio into parts.

    // We will then identify, for each part, what the loudest sample is in that
    // part.

    // It's implied that that sample would represent the most likely 'beat'
    // within that part.

    // Each part is 0.5 seconds long - or 22,050 samples.

    // This will give us 60 'beats' - we will only take the loudest half of
    // those.

    // This will allow us to ignore breaks, and allow us to address tracks with
    // a BPM below 120.

    var partSize = 22050,
        parts = data[0].length / partSize,
        peaks = [];

    for (var i = 0; i < parts; i++) {
        var max = 0;
        for (var j = i * partSize; j < (i + 1) * partSize; j++) {
            var volume = Math.max(Math.abs(data[0][j]), Math.abs(data[1][j]));
            if (!max || (volume > max.volume)) {
                max = {
                    position: j,
                    volume: volume
                };
            }
        }
        peaks.push(max);
    }

    // We then sort the peaks according to volume...

    peaks.sort(function(a, b) {
        return b.volume - a.volume;
    });

    // ...take the loundest half of those...

    peaks = peaks.splice(0, peaks.length * 0.5);

    // ...and re-sort it back based on position.

    peaks.sort(function(a, b) {
        return a.position - b.position;
    });

    return peaks;
}

function getIntervals(peaks) {

    // What we now do is get all of our peaks, and then measure the distance to
    // other peaks, to create intervals.  Then based on the distance between
    // those peaks (the distance of the intervals) we can calculate the BPM of
    // that particular interval.

    // The interval that is seen the most should have the BPM that corresponds
    // to the track itself.

    var groups = [];

    peaks.forEach(function(peak, index) {
        for (var i = 1;
            (index + i) < peaks.length && i < 10; i++) {
            var group = {
                tempo: (60 * 44100) / (peaks[index + i].position - peak.position),
                count: 1
            };

            while (group.tempo < 90) {
                group.tempo *= 2;
            }

            while (group.tempo > 180) {
                group.tempo /= 2;
            }

            group.tempo = Math.round(group.tempo);

            if (!(groups.some(function(interval) {
                    return (interval.tempo === group.tempo ? interval.count++ : 0);
                }))) {
                groups.push(group);
            }
        }
    });
    return groups;
}*/