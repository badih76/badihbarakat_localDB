import Image from 'next/image';
import LikeButton from '@/components/likeButton';
import VisitCounter from '@/components/visitCounter';

import mypic from '@/../public/BADIHBARAKAT.jpg';

import store from '@/redux/store';
import { setStatistics } from '@/redux/store/actions';

import Styles from './aboutme.module.css';
import Styles2 from '../page.module.css';

import "bootstrap-icons/font/bootstrap-icons.css";

import skills from './skills.json';
import { IPageStats } from '@/redux/store/reducer';
import { GetHostURL } from '@/sharedCode/common'

interface ISkill {
    skill: string,
    icon: string
}

const hobbies = [
    'stamps & banknotes collection',
    'reading',
    'playing music'
]

const languages = [
    'Arabic - Mother Tongue',
    'English - Fluent'
]

const AboutMe = async () => {
    let pageStats: IPageStats[] = store.getState().pageStats;
    let newVisit = 0;
    const page = 'aboutme';
    const hostURL = GetHostURL();
    

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
            <h1>
                About Me
            </h1>

            <div className={Styles2.textSection}>
                <p>
                    Let me tell you more about myself!
                </p>
                <p>
                    Software Engineer and Team Lead with almost 20 years of extensive experience in designing 
                    and developing of Web applications and desktop applications using various platforms, 
                    including, but not limited to, React.js, Node.js and TypeScript with strong RESTful API 
                    and UI/UX design experience. Adding to the above, I have basic knowledge of AWS and cloud 
                    computing. I keep myself up-to-date with the latest trends in the field and continuous 
                    upgrade of my acquired skills.
                </p>
                <p>
                    I'm a Full Stack Developer, and I've started my career in Software Development in the year 2000 
                    and been advancing and improving my skills since then to keep up with the rapidly changing world 
                    of software development and programming.  
                </p>
            </div>

            <h1>
                My Skills
            </h1>

            <div className={Styles2.textSection}>
            {
                skills.map((s: ISkill , i: number) => {
                    return (
                        i % 2 == 0 ?
                        <div className={Styles.skillRowEven}
                        key={i}>                            
                            <i className={s.icon}></i>
                            {s.skill}</div>
                        : <div className={Styles.skillRowOdd}
                        key={i}>
                             <i className={s.icon}></i>
                            {s.skill}</div>
                    )
                })
            }
            </div>

            <h1>
                My Hobbies
            </h1>

            <div className={Styles2.textSection}>
            {
                hobbies.map((s: string , i: number) => {
                    return (
                        i % 2 == 0 ?
                        <div className={Styles.skillRowEven}
                        key={i}>                            
                            {s}</div>
                        : <div className={Styles.skillRowOdd}
                        key={i}>
                            {s}</div>
                    )
                })
            }
            </div>

            <h1>
                Languages Spoken
            </h1>

            <div className={Styles2.textSection}>
            {
                languages.map((l: string , i: number) => {
                    return (
                        i % 2 == 0 ?
                        <div className={Styles.skillRowEven}
                        key={i}>                            
                            {l}</div>
                        : <div className={Styles.skillRowOdd}
                        key={i}>
                            {l}</div>
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

export default AboutMe;