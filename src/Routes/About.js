import styles from './About.module.css';


function About() {
    return (
        <>
            <div className={styles.title_box}>
                <h1>BRANDS</h1>
                <p>브랜드 소개</p>
            </div>
            <div className={styles.product_bg}>
                <img src={process.env.PUBLIC_URL + `/img/brand/brand1.jpg`} alt={`brand`} />
            </div>
            <div className={styles.content_box}>
                <h1>The Modern ✌︎</h1>
                <p>더 모던이 즐거움으로 스킨케어와 메이크업을 완벽히 연결합니다. 
                <br/>
                개성 넘치는 제품 라인으로 아름다움과 자신감을 더합니다.<br/>
                <br/>
                함께하는 순간이 더 즐거워지도록, 더 모던한 여정을 제안합니다.</p>
            </div>
        </>
    )
}

export default About