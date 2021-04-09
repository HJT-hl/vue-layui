class JQuery {
  elem:Element|null = null;
  constructor(selector:string|Element){
    if(typeof selector === 'string'){
      this.elem = document.querySelector(selector)
    }else {
      this.elem = selector
    }
  }
  addClass(className:string){
    this.elem && this.elem.classList.add(className)
  }
  removeClass(className:string){
    this.elem && this.elem.classList.remove(className)
  }
  setAttr(key:string,value:string){
    this.elem && this.elem.setAttribute(key,value)
  }
  removeAttr(key:string){
    this.elem && this.elem.removeAttribute(key)
  }
  width(){
    if(this.elem){
      // @ts-ignore
      return this.elem.offsetWidth
    }
    return 0;
  }
  height(){
    if(this.elem){
      // @ts-ignore
      return this.elem.offsetHeight
    }
    return 0;
  }
  top(){
    // Relative distance to window
    if(this.elem){
      return this.elem.getBoundingClientRect().top
    }
    return 0;
  }
  left(){
    // Relative distance to window
    if(this.elem){
      return this.elem.getBoundingClientRect().left
    }
    return 0;
  }
  scrollTop(){
    if(this.elem){
      return this.elem.scrollTop
    }
    return 0
  }
  on(event:string,callback:(e:Event)=>void){
    if(this.elem){
      if(this.elem === document.documentElement){
        document.addEventListener(event, callback)
      }else {
        this.elem.addEventListener(event ,callback)

      }
    }
  }
  scrollHeight(){
    if(this.elem){
      return this.elem.scrollHeight
    }
    return 0;
  }

}

const $ = (selector:string|Element)=>{
  if(typeof selector === 'string' && !document.querySelector(selector) ){
    return null
  }
  return new JQuery(selector)
}

export default $
