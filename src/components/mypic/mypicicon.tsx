import Image from 'next/image';
import mypic from '../../../public/MyPic.jpg';

const MyPicIcon = () => {
    return (
        <div style={{width: "25px", 
                    height: "25px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    padding: "0"}}>
            <Image src={mypic} 
                width={"30"}
                alt={"My Picture Icon"} />
        </div>
    )
}

export default MyPicIcon;