

class Cart {
  
  private static instance: Cart | null  = null;  
  private quantity: number;
  private modalIsOpen: boolean;

  private constructor(){
    
    this.quantity = 0;
    this.modalIsOpen = false;
    this.setupCartForm();
    this.setupCardCheckout();
  }
 
  private setupCardCheckout(){
    const modal= <HTMLElement> document.querySelector('.checkout-card-component');
    const cartBtn = <HTMLElement> document.querySelector('.navbar-component .cart-btn');
    const clearBtn = <HTMLElement> modal.querySelector('.clear');
    const checkoutBtn = <HTMLElement> modal.querySelector('.checkout-btn');   

    cartBtn.addEventListener('click', ()=>{      
      modal.classList.toggle('close');
      this.modalIsOpen = !this.modalIsOpen;     
    })

    document.addEventListener('click', (e)=> {      
      if(this.clickedOutsideModal(<HTMLElement>e.target, modal, cartBtn)){
        modal.classList.add('close');
        this.modalIsOpen = false;
      }
    });
    
    
    [clearBtn, checkoutBtn].forEach( button =>{
      button.addEventListener('click', ()=> this.clearCart())
    })

  }

  private setupCartForm(){
    const cartForm = <HTMLElement> document.querySelector('.cart-form');
    const minusBtn = <HTMLElement> cartForm.querySelector('.minus-btn');
    const plusBtn = <HTMLElement> cartForm.querySelector('.plus-btn');
    const quantity = <HTMLElement> cartForm.querySelector('.quantity');
    const addBtn = <HTMLElement>cartForm.querySelector('.add-to-cart');

    minusBtn.addEventListener('click', ()=>{
      let current = Number(quantity.textContent);
      current-= current > 0 ? 1 : 0;
      quantity.textContent = String(current);
    })

    plusBtn.addEventListener('click', ()=>{
      let value = Number(quantity.textContent) + 1;      
      quantity.textContent = String(value);
    })

    addBtn.addEventListener('click', ()=>{
      let value = Number(quantity.textContent);
      quantity.textContent = '0';
      this.addToCart(value);      
    })

  }

  clickedOutsideModal (node: HTMLElement, modal: HTMLElement, cart: HTMLElement): boolean {
    if(node == modal || node == cart) return false;  
    if(node == document.body) return true;
    return this.clickedOutsideModal(node.parentElement!, modal, cart);
  }

  private clearCart(){
    this.quantity = 0;
    this.updateCart();    
  }

  private addToCart(value: number){
    this.quantity += value;
    this.updateCart();    
  }

  private updateCart(){
    const cart = <HTMLElement> document.querySelector('.navbar-component .cart-btn .items');
    const modal= <HTMLElement> document.querySelector('.checkout-card-component');
    cart.textContent = String(this.quantity);
    if(this.quantity > 0){
      cart.classList.remove('hidden');
      modal.classList.remove('empty');
    } else{
      cart.classList.add('hidden');
      modal.classList.add('empty');
    }
    
    const quantity = <HTMLElement> modal.querySelector('.data .quantity');
    const total = <HTMLElement> modal.querySelector('.data .total');
    quantity.textContent = String(this.quantity);
    total.textContent = `$${this.quantity * 125}.00`;

  }

  static getInstance() : Cart{
    return Cart.instance ? Cart.instance : (Cart.instance = new Cart());  
  }  
}

export default Cart.getInstance();