import React, {useState , useReducer} from 'react';
import {useHistory} from 'react-router-dom';
import {reducer, initialState} from'../reducer/useReducer';

const Login = () => {

    const [state, dispatch] =  useReducer(reducer, initialState);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/Login', {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
        });

        const data = res.json();
        if(res.status === 400 || !data){
            window.alert("Invalid credentials");
        }
        else{
            dispatch({action:"USER", payload:true});
            history.push("/");
            window.alert("Login Successfull");
        }
    }
    return (
        <>
            <div className="bg-primary">
                <div className="W-100 dashboard">
                    <div className="row">
                    <div className="col-xl-4 col-lg-4 col-11 mt-5 text-center text-primary mx-auto">
                        <form method="POST" className="card">
                            <div className="form-group mt-5 col-11 mx-auto">
                                <label>Email address</label>
                                <input type="email" 
                                className="form-control" id="exampleInputEmail1"
                                value={ email }
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group mt-5 col-11 mx-auto">
                                <label>Password</label>
                                <input type="password" 
                                className="form-control" id="exampleInputPassword1" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" />
                            </div>
                            <button type="submit" onClick={loginUser} className="btn btn-primary mb-5 w-25 mx-auto">Submit</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;