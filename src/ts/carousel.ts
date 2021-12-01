
class Carousel {
  
  private scrollY: number = 0;
  private static instance: Carousel | null  = null; 
 
  constructor(){
    const root = <HTMLElement> document.querySelector('.section-product');
    const clone = this.createClone(root);
   
 
    this.setThumbnails(root);
    this.setArrows(root);


    this.setThumbnails(clone);
    this.setArrows(clone);

    const image = <HTMLElement> root.querySelector('.picture');
    image.addEventListener('click', () => this.openClone(clone, root));
    
    const closeModal = <HTMLElement> clone.querySelector('.close-modal');
    closeModal.addEventListener('click', ()=>{
      this.closeClone(clone, root);
    })

    const backdrop = <HTMLElement> clone.querySelector('.backdrop');
    
    backdrop.addEventListener('click', ()=>{
      this.closeClone(clone, root);
    })

  }


  private openClone(clone : HTMLElement, root: HTMLElement){   
    
    
    this.setActiveByCurrentImage(clone, () =>{
      const currentImage = <HTMLElement> root.querySelector('.picture');
      let current: number = Number(currentImage.dataset.current);
      return current;
    });

    document.body.appendChild(clone);    
    const y: number = root.getBoundingClientRect().y;
    this.scrollY = window.scrollY;
        
    root.setAttribute('style', `
      position: fixed;
      top: ${y}px;
    `);

    window.scrollTo(0, 0);
  }

  private closeClone(clone : HTMLElement, root: HTMLElement){
    clone.remove();
    root.setAttribute('style', '');    
    window.scrollTo(0, this.scrollY);
   
  }


  private setThumbnails(root: HTMLElement){
    const thumbnails = <NodeListOf<HTMLElement>> root.querySelectorAll('.thumbnail-ctn');
    thumbnails.forEach(thumbnail => {     
      const image = <HTMLImageElement> thumbnail.querySelector('img');     
      thumbnail.addEventListener('click', () => this.setActive(root, image.src));
    });
  }


  private setArrows(root: HTMLElement){
    const previousBtn = <HTMLElement>root.querySelector('.previous-btn');    
    previousBtn.addEventListener('click', () =>{
      this.setActiveByCurrentImage(root, number => ((number + 3) % 4));
    });

    const nextBtn = <HTMLElement> root.querySelector('.next-btn');    
    nextBtn.addEventListener('click', () =>{
      this.setActiveByCurrentImage(root, number => ((number + 1) % 4));
    });
  }

  private createClone(root: HTMLElement) : HTMLElement{
    const clone = <HTMLElement> root.cloneNode(true);
    clone.querySelector('.content-ctn')!.remove();
    clone.className = 'section-product-clone';
    return clone;
  }


  private setActiveByCurrentImage(root: HTMLElement, fn: (x: number) => number){
    const currentImage = <HTMLElement> root.querySelector('.picture');
    let current: number = Number(currentImage.dataset.current);
    current = fn(current);
    currentImage.dataset.current = String(current);
    const thumbnails = <NodeListOf<HTMLElement>>root.querySelectorAll('.thumbnail-ctn');
    const image = <HTMLImageElement> thumbnails[current].querySelector('img');
    this.setActive(root, image.src);
  }

  
  private setActive(root: HTMLElement, src : string){ 
    const thumbnails = <NodeListOf<HTMLElement>>root.querySelectorAll('.thumbnail-ctn'); 
    thumbnails.forEach((thumbnail, index) => {
      const image = <HTMLImageElement> thumbnail.querySelector('img');
      if(image.src === src){
        thumbnail.classList.add('active');
        const currentImage = <HTMLImageElement> root.querySelector('.picture');
        currentImage.src = this.getImageSrc(src);
        currentImage.dataset.current = String(index);
      }
      else {
        thumbnail.classList.remove('active');
      } 
    });
  }


  private getImageSrc(thumbnailSrc: string) : string{
    const index = thumbnailSrc.indexOf('-thumbnail.jpg');
    const imageSrc = thumbnailSrc.slice(0, index);
    return imageSrc + '.jpg';
  }


  static getInstance() : Carousel{
    return Carousel.instance ? Carousel.instance : (Carousel.instance = new Carousel());  
  }  
}


export default Carousel.getInstance();