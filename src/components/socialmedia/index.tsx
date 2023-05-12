import Styles from './socialmedia.module.css';
// import "bootstrap-icons/font/bootstrap-icons.css";



const SocialMediaButtons = () => (
    <div>
        <section>
            <ul className={Styles.services}>
                {/* <li>
        <div className={Styles.facebook}>
            <a href="https://facebook.com/colorlib/">
            <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
        </div> */}
                {/* <span>Facebook</span> */}
                {/* </li>
        <li>
        <div className={Styles.youtube}>
            <a href="https://www.youtube.com/c/Colorlib">
            <i className="fa fa-youtube" aria-hidden="true"></i>
            </a>
        </div> */}
                {/* <span>YouTube</span> */}
                {/* </li> */}

                <li>
                    <div className={Styles.linkedin}>
                        <a href="https://www.linkedin.com/in/badihbarakat/" target='_blank'>
                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                    </div>
                    {/* <span>LinkedIn</span> */}
                </li>

                <li>
                    <div className={Styles.github}>
                        <a href="https://github.com/badih76/" target='_blank'>
                            <i className="fa fa-github" aria-hidden="true"></i>
                        </a>
                    </div>
                    {/* <span>Github</span> */}
                </li>

                <li>
                    <div className={Styles.twitter}>
                        <a href="https://twitter.com/badih76/" target='_blank'>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                    </div>
                    {/* <span>Twitter</span> */}
                </li>

                <li>
                    <div className={Styles.instagram}>
                        <a href="https://www.instagram.com/bbistamps/" target='_blank'>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                    </div>
                    {/* <span>Instagram</span> */}
                </li>

                <li>
                    <div className={Styles.github}>
                        <a href="https://medium.com/@badih76" target='_blank'>
                            <i className="bi bi-medium"></i>
                        </a>
                    </div>
                    {/* <span>medium.com</span> */}
                </li>

            </ul>
        </section>
    </div>
)

export default SocialMediaButtons;