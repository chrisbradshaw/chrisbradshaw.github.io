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
    var slides = ["#slide06", "#slide07", "#slide08", "#slide09", "#slide10", "#slide01", "#slide02", "#slide03", "#slide04", "#slide05"];

    // get all headers in slides that trigger animation
    var headers = ["#intro header", "#slide06 header", "#slide07 header", "#slide08 header", "#slide09 header", "#slide10 header", "#slide01 header", "#slide02 header", "#slide03 header", "#slide04 header", "#slide05 header"];

    // get all break up sections
    var breakSections = ["#cb01", "#cb07", "#cb08", "#cb09", "#cb010", "#cb11", "#cb12", "#cb02", "#cb02", "#cb03", "#cb04", "#cb05", "#cb06"];

    // number of loaded images for preloader progress
    var loadedCount = 0; //current number of images loaded
    var imagesToLoad = $('.bcg').not('.skip').length; //number of slides with .bcg container
    var loadingProgress = 0; //timeline progress - starts at 0

    ($('.bcg').not('.skip')).imagesLoaded({
        background: true
    }).progress(function(instance, image) {
        loadProgress();
    });

    /*var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome) && (is_safari)) { is_safari = false; }
    if ((is_chrome) && (is_opera)) { is_chrome = false; }*/

    var noVisualize = !(typeof AudioContext === 'function' || typeof webkitAudioContext === 'function');

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
        .to($('.progress span'), 1, { width: 160, ease: Linear.easeNone });

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

    var nickCatchDubsTrack = 'Nick Catchdubs<p>Tick Tick Bounce</p>';
    var whiteLungTrack = 'White Lung<p>Below</p>';
    var exHexTrack = 'Ex Hex<p>How You Got That Girl</p>';

    var $currentSong = $('#whiteLungSong');
    $currentSong.addClass('currentSong');

    $('#slide03').on('click', function() {
        window.open('http://www.converse.com/us/en_us/c/converse');
    });

    $('#white-converse-shoes').on('click', function() {
        window.open('http://www.converse.com/us/en_us/c/converse');
    });

    var path = 'http://media.spinmediacdn.com/AdTech/Converse/the-perfect-pair-parallax/';

    $('#shop-now-white').hover(function() {
            $('#shop-img-white')[0].src = path + 'img/ShopNow_hover_WhiteLung.png';
        },
        function() {
            $('#shop-img-white')[0].src = path + 'img/ShopNow_white.png';
        });

    $('#shop-now-div').hover(function() {
            $('#shop-img')[0].src = path + 'img/ShopNow_Hover_Catchdubs.png';
        },
        function() {
            $('#shop-img')[0].src = path + 'img/ShopNow.png';
        });

    $('#catchdubs').hover(function() {
            var $artist = $(this);
            //$artist.css('font-size', '1em');
            if (!$artist.hasClass('currentArtist')) {
                $artist.addClass('artistColor');
            }
        },
        function() {
            var $artist = $(this);
            //$artist.css('font-size', 'initial');
            if (!$artist.hasClass('currentArtist')) {
                $artist.removeClass('artistColor');
            }
        });

    $('#whiteLung').hover(function() {
            var $artist = $(this);
            //$artist.css('font-size', '1em');
            if (!$artist.hasClass('currentArtist')) {
                $artist.addClass('artistColor');
            }
        },
        function() {
            var $artist = $(this);
            //$artist.css('font-size', 'initial');
            if (!$artist.hasClass('currentArtist')) {
                $artist.removeClass('artistColor');
            }
        });

    $('#exHex').hover(function() {
            var $artist = $(this);
            //$artist.css('font-size', '1em');
            this.innerHTML = "COMING SOON";
        },
        function() {
            var $artist = $(this);
            //$artist.css('font-size', 'initial');
            this.innerHTML = "Ex Hex";
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

        function move(what, progress) {
            var to = progress * 100;
            var op = -progress * 2;
            TweenMax.to(what, 0.3, { y: to, opacity: op, overwrite: 5, force3D: true });
        }

        // SCENE 4 - parallax effect on each of the slides with bcg
        // move bcg container when slide gets into the view
        slides.forEach(function(slide, index) {

            var $bcg = $(slide).find('.bcg');

            var slideParallaxScene = new ScrollMagic.Scene({
                    triggerElement: slide,
                    triggerHook: 1,
                    duration: "100%"
                })
                .on("progress", function(e) {
                    move($bcg, -(e.progress / 2));
                })
                //.setTween(TweenMax.from($bcg, 1, { scale: 1.2, y: '-100%', autoAlpha: 0.3, ease: Power0.easeNone }))
                .addTo(controller);
        });

        var resetGif = function($bcgGif) {
            //console.log($bcgGif);
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

        /*function timeTo(el, fromTime, toTime){
            var fromTimeSplit = fromTime.split(':');
            var toTimeSplit = toTime.split(':');

            TweenMax.to()
            
        }*/

        // SLIDE 1  -->

        var pinScene07Tl = new TimelineMax();
        pinScene07Tl
            .fromTo($('#slide06 section'), 1, { y: '+200' }, {
                y: '0',
                onStart: function() {
                    $('.currentArtist').removeClass('currentArtist').removeClass('artistColor');
                    $('#whiteLung').addClass('artistColor').addClass('currentArtist');
                    $('#nowPlaying')[0].innerHTML = whiteLungTrack;
                    //switchSongs('whiteLung');
                }
            }, '+=0')
            .to($('#slide06 .timestamp'), 1, { autoAlpha: 1, ease: Power1.easeOut })
            .fromTo($('#slide06 #white-lung'), 0.5, { y: '+1000', ease: Power1.easeOut }, { y: '0' }, '-=1'); //.to($('#slide01 .videoWrap'), 1, { y: '-100', ease: Power1.easeOut });


        var pinScene07 = new ScrollMagic.Scene({
                triggerElement: '#slide06',
                triggerHook: 0,
                duration: '200%'
            })
            .setPin('#slide06')
            .setTween(pinScene07Tl)
            .addTo(controller);

        // SLIDE 2: -->

        var $vitusTimestamp = $('#slide07 #st-vitus');
        //var $comicQuote = $('#slide07 .comic-quote');
        var $converseShoes = $('#slide07 #white-converse-shoes');
        var $s7bcg = $('#slide07 .bcg');
        var $s7overbcg = $('#slide07 .overbcg');

        var pinScene08Tl = new TimelineMax();
        pinScene08Tl
            .fromTo($vitusTimestamp, 1, { y: '+=20' }, { autoAlpha: 1, ease: Power1.easeOut })
            //.to($comicQuote, 1, { autoAlpha: 1, ease: Power1.easeOut })
            .to($vitusTimestamp, 1, { autoAlpha: 0, ease: Power1.easeOut }, "+=1")
            //.to($s7bcg, 1.5, { marginTop: '-75%', ease: Power1.easeOut }, '-=0.5')
            .to($s7overbcg, 1.5, { top: 0, ease: Power1.easeOut }, '-=0.5')
            .to($converseShoes, 1, { marginTop: '-5%', ease: Power2.easeOut }, '-=2')
            .to($('#slide07 #milk-honey'), 1, { autoAlpha: 1, ease: Power1.easeOut }, '-=1')
            .to($('#slide07 #white-milk-quote'), 1, { autoAlpha: 1, ease: Power1.easeOut }, '-=0.75');

        var pinScene08 = new ScrollMagic.Scene({
                triggerElement: '#slide07',
                triggerHook: 0,
                duration: '500%'
            })
            .setPin('#slide07')
            .setTween(pinScene08Tl)
            .addTo(controller);

        // <!-- SLIDE 3 CONVERSE SNEAKERS -->

        var pinScene09Tl = new TimelineMax();
        pinScene09Tl
            .fromTo($('#slide08 header'), 1, { y: '+=20' }, { y: 0, autoAlpha: 1, ease: Power1.easeOut })
            .fromTo($('#slide08 section'), 1, { y: '+=20' }, { y: 0, autoAlpha: 1, ease: Power1.easeOut }) //.set($('#slide03 header'), { autoAlpha: 1 }, '+=2.5');
            .to($('#slide08 section'), 1, { autoAlpha: 1 });
        var pinScene09 = new ScrollMagic.Scene({
                triggerElement: '#slide08',
                triggerHook: 0,
                duration: '150%'
            })
            .setPin('#slide08')
            .setTween(pinScene09Tl)
            .addTo(controller);

        // White Lung SLIDE 4: East River

        var pinScene10Tl = new TimelineMax();
        pinScene10Tl
            .to($('#slide09'), 0.4, { autoAlpha: 1 })
            .fromTo($('#slide09 header'), 0.7, { y: '+=20' }, { y: 0, autoAlpha: 1, ease: Power1.easeOut })
            .to($('#slide09 #group-photo'), 1, { top: '185px', ease: Power1.easeOut })
            //.to($('#slide04 #pinball-triangle'), 1, { top: '-15%', ease: Power1.easeOut }, '-=2')
            .fromTo($('#slide09 section'), 1, { y: '+=200' }, { y: '100', autoAlpha: 1, ease: Power1.easeOut }, '-=0.2')
            .to($('#slide09 section'), 1, { y: '-200px', ease: Power1.easeOut })
            .to($('#slide09 .timestamp'), 0.5, { color: '#000', ease: Power1.easeIn }, '-=1.7')
            .to($('#slide09 #river-triangle'), 1, { top: '-75%', ease: Power1.easeIn }, '-=2');

        var pinScene10 = new ScrollMagic.Scene({
                triggerElement: '#slide09',
                triggerHook: 0,
                //offset: '-100vh',
                duration: '200%'
            })
            .setPin('#slide09')
            .setTween(pinScene10Tl)
            .addTo(controller);

        // White Lung SLIDE 5: East Village

        var pinScene11Tl = new TimelineMax();
        pinScene11Tl
            .fromTo($('#slide10 header'), 0.7, { y: '+=20' }, { y: 0, autoAlpha: 1, ease: Power1.easeOut })
            .fromTo($('#slide10 section'), 0.5, { y: '+=20' }, { y: '-=50', autoAlpha: 1, ease: Power1.easeOut })
            .to($('#slide10 section'), 1, {
                y: '-=400',
                ease: Power1.easeOut
            }); //.to($('#slide05 section'), 0.5, { y: '-100px', ease: Power1.easeOut }); //.set($('#slide05 header'), { autoAlpha: 1 }, '+=2.5');

        var pinScene11 = new ScrollMagic.Scene({
                triggerElement: '#slide10',
                triggerHook: 0,
                //offset: '-100%',
                duration: '200%'
            })
            .setPin('#slide10')
            .setTween(pinScene11Tl)
            .on('enter', function() {
                $('.currentArtist').removeClass('currentArtist').removeClass('artistColor');
                $('#whiteLung').addClass('artistColor').addClass('currentArtist');
                $('#nowPlaying')[0].innerHTML = whiteLungTrack;
                switchSongs('whiteLung');
            })
            .addTo(controller);

        // SLIDE 1 NICK CATCHDUBS -->

        var pinScene02Tl = new TimelineMax();
        pinScene02Tl
            .fromTo($('#slide01 section'), 1, { y: '+200' }, {
                y: '0',
                onStart: function() {
                    $('.currentArtist').removeClass('currentArtist').removeClass('artistColor');
                    $('#catchdubs').addClass('artistColor').addClass('currentArtist');
                    $('#nowPlaying')[0].innerHTML = nickCatchDubsTrack;
                    switchSongs('nickCatchdubs');
                }
            }, '+=0')
            .to($('#slide01 .timestamp'), 1, { autoAlpha: 1, ease: Power1.easeOut })
            .fromTo($('#slide01 #nick-catchdubs'), 0.5, { y: '+1000', ease: Power1.easeOut }, { y: '0' }, '-=1'); //.to($('#slide01 .videoWrap'), 1, { y: '-100', ease: Power1.easeOut });


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
        var $s2overbcg = $('#slide02 .overbcg');

        var pinScene03Tl = new TimelineMax();
        pinScene03Tl
            .fromTo($comicTimestamp, 1, { y: '+=20' }, { autoAlpha: 1, ease: Power1.easeOut })
            .to($comicQuote, 1, { autoAlpha: 1, ease: Power1.easeOut })
            .to([$comicQuote, $comicTimestamp], 1, { autoAlpha: 0, ease: Power1.easeOut }, "+=1")
            //.to($s2bcg, 1.5, { marginTop: '-75%', ease: Power1.easeOut }, '-=0.5')
            .to($s2overbcg, 1.5, { top: 0, ease: Power1.easeOut }, '-=0.5')
            .to($foamHand, 1, { marginTop: '-5%', ease: Power2.easeOut }, '-=2')
            .to($('#slide02 #gold-store'), 1, { autoAlpha: 1, ease: Power1.easeOut }, '-=1')
            .to($('#slide02 #fools-gold-pinball'), 1, { autoAlpha: 1, ease: Power1.easeOut }, '-=0.75');

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
            .to($('#slide04 #playing-pinball'), 1, { top: '185px', ease: Power1.easeOut })
            //.to($('#slide04 #pinball-triangle'), 1, { top: '-15%', ease: Power1.easeOut }, '-=2')
            .fromTo($('#slide04 section'), 1, { y: '+=200' }, { y: '100', autoAlpha: 1, ease: Power1.easeOut }, '-=0.2')
            .to($('#slide04 section'), 1, { y: '-350px', ease: Power1.easeOut })
            .to($('#slide04 .timestamp'), 0.5, { color: '#000', ease: Power1.easeIn }, '-=1.7')
            .to($('#slide04 #pinball-triangle'), 1, { top: '-75%', ease: Power1.easeIn }, '-=2.5');

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
            .fromTo($('#slide05 header'), 0.7, { y: '+=20' }, { y: 0, autoAlpha: 1, ease: Power1.easeOut })
            .fromTo($('#slide05 section'), 0.6, { y: '+=20' }, { autoAlpha: 1, ease: Power1.easeOut }); //.to($('#slide05 section'), 0.5, { y: '-100px', ease: Power1.easeOut }); //.set($('#slide05 header'), { autoAlpha: 1 }, '+=2.5');

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

        //  bind scroll to anchor links
        $(document).on("click", "a[href^='#']", function(e) {
            var id = $(this).attr("href");
            if ($(id).length > 0) {
                e.preventDefault();

                // trigger scroll
                controller.scrollTo(id);

                // if supported by the browser we can even update the URL.
                if (window.history && window.history.pushState) {
                    history.pushState("", document.title, id);
                }
            }
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
    $('#lungVideo')[0].play();
    $('#white-streets-video')[0].play();

    var visualizers = { nickCatchdubsSong: null, whiteLungSong: null, exHexSong: null };
    var v = null;
    var lastEl;
    var lastElparentId;

    var visualize = function() {
        var el = $('#playingCircles')[0];
        var id = el.parentNode.id;
        var circleRender = playingCircles();
        //console.log("visualize");
        v = visualizers[$currentSong.attr('id')];
        //console.log($currentSong.attr('id'));
        //console.log(v);
        if (!v) {
            //console.log("new visualizer");
            visualizers[$currentSong.attr('id')] = new Visualization({ song: $currentSong[0], renderer: circleRender });
            v = visualizers[$currentSong.attr('id')];
        }
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
        $currentSong[0].volume = 0.8;
        //console.log($currentSong);
        if (noVisualize) {
            $currentSong[0].play();
        } else {
            visualize($currentSong);
        }
        this.style.display = 'none'; //('display', 'none');
        $('#pauseBtn').css('display', 'block');
    });
    $('#pauseBtn').on('click', function() {
        //$('#playSong')[0].pause();
        //playinTl.pause();
        //console.log($currentSong);
        if (noVisualize) {
            $currentSong[0].pause();
        } else {
            visualize($currentSong);
        }
        this.style.display = 'none'; //('display', 'none');
        $('#playBtn').css('display', 'block');
    });

    var fadeTimeout;

    function fadeVolume(el, volume, callback) {
        var factor = 0.01,
            speed = 15;
        //console.log("fading");
        //console.log(volume);
        if (volume > (factor * 2)) {
            fadeTimeout = setTimeout(function() {
                fadeVolume(el, (el.volume -= factor), callback);
            }, speed);
        } else {
            clearTimeout(fadeTimeout);
            (typeof(callback) !== 'function') || callback();
        }
    }

    var newSong = function($song, currentSongAudio) {
        $currentSong = $song;
        if (!currentSongAudio.paused) {
            fadeVolume(currentSongAudio, currentSongAudio.volume, function() {
                //console.log("Song faded");
                if (noVisualize) {
                    currentSongAudio.pause();
                    currentSongAudio.volume = 0.8;
                    $song[0].play();
                } else {
                    v.stop();
                    visualize();
                }
            });
        }
        $('.currentSong').removeClass('currentSong');
        $song.addClass('currentSong');
    }

    function switchSongs(artist) {
        var currentSongAudio = $currentSong[0];
        //console.log(currentSongAudio);
        //console.log(currentSongAudio.paused);

        if (artist == 'nickCatchdubs') {
            //console.log("switch to nick");
            var $nickCatchdubsSong = $('#nickCatchdubsSong');
            newSong($nickCatchdubsSong, currentSongAudio);
        } else if (artist == 'whiteLung') {
            //console.log("switch to lung");
            var $whiteLungSong = $('#whiteLungSong');
            newSong($whiteLungSong, currentSongAudio);
        } else if (artist == 'exHex') {
            //console.log("switch to hex");
            var $exHexSong = $('#exHexSong');
            newSong($exHexSong, currentSongAudio);
        }
    }

}(jQuery));

function Visualization(config) {
    var audio, song, audioStream, analyser, source, audioCtx, canvasCtx, frequencyData, running = false,
        renderer = config.renderer,
        width = config.width || 360,
        height = config.height || 360;

    console.log(config);
    var init = function(_song) {
        song = _song || config.song;
        //console.log(song);
        audio = $(song)[0];
        audio.crossOrigin = "anonymous";
        var AudioContext = window.AudioContext || window.webkitAudioContext;
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
        //console.log("stargin: " + audio);
        audio.volume = 0.8;
        audio.play();
        running = true;
        renderFrame();
    };
    this.stop = function() {
        //console.log("stopping: " + audio);
        running = false;
        audio.pause();
    };
    this.setRenderer = function(r) {
        if (!r.isInitialized()) { r.init({ count: analyser.frequencyBinCount, width: width, height: height }); }
        renderer = r;
    };
    this.isPlaying = function() {
        return running;
    };
    this.remove = function(callback) {
        audio.pause();
        running = false;
        audioCtx.close().then(callback);
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