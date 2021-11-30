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
            _this.setActiveOnArrowClick(root, function (number) { return ((number + 3) % 4); });
        });
        var nextBtn = root.querySelector('.next-btn');
        nextBtn.addEventListener('click', function () {
            _this.setActiveOnArrowClick(root, function (number) { return ((number + 1) % 4); });
        });
    };
    Carousel.prototype.createClone = function (root) {
        var clone = root.cloneNode(true);
        clone.querySelector('.content-ctn').remove();
        clone.className = 'section-product-clone';
        return clone;
    };
    Carousel.prototype.setActiveOnArrowClick = function (root, fn) {
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
        thumbnails.forEach(function (thumbnail) {
            var image = thumbnail.querySelector('img');
            if (image.src === src) {
                thumbnail.classList.add('active');
                var currentImage = root.querySelector('.picture');
                currentImage.src = _this.getImageSrc(src);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLnRzIiwic3JjL3RzL2Nhcm91c2VsLnRzIiwic3JjL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0lBU0U7UUFBQSxpQkFnQkM7UUFkQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQWdCLENBQUM7UUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFnQixDQUFDO1FBQzNFLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDJDQUEyQyxDQUFrQyxDQUFDO1FBQ3JILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDckIsSUFBSSxDQUFDLGdCQUFn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QixDQUFDO1lBQ2pFLElBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUM7Z0JBQ25CLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBcUIsQ0FBQztnQkFDeEUsWUFBWSxDQUFDLEdBQUcsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFDO2lCQUNJO2dCQUNILFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR08sOEJBQVcsR0FBbkIsVUFBb0IsWUFBb0I7UUFDdEMsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JELElBQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE9BQU8sUUFBUSxHQUFHLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBRUgsZUFBQztBQUFELENBckhBLEFBcUhDLElBQUE7QUFHRCxrQkFBZSxJQUFJLFFBQVEsRUFBRSxDQUFDOzs7O0FDekg5QiwwQ0FBd0M7QUFDeEMseUJBQXVCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY2xhc3MgTmF2YmFyIHtcclxuICBcclxuICBwcml2YXRlIG5hdmJhcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBzaWRlYmFyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGxpbmtzOiBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcclxuICBwcml2YXRlIGJhY2tkcm9wOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIG1lbnVCdG46IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgY2xvc2VCdG46IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIHRoaXMubmF2YmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZiYXItY29tcG9uZW50XCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5zaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItY29tcG9uZW50JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLmxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdmJhci1jb21wb25lbnQgYSwgLnNpZGViYXItY29tcG9uZW50IGEnKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcclxuICAgIHRoaXMuYmFja2Ryb3AgPSB0aGlzLmNyZWF0ZUJhY2tkcm9wKCk7XHJcbiAgICB0aGlzLm1lbnVCdG4gPSAgdGhpcy5jcmVhdGVNZW51QnV0dG9uKCk7XHJcbiAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5jcmVhdGVDbG9zZUJ1dHRvbigpO1xyXG5cclxuICAgIHRoaXMubWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gdGhpcy5vcGVuKCkpOyAgICBcclxuICAgIHRoaXMuYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHRoaXMuY2xvc2UoKSk7ICAgIFxyXG4gICAgdGhpcy5jbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gdGhpcy5jbG9zZSgpKTsgXHJcblxyXG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKGxpbmsgPT57ICAgIFxyXG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VCdXR0b24oKSA6IEhUTUxFbGVtZW50IHtcclxuXHJcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgdGVtcC5pbm5lckhUTUwgPSAvKmh0bWwqL2AgICAgXHJcbiAgICAgIDxidXR0b24gYXJpYS1sYWJlbD0nY2xvc2UgbWVudScgY2xhc3M9J2J0bi1jbG9zZSc+XHJcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIm0xMS41OTYuNzgyIDIuMTIyIDIuMTIyTDkuMTIgNy40OTlsNC41OTcgNC41OTctMi4xMjIgMi4xMjJMNyA5LjYybC00LjU5NSA0LjU5Ny0yLjEyMi0yLjEyMkw0Ljg3OCA3LjUuMjgyIDIuOTA0IDIuNDA0Ljc4Mmw0LjU5NSA0LjU5NkwxMS41OTYuNzgyWlwiIGZpbGw9XCIjNjk3MDdEXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiLz48L3N2Zz5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICBgO1xyXG4gICAgdGhpcy5zaWRlYmFyLmluc2VydEJlZm9yZSh0ZW1wLmNvbnRlbnQsIHRoaXMuc2lkZWJhci5maXJzdENoaWxkKTtcclxuICAgIHJldHVybiB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignLmJ0bi1jbG9zZScpIGFzIEhUTUxFbGVtZW50O1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTWVudUJ1dHRvbigpe1xyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRlbXAuaW5uZXJIVE1MID0gLypodG1sKi9gICAgIFxyXG4gICAgPGJ1dHRvbiBhcmlhLWxhYmVsPSdtZW51JyBjbGFzcz0nbWVudS1idG4gY2xvc2UnPiBcclxuICAgIDxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTYgMTJ2M0gwdi0zaDE2Wm0wLTZ2M0gwVjZoMTZabTAtNnYzSDBWMGgxNlpcIiBmaWxsPVwiIzY5NzA3RFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIi8+PC9zdmc+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIGA7ICAgIFxyXG4gICAgdGhpcy5uYXZiYXIuYXBwZW5kQ2hpbGQodGVtcC5jb250ZW50KTtcclxuICAgIHJldHVybiB0aGlzLm5hdmJhci5xdWVyeVNlbGVjdG9yKCcubWVudS1idG4nKSBhcyBIVE1MRWxlbWVudDtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUJhY2tkcm9wKCkgOiBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgdGVtcC5pbm5lckhUTUwgPSAvKmh0bWwqL2A8ZGl2IGNsYXNzPVwic2lkZWJhci1jb21wb25lbnQtYmFja2Ryb3AgY2xvc2VcIj48L2Rpdj5gOyAgICBcclxuICAgIHRoaXMuc2lkZWJhci5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUodGVtcC5jb250ZW50LCB0aGlzLnNpZGViYXIpO1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLWNvbXBvbmVudC1iYWNrZHJvcCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gIH1cclxuICBcclxuXHJcbiAgb3Blbigpe1xyXG4gICAgW3RoaXMubmF2YmFyLCB0aGlzLnNpZGViYXIsIHRoaXMuYmFja2Ryb3AsIHRoaXMubWVudUJ0bl0uZm9yRWFjaChlID0+IGUuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2UnKSk7ICBcclxuICB9XHJcblxyXG5cclxuICBjbG9zZSgpe1xyXG4gICAgW3RoaXMubmF2YmFyLCB0aGlzLnNpZGViYXIsIHRoaXMuYmFja2Ryb3AsIHRoaXMubWVudUJ0bl0uZm9yRWFjaChlID0+IGUuY2xhc3NMaXN0LmFkZCgnY2xvc2UnKSk7IFxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBOYXZiYXIoKTsiLCJcclxuY2xhc3MgQ2Fyb3VzZWx7XHJcbiAgXHJcbiAgcHJpdmF0ZSBzY3JvbGxZOiBudW1iZXIgPSAwO1xyXG4gXHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi1wcm9kdWN0JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBjbG9uZSA9IHRoaXMuY3JlYXRlQ2xvbmUocm9vdCk7XHJcbiAgIFxyXG4gXHJcbiAgICB0aGlzLnNldFRodW1ibmFpbHMocm9vdCk7XHJcbiAgICB0aGlzLnNldEFycm93cyhyb290KTtcclxuXHJcblxyXG4gICAgdGhpcy5zZXRUaHVtYm5haWxzKGNsb25lKTtcclxuICAgIHRoaXMuc2V0QXJyb3dzKGNsb25lKTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcignLnBpY3R1cmUnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5vcGVuQ2xvbmUoY2xvbmUsIHJvb3QpKTtcclxuICAgIFxyXG4gICAgY29uc3QgY2xvc2VNb2RhbCA9IGNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1tb2RhbCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY2xvc2VNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIHRoaXMuY2xvc2VDbG9uZShjbG9uZSwgcm9vdCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGJhY2tkcm9wID0gY2xvbmUucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgdGhpcy5jbG9zZUNsb25lKGNsb25lLCByb290KTtcclxuICAgIH0pXHJcblxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgb3BlbkNsb25lKGNsb25lIDogSFRNTEVsZW1lbnQsIHJvb3Q6IEhUTUxFbGVtZW50KXsgICBcclxuICAgIFxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjbG9uZSk7XHJcbiAgICBjb25zdCB5OiBudW1iZXIgPSByb290LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnk7XHJcbiAgICB0aGlzLnNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgICAgICBcclxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIGBcclxuICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICB0b3A6ICR7eX1weDtcclxuICAgIGApO1xyXG5cclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VDbG9uZShjbG9uZSA6IEhUTUxFbGVtZW50LCByb290OiBIVE1MRWxlbWVudCl7XHJcbiAgICBjbG9uZS5yZW1vdmUoKTtcclxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTsgICAgXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgdGhpcy5zY3JvbGxZKTtcclxuICAgIFxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgc2V0VGh1bWJuYWlscyhyb290OiBIVE1MRWxlbWVudCl7XHJcbiAgICBjb25zdCB0aHVtYm5haWxzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKCcudGh1bWJuYWlsLWN0bicpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xyXG4gICAgdGh1bWJuYWlscy5mb3JFYWNoKHRodW1ibmFpbCA9PiB7ICAgICBcclxuICAgICAgY29uc3QgaW1hZ2UgPSB0aHVtYm5haWwucXVlcnlTZWxlY3RvcignaW1nJykgYXMgSFRNTEltYWdlRWxlbWVudDsgICAgIFxyXG4gICAgICB0aHVtYm5haWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNldEFjdGl2ZShyb290LCBpbWFnZS5zcmMpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgc2V0QXJyb3dzKHJvb3Q6IEhUTUxFbGVtZW50KXtcclxuICAgIGNvbnN0IHByZXZpb3VzQnRuID0gcm9vdC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMtYnRuJykgYXMgSFRNTEVsZW1lbnQ7ICAgIFxyXG4gICAgcHJldmlvdXNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcclxuICAgICAgdGhpcy5zZXRBY3RpdmVPbkFycm93Q2xpY2socm9vdCwgbnVtYmVyID0+ICgobnVtYmVyICsgMykgJSA0KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBuZXh0QnRuID0gcm9vdC5xdWVyeVNlbGVjdG9yKCcubmV4dC1idG4nKSBhcyBIVE1MRWxlbWVudDsgICAgXHJcbiAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XHJcbiAgICAgIHRoaXMuc2V0QWN0aXZlT25BcnJvd0NsaWNrKHJvb3QsIG51bWJlciA9PiAoKG51bWJlciArIDEpICUgNCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNsb25lKHJvb3Q6IEhUTUxFbGVtZW50KSA6IEhUTUxFbGVtZW50e1xyXG4gICAgY29uc3QgY2xvbmUgPSByb290LmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWN0bicpIS5yZW1vdmUoKTtcclxuICAgIGNsb25lLmNsYXNzTmFtZSA9ICdzZWN0aW9uLXByb2R1Y3QtY2xvbmUnO1xyXG4gICAgcmV0dXJuIGNsb25lO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgc2V0QWN0aXZlT25BcnJvd0NsaWNrKHJvb3Q6IEhUTUxFbGVtZW50LCBmbjogKHg6IG51bWJlcikgPT4gbnVtYmVyKXtcclxuICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcignLnBpY3R1cmUnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50OiBudW1iZXIgPSBOdW1iZXIoY3VycmVudEltYWdlLmRhdGFzZXQuY3VycmVudCk7XHJcbiAgICBjdXJyZW50ID0gZm4oY3VycmVudCk7XHJcbiAgICBjdXJyZW50SW1hZ2UuZGF0YXNldC5jdXJyZW50ID0gU3RyaW5nKGN1cnJlbnQpO1xyXG4gICAgY29uc3QgdGh1bWJuYWlscyA9IHJvb3QucXVlcnlTZWxlY3RvckFsbCgnLnRodW1ibmFpbC1jdG4nKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcclxuICAgIGNvbnN0IGltYWdlID0gdGh1bWJuYWlsc1tjdXJyZW50XS5xdWVyeVNlbGVjdG9yKCdpbWcnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgdGhpcy5zZXRBY3RpdmUocm9vdCwgaW1hZ2Uuc3JjKTtcclxuICB9XHJcblxyXG4gIFxyXG4gIHByaXZhdGUgc2V0QWN0aXZlKHJvb3Q6IEhUTUxFbGVtZW50LCBzcmMgOiBzdHJpbmcpeyBcclxuICAgIGNvbnN0IHRodW1ibmFpbHMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aHVtYm5haWwtY3RuJykgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47IFxyXG4gICAgdGh1bWJuYWlscy5mb3JFYWNoKCh0aHVtYm5haWwpID0+IHtcclxuICAgICAgY29uc3QgaW1hZ2UgPSB0aHVtYm5haWwucXVlcnlTZWxlY3RvcignaW1nJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgICAgaWYoaW1hZ2Uuc3JjID09PSBzcmMpe1xyXG4gICAgICAgIHRodW1ibmFpbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50SW1hZ2UgPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgICAgICBjdXJyZW50SW1hZ2Uuc3JjID0gdGhpcy5nZXRJbWFnZVNyYyhzcmMpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRodW1ibmFpbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgfSBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgZ2V0SW1hZ2VTcmModGh1bWJuYWlsU3JjOiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgY29uc3QgaW5kZXggPSB0aHVtYm5haWxTcmMuaW5kZXhPZignLXRodW1ibmFpbC5qcGcnKTtcclxuICAgIGNvbnN0IGltYWdlU3JjID0gdGh1bWJuYWlsU3JjLnNsaWNlKDAsIGluZGV4KTtcclxuICAgIHJldHVybiBpbWFnZVNyYyArICcuanBnJztcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IENhcm91c2VsKCk7IiwiaW1wb3J0ICcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXIudHMnO1xyXG5pbXBvcnQgJy4vY2Fyb3VzZWwudHMnOyJdfQ==
