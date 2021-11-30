
class Carousel{
  
 
  private thumbnails: NodeListOf<HTMLElement>;      
  private nextBtn: HTMLElement;
  private previousBtn: HTMLElement;


  constructor(){
    const root = document.querySelector('.pictures-ctn') as HTMLElement;
    const clone = root.cloneNode(true) as HTMLElement;
    clone.classList.add('clone');
 
    this.thumbnails = root.querySelectorAll('.thumbnail-ctn') as NodeListOf<HTMLElement>;
    this.thumbnails.forEach(thumbnail => {     
      const image = thumbnail.querySelector('img') as HTMLImageElement;     
      thumbnail.addEventListener('click', () => this.setActive(root, image.src));
    });


    this.previousBtn = root.querySelector('.previous-btn') as HTMLElement;    
    this.previousBtn.addEventListener('click', () =>{
      this.setActiveOnArrowClick(root, number => ((number + 3) % 4));
    });

    this.nextBtn = root.querySelector('.next-btn') as HTMLElement;    
    this.nextBtn.addEventListener('click', () =>{
      this.setActiveOnArrowClick(root, number => ((number + 1) % 4));
    });
  }


  private setActiveOnArrowClick(root: HTMLElement, fn: (x: number) => number){
    const currentImage = root.querySelector('.picture') as HTMLElement;
    let current: number = Number(currentImage.dataset.current);
    current = fn(current);
    currentImage.dataset.current = String(current);
    const image = this.thumbnails[current].querySelector('img') as HTMLImageElement;
    this.setActive(root, image.src);
  }

  
  private setActive(root: HTMLElement, src : string){  
    this.thumbnails.forEach((thumbnail) => {
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