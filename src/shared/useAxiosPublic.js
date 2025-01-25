import axios from "axios"

const axiosPublic=axios.create({
    baseURL:'https://y-gamma-rouge.vercel.app/',
})

const useAxiosPublic=()=>{
    return axiosPublic
}
export default useAxiosPublic