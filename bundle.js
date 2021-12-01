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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLnRzIiwic3JjL3RzL2Nhcm91c2VsLnRzIiwic3JjL3RzL2NhcnQudHMiLCJzcmMvdHMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7SUFTRTtRQUFBLGlCQWdCQztRQWRDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBZ0IsQ0FBQztRQUN6RSxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQWdCLENBQUM7UUFDM0UsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsMkNBQTJDLENBQWtDLENBQUM7UUFDckgsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNy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O1NBQ2pDO2FBQUs7WUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM5QjtRQUVELElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQWdCLENBQUM7UUFDdkUsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQWdCLENBQUM7UUFDakUsUUFBUSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxXQUFXLEdBQUcsV0FBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsUUFBSyxDQUFDO0lBRW5ELENBQUM7SUFFTSxnQkFBVyxHQUFsQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBcEdjLGFBQVEsR0FBaUIsSUFBSSxDQUFDO0lBcUcvQyxXQUFDO0NBdkdELEFBdUdDLElBQUE7QUFLRCxrQkFBZSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7QUM5R2xDLDBDQUF3QztBQUN4Qyx5QkFBdUI7QUFDdkIscUJBQW1CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY2xhc3MgTmF2YmFyIHtcclxuICBcclxuICBwcml2YXRlIG5hdmJhcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBzaWRlYmFyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGxpbmtzOiBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcclxuICBwcml2YXRlIGJhY2tkcm9wOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIG1lbnVCdG46IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgY2xvc2VCdG46IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIHRoaXMubmF2YmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZiYXItY29tcG9uZW50XCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5zaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItY29tcG9uZW50JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLmxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdmJhci1jb21wb25lbnQgYSwgLnNpZGViYXItY29tcG9uZW50IGEnKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcclxuICAgIHRoaXMuYmFja2Ryb3AgPSB0aGlzLmNyZWF0ZUJhY2tkcm9wKCk7XHJcbiAgICB0aGlzLm1lbnVCdG4gPSAgdGhpcy5jcmVhdGVNZW51QnV0dG9uKCk7XHJcbiAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5jcmVhdGVDbG9zZUJ1dHRvbigpO1xyXG5cclxuICAgIHRoaXMubWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gdGhpcy5vcGVuKCkpOyAgICBcclxuICAgIHRoaXMuYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHRoaXMuY2xvc2UoKSk7ICAgIFxyXG4gICAgdGhpcy5jbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gdGhpcy5jbG9zZSgpKTsgXHJcblxyXG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKGxpbmsgPT57ICAgIFxyXG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VCdXR0b24oKSA6IEhUTUxFbGVtZW50IHtcclxuXHJcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgdGVtcC5pbm5lckhUTUwgPSAvKmh0bWwqL2AgICAgXHJcbiAgICAgIDxidXR0b24gYXJpYS1sYWJlbD0nY2xvc2UgbWVudScgY2xhc3M9J2J0bi1jbG9zZSc+XHJcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIm0xMS41OTYuNzgyIDIuMTIyIDIuMTIyTDkuMTIgNy40OTlsNC41OTcgNC41OTctMi4xMjIgMi4xMjJMNyA5LjYybC00LjU5NSA0LjU5Ny0yLjEyMi0yLjEyMkw0Ljg3OCA3LjUuMjgyIDIuOTA0IDIuNDA0Ljc4Mmw0LjU5NSA0LjU5NkwxMS41OTYuNzgyWlwiIGZpbGw9XCIjNjk3MDdEXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiLz48L3N2Zz5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICBgO1xyXG4gICAgdGhpcy5zaWRlYmFyLmluc2VydEJlZm9yZSh0ZW1wLmNvbnRlbnQsIHRoaXMuc2lkZWJhci5maXJzdENoaWxkKTtcclxuICAgIHJldHVybiB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignLmJ0bi1jbG9zZScpIGFzIEhUTUxFbGVtZW50O1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTWVudUJ1dHRvbigpe1xyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRlbXAuaW5uZXJIVE1MID0gLypodG1sKi9gICAgIFxyXG4gICAgPGJ1dHRvbiBhcmlhLWxhYmVsPSdtZW51JyBjbGFzcz0nbWVudS1idG4gY2xvc2UnPiBcclxuICAgIDxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTYgMTJ2M0gwdi0zaDE2Wm0wLTZ2M0gwVjZoMTZabTAtNnYzSDBWMGgxNlpcIiBmaWxsPVwiIzY5NzA3RFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIi8+PC9zdmc+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIGA7ICAgIFxyXG4gICAgdGhpcy5uYXZiYXIuYXBwZW5kQ2hpbGQodGVtcC5jb250ZW50KTtcclxuICAgIHJldHVybiB0aGlzLm5hdmJhci5xdWVyeVNlbGVjdG9yKCcubWVudS1idG4nKSBhcyBIVE1MRWxlbWVudDtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUJhY2tkcm9wKCkgOiBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgdGVtcC5pbm5lckhUTUwgPSAvKmh0bWwqL2A8ZGl2IGNsYXNzPVwic2lkZWJhci1jb21wb25lbnQtYmFja2Ryb3AgY2xvc2VcIj48L2Rpdj5gOyAgICBcclxuICAgIHRoaXMuc2lkZWJhci5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUodGVtcC5jb250ZW50LCB0aGlzLnNpZGViYXIpO1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLWNvbXBvbmVudC1iYWNrZHJvcCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gIH1cclxuICBcclxuXHJcbiAgb3Blbigpe1xyXG4gICAgW3RoaXMubmF2YmFyLCB0aGlzLnNpZGViYXIsIHRoaXMuYmFja2Ryb3AsIHRoaXMubWVudUJ0bl0uZm9yRWFjaChlID0+IGUuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2UnKSk7ICBcclxuICB9XHJcblxyXG5cclxuICBjbG9zZSgpe1xyXG4gICAgW3RoaXMubmF2YmFyLCB0aGlzLnNpZGViYXIsIHRoaXMuYmFja2Ryb3AsIHRoaXMubWVudUJ0bl0uZm9yRWFjaChlID0+IGUuY2xhc3NMaXN0LmFkZCgnY2xvc2UnKSk7IFxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBOYXZiYXIoKTsiLCJcclxuY2xhc3MgQ2Fyb3VzZWx7XHJcbiAgXHJcbiAgcHJpdmF0ZSBzY3JvbGxZOiBudW1iZXIgPSAwO1xyXG4gXHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi1wcm9kdWN0JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBjbG9uZSA9IHRoaXMuY3JlYXRlQ2xvbmUocm9vdCk7XHJcbiAgIFxyXG4gXHJcbiAgICB0aGlzLnNldFRodW1ibmFpbHMocm9vdCk7XHJcbiAgICB0aGlzLnNldEFycm93cyhyb290KTtcclxuXHJcblxyXG4gICAgdGhpcy5zZXRUaHVtYm5haWxzKGNsb25lKTtcclxuICAgIHRoaXMuc2V0QXJyb3dzKGNsb25lKTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcignLnBpY3R1cmUnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5vcGVuQ2xvbmUoY2xvbmUsIHJvb3QpKTtcclxuICAgIFxyXG4gICAgY29uc3QgY2xvc2VNb2RhbCA9IGNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1tb2RhbCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY2xvc2VNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIHRoaXMuY2xvc2VDbG9uZShjbG9uZSwgcm9vdCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGJhY2tkcm9wID0gY2xvbmUucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgdGhpcy5jbG9zZUNsb25lKGNsb25lLCByb290KTtcclxuICAgIH0pXHJcblxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgb3BlbkNsb25lKGNsb25lIDogSFRNTEVsZW1lbnQsIHJvb3Q6IEhUTUxFbGVtZW50KXsgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICB0aGlzLnNldEFjdGl2ZUJ5Q3VycmVudEltYWdlKGNsb25lLCAoKSA9PntcclxuICAgICAgY29uc3QgY3VycmVudEltYWdlID0gcm9vdC5xdWVyeVNlbGVjdG9yKCcucGljdHVyZScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBsZXQgY3VycmVudDogbnVtYmVyID0gTnVtYmVyKGN1cnJlbnRJbWFnZS5kYXRhc2V0LmN1cnJlbnQpO1xyXG4gICAgICByZXR1cm4gY3VycmVudDtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvbmUpOyAgICBcclxuICAgIGNvbnN0IHk6IG51bWJlciA9IHJvb3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueTtcclxuICAgIHRoaXMuc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgICAgIFxyXG4gICAgcm9vdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYFxyXG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgIHRvcDogJHt5fXB4O1xyXG4gICAgYCk7XHJcblxyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbG9zZUNsb25lKGNsb25lIDogSFRNTEVsZW1lbnQsIHJvb3Q6IEhUTUxFbGVtZW50KXtcclxuICAgIGNsb25lLnJlbW92ZSgpO1xyXG4gICAgcm9vdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJycpOyAgICBcclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCB0aGlzLnNjcm9sbFkpO1xyXG4gICBcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIHNldFRodW1ibmFpbHMocm9vdDogSFRNTEVsZW1lbnQpe1xyXG4gICAgY29uc3QgdGh1bWJuYWlscyA9IHJvb3QucXVlcnlTZWxlY3RvckFsbCgnLnRodW1ibmFpbC1jdG4nKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcclxuICAgIHRodW1ibmFpbHMuZm9yRWFjaCh0aHVtYm5haWwgPT4geyAgICAgXHJcbiAgICAgIGNvbnN0IGltYWdlID0gdGh1bWJuYWlsLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7ICAgICBcclxuICAgICAgdGh1bWJuYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRBY3RpdmUocm9vdCwgaW1hZ2Uuc3JjKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIHNldEFycm93cyhyb290OiBIVE1MRWxlbWVudCl7XHJcbiAgICBjb25zdCBwcmV2aW91c0J0biA9IHJvb3QucXVlcnlTZWxlY3RvcignLnByZXZpb3VzLWJ0bicpIGFzIEhUTUxFbGVtZW50OyAgICBcclxuICAgIHByZXZpb3VzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XHJcbiAgICAgIHRoaXMuc2V0QWN0aXZlQnlDdXJyZW50SW1hZ2Uocm9vdCwgbnVtYmVyID0+ICgobnVtYmVyICsgMykgJSA0KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBuZXh0QnRuID0gcm9vdC5xdWVyeVNlbGVjdG9yKCcubmV4dC1idG4nKSBhcyBIVE1MRWxlbWVudDsgICAgXHJcbiAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XHJcbiAgICAgIHRoaXMuc2V0QWN0aXZlQnlDdXJyZW50SW1hZ2Uocm9vdCwgbnVtYmVyID0+ICgobnVtYmVyICsgMSkgJSA0KSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2xvbmUocm9vdDogSFRNTEVsZW1lbnQpIDogSFRNTEVsZW1lbnR7XHJcbiAgICBjb25zdCBjbG9uZSA9IHJvb3QuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY2xvbmUucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtY3RuJykhLnJlbW92ZSgpO1xyXG4gICAgY2xvbmUuY2xhc3NOYW1lID0gJ3NlY3Rpb24tcHJvZHVjdC1jbG9uZSc7XHJcbiAgICByZXR1cm4gY2xvbmU7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBzZXRBY3RpdmVCeUN1cnJlbnRJbWFnZShyb290OiBIVE1MRWxlbWVudCwgZm46ICh4OiBudW1iZXIpID0+IG51bWJlcil7XHJcbiAgICBjb25zdCBjdXJyZW50SW1hZ2UgPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBsZXQgY3VycmVudDogbnVtYmVyID0gTnVtYmVyKGN1cnJlbnRJbWFnZS5kYXRhc2V0LmN1cnJlbnQpO1xyXG4gICAgY3VycmVudCA9IGZuKGN1cnJlbnQpO1xyXG4gICAgY3VycmVudEltYWdlLmRhdGFzZXQuY3VycmVudCA9IFN0cmluZyhjdXJyZW50KTtcclxuICAgIGNvbnN0IHRodW1ibmFpbHMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aHVtYm5haWwtY3RuJykgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XHJcbiAgICBjb25zdCBpbWFnZSA9IHRodW1ibmFpbHNbY3VycmVudF0ucXVlcnlTZWxlY3RvcignaW1nJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHRoaXMuc2V0QWN0aXZlKHJvb3QsIGltYWdlLnNyYyk7XHJcbiAgfVxyXG5cclxuICBcclxuICBwcml2YXRlIHNldEFjdGl2ZShyb290OiBIVE1MRWxlbWVudCwgc3JjIDogc3RyaW5nKXsgXHJcbiAgICBjb25zdCB0aHVtYm5haWxzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKCcudGh1bWJuYWlsLWN0bicpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+OyBcclxuICAgIHRodW1ibmFpbHMuZm9yRWFjaCgodGh1bWJuYWlsLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBpbWFnZSA9IHRodW1ibmFpbC5xdWVyeVNlbGVjdG9yKCdpbWcnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgICBpZihpbWFnZS5zcmMgPT09IHNyYyl7XHJcbiAgICAgICAgdGh1bWJuYWlsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcignLnBpY3R1cmUnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgICAgIGN1cnJlbnRJbWFnZS5zcmMgPSB0aGlzLmdldEltYWdlU3JjKHNyYyk7XHJcbiAgICAgICAgY3VycmVudEltYWdlLmRhdGFzZXQuY3VycmVudCA9IFN0cmluZyhpbmRleCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGh1bWJuYWlsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICB9IFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBnZXRJbWFnZVNyYyh0aHVtYm5haWxTcmM6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICBjb25zdCBpbmRleCA9IHRodW1ibmFpbFNyYy5pbmRleE9mKCctdGh1bWJuYWlsLmpwZycpO1xyXG4gICAgY29uc3QgaW1hZ2VTcmMgPSB0aHVtYm5haWxTcmMuc2xpY2UoMCwgaW5kZXgpO1xyXG4gICAgcmV0dXJuIGltYWdlU3JjICsgJy5qcGcnO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQ2Fyb3VzZWwoKTsiLCJcclxuXHJcbmNsYXNzIENhcnQge1xyXG4gIFxyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDYXJ0IHwgbnVsbCAgPSBudWxsOyAgXHJcbiAgcHJpdmF0ZSBxdWFudGl0eTogbnVtYmVyO1xyXG4gIHByaXZhdGUgbW9kYWxJc09wZW46IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKXtcclxuICAgIFxyXG4gICAgdGhpcy5xdWFudGl0eSA9IDA7XHJcbiAgICB0aGlzLm1vZGFsSXNPcGVuID0gZmFsc2U7XHJcbiAgICB0aGlzLnNldHVwQ2FydEZvcm0oKTtcclxuICAgIHRoaXMuc2V0dXBDYXJkQ2hlY2tvdXQoKTtcclxuICB9XHJcbiBcclxuICBwcml2YXRlIHNldHVwQ2FyZENoZWNrb3V0KCl7XHJcbiAgICBjb25zdCBtb2RhbD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoZWNrb3V0LWNhcmQtY29tcG9uZW50JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBjYXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1jb21wb25lbnQgLmNhcnQtYnRuJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBjbGVhckJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbGVhcicpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgY2hlY2tvdXRCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2hlY2tvdXQtYnRuJykgYXMgSFRNTEVsZW1lbnQ7ICAgXHJcblxyXG4gICAgY2FydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57ICAgICAgXHJcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlJyk7XHJcbiAgICAgIHRoaXMubW9kYWxJc09wZW4gPSAhdGhpcy5tb2RhbElzT3BlbjsgICAgIFxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHsgICAgICBcclxuICAgICAgaWYodGhpcy5jbGlja2VkT3V0c2lkZU1vZGFsKDxIVE1MRWxlbWVudD5lLnRhcmdldCwgbW9kYWwsIGNhcnRCdG4pKXtcclxuICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xyXG4gICAgICAgIHRoaXMubW9kYWxJc09wZW4gPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIFxyXG4gICAgW2NsZWFyQnRuLCBjaGVja291dEJ0bl0uZm9yRWFjaCggYnV0dG9uID0+e1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHRoaXMuY2xlYXJDYXJ0KCkpXHJcbiAgICB9KVxyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0dXBDYXJ0Rm9ybSgpe1xyXG4gICAgY29uc3QgY2FydEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FydC1mb3JtJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBtaW51c0J0biA9IGNhcnRGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5taW51cy1idG4nKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IHBsdXNCdG4gPSBjYXJ0Rm9ybS5xdWVyeVNlbGVjdG9yKCcucGx1cy1idG4nKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IHF1YW50aXR5ID0gY2FydEZvcm0ucXVlcnlTZWxlY3RvcignLnF1YW50aXR5JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBhZGRCdG4gPSBjYXJ0Rm9ybS5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvLWNhcnQnKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBtaW51c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxldCBjdXJyZW50ID0gTnVtYmVyKHF1YW50aXR5LnRleHRDb250ZW50KTtcclxuICAgICAgY3VycmVudC09IGN1cnJlbnQgPiAwID8gMSA6IDA7XHJcbiAgICAgIHF1YW50aXR5LnRleHRDb250ZW50ID0gU3RyaW5nKGN1cnJlbnQpO1xyXG4gICAgfSlcclxuXHJcbiAgICBwbHVzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgbGV0IHZhbHVlID0gTnVtYmVyKHF1YW50aXR5LnRleHRDb250ZW50KSArIDE7ICAgICAgXHJcbiAgICAgIHF1YW50aXR5LnRleHRDb250ZW50ID0gU3RyaW5nKHZhbHVlKTtcclxuICAgIH0pXHJcblxyXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgbGV0IHZhbHVlID0gTnVtYmVyKHF1YW50aXR5LnRleHRDb250ZW50KTtcclxuICAgICAgcXVhbnRpdHkudGV4dENvbnRlbnQgPSAnMCc7XHJcbiAgICAgIHRoaXMuYWRkVG9DYXJ0KHZhbHVlKTsgICAgICBcclxuICAgIH0pXHJcblxyXG4gIH1cclxuXHJcbiAgY2xpY2tlZE91dHNpZGVNb2RhbCAobm9kZTogSFRNTEVsZW1lbnQsIG1vZGFsOiBIVE1MRWxlbWVudCwgY2FydDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuICAgIGlmKG5vZGUgPT0gbW9kYWwgfHwgbm9kZSA9PSBjYXJ0KSByZXR1cm4gZmFsc2U7ICBcclxuICAgIGlmKG5vZGUgPT0gZG9jdW1lbnQuYm9keSkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gdGhpcy5jbGlja2VkT3V0c2lkZU1vZGFsKG5vZGUucGFyZW50RWxlbWVudCEsIG1vZGFsLCBjYXJ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYXJDYXJ0KCl7XHJcbiAgICB0aGlzLnF1YW50aXR5ID0gMDtcclxuICAgIHRoaXMudXBkYXRlQ2FydCgpOyAgICBcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkVG9DYXJ0KHZhbHVlOiBudW1iZXIpe1xyXG4gICAgdGhpcy5xdWFudGl0eSArPSB2YWx1ZTtcclxuICAgIHRoaXMudXBkYXRlQ2FydCgpOyAgICBcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlQ2FydCgpe1xyXG4gICAgY29uc3QgY2FydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItY29tcG9uZW50IC5jYXJ0LWJ0biAuaXRlbXMnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IG1vZGFsPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hlY2tvdXQtY2FyZC1jb21wb25lbnQnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNhcnQudGV4dENvbnRlbnQgPSBTdHJpbmcodGhpcy5xdWFudGl0eSk7XHJcbiAgICBpZih0aGlzLnF1YW50aXR5ID4gMCl7XHJcbiAgICAgIGNhcnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIGNhcnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHF1YW50aXR5ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmRhdGEgLnF1YW50aXR5JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCB0b3RhbCA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5kYXRhIC50b3RhbCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgcXVhbnRpdHkudGV4dENvbnRlbnQgPSBTdHJpbmcodGhpcy5xdWFudGl0eSk7XHJcbiAgICB0b3RhbC50ZXh0Q29udGVudCA9IGAkJHt0aGlzLnF1YW50aXR5ICogMTI1fS4wMGA7XHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEluc3RhbmNlKCkgOiBDYXJ0e1xyXG4gICAgcmV0dXJuIENhcnQuaW5zdGFuY2UgPyBDYXJ0Lmluc3RhbmNlIDogKENhcnQuaW5zdGFuY2UgPSBuZXcgQ2FydCgpKTsgIFxyXG4gIH0gIFxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJ0LmdldEluc3RhbmNlKCk7IiwiaW1wb3J0ICcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXIudHMnO1xyXG5pbXBvcnQgJy4vY2Fyb3VzZWwudHMnO1xyXG5pbXBvcnQgJy4vY2FydC50cyc7Il19
