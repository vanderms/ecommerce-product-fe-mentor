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
        var root = document.querySelector('.pictures-ctn');
        var clone = root.cloneNode(true);
        clone.classList.add('clone');
        this.thumbnails = root.querySelectorAll('.thumbnail-ctn');
        this.thumbnails.forEach(function (thumbnail) {
            var image = thumbnail.querySelector('img');
            thumbnail.addEventListener('click', function () { return _this.setActive(root, image.src); });
        });
        this.previousBtn = root.querySelector('.previous-btn');
        this.previousBtn.addEventListener('click', function () {
            _this.setActiveOnArrowClick(root, function (number) { return ((number + 3) % 4); });
        });
        this.nextBtn = root.querySelector('.next-btn');
        this.nextBtn.addEventListener('click', function () {
            _this.setActiveOnArrowClick(root, function (number) { return ((number + 1) % 4); });
        });
    }
    Carousel.prototype.setActiveOnArrowClick = function (root, fn) {
        var currentImage = root.querySelector('.picture');
        var current = Number(currentImage.dataset.current);
        current = fn(current);
        currentImage.dataset.current = String(current);
        var image = this.thumbnails[current].querySelector('img');
        this.setActive(root, image.src);
    };
    Carousel.prototype.setActive = function (root, src) {
        var _this = this;
        this.thumbnails.forEach(function (thumbnail) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLnRzIiwic3JjL3RzL2Nhcm91c2VsLnRzIiwic3JjL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0lBU0U7UUFBQSxpQkFnQkM7UUFkQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQWdCLENBQUM7UUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFnQixDQUFDO1FBQzNFLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDJDQUEyQyxDQUFrQyxDQUFDO1FBQ3JILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDckIsSUFBSSxDQUFDLGdCQUFn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YXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY2xhc3MgTmF2YmFyIHtcclxuICBcclxuICBwcml2YXRlIG5hdmJhcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBzaWRlYmFyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGxpbmtzOiBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcclxuICBwcml2YXRlIGJhY2tkcm9wOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIG1lbnVCdG46IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgY2xvc2VCdG46IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIHRoaXMubmF2YmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZiYXItY29tcG9uZW50XCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5zaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItY29tcG9uZW50JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLmxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdmJhci1jb21wb25lbnQgYSwgLnNpZGViYXItY29tcG9uZW50IGEnKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcclxuICAgIHRoaXMuYmFja2Ryb3AgPSB0aGlzLmNyZWF0ZUJhY2tkcm9wKCk7XHJcbiAgICB0aGlzLm1lbnVCdG4gPSAgdGhpcy5jcmVhdGVNZW51QnV0dG9uKCk7XHJcbiAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5jcmVhdGVDbG9zZUJ1dHRvbigpO1xyXG5cclxuICAgIHRoaXMubWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gdGhpcy5vcGVuKCkpOyAgICBcclxuICAgIHRoaXMuYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHRoaXMuY2xvc2UoKSk7ICAgIFxyXG4gICAgdGhpcy5jbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gdGhpcy5jbG9zZSgpKTsgXHJcblxyXG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKGxpbmsgPT57ICAgIFxyXG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VCdXR0b24oKSA6IEhUTUxFbGVtZW50IHtcclxuXHJcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgdGVtcC5pbm5lckhUTUwgPSAvKmh0bWwqL2AgICAgXHJcbiAgICAgIDxidXR0b24gYXJpYS1sYWJlbD0nY2xvc2UgbWVudScgY2xhc3M9J2J0bi1jbG9zZSc+XHJcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIm0xMS41OTYuNzgyIDIuMTIyIDIuMTIyTDkuMTIgNy40OTlsNC41OTcgNC41OTctMi4xMjIgMi4xMjJMNyA5LjYybC00LjU5NSA0LjU5Ny0yLjEyMi0yLjEyMkw0Ljg3OCA3LjUuMjgyIDIuOTA0IDIuNDA0Ljc4Mmw0LjU5NSA0LjU5NkwxMS41OTYuNzgyWlwiIGZpbGw9XCIjNjk3MDdEXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiLz48L3N2Zz5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICBgO1xyXG4gICAgdGhpcy5zaWRlYmFyLmluc2VydEJlZm9yZSh0ZW1wLmNvbnRlbnQsIHRoaXMuc2lkZWJhci5maXJzdENoaWxkKTtcclxuICAgIHJldHVybiB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignLmJ0bi1jbG9zZScpIGFzIEhUTUxFbGVtZW50O1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTWVudUJ1dHRvbigpe1xyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRlbXAuaW5uZXJIVE1MID0gLypodG1sKi9gICAgIFxyXG4gICAgPGJ1dHRvbiBhcmlhLWxhYmVsPSdtZW51JyBjbGFzcz0nbWVudS1idG4gY2xvc2UnPiBcclxuICAgIDxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTYgMTJ2M0gwdi0zaDE2Wm0wLTZ2M0gwVjZoMTZabTAtNnYzSDBWMGgxNlpcIiBmaWxsPVwiIzY5NzA3RFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIi8+PC9zdmc+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIGA7ICAgIFxyXG4gICAgdGhpcy5uYXZiYXIuYXBwZW5kQ2hpbGQodGVtcC5jb250ZW50KTtcclxuICAgIHJldHVybiB0aGlzLm5hdmJhci5xdWVyeVNlbGVjdG9yKCcubWVudS1idG4nKSBhcyBIVE1MRWxlbWVudDtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUJhY2tkcm9wKCkgOiBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgdGVtcC5pbm5lckhUTUwgPSAvKmh0bWwqL2A8ZGl2IGNsYXNzPVwic2lkZWJhci1jb21wb25lbnQtYmFja2Ryb3AgY2xvc2VcIj48L2Rpdj5gOyAgICBcclxuICAgIHRoaXMuc2lkZWJhci5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUodGVtcC5jb250ZW50LCB0aGlzLnNpZGViYXIpO1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLWNvbXBvbmVudC1iYWNrZHJvcCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gIH1cclxuICBcclxuXHJcbiAgb3Blbigpe1xyXG4gICAgW3RoaXMubmF2YmFyLCB0aGlzLnNpZGViYXIsIHRoaXMuYmFja2Ryb3AsIHRoaXMubWVudUJ0bl0uZm9yRWFjaChlID0+IGUuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2UnKSk7ICBcclxuICB9XHJcblxyXG5cclxuICBjbG9zZSgpe1xyXG4gICAgW3RoaXMubmF2YmFyLCB0aGlzLnNpZGViYXIsIHRoaXMuYmFja2Ryb3AsIHRoaXMubWVudUJ0bl0uZm9yRWFjaChlID0+IGUuY2xhc3NMaXN0LmFkZCgnY2xvc2UnKSk7IFxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBOYXZiYXIoKTsiLCJcclxuY2xhc3MgQ2Fyb3VzZWx7XHJcbiAgXHJcbiBcclxuICBwcml2YXRlIHRodW1ibmFpbHM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+OyAgICAgIFxyXG4gIHByaXZhdGUgbmV4dEJ0bjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBwcmV2aW91c0J0bjogSFRNTEVsZW1lbnQ7XHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlcy1jdG4nKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IGNsb25lID0gcm9vdC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKCdjbG9uZScpO1xyXG4gXHJcbiAgICB0aGlzLnRodW1ibmFpbHMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aHVtYm5haWwtY3RuJykgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XHJcbiAgICB0aGlzLnRodW1ibmFpbHMuZm9yRWFjaCh0aHVtYm5haWwgPT4geyAgICAgXHJcbiAgICAgIGNvbnN0IGltYWdlID0gdGh1bWJuYWlsLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7ICAgICBcclxuICAgICAgdGh1bWJuYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRBY3RpdmUocm9vdCwgaW1hZ2Uuc3JjKSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0J0biA9IHJvb3QucXVlcnlTZWxlY3RvcignLnByZXZpb3VzLWJ0bicpIGFzIEhUTUxFbGVtZW50OyAgICBcclxuICAgIHRoaXMucHJldmlvdXNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcclxuICAgICAgdGhpcy5zZXRBY3RpdmVPbkFycm93Q2xpY2socm9vdCwgbnVtYmVyID0+ICgobnVtYmVyICsgMykgJSA0KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm5leHRCdG4gPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0LWJ0bicpIGFzIEhUTUxFbGVtZW50OyAgICBcclxuICAgIHRoaXMubmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xyXG4gICAgICB0aGlzLnNldEFjdGl2ZU9uQXJyb3dDbGljayhyb290LCBudW1iZXIgPT4gKChudW1iZXIgKyAxKSAlIDQpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgc2V0QWN0aXZlT25BcnJvd0NsaWNrKHJvb3Q6IEhUTUxFbGVtZW50LCBmbjogKHg6IG51bWJlcikgPT4gbnVtYmVyKXtcclxuICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcignLnBpY3R1cmUnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50OiBudW1iZXIgPSBOdW1iZXIoY3VycmVudEltYWdlLmRhdGFzZXQuY3VycmVudCk7XHJcbiAgICBjdXJyZW50ID0gZm4oY3VycmVudCk7XHJcbiAgICBjdXJyZW50SW1hZ2UuZGF0YXNldC5jdXJyZW50ID0gU3RyaW5nKGN1cnJlbnQpO1xyXG4gICAgY29uc3QgaW1hZ2UgPSB0aGlzLnRodW1ibmFpbHNbY3VycmVudF0ucXVlcnlTZWxlY3RvcignaW1nJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHRoaXMuc2V0QWN0aXZlKHJvb3QsIGltYWdlLnNyYyk7XHJcbiAgfVxyXG5cclxuICBcclxuICBwcml2YXRlIHNldEFjdGl2ZShyb290OiBIVE1MRWxlbWVudCwgc3JjIDogc3RyaW5nKXsgIFxyXG4gICAgdGhpcy50aHVtYm5haWxzLmZvckVhY2goKHRodW1ibmFpbCkgPT4ge1xyXG4gICAgICBjb25zdCBpbWFnZSA9IHRodW1ibmFpbC5xdWVyeVNlbGVjdG9yKCdpbWcnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgICBpZihpbWFnZS5zcmMgPT09IHNyYyl7XHJcbiAgICAgICAgdGh1bWJuYWlsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcignLnBpY3R1cmUnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgICAgIGN1cnJlbnRJbWFnZS5zcmMgPSB0aGlzLmdldEltYWdlU3JjKHNyYyk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGh1bWJuYWlsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICB9IFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBnZXRJbWFnZVNyYyh0aHVtYm5haWxTcmM6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICBjb25zdCBpbmRleCA9IHRodW1ibmFpbFNyYy5pbmRleE9mKCctdGh1bWJuYWlsLmpwZycpO1xyXG4gICAgY29uc3QgaW1hZ2VTcmMgPSB0aHVtYm5haWxTcmMuc2xpY2UoMCwgaW5kZXgpO1xyXG4gICAgcmV0dXJuIGltYWdlU3JjICsgJy5qcGcnO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQ2Fyb3VzZWwoKTsiLCJpbXBvcnQgJy4uL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci50cyc7XHJcbmltcG9ydCAnLi9jYXJvdXNlbC50cyc7Il19
