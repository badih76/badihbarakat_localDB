'use client'

import { IAPIResponse } from '@/interfaces/api.types';
import { useState, useEffect } from 'react';
import { GetHostURL } from '@/sharedCode/common'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './subscribeform.module.css';


const SubscribeForm = () => {
    const [email, setEmail] = useState('');
    const [subscribers, setSubscribers] = useState(0);
    const [ myErr, setMyErr ] = useState('');

    const hostURL = GetHostURL();

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        // console.log(e.currentTarget.value);
        setEmail(e.currentTarget.value);
    }

    const handleSubmit = async () => {
        let apiRes: IAPIResponse;
        let results: [];

        try {
            const apiReq = await fetch(`${hostURL}/api/subscribe`, 
                { 
                    method: 'post', 
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ payload: { email }})
                });

            apiRes = await apiReq.json();

            // console.log(apiRes);

            if(apiRes.error) {
                results = [];     
                setMyErr(apiRes.error!);
                
                toast.warn('🚀 Subscription Failed. '+apiRes.error
                , {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });        
                    
            } else {
                // let apiResults = await apiReq.json();            
                results = apiRes.data;     

                setMyErr(apiRes.error!);
                setSubscribers(subscribers + 1);

                toast('🚀 Subscribed Successfully.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });  
            }
        } catch(err: any) {
            setMyErr(err);
        }
    }

    useEffect(() => {
        // let apiRes: IAPIResponse;
        // let results: [];

        fetch(`${hostURL}/api/subscribe`, 
            { 
                method: 'get', 
                cache: 'no-store'                
            })
            .then((apiReq: any) => {
                return apiReq.json();
            })
            .then(({data}: any) => {
                console.log(data[0]);
                setSubscribers(data[0].SubscriptionsCount ? data[0].SubscriptionsCount : 0)
            })
            .catch((err: Error) => {
                console.log('Error:',err);
                setMyErr(err.message + ' subscriptions count');
            })
        
    }, []);

    return (
        <div>
            <div className="input-group mb-3">
                {/* <div className="input-group-prepend">
                    <span className="input-group-text" 
                        id="basic-addon1"
                        style={{fontSize: "2rem"}}>Subscribe</span>
                </div> */}
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter Your Email" 
                    aria-label="email" 
                    aria-describedby="basic-addon1"
                    style={{fontSize: "2rem"}} 
                    value={email} 
                    onChange={handleInput} />
                
                <div className="input-group-append">
                    <button 
                        className="btn btn-outline-info" 
                        type="button"
                        style={{fontSize: "2rem", 
                                color: "#fff",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0}}
                        onClick={handleSubmit}>
                        Subscribe
                    </button>
                </div>
            </div>
            <label>{subscribers} subscribers</label>

            {/* <div style={{color: "red"}}>
                {myErr}
            </div>
            <div style={{color: "red"}}>
                {hostURL}
            </div> */}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{fontSize: "0.75em"}}
            />

        </div>
    )
}

export default SubscribeForm;