import axios from "axios";
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { baseUrl } from "../../components/util/url";
import { UserContext } from "../../useContext";


const Signin = () => {

    let setIsAuth = useContext(UserContext);

    const [inputs, setInputs] = useState({email: "", password: ""});
    let history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = inputs;
        const payload = {"email": email, "password": password};
        
        axios.post(`${baseUrl}/admin/signin`, payload)
        .then((res)=>{
            if(res.data === 'password incorrect' || res.data === 'email incorrect') {
                alert('invalid credentials')
            }else{
                let token = res.data.auth_token
                localStorage.setItem("auth_token", token);
                setIsAuth(true);
                history.push("/admin")
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value})
    }
    
    return(
        <>
            <div className="header_div">
                <h2>WELCOME BACK!!</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email:
                        <input
                        type="email"
                        name="email"
                        value={inputs.email || ""}                    
                        onChange={handleChange}
                        />
                    </label><br></br><br></br>
                    <label>Password:
                        <input
                        type="password" 
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        />
                    </label><br></br><br></br>
                    
                    <input type="submit" value="Submit"/>
                </form>
                
                <p><Link to=""> Forgot Password? </Link></p>
                <p>not registered ?<Link to="signup"> Signup </Link></p> 

            </div>
        </>
        
    )
};
export default Signin