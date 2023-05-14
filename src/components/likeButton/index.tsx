'use client'

import { useState } from "react";
import { GetHostURL } from '@/sharedCode/common';

import Styles from './likeButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsClapping } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { IAPIResponse } from "@/interfaces/api.types";

interface IProps {
  likes: number,
  pageName: string
}




const LikeButton = ({ likes, pageName }: IProps) => {
    const [ moreLikes, setMoreLikes ] = useState(likes);

    const hostURL = GetHostURL();

    return (
      <div className={Styles.likeDiv}>
        <div 
          onClick={
            async () => {
              let apiRes: IAPIResponse;

              console.log(`${hostURL}/api/statistics/likes`);
              const apiURL = `${hostURL}/api/statistics/likes`;

              try{
                const apiReq = await fetch(apiURL,
                {
                  'method': 'post',
                  'cache': 'no-store',
                  // 'mode': 'no-cors',
                  // 'headers': {
                  //   'Access-Control-Allow-Origin': hostURL!,
                  //   'Access-Control-Allow-Credentials': 'true'
                  // },
                  'body': JSON.stringify({ pageName })
                });

                console.log('apiReq: ', apiReq);
                apiRes = await apiReq.json();
              
                if(apiRes.error) {
                  // results = [];     
                  
                  toast.warn('😳 Like action failed! '+apiRes.error
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
                  console.log('Successful Like');

                  toast('👍 Liked Successfully.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });

                    setMoreLikes(moreLikes + 1);
                }
              } catch(err) {
                toast.warn('⚠ Like action failed! ' + err
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
              }
            }
          }
          style={{cursor: "pointer"}}>
          {/* <i className="bi bi-hand-thumbs-up" ></i> */}
          <FontAwesomeIcon icon={faHandsClapping} />
        </div>
        <div style={{fontSize: "0.75em"}}>
          {moreLikes}
        </div>
      </div>
    )
}

export default LikeButton;