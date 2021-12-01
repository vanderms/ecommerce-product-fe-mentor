class Navbar {
  
  private navbar: HTMLElement;
  private sidebar: HTMLElement;
  private links: NodeListOf<HTMLAnchorElement>;
  private backdrop: HTMLElement;
  private menuBtn: HTMLElement;
  private closeBtn: HTMLElement;

  constructor(){

    this.navbar = <HTMLElement> document.querySelector(".navbar-component");
    this.sidebar = <HTMLElement> document.querySelector('.sidebar-component');
    const linksSelector = '.navbar-component a, .sidebar-component a'
    this.links = <NodeListOf<HTMLAnchorElement>> document.querySelectorAll(linksSelector);
    this.backdrop = this.createBackdrop();
    this.menuBtn =  this.createMenuButton();
    this.closeBtn = this.createCloseButton();

    this.menuBtn.addEventListener('click', ()=> this.open());    
    this.backdrop.addEventListener('click', ()=> this.close());    
    this.closeBtn.addEventListener('click', ()=> this.close()); 

    this.links.forEach(link =>{    
      link.addEventListener('click', () => this.close());
    });
  }


  private createCloseButton() : HTMLElement {

    const temp = <HTMLTemplateElement> document.createElement('template');
    temp.innerHTML = /*html*/`    
      <button aria-label='close menu' class='btn-close'>
        <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/></svg>
      </button>
    `;
    this.sidebar.insertBefore(temp.content, this.sidebar.firstChild);
    return <HTMLElement> this.sidebar.querySelector('.btn-close');
  }


  private createMenuButton(){
    const temp = <HTMLTemplateElement> document.createElement('template');
    temp.innerHTML = /*html*/`    
    <button aria-label='menu' class='menu-btn close'> 
    <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="#69707D" fill-rule="evenodd"/></svg>
    </button>
    `;    
    this.navbar.appendChild(temp.content);
    return <HTMLElement> this.navbar.querySelector('.menu-btn');
  }


  private createBackdrop() : HTMLElement {
    const temp = <HTMLTemplateElement> document.createElement('template');
    temp.innerHTML = /*html*/`<div class="sidebar-component-backdrop close"></div>`;    
    this.sidebar.parentNode!.insertBefore(temp.content, this.sidebar);
    return <HTMLElement> document.querySelector('.sidebar-component-backdrop');
  }
  

  open(){
    [this.navbar, this.sidebar, this.backdrop, this.menuBtn].forEach(e => e.classList.remove('close'));  
  }


  close(){
    [this.navbar, this.sidebar, this.backdrop, this.menuBtn].forEach(e => e.classList.add('close')); 
  }
}


export default new Navbar();