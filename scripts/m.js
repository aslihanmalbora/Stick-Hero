(function() {
  'use strict';
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());

$(function() {
  'use strict';

  function Game(options) {

    this.options = options || {};
    var VERSION = '1.0.3';
    var GAME_DEFAULT_WIDTH = 320;
    var GAME_DEFAULT_HEIGHT = 480;
    var GAME_WIDTH = this.options.width || GAME_DEFAULT_WIDTH;
    var GAME_HEIGHT = this.options.height || GAME_DEFAULT_HEIGHT;
    var WIDTH_RATIO = GAME_WIDTH / GAME_DEFAULT_WIDTH;
    var HEIGHT_RATIO = GAME_HEIGHT / GAME_DEFAULT_HEIGHT;
    var BOX_BASE_WIDTH = Math.round(50 * WIDTH_RATIO); //
    var BOX_HEIGHT = Math.round(120 * HEIGHT_RATIO); //
    var STICK_WIDTH = 3;
    var STICK_LEFT = BOX_BASE_WIDTH - STICK_WIDTH;
    var STICK_BOTTOM = BOX_HEIGHT;
    var GAP = 4;
    var STICK_INC = 3;
    var PERFECT_WIDTH = 6;
    var UNLOCK_COUNT = 5;
    var BOX_LEFT_MIN = BOX_BASE_WIDTH + 30;
    var BOX_LEFT_MAX = GAME_WIDTH - BOX_BASE_WIDTH;
    var BOX_WIDTH_MIN = Math.round(15 * WIDTH_RATIO); //
    var BOX_WIDTH_MAX = Math.round(69 * WIDTH_RATIO); //
    var ANIMATION_END_EVENTS = 'webkitTransitionEnd transitionend animationend webkitAnimationEnd';
    var TITLE_DEFAULT = '';
    var IS_TOUCHING = false;
    var PRESS_STARTED = false;
    var IS_WECHAT = !!navigator.userAgent.match(/MicroMessenger/);
    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js#L40
    var IS_TOUCH = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    var CLICK_EVENT = IS_TOUCH ? 'touchstart' : 'click';
    var HERO_WIDTH; //
    var HERO_HEIGHT; //
    var HERO_HAT;
    var HERO_FEET;
    var HERO_BOTTOM;
    var HERO_INIT_LEFT;
    // [width, height, feet_bottom]
    var HEROS = [[18, 24, 5], [18, 24, 5], [20, 18, 14],
      [18, 18, 7, 22, 11, 13], [18, 24, 10, 20, 28, 10, 20], [18, 24, 10, 28, 15, 32, 5]];
    var STATES = {
      WELCOME: 0,
      PRE_BEGIN: 1,
      BEGIN: 2,
      STICK_ROTATION: 3,
      HERO_WALK: 4,
      SHIFTING: 5,
      DYING: 6,
      UPDATE: 7,
      DEAD: 8
    };
    var LAST_STATE = 8;

    this.init = function() {
      this.checkVersion();
      this.initVars();
      this.bindEvents();
      this.reset();
    };

    this.checkVersion = function () {
      var version = localStorage.getItem('version') || '0.0.0';
      localStorage.setItem('version', VERSION);
      this.upgrade(VERSION, version);
    };

    this.upgrade = function () { };

    this.initVars = function() {
      this.$title = $('title');
      TITLE_DEFAULT = this.$title.text();
      this.$copyright = $('.copyright');
      this.$game = $('#game').css({
        width: GAME_WIDTH + 'px',
        height: GAME_HEIGHT + 'px'
      });
      this.$ads = $('.ads');
      this.$gametitle = $('.game-title');
      this.$gameover = $('.game-over');
      this.$welcome = $('.welcome');
      this.$heropick = $('.heropick');
      this.$share = $('.share');
      this.$livescore = $('.live-score');
      this.$watermelon = $('.watermelon');
      this.$instruction = $('.instruction');
      this.$about = $('.about');
      this.$perfect = $('.perfect');
      this.$score = $('.score');
      this.$best = $('.best');
      this.$total = $('.total');
      this.$movedStick = $('nothing');
      this._currentState = STATES.WELCOME;
      this.total = parseInt(localStorage.getItem('total') || 0, 10);
      this.$total.text(this.total);
      this.gameRound = 0;

      this.heroInit();
      this.switchHero(this.hero);
    };

    this.heroInit = function () {
      this.hero = localStorage.getItem('hero') || 1;
      this.$heros = $('.hero-p');
      for (var i = 0; i < HEROS.length; i++) {
        var heroIndex = i + 1,
            unlocked = localStorage.getItem('hero' + heroIndex) === 'true',
            heroWidth = Math.round(HEROS[i][0] * WIDTH_RATIO),
            heroHeight = Math.round(HEROS[i][1] * WIDTH_RATIO),
            heroHat = heroWidth + 2;

        if (heroIndex !== 1 && unlocked) {
          $('.wrapper[data-src="' + heroIndex + '"]').removeClass('locked');
        }
        var $hero = $('.hero' + heroIndex);
        $hero.css({
          'width': heroWidth + 'px',
          'height': heroHeight + 'px'
        });
        $hero.find('.hat').css({'width': heroHat + 'px'});
        if (heroIndex === 4) {
          $hero.find('.body').css({
            'width': Math.floor(HEROS[i][3] * WIDTH_RATIO) + 'px',
            'height': Math.floor(HEROS[i][4] * WIDTH_RATIO) + 'px',
            'top': Math.floor(HEROS[i][5] * WIDTH_RATIO) + 'px'
          });
        }
        if (heroIndex === 5) {
          $hero.find('.hair-up').css({
            'width': Math.floor(HEROS[i][3] * WIDTH_RATIO) + 'px',
            'height': Math.floor(HEROS[i][5] * WIDTH_RATIO) + 'px'
          });
          $hero.find('.hair-down').css({
            'width': Math.floor(HEROS[i][4] * WIDTH_RATIO) + 'px',
            'height': Math.floor(HEROS[i][5] * WIDTH_RATIO) + 'px'
          });
          $hero.find('.ribbon').css({
            'border-right-width': Math.floor(HEROS[i][6] * WIDTH_RATIO) + 'px'
          });
        }
        if (heroIndex === 6) {
          $hero.find('.top').css({
            'width': Math.floor(HEROS[i][3] * WIDTH_RATIO) + 'px',
            'height': Math.floor(HEROS[i][4] * WIDTH_RATIO) + 'px'
          });
          $hero.find('.top-front').css({
            'width': Math.floor(HEROS[i][5] * WIDTH_RATIO) + 'px',
            'height': Math.floor(HEROS[i][6] * WIDTH_RATIO) + 'px'
          });
        }
      }
    };

    this.switchHero = function (hero) {
      this.hero = parseInt(hero, 10) || this.hero;
      localStorage.setItem('hero', this.hero);
      $('#wx_pic img').attr('src', 'images/hero' + this.hero + '.png');

      var HERO = HEROS[this.hero - 1];
      HERO_WIDTH = Math.round(HERO[0] * WIDTH_RATIO);
      HERO_HEIGHT = Math.round(HERO[1] * WIDTH_RATIO);
      HERO_HAT = HERO_WIDTH + 2;
      HERO_FEET = HERO[2];
      HERO_BOTTOM = BOX_HEIGHT + HERO_FEET;
      HERO_INIT_LEFT = BOX_BASE_WIDTH - HERO_WIDTH - GAP - STICK_WIDTH;

      this.$heros.hide();
      this.$hero = $('.hero-p.hero' + this.hero)
        .css({
          'bottom': HERO_BOTTOM + 'px',
          'transform': 'translate3d(' + (GAME_WIDTH - HERO_WIDTH) / 2 + 'px, 0, 0)',
          '-webkit-transform': 'translate3d(' + (GAME_WIDTH - HERO_WIDTH) / 2 + 'px, 0, 0)'
        }).show();
      this.$feet = this.$hero.find('.foot');
    };

    this.bindEvents = function() {
      var self = this;
      $('.btn-play').on(CLICK_EVENT, function() {
        self.nextAfterAnimation(self.$gametitle, STATES.PRE_BEGIN);
        self.$gametitle.addClass('hinge');
      });
      $('.btn-playagain').on(CLICK_EVENT, function() {
        self.reset();
        self.next(STATES.PRE_BEGIN);
      });
      $('.btn-home').on(CLICK_EVENT, function() {
        self.reset();
        self.next(STATES.WELCOME);
      });
      // $('.btn-about').on(CLICK_EVENT, function(event) {
      //   self.$about.show();
      //   event.stopPropagation();
      //   $(document).on(CLICK_EVENT, '.overlay', function() {
      //     $(document).off(CLICK_EVENT, '.overlay');
      //     self.$about.hide();
      //   });
      // });
      $('.btn-share').on(CLICK_EVENT, function(event) {
        self.$share.show();
        event.stopPropagation();
        $(document).on(CLICK_EVENT, '.overlay', function() {
          $(document).off(CLICK_EVENT, '.overlay');
          self.$share.hide();
        });
      });
      $('.btn-hero').on(CLICK_EVENT, function(event) {
        self.$heropick.toggleClass('in');
        event.stopPropagation();
        $(document).on(CLICK_EVENT, '.overlay', function() {
          $(document).off(CLICK_EVENT, '.overlay');
          self.$heropick.removeClass('in');
        });
      });
      $(document).on(CLICK_EVENT, '.heropick .wrapper', function(event) {
        var $target = $(event.currentTarget),
            price = parseInt($target.data('price'), 10),
            hero = $target.data('src');
        if ($target.hasClass('locked')) {
          if (self.total >= price) {
            self.total -= price;
            localStorage.setItem('hero' + hero, true);
            self.updateScore();
            $target.removeClass('locked');
          } else {
            event.preventDefault();
          }
        } else {
          self.switchHero(hero);
          $(document).off(CLICK_EVENT, '.overlay');
          self.$heropick.removeClass('in');
        }
        event.stopPropagation();
      });
      $(document).on('mousedown touchstart', function(event) {
        IS_TOUCHING = true;
        event.preventDefault();
      });
      $(document).on('mouseup touchend', function() {
        IS_TOUCHING = false;
      });
    };

    this.reset = function() {
      this.score = 0;
      this.count = 0;
      this.gameRound ++;
      this.adf = false;
      this.best = localStorage.getItem('best') || 0;
      this.$title.text(TITLE_DEFAULT);
      this.$heroContainer = this.$hero.parent();
      this.$game
        .removeClass('bounce bg1 bg2 bg3 bg4 bg5 bg6')
        .addClass('bg' + this._getRandom(1, 6));
      this.$gametitle.removeClass('hinge');
      this.$livescore.hide();
      this.$gameover.hide();
      this.$welcome.hide();
      this.$ads.removeClass('adf');
      this.updateScore();

      $('.box, .stick').remove();
      this.BOX1 = { left: 0, width: BOX_BASE_WIDTH };
      this.$box1 = $('<div />').addClass('box init').css({
        'height': BOX_HEIGHT + 'px',
        'width': this.BOX1.width + 'px',
        'right': -this.BOX1.width + 'px',
        'transform': 'translate3d(' + -(GAME_WIDTH + this.BOX1.width) / 2 + 'px, 0, 0)',
        '-webkit-transform': 'translate3d(' + -(GAME_WIDTH + this.BOX1.width) / 2 + 'px, 0, 0)'
      });
      this.$hero.hide().css({
        'bottom': HERO_BOTTOM + 'px',
        'transform': 'translate3d(' + (GAME_WIDTH - HERO_WIDTH) / 2 + 'px, 0, 0)',
        '-webkit-transform': 'translate3d(' + (GAME_WIDTH - HERO_WIDTH) / 2 + 'px, 0, 0)'
      }).show();
      this.$game.append(this.$box1);

      if (this._getRandom(1, 10) === 5) {
        this.adf = true;
      }
    };

    this.start = function() {
      this.welcome();
    };

    this.next = function(state) {
      if (state !== void 0) {
        this._currentState = state;
      } else if (this._currentState === LAST_STATE) {
        this._currentState = 0;
      } else {
        this._currentState++;
      }
      var funcName = camelCase(getKey(STATES, this._currentState));
      if (typeof this[funcName] === 'function') {
        this[funcName].call(this);
      }
    };

    this.nextAfterAnimation = function($elm, state) {
      var self = this;
      $elm.on(ANIMATION_END_EVENTS, function() {
        $elm.off(ANIMATION_END_EVENTS);
        self.next(state);
      });
    };

    this.welcome = function() {
      this.$gameover.hide();
      this.$livescore.hide();
      this.$watermelon.hide();
      this.$heropick.show();
      this.$welcome.show();
    };

    this.preBegin = function() {
      this.$welcome.hide();
      this.$gameover.hide();
      this.$copyright.hide();
      this.$heropick.hide();
      this.$livescore.show();
      this.$watermelon.show();
      this.$instruction.addClass('in');

      this.BOX2 = this._createBox();
      this.$box2 = $('<div />').addClass('box').css({
        'height': BOX_HEIGHT + 'px',
        'width': this.BOX2.width + 'px',
        'right': -this.BOX2.width + 'px'
      });
      this.$game.append(this.$box2);
      this.nextAfterAnimation(this.$box2);

      this.$hero.css({
        'transform': 'translate3d(' + (BOX_BASE_WIDTH - HERO_WIDTH - GAP - STICK_WIDTH) + 'px, 0, 0)',
        '-webkit-transform': 'translate3d(' + (BOX_BASE_WIDTH - HERO_WIDTH - GAP - STICK_WIDTH) + 'px, 0, 0)'
      });
      this.$box1.css({
        'transform': 'translate3d(' + -GAME_WIDTH + 'px, 0, 0)',
        '-webkit-transform': 'translate3d(' + -GAME_WIDTH + 'px, 0, 0)'
      });
      var self = this;
      setTimeout(function() {
        self.$box2.css({
          'transform': 'translate3d(' + -(GAME_WIDTH - self.BOX2.left) + 'px, 0, 0)',
          '-webkit-transform': 'translate3d(' + -(GAME_WIDTH - self.BOX2.left) + 'px, 0, 0)'
        });
      }, 100);

      if (this.adf && this.gameRound > 1) {
        this.$ads.addClass('adf');
      }
    };

    this.begin = function() {
      this._activeStickHeight = 0;
      this._validStickMin = this.BOX2.left - BOX_BASE_WIDTH;
      this._validStickMax = this._validStickMin + this.BOX2.width;

      $('.plus-one').remove();
      this.$activeStick = $('<div />')
        .addClass('stick')
        .css({
          left: STICK_LEFT + 'px',
          bottom: STICK_BOTTOM + 'px'
        });
      this.$game.append(this.$activeStick);

      var self = this;
      PRESS_STARTED = false;
      IS_TOUCHING = false;
      (function loop() {
        if ((PRESS_STARTED && IS_TOUCHING) || (!PRESS_STARTED)) {
          window.requestAnimationFrame(loop);
        }
        if (IS_TOUCHING) {
          if (!PRESS_STARTED) {
            self.$heroContainer.addClass('shake');
            self.$instruction.removeClass('in');
            PRESS_STARTED = true;
          }
          self._activeStickHeight += STICK_INC;
          // self.$activeStick[0].style.height = self._activeStickHeight + 'px';
          self.$activeStick.css({height: self._activeStickHeight + 'px'});
        }
        if (!IS_TOUCHING && PRESS_STARTED) {
          self.next();
        }
      })();
    };

    this.stickRotation = function() {
      this.nextAfterAnimation(this.$activeStick);

      this.$heroContainer.removeClass('shake');
      this.$activeStick
        .css({
          'transition-duration': '0.4s',
          '-webkit-transition-duration': '0.4s',
          'transition-timing-function': 'ease-in',
          '-webkit-transition-timing-function': 'ease-in'
        }).addClass('rotate');
    };

    this.heroWalk = function() {
      this.dx = this.BOX2.left + this.BOX2.width - BOX_BASE_WIDTH;

      if (this._activeStickHeight > this._validStickMin && this._activeStickHeight < this._validStickMax) {
        this.nextAfterAnimation(this.$hero, STATES.SHIFTING);

        this._perfectMin = this._validStickMin + (this.BOX2.width - PERFECT_WIDTH) / 2;
        this._perfectMax = this._perfectMin + PERFECT_WIDTH;
        this.inc = 1;
        // if pecfect
        if (this._activeStickHeight >= this._perfectMin && this._activeStickHeight <= this._perfectMax) {
          this.inc = 2;
          this.count ++;
          this.$perfect.addClass('in');
          var $plus = $('<div />').addClass('plus-one').css({
            'left': this.BOX2.left + ((this.BOX2.width - 14) / 2) + 'px',
            'bottom': BOX_HEIGHT + 10 + 'px'
          }).text('+1');
          this.$game.append($plus);
          setTimeout(function () {
            $plus.addClass('out');
          }, 100);
          if (this.count >= UNLOCK_COUNT) {
            localStorage.setItem('hero5', true);
            $('.wrapper[data-src="5"]').removeClass('locked');
          }
        } else {
          this.count = 0;
        }

        this.$hero.css({
          'transform': 'translate3d(' + (this.BOX2.left + this.BOX2.width - HERO_WIDTH - GAP - STICK_WIDTH) + 'px, 0, 0)',
          '-webkit-transform': 'translate3d(' + (this.BOX2.left + this.BOX2.width - HERO_WIDTH - GAP - STICK_WIDTH) + 'px, 0, 0)',
          'transition-duration': this.dx / 225 + 's',
          '-webkit-transition-duration': this.dx / 225 + 's',
          'transition-timing-function': 'linear',
          '-webkit-transition-timing-function': 'linear'
        });
      } else {
        this.nextAfterAnimation(this.$hero, STATES.DYING);

        var duration = (GAP + HERO_WIDTH + this._activeStickHeight) / 225;
        duration = duration > 1 ? 1 : duration;
        this.$hero.css({
          'transform': 'translate3d(' + (BOX_BASE_WIDTH + this._activeStickHeight) + 'px, 0, 0)',
          '-webkit-transform': 'translate3d(' + (BOX_BASE_WIDTH + this._activeStickHeight) + 'px, 0, 0)',
          'transition-duration': duration + 's',
          '-webkit-transition-duration': duration + 's',
          'transition-timing-function': 'linear',
          '-webkit-transition-timing-function': 'linear'
        });
      }
      this.$feet.addClass('walk');
      this.$activeStick.css({
        'transition-duration': '',
        '-webkit-transition-duration': '',
        'transition-timing-function': '',
        '-webkit-transition-timing-function': ''
      });
    };

    this.shifting = function() {
      this.nextAfterAnimation(this.$hero, STATES.UPDATE);

      var self = this;
      this.$feet.removeClass('walk').css('opacity', 0.9);
      setTimeout(function () {
        self.$feet.css('opacity', 1);
      }, 0);
      this.$perfect.removeClass('in');
      this.$hero.css({
        'transform': 'translate3d(' + (BOX_BASE_WIDTH - HERO_WIDTH - GAP - STICK_WIDTH) + 'px, 0, 0)',
        '-webkit-transform': 'translate3d(' + (BOX_BASE_WIDTH - HERO_WIDTH - GAP - STICK_WIDTH) + 'px, 0, 0)',
        'transition-duration': '',
        '-webkit-transition-duration': '',
        'transition-timing-function': '',
        '-webkit-transition-timing-function': ''
      });
      // Off Screen
      this.$box1.css({
        'transform': 'translate3d(' + -(this.dx + GAME_WIDTH) + 'px, 0, 0)',
        '-webkit-transform': 'translate3d(' + -(this.dx + GAME_WIDTH) + 'px, 0, 0)'
      });
      this.$box2.css({
        'transform': 'translate3d(' + -(GAME_WIDTH - BOX_BASE_WIDTH + this.BOX2.width) + 'px, 0, 0)',
        '-webkit-transform': 'translate3d(' + -(GAME_WIDTH - BOX_BASE_WIDTH + this.BOX2.width) + 'px, 0, 0)'
      });
      // Off Screen
      this.$movedStick.css({
        'transform': 'translate3d(' + -(this.dx + GAME_WIDTH) + 'px, 0, 0) rotate(90deg)',
        '-webkit-transform': 'translate3d(' + -(this.dx + GAME_WIDTH) + 'px, 0, 0) rotate(90deg)'
      });

      this.BOX3 = this._createBox();
      this.$box3 = $('<div />').addClass('box').css({
        'height': BOX_HEIGHT + 'px',
        'width': this.BOX3.width + 'px',
        'right': -this.BOX3.width + 'px'
      });
      this.$game.append(this.$box3);

      setTimeout(function() {
        self.$box3.css({
          'transform': 'translate3d(' + -(GAME_WIDTH - self.BOX3.left) + 'px, 0, 0)',
          '-webkit-transform': 'translate3d(' + -(GAME_WIDTH - self.BOX3.left) + 'px, 0, 0)'
        });
      }, 100);

      this.$activeStick.css({
        'transform': 'translate3d(' + -this.dx + 'px, 0, 0) rotate(90deg)',
        '-webkit-transform': 'translate3d(' + -this.dx + 'px, 0, 0) rotate(90deg)'
      });
    };

    this.dying = function() {
      this.nextAfterAnimation(this.$hero, STATES.DEAD);

      this.$hero.css({
        'transform': 'translate3d(' + (BOX_BASE_WIDTH + this._activeStickHeight) + 'px, ' + (BOX_HEIGHT + HERO_HEIGHT + 20) + 'px , 0)',
        '-webkit-transform': 'translate3d(' + (BOX_BASE_WIDTH + this._activeStickHeight) + 'px, ' + (BOX_HEIGHT + HERO_HEIGHT + 20) + 'px , 0)',
        'transition-duration': '0.2s',
        '-webkit-transition-duration': '0.2s',
        'transition-timing-function': '',
        '-webkit-transition-timing-function': ''
      });
      this.$feet.removeClass('walk');
      this.$activeStick.addClass('died');

      if (IS_WECHAT) {
        this.$title.text(TITLE_DEFAULT + ':太厉害了，我一不小心就前进了' + this.score + '步。连续5次+1解锁隐藏英雄哦！！');
      }
    };

    this.update = function() {
      this.score += this.inc;
      this.total += 1;
      this.updateScore();

      this.$box1.remove();
      this.$box1 = this.$box2;
      this.BOX1 = this.BOX2;
      this.$box2 = this.$box3;
      this.BOX2 = this.BOX3;

      this.$movedStick.remove();
      this.$movedStick = this.$activeStick;

      this.next(STATES.BEGIN);
    };

    this.dead = function() {
      this.$livescore.hide();
      this.$gameover.show();
      this.$game.addClass('bounce');
      this.$hero.css({
        'transition-duration': '',
        '-webkit-transition-duration': ''
      });
    };

    this.updateScore = function() {
      if (this.best < this.score) {
        this.best = this.score;
        localStorage.setItem('best', this.best);
      }

      localStorage.setItem('total', this.total);
      this.$total.text(this.total);
      this.$livescore.text(this.score);
      this.$score.text(this.score);
      this.$best.text(this.best);
    };

    this._createBox = function() {
      return {
        left: this._getRandom(BOX_LEFT_MIN, BOX_LEFT_MAX),
        width: this._getRandom(BOX_WIDTH_MIN, BOX_WIDTH_MAX)
      };
    };

    this._getRandom = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.init();

    return this;
  }

  function getKey(object, value) {
    for (var prop in object) {
      if (object.hasOwnProperty(prop) && object[prop] === value) {
        return prop;
      }
    }
  }

  function camelCase(input) {
    if (input) {
      return input.toLowerCase().replace(/_(.)/g, function(match, d) {
        return d.toUpperCase();
      });
    }
  }

  var viewportWidth = $(window).width();
  var viewportHeight = $(window).height();
  var options = {};
  if (viewportWidth < viewportHeight && viewportWidth < 500) {
    options.width = viewportWidth;
    options.height = viewportHeight;
  }

  new Game(options).start();

});
