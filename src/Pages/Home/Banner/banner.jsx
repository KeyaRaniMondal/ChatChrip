import banner1 from '../../../assets/banner.jpg'

const Banner=()=>{
    return(
<div 
     style={{ 
         backgroundImage:`url(${banner1})`,
         width: '100vw', // Or width: '100%' 
        height:'28vw'
     }}>

             <section className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered mt-14 bg-[#302d2d] w-24 md:w-1/2 flex justify-center mx-auto rounded-full "
          />
        </section>
        </div>
    )
}
export default Banner