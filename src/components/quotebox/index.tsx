import Styles from "./quotebox.module.css";

interface IProps {
    quote: string,
    width?: string,
    height?: string,
    by: string
}

const QuoteBox = ({ quote, width= "100%", height= "auto", by }: IProps) => {
    return (
        <div className={Styles.quoteContainer}> 
            <div style={{padding: "2rem", color: "black"}}>
                <div className={Styles.openingQuote}>
                    <span style={{fontSize: "7rem", lineHeight: "5rem"}}>❝</span>
                </div>
                <span 
                    className={Styles.quoteText}>
                    {quote}❞
                </span>
                <div className={Styles.quoteBy}>
                    {by}
                </div>
                
            </div>
        </div>
    )
}


export default QuoteBox;