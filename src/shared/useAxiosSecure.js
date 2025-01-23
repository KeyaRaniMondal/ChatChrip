import axios from 'axios'
export const axiosSecure = axios.create({
    baseURL: 'https://y-gamma-rouge.vercel.app/',
});

const useAxiosSecure=()=>{
return axiosSecure
}
export default useAxiosSecure