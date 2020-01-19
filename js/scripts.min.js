var slider = (function (selector) {
    return function (selector) {
        var _mainElem = document.querySelector(selector),
            _timeAnimationSlide = 1000;
            _timeAnimationScroll = 1000;
            _offset = 10,
            _sliderWrapper = _mainElem.querySelector('.slider__wrapper'),
            _sliderItems = _mainElem.querySelectorAll('.slider__item'),
            changeable = true,
            _arrowPrev = document.querySelector('.slider__arrow-prev'),
            _arrowNext = document.querySelector('.slider__arrow-next');

        if (_sliderItems.length < 2) {
            return false;
        }

        function attributes(num) {
            for (var i = 0; i < _sliderItems.length; i++) {
                var dataIndex = _sliderItems[i].getAttribute('data-index');  
                dataIndex = +dataIndex + +num;
                _sliderItems[i].setAttribute('data-index', dataIndex);         
            }
        }

        for (var i = 0; i < _sliderItems.length; i++) {
            _sliderItems[i].setAttribute('data-index', i);  
            _sliderItems[i].style.transition = _timeAnimationSlide + 'ms';         
        }

        _sliderItems[_sliderItems.length - 1].addEventListener('onload', function () { 
            changeable = false;

            if (_mainElem.querySelector('.slider__item[data-index="-1"]') === null) {
                var slideNew = _mainElem.querySelectorAll('.slider__item')[_sliderItems.length - 1],
                    _slideWidth = _mainElem.querySelector('.slider__item').clientWidth + _offset;
    
                slideNew.remove();
                slideNew.style.zIndex = '3';
                slideNew.setAttribute('data-index', -1);
                
                _sliderWrapper.style.transform = 'translateX(' + -_slideWidth + 'px)';
                _sliderWrapper.prepend(slideNew);
    
                changeable = true;
    
            } else {
                changeable = true;
            }
        });             

        _sliderWrapper.style.transition = _timeAnimationScroll + 'ms';

        var _prev = function () {
            if (!changeable) {
                return false;
            }

            _sliderWrapper.style.transition = _timeAnimationScroll + 'ms';

            var _slideActive = _mainElem.querySelector('.slider__item[data-index="0"]'),
                 _slidePrev = _mainElem.querySelector('.slider__item[data-index="-1"]'),
                 _slideWidth = _mainElem.querySelector('.slider__item').clientWidth + _offset,
                 _transform = -_sliderWrapper.style.transform.replace(/[^\d.]/g, '');        
            
            translateX = _transform + _slideWidth;

            _slidePrev.style.zIndex = 4;
            _slideActive.style.zIndex = 3;

            _sliderWrapper.style.transform = 'translateX(' + translateX + 'px)';
            
            _slideActive.classList.remove('slider__item-active');
            _slidePrev.classList.add('slider__item-active');

            attributes(+1);

            changeable = false;
            
            if (_mainElem.querySelector('.slider__item[data-index="-1"]') === null) {
                setTimeout(function () {
                    var slideNew = _mainElem.querySelectorAll('.slider__item')[_sliderItems.length - 1];
                    slideNew.remove();
                    slideNew.classList.remove('slider__item-active');
                    slideNew.setAttribute('data-index', -1); 
                    slideNew.style.zIndex = '3';

                    _sliderWrapper.style.transition = '';
                    
                    translateX = translateX - _slideWidth;
                    _sliderWrapper.style.transform = 'translateX(' + translateX + 'px)';
                    _sliderWrapper.prepend(slideNew);

                    _slidePrev = _mainElem.querySelector('.slider__item[data-index="-1"]');

                    changeable = true;

                }, _timeAnimationSlide);
            } else {
                changeable = true;
            }
            
            return true;
        };

        var _next = function () {

            if (!changeable) {
                return false;
            }

            _sliderWrapper.style.transition = _timeAnimationScroll + 'ms';

            var _slideActive = _mainElem.querySelector('.slider__item[data-index="0"]'),
                 _slideNext = _mainElem.querySelector('.slider__item[data-index="1"]'),
                 _slideWidth = _mainElem.querySelector('.slider__item').clientWidth + _offset,
                 _transform = -_sliderWrapper.style.transform.replace(/[^\d.]/g, '');        
            
            translateX = _transform - _slideWidth;

            _slideActive.style.zIndex = 3;
            _slideNext.style.zIndex = 2;

            _sliderWrapper.style.transform = 'translateX(' + translateX + 'px)';
            
            _slideActive.classList.remove('slider__item-active');
            _slideNext.classList.add('slider__item-active');

            attributes(-1);

            changeable = false;

            if (_mainElem.querySelector('.slider__item[data-index="2"]') === null) {
                setTimeout(function () {
                    var slideNew = _mainElem.querySelector('.slider__item');
                    slideNew.remove();
                    slideNew.classList.remove('slider__item-active');
                    slideNew.setAttribute('data-index', 2); 
                    slideNew.style.zIndex = '';

                    _sliderWrapper.style.transition = '';
                    
                    translateX = translateX + _slideWidth;
                    _sliderWrapper.style.transform = 'translateX(' + translateX + 'px)';
                    _sliderWrapper.append(slideNew);
                    changeable = true;
                }, _timeAnimationSlide);
            } else {
                changeable = true;
            }
            
            return true;
            
        };

        _arrowPrev.addEventListener('click', function (e) {
           _prev();
        });

        _arrowNext.addEventListener('click', function (e) {
           _next();
        });

    }
}());

function ready() {
    if (document.querySelector('.about__slider') != null) {
        var aboutSlider = slider('.about__slider');
    }
}


document.addEventListener("DOMContentLoaded", ready);
