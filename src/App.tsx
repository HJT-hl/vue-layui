import { defineComponent, h, ref, watchEffect } from 'vue'
import Carousel from '../packages/carousel'
import CarouselItem from '../packages/carousel-item'
export default defineComponent({
  setup () {
    const children = ['skyblue' ,'#009688','green','#5FB878','pink'];

    return () => <div style='width:800px;margin: 100px auto;'>
     <Carousel
       width={800}
       height={400}
       autoplay={false}
       index={3}
       ref={(dom)=>{
         setTimeout(() =>{
           dom.goto(0)

         },3000)
       }}
     >
       {
         children.map((child,i)=><CarouselItem style={`width:100%;height:100%;backgroundColor:${child};`}>
           条目{i}
         </CarouselItem>)
       }
     </Carousel>
    </div>
  }
})
