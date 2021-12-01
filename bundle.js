(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Navbar = /** @class */ (function () {
    function Navbar() {
        var _this = this;
        this.navbar = document.querySelector(".navbar-component");
        this.sidebar = document.querySelector('.sidebar-component');
        var linksSelector = '.navbar-component a, .sidebar-component a';
        this.links = document.querySelectorAll(linksSelector);
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
    Carousel.getInstance = function () {
        return Carousel.instance ? Carousel.instance : (Carousel.instance = new Carousel());
    };
    Carousel.instance = null;
    return Carousel;
}());
exports.default = Carousel.getInstance();
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cart = /** @class */ (function () {
    function Cart() {
        this.quantity = 0;
        this.modalIsOpen = false;
        this.setupCartForm();
        this.setupCardCheckout();
    }
    Cart.prototype.setupCardCheckout = function () {
        var _this = this;
        var modal = document.querySelector('.checkout-card-component');
        var cartBtn = document.querySelector('.navbar-component .cart-btn');
        var clearBtn = modal.querySelector('.clear');
        var checkoutBtn = modal.querySelector('.checkout-btn');
        cartBtn.addEventListener('click', function () {
            modal.classList.toggle('close');
            _this.modalIsOpen = !_this.modalIsOpen;
        });
        document.addEventListener('click', function (e) {
            if (_this.clickedOutsideModal(e.target, modal, cartBtn)) {
                modal.classList.add('close');
                _this.modalIsOpen = false;
            }
        });
        [clearBtn, checkoutBtn].forEach(function (button) {
            button.addEventListener('click', function () { return _this.clearCart(); });
        });
    };
    Cart.prototype.setupCartForm = function () {
        var _this = this;
        var cartForm = document.querySelector('.cart-form');
        var minusBtn = cartForm.querySelector('.minus-btn');
        var plusBtn = cartForm.querySelector('.plus-btn');
        var quantity = cartForm.querySelector('.quantity');
        var addBtn = cartForm.querySelector('.add-to-cart');
        minusBtn.addEventListener('click', function () {
            var current = Number(quantity.textContent);
            current -= current > 0 ? 1 : 0;
            quantity.textContent = String(current);
        });
        plusBtn.addEventListener('click', function () {
            var value = Number(quantity.textContent) + 1;
            quantity.textContent = String(value);
        });
        addBtn.addEventListener('click', function () {
            var value = Number(quantity.textContent);
            quantity.textContent = '0';
            _this.addToCart(value);
        });
    };
    Cart.prototype.clickedOutsideModal = function (node, modal, cart) {
        if (node == modal || node == cart)
            return false;
        if (node == document.body)
            return true;
        return this.clickedOutsideModal(node.parentElement, modal, cart);
    };
    Cart.prototype.clearCart = function () {
        this.quantity = 0;
        this.updateCart();
    };
    Cart.prototype.addToCart = function (value) {
        this.quantity += value;
        this.updateCart();
    };
    Cart.prototype.updateCart = function () {
        var cart = document.querySelector('.navbar-component .cart-btn .items');
        var modal = document.querySelector('.checkout-card-component');
        cart.textContent = String(this.quantity);
        if (this.quantity > 0) {
            cart.classList.remove('hidden');
            modal.classList.remove('empty');
        }
        else {
            cart.classList.add('hidden');
            modal.classList.add('empty');
        }
        var quantity = modal.querySelector('.data .quantity');
        var total = modal.querySelector('.data .total');
        quantity.textContent = String(this.quantity);
        total.textContent = "$".concat(this.quantity * 125, ".00");
    };
    Cart.getInstance = function () {
        return Cart.instance ? Cart.instance : (Cart.instance = new Cart());
    };
    Cart.instance = null;
    return Cart;
}());
exports.default = Cart.getInstance();
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../components/navbar/navbar.ts");
require("./carousel.ts");
require("./cart.ts");
},{"../components/navbar/navbar.ts":1,"./carousel.ts":2,"./cart.ts":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLnRzIiwic3JjL3RzL2Nhcm91c2VsLnRzIiwic3JjL3RzL2NhcnQudHMiLCJzcmMvdHMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7SUFTRTtRQUFBLGlCQWlCQztRQWZDLElBQUksQ0FBQyxNQUFNLEdBQWlCLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsT0FBTyxHQUFpQixRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUUsSUFBTSxhQUFhLEdBQUcsMkNBQTJDLENBQUE7UUFDakUsSUFBSSxDQUFDLEtBQUssR0FBbUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsS0FB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IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjbGFzcyBOYXZiYXIge1xyXG4gIFxyXG4gIHByaXZhdGUgbmF2YmFyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHNpZGViYXI6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgbGlua3M6IE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xyXG4gIHByaXZhdGUgYmFja2Ryb3A6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgbWVudUJ0bjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjbG9zZUJ0bjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgdGhpcy5uYXZiYXIgPSA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2YmFyLWNvbXBvbmVudFwiKTtcclxuICAgIHRoaXMuc2lkZWJhciA9IDxIVE1MRWxlbWVudD4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItY29tcG9uZW50Jyk7XHJcbiAgICBjb25zdCBsaW5rc1NlbGVjdG9yID0gJy5uYXZiYXItY29tcG9uZW50IGEsIC5zaWRlYmFyLWNvbXBvbmVudCBhJ1xyXG4gICAgdGhpcy5saW5rcyA9IDxOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50Pj4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChsaW5rc1NlbGVjdG9yKTtcclxuICAgIHRoaXMuYmFja2Ryb3AgPSB0aGlzLmNyZWF0ZUJhY2tkcm9wKCk7XHJcbiAgICB0aGlzLm1lbnVCdG4gPSAgdGhpcy5jcmVhdGVNZW51QnV0dG9uKCk7XHJcbiAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5jcmVhdGVDbG9zZUJ1dHRvbigpO1xyXG5cclxuICAgIHRoaXMubWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gdGhpcy5vcGVuKCkpOyAgICBcclxuICAgIHRoaXMuYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHRoaXMuY2xvc2UoKSk7ICAgIFxyXG4gICAgdGhpcy5jbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gdGhpcy5jbG9zZSgpKTsgXHJcblxyXG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKGxpbmsgPT57ICAgIFxyXG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VCdXR0b24oKSA6IEhUTUxFbGVtZW50IHtcclxuXHJcbiAgICBjb25zdCB0ZW1wID0gPEhUTUxUZW1wbGF0ZUVsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XHJcbiAgICB0ZW1wLmlubmVySFRNTCA9IC8qaHRtbCovYCAgICBcclxuICAgICAgPGJ1dHRvbiBhcmlhLWxhYmVsPSdjbG9zZSBtZW51JyBjbGFzcz0nYnRuLWNsb3NlJz5cclxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwibTExLjU5Ni43ODIgMi4xMjIgMi4xMjJMOS4xMiA3LjQ5OWw0LjU5NyA0LjU5Ny0yLjEyMiAyLjEyMkw3IDkuNjJsLTQuNTk1IDQuNTk3LTIuMTIyLTIuMTIyTDQuODc4IDcuNS4yODIgMi45MDQgMi40MDQuNzgybDQuNTk1IDQuNTk2TDExLjU5Ni43ODJaXCIgZmlsbD1cIiM2OTcwN0RcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIvPjwvc3ZnPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIGA7XHJcbiAgICB0aGlzLnNpZGViYXIuaW5zZXJ0QmVmb3JlKHRlbXAuY29udGVudCwgdGhpcy5zaWRlYmFyLmZpcnN0Q2hpbGQpO1xyXG4gICAgcmV0dXJuIDxIVE1MRWxlbWVudD4gdGhpcy5zaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2xvc2UnKTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU1lbnVCdXR0b24oKXtcclxuICAgIGNvbnN0IHRlbXAgPSA8SFRNTFRlbXBsYXRlRWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcclxuICAgIHRlbXAuaW5uZXJIVE1MID0gLypodG1sKi9gICAgIFxyXG4gICAgPGJ1dHRvbiBhcmlhLWxhYmVsPSdtZW51JyBjbGFzcz0nbWVudS1idG4gY2xvc2UnPiBcclxuICAgIDxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTYgMTJ2M0gwdi0zaDE2Wm0wLTZ2M0gwVjZoMTZabTAtNnYzSDBWMGgxNlpcIiBmaWxsPVwiIzY5NzA3RFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIi8+PC9zdmc+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIGA7ICAgIFxyXG4gICAgdGhpcy5uYXZiYXIuYXBwZW5kQ2hpbGQodGVtcC5jb250ZW50KTtcclxuICAgIHJldHVybiA8SFRNTEVsZW1lbnQ+IHRoaXMubmF2YmFyLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQmFja2Ryb3AoKSA6IEhUTUxFbGVtZW50IHtcclxuICAgIGNvbnN0IHRlbXAgPSA8SFRNTFRlbXBsYXRlRWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcclxuICAgIHRlbXAuaW5uZXJIVE1MID0gLypodG1sKi9gPGRpdiBjbGFzcz1cInNpZGViYXItY29tcG9uZW50LWJhY2tkcm9wIGNsb3NlXCI+PC9kaXY+YDsgICAgXHJcbiAgICB0aGlzLnNpZGViYXIucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKHRlbXAuY29udGVudCwgdGhpcy5zaWRlYmFyKTtcclxuICAgIHJldHVybiA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLWNvbXBvbmVudC1iYWNrZHJvcCcpO1xyXG4gIH1cclxuICBcclxuXHJcbiAgb3Blbigpe1xyXG4gICAgW3RoaXMubmF2YmFyLCB0aGlzLnNpZGViYXIsIHRoaXMuYmFja2Ryb3AsIHRoaXMubWVudUJ0bl0uZm9yRWFjaChlID0+IGUuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2UnKSk7ICBcclxuICB9XHJcblxyXG5cclxuICBjbG9zZSgpe1xyXG4gICAgW3RoaXMubmF2YmFyLCB0aGlzLnNpZGViYXIsIHRoaXMuYmFja2Ryb3AsIHRoaXMubWVudUJ0bl0uZm9yRWFjaChlID0+IGUuY2xhc3NMaXN0LmFkZCgnY2xvc2UnKSk7IFxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBOYXZiYXIoKTsiLCJcclxuY2xhc3MgQ2Fyb3VzZWwge1xyXG4gIFxyXG4gIHByaXZhdGUgc2Nyb2xsWTogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ2Fyb3VzZWwgfCBudWxsICA9IG51bGw7IFxyXG4gXHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIGNvbnN0IHJvb3QgPSA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXByb2R1Y3QnKTtcclxuICAgIGNvbnN0IGNsb25lID0gdGhpcy5jcmVhdGVDbG9uZShyb290KTtcclxuICAgXHJcbiBcclxuICAgIHRoaXMuc2V0VGh1bWJuYWlscyhyb290KTtcclxuICAgIHRoaXMuc2V0QXJyb3dzKHJvb3QpO1xyXG5cclxuXHJcbiAgICB0aGlzLnNldFRodW1ibmFpbHMoY2xvbmUpO1xyXG4gICAgdGhpcy5zZXRBcnJvd3MoY2xvbmUpO1xyXG5cclxuICAgIGNvbnN0IGltYWdlID0gPEhUTUxFbGVtZW50PiByb290LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJyk7XHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub3BlbkNsb25lKGNsb25lLCByb290KSk7XHJcbiAgICBcclxuICAgIGNvbnN0IGNsb3NlTW9kYWwgPSA8SFRNTEVsZW1lbnQ+IGNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1tb2RhbCcpO1xyXG4gICAgY2xvc2VNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIHRoaXMuY2xvc2VDbG9uZShjbG9uZSwgcm9vdCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGJhY2tkcm9wID0gPEhUTUxFbGVtZW50PiBjbG9uZS5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgIFxyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICB0aGlzLmNsb3NlQ2xvbmUoY2xvbmUsIHJvb3QpO1xyXG4gICAgfSlcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBvcGVuQ2xvbmUoY2xvbmUgOiBIVE1MRWxlbWVudCwgcm9vdDogSFRNTEVsZW1lbnQpeyAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIHRoaXMuc2V0QWN0aXZlQnlDdXJyZW50SW1hZ2UoY2xvbmUsICgpID0+e1xyXG4gICAgICBjb25zdCBjdXJyZW50SW1hZ2UgPSA8SFRNTEVsZW1lbnQ+IHJvb3QucXVlcnlTZWxlY3RvcignLnBpY3R1cmUnKTtcclxuICAgICAgbGV0IGN1cnJlbnQ6IG51bWJlciA9IE51bWJlcihjdXJyZW50SW1hZ2UuZGF0YXNldC5jdXJyZW50KTtcclxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb25lKTsgICAgXHJcbiAgICBjb25zdCB5OiBudW1iZXIgPSByb290LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnk7XHJcbiAgICB0aGlzLnNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgICAgICBcclxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIGBcclxuICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICB0b3A6ICR7eX1weDtcclxuICAgIGApO1xyXG5cclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VDbG9uZShjbG9uZSA6IEhUTUxFbGVtZW50LCByb290OiBIVE1MRWxlbWVudCl7XHJcbiAgICBjbG9uZS5yZW1vdmUoKTtcclxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTsgICAgXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgdGhpcy5zY3JvbGxZKTtcclxuICAgXHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBzZXRUaHVtYm5haWxzKHJvb3Q6IEhUTUxFbGVtZW50KXtcclxuICAgIGNvbnN0IHRodW1ibmFpbHMgPSA8Tm9kZUxpc3RPZjxIVE1MRWxlbWVudD4+IHJvb3QucXVlcnlTZWxlY3RvckFsbCgnLnRodW1ibmFpbC1jdG4nKTtcclxuICAgIHRodW1ibmFpbHMuZm9yRWFjaCh0aHVtYm5haWwgPT4geyAgICAgXHJcbiAgICAgIGNvbnN0IGltYWdlID0gPEhUTUxJbWFnZUVsZW1lbnQ+IHRodW1ibmFpbC5xdWVyeVNlbGVjdG9yKCdpbWcnKTsgICAgIFxyXG4gICAgICB0aHVtYm5haWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNldEFjdGl2ZShyb290LCBpbWFnZS5zcmMpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgc2V0QXJyb3dzKHJvb3Q6IEhUTUxFbGVtZW50KXtcclxuICAgIGNvbnN0IHByZXZpb3VzQnRuID0gPEhUTUxFbGVtZW50PnJvb3QucXVlcnlTZWxlY3RvcignLnByZXZpb3VzLWJ0bicpOyAgICBcclxuICAgIHByZXZpb3VzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XHJcbiAgICAgIHRoaXMuc2V0QWN0aXZlQnlDdXJyZW50SW1hZ2Uocm9vdCwgbnVtYmVyID0+ICgobnVtYmVyICsgMykgJSA0KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBuZXh0QnRuID0gPEhUTUxFbGVtZW50PiByb290LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0LWJ0bicpOyAgICBcclxuICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcclxuICAgICAgdGhpcy5zZXRBY3RpdmVCeUN1cnJlbnRJbWFnZShyb290LCBudW1iZXIgPT4gKChudW1iZXIgKyAxKSAlIDQpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVDbG9uZShyb290OiBIVE1MRWxlbWVudCkgOiBIVE1MRWxlbWVudHtcclxuICAgIGNvbnN0IGNsb25lID0gPEhUTUxFbGVtZW50PiByb290LmNsb25lTm9kZSh0cnVlKTtcclxuICAgIGNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWN0bicpIS5yZW1vdmUoKTtcclxuICAgIGNsb25lLmNsYXNzTmFtZSA9ICdzZWN0aW9uLXByb2R1Y3QtY2xvbmUnO1xyXG4gICAgcmV0dXJuIGNsb25lO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgc2V0QWN0aXZlQnlDdXJyZW50SW1hZ2Uocm9vdDogSFRNTEVsZW1lbnQsIGZuOiAoeDogbnVtYmVyKSA9PiBudW1iZXIpe1xyXG4gICAgY29uc3QgY3VycmVudEltYWdlID0gPEhUTUxFbGVtZW50PiByb290LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJyk7XHJcbiAgICBsZXQgY3VycmVudDogbnVtYmVyID0gTnVtYmVyKGN1cnJlbnRJbWFnZS5kYXRhc2V0LmN1cnJlbnQpO1xyXG4gICAgY3VycmVudCA9IGZuKGN1cnJlbnQpO1xyXG4gICAgY3VycmVudEltYWdlLmRhdGFzZXQuY3VycmVudCA9IFN0cmluZyhjdXJyZW50KTtcclxuICAgIGNvbnN0IHRodW1ibmFpbHMgPSA8Tm9kZUxpc3RPZjxIVE1MRWxlbWVudD4+cm9vdC5xdWVyeVNlbGVjdG9yQWxsKCcudGh1bWJuYWlsLWN0bicpO1xyXG4gICAgY29uc3QgaW1hZ2UgPSA8SFRNTEltYWdlRWxlbWVudD4gdGh1bWJuYWlsc1tjdXJyZW50XS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgIHRoaXMuc2V0QWN0aXZlKHJvb3QsIGltYWdlLnNyYyk7XHJcbiAgfVxyXG5cclxuICBcclxuICBwcml2YXRlIHNldEFjdGl2ZShyb290OiBIVE1MRWxlbWVudCwgc3JjIDogc3RyaW5nKXsgXHJcbiAgICBjb25zdCB0aHVtYm5haWxzID0gPE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+PnJvb3QucXVlcnlTZWxlY3RvckFsbCgnLnRodW1ibmFpbC1jdG4nKTsgXHJcbiAgICB0aHVtYm5haWxzLmZvckVhY2goKHRodW1ibmFpbCwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgaW1hZ2UgPSA8SFRNTEltYWdlRWxlbWVudD4gdGh1bWJuYWlsLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICBpZihpbWFnZS5zcmMgPT09IHNyYyl7XHJcbiAgICAgICAgdGh1bWJuYWlsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IDxIVE1MSW1hZ2VFbGVtZW50PiByb290LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJyk7XHJcbiAgICAgICAgY3VycmVudEltYWdlLnNyYyA9IHRoaXMuZ2V0SW1hZ2VTcmMoc3JjKTtcclxuICAgICAgICBjdXJyZW50SW1hZ2UuZGF0YXNldC5jdXJyZW50ID0gU3RyaW5nKGluZGV4KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aHVtYm5haWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgIH0gXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGdldEltYWdlU3JjKHRodW1ibmFpbFNyYzogc3RyaW5nKSA6IHN0cmluZ3tcclxuICAgIGNvbnN0IGluZGV4ID0gdGh1bWJuYWlsU3JjLmluZGV4T2YoJy10aHVtYm5haWwuanBnJyk7XHJcbiAgICBjb25zdCBpbWFnZVNyYyA9IHRodW1ibmFpbFNyYy5zbGljZSgwLCBpbmRleCk7XHJcbiAgICByZXR1cm4gaW1hZ2VTcmMgKyAnLmpwZyc7XHJcbiAgfVxyXG5cclxuXHJcbiAgc3RhdGljIGdldEluc3RhbmNlKCkgOiBDYXJvdXNlbHtcclxuICAgIHJldHVybiBDYXJvdXNlbC5pbnN0YW5jZSA/IENhcm91c2VsLmluc3RhbmNlIDogKENhcm91c2VsLmluc3RhbmNlID0gbmV3IENhcm91c2VsKCkpOyAgXHJcbiAgfSAgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbC5nZXRJbnN0YW5jZSgpOyIsIlxyXG5cclxuY2xhc3MgQ2FydCB7XHJcbiAgXHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENhcnQgfCBudWxsICA9IG51bGw7ICBcclxuICBwcml2YXRlIHF1YW50aXR5OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBtb2RhbElzT3BlbjogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgXHJcbiAgICB0aGlzLnF1YW50aXR5ID0gMDtcclxuICAgIHRoaXMubW9kYWxJc09wZW4gPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0dXBDYXJ0Rm9ybSgpO1xyXG4gICAgdGhpcy5zZXR1cENhcmRDaGVja291dCgpO1xyXG4gIH1cclxuIFxyXG4gIHByaXZhdGUgc2V0dXBDYXJkQ2hlY2tvdXQoKXtcclxuICAgIGNvbnN0IG1vZGFsPSA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGVja291dC1jYXJkLWNvbXBvbmVudCcpO1xyXG4gICAgY29uc3QgY2FydEJ0biA9IDxIVE1MRWxlbWVudD4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1jb21wb25lbnQgLmNhcnQtYnRuJyk7XHJcbiAgICBjb25zdCBjbGVhckJ0biA9IDxIVE1MRWxlbWVudD4gbW9kYWwucXVlcnlTZWxlY3RvcignLmNsZWFyJyk7XHJcbiAgICBjb25zdCBjaGVja291dEJ0biA9IDxIVE1MRWxlbWVudD4gbW9kYWwucXVlcnlTZWxlY3RvcignLmNoZWNrb3V0LWJ0bicpOyAgIFxyXG5cclxuICAgIGNhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+eyAgICAgIFxyXG4gICAgICBtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdjbG9zZScpO1xyXG4gICAgICB0aGlzLm1vZGFsSXNPcGVuID0gIXRoaXMubW9kYWxJc09wZW47ICAgICBcclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PiB7ICAgICAgXHJcbiAgICAgIGlmKHRoaXMuY2xpY2tlZE91dHNpZGVNb2RhbCg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQsIG1vZGFsLCBjYXJ0QnRuKSl7XHJcbiAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcclxuICAgICAgICB0aGlzLm1vZGFsSXNPcGVuID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBcclxuICAgIFtjbGVhckJ0biwgY2hlY2tvdXRCdG5dLmZvckVhY2goIGJ1dHRvbiA9PntcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB0aGlzLmNsZWFyQ2FydCgpKVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldHVwQ2FydEZvcm0oKXtcclxuICAgIGNvbnN0IGNhcnRGb3JtID0gPEhUTUxFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FydC1mb3JtJyk7XHJcbiAgICBjb25zdCBtaW51c0J0biA9IDxIVE1MRWxlbWVudD4gY2FydEZvcm0ucXVlcnlTZWxlY3RvcignLm1pbnVzLWJ0bicpO1xyXG4gICAgY29uc3QgcGx1c0J0biA9IDxIVE1MRWxlbWVudD4gY2FydEZvcm0ucXVlcnlTZWxlY3RvcignLnBsdXMtYnRuJyk7XHJcbiAgICBjb25zdCBxdWFudGl0eSA9IDxIVE1MRWxlbWVudD4gY2FydEZvcm0ucXVlcnlTZWxlY3RvcignLnF1YW50aXR5Jyk7XHJcbiAgICBjb25zdCBhZGRCdG4gPSA8SFRNTEVsZW1lbnQ+Y2FydEZvcm0ucXVlcnlTZWxlY3RvcignLmFkZC10by1jYXJ0Jyk7XHJcblxyXG4gICAgbWludXNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICBsZXQgY3VycmVudCA9IE51bWJlcihxdWFudGl0eS50ZXh0Q29udGVudCk7XHJcbiAgICAgIGN1cnJlbnQtPSBjdXJyZW50ID4gMCA/IDEgOiAwO1xyXG4gICAgICBxdWFudGl0eS50ZXh0Q29udGVudCA9IFN0cmluZyhjdXJyZW50KTtcclxuICAgIH0pXHJcblxyXG4gICAgcGx1c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxldCB2YWx1ZSA9IE51bWJlcihxdWFudGl0eS50ZXh0Q29udGVudCkgKyAxOyAgICAgIFxyXG4gICAgICBxdWFudGl0eS50ZXh0Q29udGVudCA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxldCB2YWx1ZSA9IE51bWJlcihxdWFudGl0eS50ZXh0Q29udGVudCk7XHJcbiAgICAgIHF1YW50aXR5LnRleHRDb250ZW50ID0gJzAnO1xyXG4gICAgICB0aGlzLmFkZFRvQ2FydCh2YWx1ZSk7ICAgICAgXHJcbiAgICB9KVxyXG5cclxuICB9XHJcblxyXG4gIGNsaWNrZWRPdXRzaWRlTW9kYWwgKG5vZGU6IEhUTUxFbGVtZW50LCBtb2RhbDogSFRNTEVsZW1lbnQsIGNhcnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICBpZihub2RlID09IG1vZGFsIHx8IG5vZGUgPT0gY2FydCkgcmV0dXJuIGZhbHNlOyAgXHJcbiAgICBpZihub2RlID09IGRvY3VtZW50LmJvZHkpIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIHRoaXMuY2xpY2tlZE91dHNpZGVNb2RhbChub2RlLnBhcmVudEVsZW1lbnQhLCBtb2RhbCwgY2FydCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFyQ2FydCgpe1xyXG4gICAgdGhpcy5xdWFudGl0eSA9IDA7XHJcbiAgICB0aGlzLnVwZGF0ZUNhcnQoKTsgICAgXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFRvQ2FydCh2YWx1ZTogbnVtYmVyKXtcclxuICAgIHRoaXMucXVhbnRpdHkgKz0gdmFsdWU7XHJcbiAgICB0aGlzLnVwZGF0ZUNhcnQoKTsgICAgXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUNhcnQoKXtcclxuICAgIGNvbnN0IGNhcnQgPSA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItY29tcG9uZW50IC5jYXJ0LWJ0biAuaXRlbXMnKTtcclxuICAgIGNvbnN0IG1vZGFsPSA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGVja291dC1jYXJkLWNvbXBvbmVudCcpO1xyXG4gICAgY2FydC50ZXh0Q29udGVudCA9IFN0cmluZyh0aGlzLnF1YW50aXR5KTtcclxuICAgIGlmKHRoaXMucXVhbnRpdHkgPiAwKXtcclxuICAgICAgY2FydC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcclxuICAgIH0gZWxzZXtcclxuICAgICAgY2FydC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgcXVhbnRpdHkgPSA8SFRNTEVsZW1lbnQ+IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5kYXRhIC5xdWFudGl0eScpO1xyXG4gICAgY29uc3QgdG90YWwgPSA8SFRNTEVsZW1lbnQ+IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5kYXRhIC50b3RhbCcpO1xyXG4gICAgcXVhbnRpdHkudGV4dENvbnRlbnQgPSBTdHJpbmcodGhpcy5xdWFudGl0eSk7XHJcbiAgICB0b3RhbC50ZXh0Q29udGVudCA9IGAkJHt0aGlzLnF1YW50aXR5ICogMTI1fS4wMGA7XHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEluc3RhbmNlKCkgOiBDYXJ0e1xyXG4gICAgcmV0dXJuIENhcnQuaW5zdGFuY2UgPyBDYXJ0Lmluc3RhbmNlIDogKENhcnQuaW5zdGFuY2UgPSBuZXcgQ2FydCgpKTsgIFxyXG4gIH0gIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJ0LmdldEluc3RhbmNlKCk7IiwiaW1wb3J0ICcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXIudHMnO1xyXG5pbXBvcnQgJy4vY2Fyb3VzZWwudHMnO1xyXG5pbXBvcnQgJy4vY2FydC50cyc7Il19
