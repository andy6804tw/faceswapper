var s,
  portraitsGrid = {
    
    settings: {
      face: $('.face'),
      steps: $('.steps'),
      btn: $('.btn'),
      transitionGridIn: "fadeIn",
      transitionTitlesIn: "transition.flipYIn",
      transitionGridOut: "fadeOut",
      transitionTitlesOut: "transition.flipYOut",
    },

    init: function(options) {
      this.settings = $.extend(this.settings, options);
      s = this.settings;
      this.loadPortraits();
      this.initEvents();
    },

    loadPortraits: function() {
      var genero = ["men", "women"];
      s.face.find('img').each(function(i) {
        var rand = genero[Math.floor(Math.random() * genero.length)];
        $(this).attr('src', 'http://api.randomuser.me/portraits/' + rand + '/' + i + '.jpg'); //http://randomuser.me
      });
      s.face.last().find('img').one('load', function() {
        portraitsGrid.sequenceInOut(500, s.transitionGridIn, false, 800, 2700, s.transitionTitlesIn, 2500);
      });
    },

    initEvents: function() {
      s.btn.on('click', function(e) {
        e.preventDefault();
        portraitsGrid.sequenceInOut(0, s.transitionGridOut, true, 200, 0, s.transitionTitlesOut, 1800);
        setTimeout(function() {
          portraitsGrid.sequenceInOut(500, s.transitionGridIn, false, 800, 2700, s.transitionTitlesIn, 2500);
        }, 3800);
      });
    },

    sequenceInOut: function(delaygrid, easegrid, backgrid, durationgrid, delaytext, easetext, durationtext) {
      s.face.delay(delaygrid).velocity(easegrid, {
        stagger: 55,
        duration: durationgrid,
        backwards: backgrid,
        drag: true
      });
      s.steps.delay(delaytext).velocity(easetext, {
        duration: durationtext,
        backwards: backgrid,
        drag: true
      });
    }

  };

$(function() {
  portraitsGrid.init({
    //more http://julian.com/research/velocity/
    transitionGridIn: "transition.bounceIn",
    transitionGridOut: "transition.flipYOut"
  });
});