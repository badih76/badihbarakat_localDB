'use client'

import { useState, useRef } from "react";
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
    const toastId: any|null = useRef(null);


    return (
      <div className={Styles.likeDiv}>
        <div 
          onClick={
            async () => {
              let apiRes: IAPIResponse;


              toastId.current = toast('🚀 Processing your like'
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

                apiRes = await apiReq.json();
                console.log('apiRes: ', apiRes);

                if(apiRes.error) {
                  // results = [];     
                  toast.dismiss(toastId.current);

                  toast.warn('😳 Like action failed! '+apiRes.error + ' ' + hostURL
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
                  toast.dismiss(toastId.current);

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
                toast.dismiss(toastId.current);

                toast.warn('Like action failed! Error: ' + err + ' ' + hostURL
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