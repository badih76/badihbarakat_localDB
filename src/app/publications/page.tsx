import { IPageStats } from "@/redux/store/reducer";
import LikeButton from '@/components/likeButton';
import VisitCounter from '@/components/visitCounter';

import store from '@/redux/store';
import { setStatistics } from '@/redux/store/actions';
import { GetHostURL } from '@/sharedCode/common'

import Styles from './publications.module.css';
import Styles2 from '../page.module.css';

import publications from './publications.json';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPublication {
    "pubSite": string,
    "pubURL": string,
    "pubTitle": string
}

const Publications = async () => {
    let pageStats: IPageStats[] = store.getState().pageStats;
    let newVisit = 0;
    const hostURL = GetHostURL();
    const page = 'home';

  let found = pageStats.findIndex((ps: IPageStats) => {
    return ps.pageName == 'publications';
  });

  if(found == -1) newVisit = 1;

  const req = await fetch(`${hostURL}/api/statistics/visits?pageName=${page}&newVisit=${newVisit}`,
  {
    method: 'get',
    cache: 'no-store' 
  });

  const data = await req.json();

  console.log('Data: ', data);

  let visits = 0;
  let likes = 0;

  if(newVisit == 1 && data.error == null) {
    store.dispatch(setStatistics({visits: data.data[0].visits, likes: data.data[0].likes, pageName: page}));
    pageStats = store.getState().pageStats;

    found = pageStats.findIndex((ps: IPageStats) => {
      return ps.pageName == page;
    });
  }
//   console.log('pageStats: ', pageStats);

    visits = newVisit == -1 && data.data.length != 0 
        ? data.data[0].visits 
        : pageStats.length != 0 ? pageStats[found].visits : 0;
    likes = newVisit == -1 && data.data.length != 0 
        ? data.data[0].likes 
        : pageStats.length != 0 ? pageStats[found].likes : 0;

    return (
        <>
            <h1>
                My Publications
            </h1>

            <div className={Styles.textSection}>
                <p>

                </p>
                <p>

                </p>
                <p>

                </p>
            </div>

            <h1>
                medium.com 
                <a href="https://badih76.medium.com" style={{marginLeft: "1em"}} target="_blank">
                    <button className="btn btn-light" 
                        // style={{backgroundColor: "rgb(0, 226, 0)", borderRadius: "10px"}}
                        >
                        <i className="bi bi-medium" style={{ fontSize: "1.5em" }}></i> 
                        <span style={{ marginLeft: "0.5em", fontSize: "1.5em" }}>Follow badih76 on medium.com</span>
                    </button>
                </a>
            </h1>

            <div className={Styles2.textSection}>
            {
                publications.map((p: IPublication , i: number) => {
                    return (
                        i % 2 == 0 ?
                        <div className={Styles.skillRowEven}
                        key={i}>
                            <Link href={p.pubURL} 
                                style={{color: "inherit", textDecoration: "none"}}
                                target='_blank'>
                                {p.pubTitle}
                            </Link>                                                        
                        </div>
                        : <div className={Styles.skillRowOdd}
                        key={i}>
                            <Link href={p.pubURL} 
                                style={{color: "inherit", textDecoration: "none"}}
                                target='_blank'>
                                {p.pubTitle}
                            </Link>     
                        </div>
                    )
                })
            }
            </div>
            
            <p></p>

            <div className={Styles2.reactions}>
                <VisitCounter visits={visits} />
                <LikeButton likes={likes} pageName={page} />
            </div>
        </>
    )
}

export default Publications;