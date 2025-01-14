import { useFormik } from "formik"

const Register=()=>{
    const {values,errors,handleChange,handleSubmit}=useFormik({
        initialValues:{
            username:'',
            photo:'',
            email:'',
            password:'',
        },
        onSubmit:(values)=>{
            console.log(values)
        }
    })
   
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={values.username} onChange={handleChange} />
                <input type="text" name="photo" value={values.photo} onChange={handleChange} />
                <input type="email" name="email" value={values.email} onChange={handleChange} />
                <input type="password" name="password" value={values.password} onChange={handleChange} />
            </form>
        </div>
    )
}
export default Register