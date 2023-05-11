import { headers } from 'next/headers';

// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import MyPic from '@/components/mypic';
// import bg1 from '@/../public/background1.jpg';
// import bg2 from '@/../public/background2.jpg';
// import bg3 from '@/../public/background3.jpg';

import Styles from './page.module.css';
import './globals.css';

import store from '@/redux/store';
import { setStatistics } from '@/redux/store/actions';

import QuoteBox from '@/components/quotebox';
import SubscribeForm from '@/components/subsribeform/inbox';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LikeButton from '@/components/likeButton';
import VisitCounter from '@/components/visitCounter';
import { IPageStats } from '@/redux/store/reducer';
import { GetHostURL } from '@/sharedCode/common'

// const inter = Inter({ subsets: ['latin'] })

const Home = async () => {
  const headersList = headers();
  
  // headersList.forEach((value, key) => {
  //   console.log(`${key} ==> ${value}`);
  // });

  let isMobileView = headersList!.get('user-agent')!.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );

  console.log('isMobileView: ', isMobileView);

  let pageStats: IPageStats[] = store.getState().pageStats;
  let newVisit = 0;
  const hostURL = GetHostURL();
  const page = 'home';

  let found = pageStats.findIndex((ps: IPageStats) => {
    return ps.pageName == page;
  });

  if(found == -1) newVisit = 1;


  const req = await fetch(`${hostURL}/api/statistics/visits?pageName=${page}&newVisit=${newVisit}`,
  {
    method: 'get',
    cache: 'no-store' 
  });

  const data = await req.json();

  let visits = 0;
  let likes = 0;

  if(newVisit == 1 && data.error == null) {
    store.dispatch(setStatistics({visits: data.data[0].visits, likes: data.data[0].likes, pageName: page}));
    pageStats = store.getState().pageStats;

    found = pageStats.findIndex((ps: IPageStats) => {
      return ps.pageName == page;
    });
  }
  
  visits = newVisit == -1 && data.data.length != 0 
    ? data.data[0].visits 
    : pageStats.length != 0 ? pageStats[found].visits : 0;
  likes = newVisit == -1 && data.data.length != 0 
    ? data.data[0].likes 
    : pageStats.length != 0 ? pageStats[found].likes : 0;
  
  return (
    <>
      <div className='flexGridResponsive'>
        <MyPic />      
        <div className='helloNqouteResponsive'>
          <div className='myPicContainerResponsive'>
          {/* "Orbitron, sans-serif" */}
            <h1>Hello World! 😁</h1>
          </div>
          <div>
            <QuoteBox quote="An expert is a man who knows just that much more about his subject than his associates. Most of us are nearer the top than we think. We fail to realize how easy it is, how necessary it is to learn that fraction more." 
              by="William N. Hutchins" />
          </div>
        </div>
      </div>

      <div className={Styles.fixedBanner}>

      </div>

      {/* <div className={Styles.window}>
        
      </div> */}
      <div className={Styles.textSection}>
        <p>
          Hi! My name is Badih Barakat and I'm a Full Stack Developer based in Sydney, Australia. I have around 20 years of software development
          in multiple programming languages and on multiple platforms, starting with Microsoft Visual Basic and going through PHP and C#.NET, and 
          mastered experience in JavaScript, TypeScript and React.js. Through-out the years, I've developed and maintained various 
          applications in these languages for multiple companies.
        </p>
        <p>
          I'm in contious process of aquiring knowledge and skill required and recommended in my domain, and always eager for keeping myself
          up-todate with the latest trends and to improve my performance.
        </p>
      </div>
      <SubscribeForm />
      
      <div className={Styles.reactions}>
        <VisitCounter visits={visits} />
        <LikeButton likes={likes} pageName={page} />
      </div>
    </>
  )
}

export default Home;