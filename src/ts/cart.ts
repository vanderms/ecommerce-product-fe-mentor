

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
    const modal= document.querySelector('.checkout-card-component') as HTMLElement;
    const cartBtn = document.querySelector('.navbar-component .cart-btn') as HTMLElement;
    const clearBtn = modal.querySelector('.clear') as HTMLElement;
    const checkoutBtn = modal.querySelector('.checkout-btn') as HTMLElement;   

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
    const cartForm = document.querySelector('.cart-form') as HTMLElement;
    const minusBtn = cartForm.querySelector('.minus-btn') as HTMLElement;
    const plusBtn = cartForm.querySelector('.plus-btn') as HTMLElement;
    const quantity = cartForm.querySelector('.quantity') as HTMLElement;
    const addBtn = cartForm.querySelector('.add-to-cart') as HTMLElement;

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
    const cart = document.querySelector('.navbar-component .cart-btn .items') as HTMLElement;
    const modal= document.querySelector('.checkout-card-component') as HTMLElement;
    cart.textContent = String(this.quantity);
    if(this.quantity > 0){
      cart.classList.remove('hidden');
      modal.classList.remove('empty');
    } else{
      cart.classList.add('hidden');
      modal.classList.add('empty');
    }
    
    const quantity = modal.querySelector('.data .quantity') as HTMLElement;
    const total = modal.querySelector('.data .total') as HTMLElement;
    quantity.textContent = String(this.quantity);
    total.textContent = `$${this.quantity * 125}.00`;

  }

  static getInstance() : Cart{
    return Cart.instance ? Cart.instance : (Cart.instance = new Cart());  
  }  
}




export default Cart.getInstance();