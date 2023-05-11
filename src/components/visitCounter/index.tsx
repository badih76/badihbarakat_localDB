import Styles from '../likeButton/likeButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
// import { } from '@fortawesome/free-regular-svg-icons';

interface IProps {
  visits: number
}

const VisitCounter = ({ visits }: IProps) => {
    // let visits = 100;    

    return (
      <div className={Styles.likeDiv}>
        <div>
          {/* <i className="bi bi-hand-thumbs-up" ></i> */}
          <FontAwesomeIcon icon={faEye} />
        </div>
        <div style={{fontSize: "0.75em"}}>
          {visits}
        </div>
      </div>
    )
}

export default VisitCounter;