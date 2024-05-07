import { useState, useEffect } from "react";
import { useSpring, animated } from 'react-spring';

const imageContext = require.context('../public/img', false, /\.(jpg)$/);
const images = imageContext.keys().map(imageContext);
let maintitle = [
    <>
        <h3>NEW & LIMITED EDITION</h3>
        <strong>HEATED<br />ENCOUNTER</strong>
        <p>NEW 썸머 언레이티드 컬렉션<br />관능적인 쉐이드와 감각적인 텍스처로<br />매력적인 썸머룩을 경험해보세요.</p>
    </>,
    <>
        <h3 style={{color:'gray'}}>NEW & CARE ITEM</h3>
        <strong style={{color:'gray'}}>REAL<br />NATURE</strong>
        <p style={{color:'gray'}}>건조한 피부에 강력한 보습 효과를<br />선사해 피부 유연성을 높이고 촉촉한 보습 막을<br />만들어주는 고보습 세럼</p>
    </>,
    <>
        <h3 style={{color:'gray'}}>erste Liebe</h3>
        <strong style={{color:'gray'}}>AM 09:17<br />산들바람이 꽃밭을 지나는 시간</strong>
        <p style={{color:'gray'}}>싱그럽고 사랑스러운 느낌의 시트러스<br />프루티 로즈 타입으로 화려한 봄날의 정월을 거닐 듯<br />로맨틱하고 활홀한 기분을 느끼게 해줍니다.</p>
    </>,
    <>
        <h3>SUMMER SKIN BOOSTING</h3>
        <strong>UP TO 41%<br />OFF+GIFT</strong>
        <p>한 여름 마스크 속 뜨거운 열기에도 지치지않는<br />허스텔러와 함께 피부 체력을<br />길러주는 스킨케어 제품을 만나보자.</p>
    </>,
    <>
        <h3>Dewy Biome Serum</h3>
        <strong>유익한<br />원료 조합</strong>
        <p>바이오 밸런스 시스템을 통해 찾은<br />최적의 원료 조합으로 피부의 균형을 맞추어<br />빠른 보습 효과를 확인하세요.</p>
    </>
]

function Slide() {
    let [moveslide, setMoveslide] = useState(0)
    let [slideeffect, setSlideeffect] = useState('left 1s ease-in-out');
    let [additionalImage, setAdditionalImage] = useState(null);
    let [ulwidth, setUlwidth] = useState(`${images.length}00%`)
    let slidestyle = {
        width: ulwidth,
        height: '100%',
        position: 'absolute',
        left: `-${moveslide * 100}%`,
        top: '0px', display: 'flex',
        transition: slideeffect
    }
    //이미지 슬라이드가 마지막 슬라이드까지 가면 첫번째 슬라이드가 추가된다
    //추가된 마지막 슬라이드가 오른쪽에서 왼쪽으로 슬라이드되는 동시에 transition이 삭제
    //동시에 left : '0%'  로 이동하고 이어서 슬라이드 진행한다.
    useEffect(() => {
        const interval = setInterval(() => {
            // 이미지 배열의 길이로 나누어서 다음 이미지의 인덱스 계산
            setMoveslide((moveslide) => (moveslide + 1));
        }, 2500); // 2초 간격으로 슬라이드 변경


        // 컴포넌트가 언마운트될 때 interval 정리
        return () => {
            clearInterval(interval);
        }
    }, [setMoveslide]);

    useEffect(() => {
        // 이미지가 마지막 슬라이드까지 갔을 때 추가 이미지 설정
        if (moveslide >= images.length) {
            setUlwidth('600%')
            setAdditionalImage(<animated.li key={images.length + 1} style={{ backgroundImage: `url(${images[0]})` }}></animated.li>);

            // setSlideeffect('none')
            // setMoveslide(0);
        } else if (moveslide == 0) {
            setUlwidth(`${images.length}00%`)
            setAdditionalImage(null);
            setSlideeffect('none')
        }
        if (moveslide === images.length + 1) {
            setMoveslide(0);
        }
        return () => { setSlideeffect('left 1s ease-in-out') }
    }, [moveslide]);
    return (
        <>
            <animated.ul className="slide-list" style={slidestyle}>
                {
                    images.map((a, i) => (
                        <animated.li key={i} style={{ backgroundImage: `url(${a})` }}></animated.li>
                    ))
                }
                {additionalImage}
            </animated.ul>
            <Maintext textindex={moveslide}></Maintext>
        </>
    )

}

function Maintext(props) {
    let [addfadein,setAddfadein]=useState('')

    useEffect(()=>{
        if(props.textindex<5 || addfadein == ''){
            setTimeout(() => { setAddfadein('titleNamefadin') }, 1000);
        }
        if(addfadein == ''){
            setTimeout(() => { setAddfadein('titleNamefadin') }, 10);
        }
        return()=>{
            setAddfadein('');
        }
    },[props.textindex])
    return (
        <div className={`titleName titleNamefadout ${addfadein}`}>
            {addfadein != ''? maintitle[props.textindex] : null}
        </div>
    )
}

export default Slide


