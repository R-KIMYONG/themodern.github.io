import styles from './Contentbox.module.css'
import { useNavigate } from 'react-router-dom'

function Contentbox() {

    const imageNames1 = ['model1.jpg', 'model2.jpg','model3.jpg', 'model4.jpg'];
    const imageNames2 = ['model5.jpg', 'themodernway.png', 'model6.jpg'];
    const imageNames3 = ['model7.jpg', 'model8.jpg', 'model9.jpg'];
    let navigate = useNavigate();
    function gotoevent(index){
        if(index==1){
            navigate('/Event')
        }
    }
    return (
        <>
            <div className={styles.container_title}>
                <h1>REDEFINE STYLE, THE MODERN WAY ✠</h1>
            </div>
            <div className={styles.container_box}>
                <div className={styles.container_box1}>
                    {imageNames1.map((imageName, index) => (
                        <div key={index} className={styles.group1}>
                            <img src={process.env.PUBLIC_URL + `/modelimg/${imageName}`} alt={`모델${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className={styles.container_box2}>
                {imageNames2.map((imageName, index) => (
                        <div key={index} className={styles.group2}>
                            <img src={process.env.PUBLIC_URL + `/modelimg/${imageName}`} alt={`모델${index + 1}`} onClick={()=>{gotoevent(index)}}/>
                        </div>
                    ))}
                </div>
                <div className={styles.container_box3}>
                {imageNames3.map((imageName, index) => (
                        <div key={index} className={styles.group3}>
                            <img src={process.env.PUBLIC_URL + `/modelimg/${imageName}`} alt={`모델${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Contentbox