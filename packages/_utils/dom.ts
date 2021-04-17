export class JQuery {
  elem:Element| Element[]|null = null;

  constructor(selector:string|Element|Element[]){
    if(typeof selector === 'string'){
      // @ts-ignore
      this.elem = [...document.querySelectorAll(selector)]
    }else {
      this.elem = selector
    }
  }
  each(callback:(item:Element,index:number)=>void){
    if(!this.elem) return
    if(Array.isArray( this.elem)){
      this.elem.forEach(callback)
    }else {
      callback(this.elem,0)
    }
  }
  eq(index:number){
    if(Array.isArray(this.elem)){
      return $(this.elem[index])
    }
    return this
  }
  find(selector:string):any{
    if(!this.elem) {
      return null
    }
    if(Array.isArray(this.elem)){
      return null;
    }else {
      // @ts-ignore
      return $([...this.elem.querySelectorAll(selector)])

    }
  }
  addClass(className:string):JQuery{
    this.each((item,index)=>{
      item.classList.add(className)
    })
    return this;
  }
  removeClass(className:string){
    this.each((item,index)=>{
      item.classList.remove(className)
    })
    return this;
  }
  hasClass(className:string){
    if(!this.elem) return false;
    if(Array.isArray(this.elem)){
      return false;
    }else {
      return this.elem.classList.contains(className)
    }
  }
  setAttr(key:string,value:string){
    this.each((item,index)=>{
      item.setAttribute(key,value)
    })
    return this;
  }
  focus(){
    if(!this.elem) return this;
    if(!Array.isArray(this.elem)){
      // @ts-ignore
      this.elem.focus()
    }
    return this
  }
  getAttr(key:string):string{
    if(!this.elem) return "";
    if(Array.isArray(this.elem)){
      return "";
    }else {
      // @ts-ignore
      return this.elem.getAttribute(key);
    }
  }
  removeAttr(key:string){
    return this;
  }
  width(){
    if(!this.elem) return 0;
    if(Array.isArray(this.elem)){
      return 0;
    }else {
      // @ts-ignore
      return this.elem.offsetWidth
    }
  }
  height(){
    if(!this.elem) return 0;
    if(Array.isArray(this.elem)){
      return 0;
    }else {
      // @ts-ignore
      return this.elem.offsetHeight
    }
  }
  top(){
    // Relative distance to window
    if(!this.elem) return 0;
    if(Array.isArray(this.elem)){
      return 0;
    }else {
      // @ts-ignore
      return this.elem.getBoundingClientRect().top
    }
  }
  left(){
    // Relative distance to window
    if(!this.elem) return 0;
    if(Array.isArray(this.elem)){
      return 0;
    }else {
      // @ts-ignore
      return this.elem.getBoundingClientRect().left
    }

  }
  scrollTop(){
    if(!this.elem) return 0;
    if(Array.isArray(this.elem)){
      return 0;
    }else {
      // @ts-ignore
      return this.elem.scrollTop
    }
  }
  scrollHeight(){
    if(!this.elem) return 0;
    if(Array.isArray(this.elem)){
      return 0;
    }else {
      // @ts-ignore
      return this.elem.scrollHeight
    }
  }
  on(event:string,callback:(e:any)=>void){

    if(this.elem){
      if(this.elem === document.documentElement){
        document.addEventListener(event, callback)
      }else {
        this.each((item,index)=>{
          item.addEventListener(event ,callback)
        })
      }
    }
    return this;
  }
  html(innerHTML:string){
    if(!this.elem) return "";
    if(Array.isArray(this.elem)){
      return "";
    }else {
      if(innerHTML!==undefined){
        this.elem.innerHTML = innerHTML;
        return this
      }
      // @ts-ignore
      return this.elem.innerHTML
    }
  }
  parent(){
    if(!this.elem) return "";
    if(Array.isArray(this.elem)){
      return "";
    }else {
      // @ts-ignore
      return $(this.elem.parentNode)
    }
  }
  getElem(){
    return this.elem
  }

  remove(){
    this.each((item)=>{
      item.remove()
    })
  }
  setCss(obj:Object){
    for(const [key,value] of Object.entries(obj)){
      this.each((item)=>{
        // @ts-ignore
        item.style[key] = value
      })
    }
    return this;
  }
  getCSS(key:string){
    if(!this.elem) return "";
    if(Array.isArray(this.elem)){
      return "";
    }else {
      // @ts-ignore
      return this.elem.style[key]
    }
  }

}

const $ = (selector:string|Element|null|Element[])=>{
  if(selector === null) return null
  if(typeof selector === 'string' && !document.querySelector(selector) ){
    return null
  }
  return  new JQuery(selector)
}

export default $
