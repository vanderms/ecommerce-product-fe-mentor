(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Navbar = /** @class */ (function () {
    function Navbar() {
        var _this = this;
        this.navbar = document.querySelector(".navbar-component");
        this.sidebar = document.querySelector('.sidebar-component');
        this.links = document.querySelectorAll('.navbar-component a, .sidebar-component a');
        this.backdrop = this.createBackdrop();
        this.menuBtn = this.createMenuButton();
        this.closeBtn = this.createCloseButton();
        this.menuBtn.addEventListener('click', function () { return _this.open(); });
        this.backdrop.addEventListener('click', function () { return _this.close(); });
        this.closeBtn.addEventListener('click', function () { return _this.close(); });
        this.links.forEach(function (link) {
            link.addEventListener('click', function () { return _this.close(); });
        });
    }
    Navbar.prototype.createCloseButton = function () {
        var temp = document.createElement('template');
        temp.innerHTML = /*html*/ "    \n      <button aria-label='close menu' class='btn-close'>\n        <svg width=\"14\" height=\"15\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z\" fill=\"#69707D\" fill-rule=\"evenodd\"/></svg>\n      </button>\n    ";
        this.sidebar.insertBefore(temp.content, this.sidebar.firstChild);
        return this.sidebar.querySelector('.btn-close');
    };
    Navbar.prototype.createMenuButton = function () {
        var temp = document.createElement('template');
        temp.innerHTML = /*html*/ "    \n    <button aria-label='menu' class='menu-btn close'> \n    <svg width=\"16\" height=\"15\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z\" fill=\"#69707D\" fill-rule=\"evenodd\"/></svg>\n    </button>\n    ";
        this.navbar.appendChild(temp.content);
        return this.navbar.querySelector('.menu-btn');
    };
    Navbar.prototype.createBackdrop = function () {
        var temp = document.createElement('template');
        temp.innerHTML = /*html*/ "<div class=\"sidebar-component-backdrop close\"></div>";
        this.sidebar.parentNode.insertBefore(temp.content, this.sidebar);
        return document.querySelector('.sidebar-component-backdrop');
    };
    Navbar.prototype.open = function () {
        [this.navbar, this.sidebar, this.backdrop, this.menuBtn].forEach(function (e) { return e.classList.remove('close'); });
    };
    Navbar.prototype.close = function () {
        [this.navbar, this.sidebar, this.backdrop, this.menuBtn].forEach(function (e) { return e.classList.add('close'); });
    };
    return Navbar;
}());
exports.default = new Navbar();
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Carousel = /** @class */ (function () {
    function Carousel() {
        var _this = this;
        this.scrollY = 0;
        var root = document.querySelector('.section-product');
        var clone = this.createClone(root);
        this.setThumbnails(root);
        this.setArrows(root);
        this.setThumbnails(clone);
        this.setArrows(clone);
        var image = root.querySelector('.picture');
        image.addEventListener('click', function () { return _this.openClone(clone, root); });
        var closeModal = clone.querySelector('.close-modal');
        closeModal.addEventListener('click', function () {
            _this.closeClone(clone, root);
        });
        var backdrop = clone.querySelector('.backdrop');
        backdrop.addEventListener('click', function () {
            _this.closeClone(clone, root);
        });
    }
    Carousel.prototype.openClone = function (clone, root) {
        this.setActiveByCurrentImage(clone, function () {
            var currentImage = root.querySelector('.picture');
            var current = Number(currentImage.dataset.current);
            return current;
        });
        document.body.appendChild(clone);
        var y = root.getBoundingClientRect().y;
        this.scrollY = window.scrollY;
        root.setAttribute('style', "\n      position: fixed;\n      top: ".concat(y, "px;\n    "));
        window.scrollTo(0, 0);
    };
    Carousel.prototype.closeClone = function (clone, root) {
        clone.remove();
        root.setAttribute('style', '');
        window.scrollTo(0, this.scrollY);
    };
    Carousel.prototype.setThumbnails = function (root) {
        var _this = this;
        var thumbnails = root.querySelectorAll('.thumbnail-ctn');
        thumbnails.forEach(function (thumbnail) {
            var image = thumbnail.querySelector('img');
            thumbnail.addEventListener('click', function () { return _this.setActive(root, image.src); });
        });
    };
    Carousel.prototype.setArrows = function (root) {
        var _this = this;
        var previousBtn = root.querySelector('.previous-btn');
        previousBtn.addEventListener('click', function () {
            _this.setActiveByCurrentImage(root, function (number) { return ((number + 3) % 4); });
        });
        var nextBtn = root.querySelector('.next-btn');
        nextBtn.addEventListener('click', function () {
            _this.setActiveByCurrentImage(root, function (number) { return ((number + 1) % 4); });
        });
    };
    Carousel.prototype.createClone = function (root) {
        var clone = root.cloneNode(true);
        clone.querySelector('.content-ctn').remove();
        clone.className = 'section-product-clone';
        return clone;
    };
    Carousel.prototype.setActiveByCurrentImage = function (root, fn) {
        var currentImage = root.querySelector('.picture');
        var current = Number(currentImage.dataset.current);
        current = fn(current);
        currentImage.dataset.current = String(current);
        var thumbnails = root.querySelectorAll('.thumbnail-ctn');
        var image = thumbnails[current].querySelector('img');
        this.setActive(root, image.src);
    };
    Carousel.prototype.setActive = function (root, src) {
        var _this = this;
        var thumbnails = root.querySelectorAll('.thumbnail-ctn');
        thumbnails.forEach(function (thumbnail, index) {
            var image = thumbnail.querySelector('img');
            if (image.src === src) {
                thumbnail.classList.add('active');
                var currentImage = root.querySelector('.picture');
                currentImage.src = _this.getImageSrc(src);
                currentImage.dataset.current = String(index);
            }
            else {
                thumbnail.classList.remove('active');
            }
        });
    };
    Carousel.prototype.getImageSrc = function (thumbnailSrc) {
        var index = thumbnailSrc.indexOf('-thumbnail.jpg');
        var imageSrc = thumbnailSrc.slice(0, index);
        return imageSrc + '.jpg';
    };
    return Carousel;
}());
exports.default = new Carousel();
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../components/navbar/navbar.ts");
require("./carousel.ts");
},{"../components/navbar/navbar.ts":1,"./carousel.ts":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLnRzIiwic3JjL3RzL2Nhcm91c2VsLnRzIiwic3JjL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0lBU0U7UUFBQSxpQkFnQkM7UUFkQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQWdCLENBQUM7UUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFnQixDQUFDO1FBQzNFLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDJDQUEyQyxDQUFrQyxDQUFDO1FBQ3JILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDckIsSUFBSSxDQUFDLGdCQUFn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anMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNsYXNzIE5hdmJhciB7XHJcbiAgXHJcbiAgcHJpdmF0ZSBuYXZiYXI6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgc2lkZWJhcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBsaW5rczogTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XHJcbiAgcHJpdmF0ZSBiYWNrZHJvcDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBtZW51QnRuOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGNsb3NlQnRuOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB0aGlzLm5hdmJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2YmFyLWNvbXBvbmVudFwiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLWNvbXBvbmVudCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5saW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXZiYXItY29tcG9uZW50IGEsIC5zaWRlYmFyLWNvbXBvbmVudCBhJykgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XHJcbiAgICB0aGlzLmJhY2tkcm9wID0gdGhpcy5jcmVhdGVCYWNrZHJvcCgpO1xyXG4gICAgdGhpcy5tZW51QnRuID0gIHRoaXMuY3JlYXRlTWVudUJ1dHRvbigpO1xyXG4gICAgdGhpcy5jbG9zZUJ0biA9IHRoaXMuY3JlYXRlQ2xvc2VCdXR0b24oKTtcclxuXHJcbiAgICB0aGlzLm1lbnVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHRoaXMub3BlbigpKTsgICAgXHJcbiAgICB0aGlzLmJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB0aGlzLmNsb3NlKCkpOyAgICBcclxuICAgIHRoaXMuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHRoaXMuY2xvc2UoKSk7IFxyXG5cclxuICAgIHRoaXMubGlua3MuZm9yRWFjaChsaW5rID0+eyAgICBcclxuICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2UoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNsb3NlQnV0dG9uKCkgOiBIVE1MRWxlbWVudCB7XHJcblxyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRlbXAuaW5uZXJIVE1MID0gLypodG1sKi9gICAgIFxyXG4gICAgICA8YnV0dG9uIGFyaWEtbGFiZWw9J2Nsb3NlIG1lbnUnIGNsYXNzPSdidG4tY2xvc2UnPlxyXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJtMTEuNTk2Ljc4MiAyLjEyMiAyLjEyMkw5LjEyIDcuNDk5bDQuNTk3IDQuNTk3LTIuMTIyIDIuMTIyTDcgOS42MmwtNC41OTUgNC41OTctMi4xMjItMi4xMjJMNC44NzggNy41LjI4MiAyLjkwNCAyLjQwNC43ODJsNC41OTUgNC41OTZMMTEuNTk2Ljc4MlpcIiBmaWxsPVwiIzY5NzA3RFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIi8+PC9zdmc+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgYDtcclxuICAgIHRoaXMuc2lkZWJhci5pbnNlcnRCZWZvcmUodGVtcC5jb250ZW50LCB0aGlzLnNpZGViYXIuZmlyc3RDaGlsZCk7XHJcbiAgICByZXR1cm4gdGhpcy5zaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2xvc2UnKSBhcyBIVE1MRWxlbWVudDtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU1lbnVCdXR0b24oKXtcclxuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgICB0ZW1wLmlubmVySFRNTCA9IC8qaHRtbCovYCAgICBcclxuICAgIDxidXR0b24gYXJpYS1sYWJlbD0nbWVudScgY2xhc3M9J21lbnUtYnRuIGNsb3NlJz4gXHJcbiAgICA8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTE2IDEydjNIMHYtM2gxNlptMC02djNIMFY2aDE2Wm0wLTZ2M0gwVjBoMTZaXCIgZmlsbD1cIiM2OTcwN0RcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIvPjwvc3ZnPlxyXG4gICAgPC9idXR0b24+XHJcbiAgICBgOyAgICBcclxuICAgIHRoaXMubmF2YmFyLmFwcGVuZENoaWxkKHRlbXAuY29udGVudCk7XHJcbiAgICByZXR1cm4gdGhpcy5uYXZiYXIucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVCYWNrZHJvcCgpIDogSFRNTEVsZW1lbnQge1xyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRlbXAuaW5uZXJIVE1MID0gLypodG1sKi9gPGRpdiBjbGFzcz1cInNpZGViYXItY29tcG9uZW50LWJhY2tkcm9wIGNsb3NlXCI+PC9kaXY+YDsgICAgXHJcbiAgICB0aGlzLnNpZGViYXIucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKHRlbXAuY29udGVudCwgdGhpcy5zaWRlYmFyKTtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhci1jb21wb25lbnQtYmFja2Ryb3AnKSBhcyBIVE1MRWxlbWVudDtcclxuICB9XHJcbiAgXHJcblxyXG4gIG9wZW4oKXtcclxuICAgIFt0aGlzLm5hdmJhciwgdGhpcy5zaWRlYmFyLCB0aGlzLmJhY2tkcm9wLCB0aGlzLm1lbnVCdG5dLmZvckVhY2goZSA9PiBlLmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NlJykpOyAgXHJcbiAgfVxyXG5cclxuXHJcbiAgY2xvc2UoKXtcclxuICAgIFt0aGlzLm5hdmJhciwgdGhpcy5zaWRlYmFyLCB0aGlzLmJhY2tkcm9wLCB0aGlzLm1lbnVCdG5dLmZvckVhY2goZSA9PiBlLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJykpOyBcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgTmF2YmFyKCk7IiwiXHJcbmNsYXNzIENhcm91c2Vse1xyXG4gIFxyXG4gIHByaXZhdGUgc2Nyb2xsWTogbnVtYmVyID0gMDtcclxuIFxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tcHJvZHVjdCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgY2xvbmUgPSB0aGlzLmNyZWF0ZUNsb25lKHJvb3QpO1xyXG4gICBcclxuIFxyXG4gICAgdGhpcy5zZXRUaHVtYm5haWxzKHJvb3QpO1xyXG4gICAgdGhpcy5zZXRBcnJvd3Mocm9vdCk7XHJcblxyXG5cclxuICAgIHRoaXMuc2V0VGh1bWJuYWlscyhjbG9uZSk7XHJcbiAgICB0aGlzLnNldEFycm93cyhjbG9uZSk7XHJcblxyXG4gICAgY29uc3QgaW1hZ2UgPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub3BlbkNsb25lKGNsb25lLCByb290KSk7XHJcbiAgICBcclxuICAgIGNvbnN0IGNsb3NlTW9kYWwgPSBjbG9uZS5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtbW9kYWwnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNsb3NlTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICB0aGlzLmNsb3NlQ2xvbmUoY2xvbmUsIHJvb3QpO1xyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgXHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIHRoaXMuY2xvc2VDbG9uZShjbG9uZSwgcm9vdCk7XHJcbiAgICB9KVxyXG5cclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIG9wZW5DbG9uZShjbG9uZSA6IEhUTUxFbGVtZW50LCByb290OiBIVE1MRWxlbWVudCl7ICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgdGhpcy5zZXRBY3RpdmVCeUN1cnJlbnRJbWFnZShjbG9uZSwgKCkgPT57XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcignLnBpY3R1cmUnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgbGV0IGN1cnJlbnQ6IG51bWJlciA9IE51bWJlcihjdXJyZW50SW1hZ2UuZGF0YXNldC5jdXJyZW50KTtcclxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb25lKTsgICAgXHJcbiAgICBjb25zdCB5OiBudW1iZXIgPSByb290LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnk7XHJcbiAgICB0aGlzLnNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgICAgICBcclxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIGBcclxuICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICB0b3A6ICR7eX1weDtcclxuICAgIGApO1xyXG5cclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VDbG9uZShjbG9uZSA6IEhUTUxFbGVtZW50LCByb290OiBIVE1MRWxlbWVudCl7XHJcbiAgICBjbG9uZS5yZW1vdmUoKTtcclxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTsgICAgXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgdGhpcy5zY3JvbGxZKTtcclxuICAgXHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBzZXRUaHVtYm5haWxzKHJvb3Q6IEhUTUxFbGVtZW50KXtcclxuICAgIGNvbnN0IHRodW1ibmFpbHMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aHVtYm5haWwtY3RuJykgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XHJcbiAgICB0aHVtYm5haWxzLmZvckVhY2godGh1bWJuYWlsID0+IHsgICAgIFxyXG4gICAgICBjb25zdCBpbWFnZSA9IHRodW1ibmFpbC5xdWVyeVNlbGVjdG9yKCdpbWcnKSBhcyBIVE1MSW1hZ2VFbGVtZW50OyAgICAgXHJcbiAgICAgIHRodW1ibmFpbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2V0QWN0aXZlKHJvb3QsIGltYWdlLnNyYykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBzZXRBcnJvd3Mocm9vdDogSFRNTEVsZW1lbnQpe1xyXG4gICAgY29uc3QgcHJldmlvdXNCdG4gPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cy1idG4nKSBhcyBIVE1MRWxlbWVudDsgICAgXHJcbiAgICBwcmV2aW91c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xyXG4gICAgICB0aGlzLnNldEFjdGl2ZUJ5Q3VycmVudEltYWdlKHJvb3QsIG51bWJlciA9PiAoKG51bWJlciArIDMpICUgNCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgbmV4dEJ0biA9IHJvb3QucXVlcnlTZWxlY3RvcignLm5leHQtYnRuJykgYXMgSFRNTEVsZW1lbnQ7ICAgIFxyXG4gICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xyXG4gICAgICB0aGlzLnNldEFjdGl2ZUJ5Q3VycmVudEltYWdlKHJvb3QsIG51bWJlciA9PiAoKG51bWJlciArIDEpICUgNCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNsb25lKHJvb3Q6IEhUTUxFbGVtZW50KSA6IEhUTUxFbGVtZW50e1xyXG4gICAgY29uc3QgY2xvbmUgPSByb290LmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWN0bicpIS5yZW1vdmUoKTtcclxuICAgIGNsb25lLmNsYXNzTmFtZSA9ICdzZWN0aW9uLXByb2R1Y3QtY2xvbmUnO1xyXG4gICAgcmV0dXJuIGNsb25lO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgc2V0QWN0aXZlQnlDdXJyZW50SW1hZ2Uocm9vdDogSFRNTEVsZW1lbnQsIGZuOiAoeDogbnVtYmVyKSA9PiBudW1iZXIpe1xyXG4gICAgY29uc3QgY3VycmVudEltYWdlID0gcm9vdC5xdWVyeVNlbGVjdG9yKCcucGljdHVyZScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IGN1cnJlbnQ6IG51bWJlciA9IE51bWJlcihjdXJyZW50SW1hZ2UuZGF0YXNldC5jdXJyZW50KTtcclxuICAgIGN1cnJlbnQgPSBmbihjdXJyZW50KTtcclxuICAgIGN1cnJlbnRJbWFnZS5kYXRhc2V0LmN1cnJlbnQgPSBTdHJpbmcoY3VycmVudCk7XHJcbiAgICBjb25zdCB0aHVtYm5haWxzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKCcudGh1bWJuYWlsLWN0bicpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xyXG4gICAgY29uc3QgaW1hZ2UgPSB0aHVtYm5haWxzW2N1cnJlbnRdLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICB0aGlzLnNldEFjdGl2ZShyb290LCBpbWFnZS5zcmMpO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgcHJpdmF0ZSBzZXRBY3RpdmUocm9vdDogSFRNTEVsZW1lbnQsIHNyYyA6IHN0cmluZyl7IFxyXG4gICAgY29uc3QgdGh1bWJuYWlscyA9IHJvb3QucXVlcnlTZWxlY3RvckFsbCgnLnRodW1ibmFpbC1jdG4nKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjsgXHJcbiAgICB0aHVtYm5haWxzLmZvckVhY2goKHRodW1ibmFpbCwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgaW1hZ2UgPSB0aHVtYm5haWwucXVlcnlTZWxlY3RvcignaW1nJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgICAgaWYoaW1hZ2Uuc3JjID09PSBzcmMpe1xyXG4gICAgICAgIHRodW1ibmFpbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50SW1hZ2UgPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgICAgICBjdXJyZW50SW1hZ2Uuc3JjID0gdGhpcy5nZXRJbWFnZVNyYyhzcmMpO1xyXG4gICAgICAgIGN1cnJlbnRJbWFnZS5kYXRhc2V0LmN1cnJlbnQgPSBTdHJpbmcoaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRodW1ibmFpbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgfSBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgZ2V0SW1hZ2VTcmModGh1bWJuYWlsU3JjOiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgY29uc3QgaW5kZXggPSB0aHVtYm5haWxTcmMuaW5kZXhPZignLXRodW1ibmFpbC5qcGcnKTtcclxuICAgIGNvbnN0IGltYWdlU3JjID0gdGh1bWJuYWlsU3JjLnNsaWNlKDAsIGluZGV4KTtcclxuICAgIHJldHVybiBpbWFnZVNyYyArICcuanBnJztcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IENhcm91c2VsKCk7IiwiaW1wb3J0ICcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXIudHMnO1xyXG5pbXBvcnQgJy4vY2Fyb3VzZWwudHMnOyJdfQ==
