import {useHistory} from 'react-router-dom';
import React, {useState , useReducer} from "react";
import frame from '../photo/frame.png';
import {reducer, initialState} from '../reducer/useReducer';

const Signin = () => {

    const history = useHistory();
    const [state, dispatch] =  useReducer(reducer,initialState);
    const [user,setUser] = useState({
        fullName :"", email :"", password :"", cpassword :"", phone :""   
    });

    let name, value;
    const userInputs = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value})
    }

    const postData = async (e) => {
        e.preventDefault();
        const { fullName , email , password , cpassword , phone } = user;
        
        if(password===cpassword){
            const res = await fetch("/Signin",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName , email , password , phone
                })
            });
    
            const data = await res.json();
    
            if(data.status === 422 || !data) {
                window.alert("Invalid Data");
            }
            else{
                dispatch({action:"USER", payload:true});
                history.push("/");
                window.alert("registration successfull");
            }
        }
        else{
            window.alert("Confirm password does not match");
        }
    }

    return (
        <>
            <div className="bg-primary">
                <div className="W-100 dashboard">
                    <div className="text-center">
                        <div className="card mt-5 d-in-flex row text-primary form position-absolute">
                            <form method="POST" className="d-block w-100 col-xl-8 col-lg-8 row">                    
                                <label className="font-weight-bold mx-auto mt-5 w-100 col-xl-2 col-lg-2 col-12">Your Name :
                                </label>
                                <input type="text" className="w-75 ml-4 col-xl-6 col-lg-6 col-12" name="fullName" autoComplete="off" value={user.fullName}
                                    onChange={userInputs} placeholder="Enter your Name"/>
                                <br/>

                                <label className="font-weight-bold mx-auto mt-5 w-100 col-xl-2 col-lg-2 col-12">Email ID :
                                </label>
                                <input type="email" className="w-75 ml-4 col-xl-6 col-lg-6 col-12" name="email" autoComplete="off" value={user.email}
                                    onChange={userInputs} placeholder="abc@xyz.com"/>
                                <br/>

                                <label className="font-weight-bold mx-auto mt-5 w-100 col-xl-2 col-lg-2 col-12">Password :
                                </label>
                                <input type="password" className="w-75 ml-4 col-xl-6 col-lg-6 col-12" name="password" autoComplete="off" value={user.password}
                                    onChange={userInputs} placeholder="Enter your password"/>
                                <br/>

                                <label className="font-weight-bold mx-auto mt-5 w-100 col-xl-2 col-lg-2 col-12">Confirm Password :
                                </label>
                                <input type="password" className="w-75 ml-4 col-xl-6 col-lg-6 col-12" name="cpassword" autoComplete="off" value={user.cpassword}
                                    onChange={userInputs} placeholder="Confirm your password"/>
                                <br/>

                                <label className="font-weight-bold mx-auto mt-5 w-100 col-xl-2 col-lg-2 col-12">Phone No. :
                                </label>
                                <input type="text" className="w-75 ml-4 col-xl-6 col-lg-6 col-12" name="phone" autoComplete="off" value={user.phone}
                                    onChange={userInputs} placeholder="970XXXXXXX"/>
                                <br/>

                                <button className="btn btn-primary mt-5" onClick={postData}>Register</button>
                            </form>
                            <div className="col-xl-4 col-lg-4 frame">
                                <img src={frame} className="w-100 h-75" alt="Sign-In" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;
