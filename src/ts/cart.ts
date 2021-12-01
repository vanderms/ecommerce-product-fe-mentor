class Cart {
  
  private static instance: Cart | null  = null;  
  private quantity: number;

  private constructor(){
    
    this.quantity = 0;
    this.setupCartForm();
    this.setupCardCheckout();
  }
 
  private setupCardCheckout(){
    const card = document.querySelector('.checkout-card-component') as HTMLElement;
    const cartBtn = document.querySelector('.navbar-component .cart-btn') as HTMLElement;
    const clearBtn = card.querySelector('.clear') as HTMLElement;
    const checkoutBtn = card.querySelector('.checkout-btn') as HTMLElement;   

    cartBtn.addEventListener('focus', ()=>{      
      card.classList.remove('close');    
      card.focus();       
    })    

    document.addEventListener('focusout', ()=>{
      setTimeout(()=>{        
        if([card, cartBtn, checkoutBtn, clearBtn].indexOf(<HTMLElement>document.activeElement) == -1){
          card.classList.add('close');
        }
      }, 25)
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
    const card = document.querySelector('.checkout-card-component') as HTMLElement;
    cart.textContent = String(this.quantity);
    if(this.quantity > 0){
      cart.classList.remove('hidden');
      card.classList.remove('empty');
    } else{
      cart.classList.add('hidden');
      card.classList.add('empty');
    }
    
    const quantity = card.querySelector('.data .quantity') as HTMLElement;
    const total = card.querySelector('.data .total') as HTMLElement;
    quantity.textContent = String(this.quantity);
    total.textContent = `$${this.quantity * 125}.00`;

  }

  static getInstance() : Cart{
    return Cart.instance ? Cart.instance : (Cart.instance = new Cart());  
  }  
}


export default Cart.getInstance();