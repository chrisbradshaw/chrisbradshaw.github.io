$(document).ready(function(){

  var $wiggle = $('.wiggle');

$(function () {
  $(window).scroll(function () {
    var offset = $("body").scrollTop();

    if (offset >= 175) {
      $('.call-email i').css( "color", "#04114A" );
  } else {
      $('.call-email i').css( "color", "rgb(224, 211, 146)" );

    }
  });
});


var wiggleTime = function($wiggle) {
    $wiggle.ClassyWiggle() = function(method, options) {
        options = $wiggle.extend({
            degrees: ['2','4','2','0','-2','-4','-2','0'], /* Movement Measurements */
            delay: 30, /* Wiggle Speed */
            limit: null,
            randomStart: true,
            onWiggle: function(o) {},
            onWiggleStart: function(o) {},
            onWiggleStop: function(o) {}
        }, options);
        var methods = {
            wiggle: function(o, step){
                if (step === undefined) {
                    step = options.randomStart ? Math.floor(Math.random() * options.degrees.length) : 0;
                }
                if (!$(o).hasClass('wiggling')) {
                    $(o).addClass('wiggling');
                }
                var degree = options.degrees[step];
                $(o).css({
                    '-webkit-transform': 'rotate(' + degree + 'deg)',
                    '-moz-transform': 'rotate(' + degree + 'deg)',
                    '-o-transform': 'rotate(' + degree + 'deg)',
                    '-sand-transform': 'rotate(' + degree + 'deg)',
                    'transform': 'rotate(' + degree + 'deg)'
                });
                if (step == (options.degrees.length - 1)) {
                    step = 0;
                    if ($(o).data('wiggles') === undefined) {
                        $(o).data('wiggles', 1);
                    }
                    else {
                        $(o).data('wiggles', $(o).data('wiggles') + 1);
                    }
                    options.onWiggle(o);
                }
                if (options.limit && $(o).data('wiggles') == options.limit) {
                    return methods.stop(o);
                }
                o.timeout = setTimeout(function() {
                    methods.ClassyWiggle()(o, step + 1);
                }, options.delay);
            },
            stop: function(o) {
                $(o).data('wiggles', 0);
                $(o).css({
                    '-webkit-transform': 'rotate(0deg)',
                    '-moz-transform': 'rotate(0deg)',
                    '-o-transform': 'rotate(0deg)',
                    '-sand-transform': 'rotate(0deg)',
                    'transform': 'rotate(0deg)'
                });
                if ($(o).hasClass('wiggling')) {
                    $(o).removeClass('wiggling');
                }
                clearTimeout(o.timeout);
                o.timeout = null;
                options.onWiggleStop(o);
            },
            isWiggling: function(o) {
                return !o.timeout ? false : true;
            }
        };
        if (method == 'isWiggling' && this.length == 1) {
            return methods.isWiggling(this[0]);
        }
        this.each(function() {
            if ((method == 'start' || method === undefined) && !this.timeout) {
                methods.ClassyWiggle()(this);
                options.onWiggleStart(this);
            }
            else if (method == 'stop') {
                methods.stop(this);
            }
        });
        return this;
    };
};


function wiggleForOneSecond(el){
    el.ClassyWiggle();
    setTimeout(function(){el.ClassyWiggle('stop')},1000)
}

setInterval(function(){

      wiggleForOneSecond($('.wiggle'))},5000);
});