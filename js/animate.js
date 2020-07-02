const callAnimated= (event) =>{
    var elements;
    var windowHeight;
  
    function init() {
      elements = document.querySelectorAll(`#${event}`);
      windowHeight = window.innerHeight;
    }
  
    function checkPosition() {
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var positionFromTop = elements[i].getBoundingClientRect().top;
  
        if (positionFromTop - windowHeight <= 0) {
          element.classList.add(event);
          // element.classList.remove('hidden');
        }
      }
    }
  
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
  
    init();
    checkPosition();
  }
  
  callAnimated('fadeInLeft');
  callAnimated('fadeIn');