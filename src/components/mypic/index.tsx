import styles from './mypic.module.css';
import mypic from '../../../public/me2.jpg';

import Image from 'next/image';
import { url } from 'inspector';

const MyPic = () => {
    return (
        <div className={styles.mask}>
            {/* <div className={styles.fixedImage}> */}
                <Image src={mypic}
                    alt="My Picture" width="430" /> 
            {/* </div> */}
        </div>
    )
}

export default MyPic;