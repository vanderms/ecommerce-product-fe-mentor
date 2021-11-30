
class Carousel{
  
  private scrollY: number = 0;
 
  constructor(){
    const root = document.querySelector('.section-product') as HTMLElement;
    const clone = this.createClone(root);
   
 
    this.setThumbnails(root);
    this.setArrows(root);


    this.setThumbnails(clone);
    this.setArrows(clone);

    const image = root.querySelector('.picture') as HTMLElement;
    image.addEventListener('click', () => this.openClone(clone, root));
    
    const closeModal = clone.querySelector('.close-modal') as HTMLElement;
    closeModal.addEventListener('click', ()=>{
      this.closeClone(clone, root);
    })

    const backdrop = clone.querySelector('.backdrop') as HTMLElement;
    
    backdrop.addEventListener('click', ()=>{
      this.closeClone(clone, root);
    })

  }


  private openClone(clone : HTMLElement, root: HTMLElement){   
    
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
    const thumbnails = root.querySelectorAll('.thumbnail-ctn') as NodeListOf<HTMLElement>;
    thumbnails.forEach(thumbnail => {     
      const image = thumbnail.querySelector('img') as HTMLImageElement;     
      thumbnail.addEventListener('click', () => this.setActive(root, image.src));
    });
  }


  private setArrows(root: HTMLElement){
    const previousBtn = root.querySelector('.previous-btn') as HTMLElement;    
    previousBtn.addEventListener('click', () =>{
      this.setActiveOnArrowClick(root, number => ((number + 3) % 4));
    });

    const nextBtn = root.querySelector('.next-btn') as HTMLElement;    
    nextBtn.addEventListener('click', () =>{
      this.setActiveOnArrowClick(root, number => ((number + 1) % 4));
    });
  }

  private createClone(root: HTMLElement) : HTMLElement{
    const clone = root.cloneNode(true) as HTMLElement;
    clone.querySelector('.content-ctn')!.remove();
    clone.className = 'section-product-clone';
    return clone;
  }


  private setActiveOnArrowClick(root: HTMLElement, fn: (x: number) => number){
    const currentImage = root.querySelector('.picture') as HTMLElement;
    let current: number = Number(currentImage.dataset.current);
    current = fn(current);
    currentImage.dataset.current = String(current);
    const thumbnails = root.querySelectorAll('.thumbnail-ctn') as NodeListOf<HTMLElement>;
    const image = thumbnails[current].querySelector('img') as HTMLImageElement;
    this.setActive(root, image.src);
  }

  
  private setActive(root: HTMLElement, src : string){ 
    const thumbnails = root.querySelectorAll('.thumbnail-ctn') as NodeListOf<HTMLElement>; 
    thumbnails.forEach((thumbnail) => {
      const image = thumbnail.querySelector('img') as HTMLImageElement;
      if(image.src === src){
        thumbnail.classList.add('active');
        const currentImage = root.querySelector('.picture') as HTMLImageElement;
        currentImage.src = this.getImageSrc(src);
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

}


export default new Carousel();