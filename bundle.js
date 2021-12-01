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
        this.setupCartForm();
        this.setupCardCheckout();
    }
    Cart.prototype.setupCardCheckout = function () {
        var _this = this;
        var card = document.querySelector('.checkout-card-component');
        var cartBtn = document.querySelector('.navbar-component .cart-btn');
        var clearBtn = card.querySelector('.clear');
        var checkoutBtn = card.querySelector('.checkout-btn');
        cartBtn.addEventListener('focus', function () {
            card.classList.remove('close');
            card.focus();
        });
        document.addEventListener('focusout', function () {
            setTimeout(function () {
                if ([card, cartBtn, checkoutBtn, clearBtn].indexOf(document.activeElement) == -1) {
                    card.classList.add('close');
                }
            }, 25);
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
        var card = document.querySelector('.checkout-card-component');
        cart.textContent = String(this.quantity);
        if (this.quantity > 0) {
            cart.classList.remove('hidden');
            card.classList.remove('empty');
        }
        else {
            cart.classList.add('hidden');
            card.classList.add('empty');
        }
        var quantity = card.querySelector('.data .quantity');
        var total = card.querySelector('.data .total');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLnRzIiwic3JjL3RzL2Nhcm91c2VsLnRzIiwic3JjL3RzL2NhcnQudHMiLCJzcmMvdHMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7SUFTRTtRQUFBLGlCQWdCQztRQWRDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBZ0IsQ0FBQztRQUN6RSxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQWdCLENBQUM7UUFDM0UsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsMkNBQTJDLENBQWtDLENBQUM7UUFDckgsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNy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QUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLFFBQUssQ0FBQztJQUVuRCxDQUFDO0lBRU0sZ0JBQVcsR0FBbEI7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQTdGYyxhQUFRLEdBQWlCLElBQUksQ0FBQztJQThGL0MsV0FBQztDQWhHRCxBQWdHQyxJQUFBO0FBR0Qsa0JBQWUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7O0FDbkdsQywwQ0FBd0M7QUFDeEMseUJBQXVCO0FBQ3ZCLHFCQUFtQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNsYXNzIE5hdmJhciB7XHJcbiAgXHJcbiAgcHJpdmF0ZSBuYXZiYXI6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgc2lkZWJhcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBsaW5rczogTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XHJcbiAgcHJpdmF0ZSBiYWNrZHJvcDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBtZW51QnRuOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGNsb3NlQnRuOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB0aGlzLm5hdmJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2YmFyLWNvbXBvbmVudFwiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLWNvbXBvbmVudCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5saW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXZiYXItY29tcG9uZW50IGEsIC5zaWRlYmFyLWNvbXBvbmVudCBhJykgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XHJcbiAgICB0aGlzLmJhY2tkcm9wID0gdGhpcy5jcmVhdGVCYWNrZHJvcCgpO1xyXG4gICAgdGhpcy5tZW51QnRuID0gIHRoaXMuY3JlYXRlTWVudUJ1dHRvbigpO1xyXG4gICAgdGhpcy5jbG9zZUJ0biA9IHRoaXMuY3JlYXRlQ2xvc2VCdXR0b24oKTtcclxuXHJcbiAgICB0aGlzLm1lbnVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHRoaXMub3BlbigpKTsgICAgXHJcbiAgICB0aGlzLmJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB0aGlzLmNsb3NlKCkpOyAgICBcclxuICAgIHRoaXMuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHRoaXMuY2xvc2UoKSk7IFxyXG5cclxuICAgIHRoaXMubGlua3MuZm9yRWFjaChsaW5rID0+eyAgICBcclxuICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2UoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNsb3NlQnV0dG9uKCkgOiBIVE1MRWxlbWVudCB7XHJcblxyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRlbXAuaW5uZXJIVE1MID0gLypodG1sKi9gICAgIFxyXG4gICAgICA8YnV0dG9uIGFyaWEtbGFiZWw9J2Nsb3NlIG1lbnUnIGNsYXNzPSdidG4tY2xvc2UnPlxyXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJtMTEuNTk2Ljc4MiAyLjEyMiAyLjEyMkw5LjEyIDcuNDk5bDQuNTk3IDQuNTk3LTIuMTIyIDIuMTIyTDcgOS42MmwtNC41OTUgNC41OTctMi4xMjItMi4xMjJMNC44NzggNy41LjI4MiAyLjkwNCAyLjQwNC43ODJsNC41OTUgNC41OTZMMTEuNTk2Ljc4MlpcIiBmaWxsPVwiIzY5NzA3RFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIi8+PC9zdmc+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgYDtcclxuICAgIHRoaXMuc2lkZWJhci5pbnNlcnRCZWZvcmUodGVtcC5jb250ZW50LCB0aGlzLnNpZGViYXIuZmlyc3RDaGlsZCk7XHJcbiAgICByZXR1cm4gdGhpcy5zaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2xvc2UnKSBhcyBIVE1MRWxlbWVudDtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU1lbnVCdXR0b24oKXtcclxuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgICB0ZW1wLmlubmVySFRNTCA9IC8qaHRtbCovYCAgICBcclxuICAgIDxidXR0b24gYXJpYS1sYWJlbD0nbWVudScgY2xhc3M9J21lbnUtYnRuIGNsb3NlJz4gXHJcbiAgICA8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTE2IDEydjNIMHYtM2gxNlptMC02djNIMFY2aDE2Wm0wLTZ2M0gwVjBoMTZaXCIgZmlsbD1cIiM2OTcwN0RcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIvPjwvc3ZnPlxyXG4gICAgPC9idXR0b24+XHJcbiAgICBgOyAgICBcclxuICAgIHRoaXMubmF2YmFyLmFwcGVuZENoaWxkKHRlbXAuY29udGVudCk7XHJcbiAgICByZXR1cm4gdGhpcy5uYXZiYXIucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVCYWNrZHJvcCgpIDogSFRNTEVsZW1lbnQge1xyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRlbXAuaW5uZXJIVE1MID0gLypodG1sKi9gPGRpdiBjbGFzcz1cInNpZGViYXItY29tcG9uZW50LWJhY2tkcm9wIGNsb3NlXCI+PC9kaXY+YDsgICAgXHJcbiAgICB0aGlzLnNpZGViYXIucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKHRlbXAuY29udGVudCwgdGhpcy5zaWRlYmFyKTtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhci1jb21wb25lbnQtYmFja2Ryb3AnKSBhcyBIVE1MRWxlbWVudDtcclxuICB9XHJcbiAgXHJcblxyXG4gIG9wZW4oKXtcclxuICAgIFt0aGlzLm5hdmJhciwgdGhpcy5zaWRlYmFyLCB0aGlzLmJhY2tkcm9wLCB0aGlzLm1lbnVCdG5dLmZvckVhY2goZSA9PiBlLmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NlJykpOyAgXHJcbiAgfVxyXG5cclxuXHJcbiAgY2xvc2UoKXtcclxuICAgIFt0aGlzLm5hdmJhciwgdGhpcy5zaWRlYmFyLCB0aGlzLmJhY2tkcm9wLCB0aGlzLm1lbnVCdG5dLmZvckVhY2goZSA9PiBlLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJykpOyBcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgTmF2YmFyKCk7IiwiXHJcbmNsYXNzIENhcm91c2Vse1xyXG4gIFxyXG4gIHByaXZhdGUgc2Nyb2xsWTogbnVtYmVyID0gMDtcclxuIFxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tcHJvZHVjdCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgY2xvbmUgPSB0aGlzLmNyZWF0ZUNsb25lKHJvb3QpO1xyXG4gICBcclxuIFxyXG4gICAgdGhpcy5zZXRUaHVtYm5haWxzKHJvb3QpO1xyXG4gICAgdGhpcy5zZXRBcnJvd3Mocm9vdCk7XHJcblxyXG5cclxuICAgIHRoaXMuc2V0VGh1bWJuYWlscyhjbG9uZSk7XHJcbiAgICB0aGlzLnNldEFycm93cyhjbG9uZSk7XHJcblxyXG4gICAgY29uc3QgaW1hZ2UgPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub3BlbkNsb25lKGNsb25lLCByb290KSk7XHJcbiAgICBcclxuICAgIGNvbnN0IGNsb3NlTW9kYWwgPSBjbG9uZS5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtbW9kYWwnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNsb3NlTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICB0aGlzLmNsb3NlQ2xvbmUoY2xvbmUsIHJvb3QpO1xyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgXHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIHRoaXMuY2xvc2VDbG9uZShjbG9uZSwgcm9vdCk7XHJcbiAgICB9KVxyXG5cclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIG9wZW5DbG9uZShjbG9uZSA6IEhUTUxFbGVtZW50LCByb290OiBIVE1MRWxlbWVudCl7ICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgdGhpcy5zZXRBY3RpdmVCeUN1cnJlbnRJbWFnZShjbG9uZSwgKCkgPT57XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcignLnBpY3R1cmUnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgbGV0IGN1cnJlbnQ6IG51bWJlciA9IE51bWJlcihjdXJyZW50SW1hZ2UuZGF0YXNldC5jdXJyZW50KTtcclxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb25lKTsgICAgXHJcbiAgICBjb25zdCB5OiBudW1iZXIgPSByb290LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnk7XHJcbiAgICB0aGlzLnNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgICAgICBcclxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIGBcclxuICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICB0b3A6ICR7eX1weDtcclxuICAgIGApO1xyXG5cclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VDbG9uZShjbG9uZSA6IEhUTUxFbGVtZW50LCByb290OiBIVE1MRWxlbWVudCl7XHJcbiAgICBjbG9uZS5yZW1vdmUoKTtcclxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTsgICAgXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgdGhpcy5zY3JvbGxZKTtcclxuICAgXHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBzZXRUaHVtYm5haWxzKHJvb3Q6IEhUTUxFbGVtZW50KXtcclxuICAgIGNvbnN0IHRodW1ibmFpbHMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aHVtYm5haWwtY3RuJykgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XHJcbiAgICB0aHVtYm5haWxzLmZvckVhY2godGh1bWJuYWlsID0+IHsgICAgIFxyXG4gICAgICBjb25zdCBpbWFnZSA9IHRodW1ibmFpbC5xdWVyeVNlbGVjdG9yKCdpbWcnKSBhcyBIVE1MSW1hZ2VFbGVtZW50OyAgICAgXHJcbiAgICAgIHRodW1ibmFpbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2V0QWN0aXZlKHJvb3QsIGltYWdlLnNyYykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBzZXRBcnJvd3Mocm9vdDogSFRNTEVsZW1lbnQpe1xyXG4gICAgY29uc3QgcHJldmlvdXNCdG4gPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cy1idG4nKSBhcyBIVE1MRWxlbWVudDsgICAgXHJcbiAgICBwcmV2aW91c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xyXG4gICAgICB0aGlzLnNldEFjdGl2ZUJ5Q3VycmVudEltYWdlKHJvb3QsIG51bWJlciA9PiAoKG51bWJlciArIDMpICUgNCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgbmV4dEJ0biA9IHJvb3QucXVlcnlTZWxlY3RvcignLm5leHQtYnRuJykgYXMgSFRNTEVsZW1lbnQ7ICAgIFxyXG4gICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xyXG4gICAgICB0aGlzLnNldEFjdGl2ZUJ5Q3VycmVudEltYWdlKHJvb3QsIG51bWJlciA9PiAoKG51bWJlciArIDEpICUgNCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNsb25lKHJvb3Q6IEhUTUxFbGVtZW50KSA6IEhUTUxFbGVtZW50e1xyXG4gICAgY29uc3QgY2xvbmUgPSByb290LmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWN0bicpIS5yZW1vdmUoKTtcclxuICAgIGNsb25lLmNsYXNzTmFtZSA9ICdzZWN0aW9uLXByb2R1Y3QtY2xvbmUnO1xyXG4gICAgcmV0dXJuIGNsb25lO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgc2V0QWN0aXZlQnlDdXJyZW50SW1hZ2Uocm9vdDogSFRNTEVsZW1lbnQsIGZuOiAoeDogbnVtYmVyKSA9PiBudW1iZXIpe1xyXG4gICAgY29uc3QgY3VycmVudEltYWdlID0gcm9vdC5xdWVyeVNlbGVjdG9yKCcucGljdHVyZScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IGN1cnJlbnQ6IG51bWJlciA9IE51bWJlcihjdXJyZW50SW1hZ2UuZGF0YXNldC5jdXJyZW50KTtcclxuICAgIGN1cnJlbnQgPSBmbihjdXJyZW50KTtcclxuICAgIGN1cnJlbnRJbWFnZS5kYXRhc2V0LmN1cnJlbnQgPSBTdHJpbmcoY3VycmVudCk7XHJcbiAgICBjb25zdCB0aHVtYm5haWxzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKCcudGh1bWJuYWlsLWN0bicpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xyXG4gICAgY29uc3QgaW1hZ2UgPSB0aHVtYm5haWxzW2N1cnJlbnRdLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICB0aGlzLnNldEFjdGl2ZShyb290LCBpbWFnZS5zcmMpO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgcHJpdmF0ZSBzZXRBY3RpdmUocm9vdDogSFRNTEVsZW1lbnQsIHNyYyA6IHN0cmluZyl7IFxyXG4gICAgY29uc3QgdGh1bWJuYWlscyA9IHJvb3QucXVlcnlTZWxlY3RvckFsbCgnLnRodW1ibmFpbC1jdG4nKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjsgXHJcbiAgICB0aHVtYm5haWxzLmZvckVhY2goKHRodW1ibmFpbCwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgaW1hZ2UgPSB0aHVtYm5haWwucXVlcnlTZWxlY3RvcignaW1nJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgICAgaWYoaW1hZ2Uuc3JjID09PSBzcmMpe1xyXG4gICAgICAgIHRodW1ibmFpbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50SW1hZ2UgPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgICAgICBjdXJyZW50SW1hZ2Uuc3JjID0gdGhpcy5nZXRJbWFnZVNyYyhzcmMpO1xyXG4gICAgICAgIGN1cnJlbnRJbWFnZS5kYXRhc2V0LmN1cnJlbnQgPSBTdHJpbmcoaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRodW1ibmFpbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgfSBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgZ2V0SW1hZ2VTcmModGh1bWJuYWlsU3JjOiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgY29uc3QgaW5kZXggPSB0aHVtYm5haWxTcmMuaW5kZXhPZignLXRodW1ibmFpbC5qcGcnKTtcclxuICAgIGNvbnN0IGltYWdlU3JjID0gdGh1bWJuYWlsU3JjLnNsaWNlKDAsIGluZGV4KTtcclxuICAgIHJldHVybiBpbWFnZVNyYyArICcuanBnJztcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IENhcm91c2VsKCk7IiwiY2xhc3MgQ2FydCB7XHJcbiAgXHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENhcnQgfCBudWxsICA9IG51bGw7ICBcclxuICBwcml2YXRlIHF1YW50aXR5OiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKXtcclxuICAgIFxyXG4gICAgdGhpcy5xdWFudGl0eSA9IDA7XHJcbiAgICB0aGlzLnNldHVwQ2FydEZvcm0oKTtcclxuICAgIHRoaXMuc2V0dXBDYXJkQ2hlY2tvdXQoKTtcclxuICB9XHJcbiBcclxuICBwcml2YXRlIHNldHVwQ2FyZENoZWNrb3V0KCl7XHJcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoZWNrb3V0LWNhcmQtY29tcG9uZW50JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBjYXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1jb21wb25lbnQgLmNhcnQtYnRuJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBjbGVhckJ0biA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNsZWFyJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBjaGVja291dEJ0biA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNoZWNrb3V0LWJ0bicpIGFzIEhUTUxFbGVtZW50OyAgIFxyXG5cclxuICAgIGNhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKT0+eyAgICAgIFxyXG4gICAgICBjYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NlJyk7ICAgIFxyXG4gICAgICBjYXJkLmZvY3VzKCk7ICAgICAgIFxyXG4gICAgfSkgICAgXHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoKT0+e1xyXG4gICAgICBzZXRUaW1lb3V0KCgpPT57ICAgICAgICBcclxuICAgICAgICBpZihbY2FyZCwgY2FydEJ0biwgY2hlY2tvdXRCdG4sIGNsZWFyQnRuXS5pbmRleE9mKDxIVE1MRWxlbWVudD5kb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PSAtMSl7XHJcbiAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAyNSlcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBcclxuICAgIFtjbGVhckJ0biwgY2hlY2tvdXRCdG5dLmZvckVhY2goIGJ1dHRvbiA9PntcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB0aGlzLmNsZWFyQ2FydCgpKVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldHVwQ2FydEZvcm0oKXtcclxuICAgIGNvbnN0IGNhcnRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnQtZm9ybScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgbWludXNCdG4gPSBjYXJ0Rm9ybS5xdWVyeVNlbGVjdG9yKCcubWludXMtYnRuJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBwbHVzQnRuID0gY2FydEZvcm0ucXVlcnlTZWxlY3RvcignLnBsdXMtYnRuJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBxdWFudGl0eSA9IGNhcnRGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5xdWFudGl0eScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgYWRkQnRuID0gY2FydEZvcm0ucXVlcnlTZWxlY3RvcignLmFkZC10by1jYXJ0JykgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgbWludXNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICBsZXQgY3VycmVudCA9IE51bWJlcihxdWFudGl0eS50ZXh0Q29udGVudCk7XHJcbiAgICAgIGN1cnJlbnQtPSBjdXJyZW50ID4gMCA/IDEgOiAwO1xyXG4gICAgICBxdWFudGl0eS50ZXh0Q29udGVudCA9IFN0cmluZyhjdXJyZW50KTtcclxuICAgIH0pXHJcblxyXG4gICAgcGx1c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxldCB2YWx1ZSA9IE51bWJlcihxdWFudGl0eS50ZXh0Q29udGVudCkgKyAxOyAgICAgIFxyXG4gICAgICBxdWFudGl0eS50ZXh0Q29udGVudCA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxldCB2YWx1ZSA9IE51bWJlcihxdWFudGl0eS50ZXh0Q29udGVudCk7XHJcbiAgICAgIHF1YW50aXR5LnRleHRDb250ZW50ID0gJzAnO1xyXG4gICAgICB0aGlzLmFkZFRvQ2FydCh2YWx1ZSk7ICAgICAgXHJcbiAgICB9KVxyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYXJDYXJ0KCl7XHJcbiAgICB0aGlzLnF1YW50aXR5ID0gMDtcclxuICAgIHRoaXMudXBkYXRlQ2FydCgpOyAgICBcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkVG9DYXJ0KHZhbHVlOiBudW1iZXIpe1xyXG4gICAgdGhpcy5xdWFudGl0eSArPSB2YWx1ZTtcclxuICAgIHRoaXMudXBkYXRlQ2FydCgpOyAgICBcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlQ2FydCgpe1xyXG4gICAgY29uc3QgY2FydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItY29tcG9uZW50IC5jYXJ0LWJ0biAuaXRlbXMnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hlY2tvdXQtY2FyZC1jb21wb25lbnQnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNhcnQudGV4dENvbnRlbnQgPSBTdHJpbmcodGhpcy5xdWFudGl0eSk7XHJcbiAgICBpZih0aGlzLnF1YW50aXR5ID4gMCl7XHJcbiAgICAgIGNhcnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcclxuICAgIH0gZWxzZXtcclxuICAgICAgY2FydC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdlbXB0eScpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBxdWFudGl0eSA9IGNhcmQucXVlcnlTZWxlY3RvcignLmRhdGEgLnF1YW50aXR5JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCB0b3RhbCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmRhdGEgLnRvdGFsJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBxdWFudGl0eS50ZXh0Q29udGVudCA9IFN0cmluZyh0aGlzLnF1YW50aXR5KTtcclxuICAgIHRvdGFsLnRleHRDb250ZW50ID0gYCQke3RoaXMucXVhbnRpdHkgKiAxMjV9LjAwYDtcclxuXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSA6IENhcnR7XHJcbiAgICByZXR1cm4gQ2FydC5pbnN0YW5jZSA/IENhcnQuaW5zdGFuY2UgOiAoQ2FydC5pbnN0YW5jZSA9IG5ldyBDYXJ0KCkpOyAgXHJcbiAgfSAgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJ0LmdldEluc3RhbmNlKCk7IiwiaW1wb3J0ICcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXIudHMnO1xyXG5pbXBvcnQgJy4vY2Fyb3VzZWwudHMnO1xyXG5pbXBvcnQgJy4vY2FydC50cyc7Il19
