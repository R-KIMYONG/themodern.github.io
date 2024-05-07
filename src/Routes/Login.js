import styles from './Login.module.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useState, useEffect } from "react";


function Login() {
    const imgPaths = [
        'applogo6.png',
        'applogo5.png',
        'applogo4.png',
        'applogo3.png',
        'applogo2.png'
    ];
    const bannerimg = [
        'banner1.jpg',
        'banner2.jpg',
        'banner3.jpg',
        'banner4.jpg'
    ]
    let [banner, setBanner] = useState(0);
    let [bannerwidth, setBannerwidth] = useState(`${(bannerimg.length + 1)}00%`);
    let [addbanner, setAddbanner] = useState(<li>
        <a href="/">
            <img src={process.env.PUBLIC_URL + `/bannerimg/${bannerimg[0]}`} alt={`event`} />
        </a>
    </li>);
    let [moveaction, setMoveaction] = useState('all 1s')

    //여기는 아이디 입력란임
    const [userid, setUserid] = useState('');
    const handleInputChange = (event) => {
        setUserid(event.target.value);
    };
    const clearInput = () => {
        setUserid('');
    };
    //여기는 아이디 입력란임

    //여기는 비밀번호 입력란임
    const [userpw, setUserpw] = useState('');
    const [showAllPassword, setShowAllPassword] = useState(false);
    const handleInputpassword = (event) => {
        setUserpw(event.target.value)
    }
    //여기는 비밀번호 입력란임

    //유저 정보 입력여부
    let [alertVisible, setAlertVisible] = useState('')

    const handleLoginClick = () => {
        // hasId와 hasPw가 모두 true이면 alert_box를 나타나게 함
        if(userid.length>0 || userpw.length>0){
            if(userid.length>0){
                if(userpw.length>0){
                    setAlertVisible('')
                }else{
                    setAlertVisible(<p className={styles.novalue_alert}>비밀번호를 확인해주세요.</p> )
                }
            }else{
                setAlertVisible(<p className={styles.novalue_alert}>아이디를 확인해주세요.</p> )
            }
        }else{
            setAlertVisible(<p className={styles.novalue_alert}>아이디와 비밀번호를 확인해주세요.</p> )
        }
    };
    //유저 정보 입력여부
    // console.log(handleInputpassword)
    useEffect(() => {
        let slidebanner = setInterval(() => {
            setBanner((prevIndex) => (prevIndex + 1))
        }, 2500);
        if (banner === bannerimg.length + 1) {
            setBanner(0);
            setMoveaction('none');
            // 1초 후에 'all 1s'로 변경
            setTimeout(() => {
                setMoveaction('all 1s');
            }, 100);
        }
        return () => {
            clearInterval(slidebanner)
        }
    }, [banner, bannerimg.length])
    let slidestyle = {
        width: bannerwidth,
        height: '100%',
        position: 'absolute',
        left: `-${banner * 100}%`,
        top: '0px',
        display: 'flex',
    }
    let [savelogininfo,setsavelogininfo]=useState(false)
    const savelogin = ()=>{
        setsavelogininfo(!savelogininfo)
    }
    const getSpanStyles = () => {
        if (savelogininfo) {
          return {
            fontVariationSettings: "'FILL' 1,'wght' 100",
            color: 'red',
          };
        } else {
          return {
            fontVariationSettings: "'FILL' 0,'wght' 100",
            color: 'rgb(179, 179, 179)',
          };
        }
      };
    console.log(savelogininfo)
    return (
        <>
            <div className={styles.main}>
                <h1>
                    <a href="/">
                        <img src={process.env.PUBLIC_URL + '/img/logo_black.png'} alt="logo" />
                    </a>
                </h1>
                <div className={styles.login}>
                    <div className={styles.login_id}>
                        <input type="text" placeholder='아이디 입력' value={userid} onChange={handleInputChange} />
                        {userid && (
                            <span
                                className={`${'material-symbols-outlined'} ${styles.cancel_id}`}
                                onClick={clearInput}
                            >
                                cancel
                            </span>
                        )}
                    </div>
                    <div className={styles.login_pw}>
                        <input
                            type={showAllPassword ? "text" : "password"}
                            placeholder='비밀번호 8~12자'
                            value={userpw}
                            onChange={handleInputpassword} />
                        <span
                            className={`${'material-symbols-outlined'} ${styles.show_pw}`}
                            onClick={() => { setShowAllPassword(!showAllPassword) }}>
                            {showAllPassword ? 'visibility' : 'visibility_off'}
                        </span>
                    </div>
                </div>
                <div className={`${styles.alert_box}`}>
                    {alertVisible}
                </div>
                <Button variant="danger" className={styles.login_button} onClick={handleLoginClick}>로그인</Button>
                <div className={styles.memo_logininfo} onClick={savelogin} >
                    <span className={`${'material-symbols-outlined'} ${styles.memo_check}`} style={getSpanStyles()}>
                        check_circle
                    </span>
                    <p>로그인 상태 유지</p>
                </div>
                <div className={styles.snsLogin}>
                    <div className={styles.snstitle}>
                        <div></div>
                        <p>또는 SNS 아이디로 로그인</p>
                        <div></div>
                    </div>
                    <div className={styles.snsIcon}>
                        {imgPaths.map((imgPath, index) => {
                            return (
                                <div key={`snsIcon_${index}`}>
                                    <a href='/'>
                                        <img src={process.env.PUBLIC_URL + `/img/${imgPath}`} alt={`App Logo ${index + 2}`} />
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Nav className={`${'justify-content-center'} ${styles.find_info}`} activeKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">아이디찾기</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">비밀번호찾기</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">비회원 주문조회</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">회원가입</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className={`${styles.banner_info}`}>
                <ul style={{ ...slidestyle, transition: moveaction }}>
                    {bannerimg.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href="/">
                                    <img src={process.env.PUBLIC_URL + `/bannerimg/${item}`} alt={`event`} />
                                </a>
                            </li>
                        )
                    })}
                    {addbanner}
                </ul>
            </div>
            <footer>
                <p>Copyright © 2024 theModern Co.,Ltd. All Rights Reserved.</p>
            </footer>
        </>
    )
}

export default Login