import { useEffect, useState } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setShowTerms } from './../store.js'
let signdata = [
    {
        id: 0,
        title: "휴대폰 회원가입",
    },
    {
        id: 1,
        title: "구글 회원가입",
    },
    {
        id: 2,
        title: "위쳇 회원가입",
    },
    {
        id: 3,
        title: "카카오 회원가입",
    },
    {
        id: 4,
        title: "인스타 회원가입",
    },
    {
        id: 5,
        title: "페이스북 회원가입",
    }
]

function Sign() {
    let navigate = useNavigate();
    let showTerms = useSelector((state) => state.showTerms)
    let dispatch = useDispatch();
    return (
        <>
            <div className="sign-bg">
                <div className="userinfo">
                    <div className="toplogo">
                        <img src={process.env.PUBLIC_URL + '/img/logo2.png'} alt="logo" />
                        <h3>회원가입</h3>
                    </div>
                    <div className="d-grid gap-2 ">
                        {
                            signdata.map((a, i) => {
                                return (
                                    <Button variant="light" size="lz" className="signbutton" key={i} onClick={() => {
                                        dispatch(setShowTerms(true))
                                    }}>
                                        <div className="icon">
                                            <img src={process.env.PUBLIC_URL + `/img/applogo${a.id + 1}.png`} alt="self" />
                                            <p>{a.title}</p>
                                        </div>
                                        <div className="leftarrow">
                                            <span className="material-symbols-outlined">
                                                navigate_next
                                            </span>
                                        </div>
                                    </Button>
                                )
                            })
                        }
                    </div>
                    <div className="gotologin">
                        <p>이미 회원이신가요? <span onClick={() => {
                            navigate('/login')
                        }}>로그인</span></p>
                    </div>
                </div>
                <Terms />
            </div>
        </>
    )
}

function Terms() {
    let navigate = useNavigate();
    let [check, setCheck] = useState([false, false, false])
    const isAllChecked = check.every(item => item);
    const isFirstAndSecondChecked = check[0] && check[1] && !check[2];
    let showTerms = useSelector((state) => state.showTerms)
    let dispatch = useDispatch();
    let [checkdetail, setcheckdetail] = useState([false, false])
    const isAllCheckeddetail = checkdetail.every(item => item);
    let [checkdetail1, setcheckdetail1] = useState([false, false, false])
    const isAllCheckeddetail1 = checkdetail1.every(item => item);
    // const toggleAll = () => {
    //     setCheck(a => a.map(() => !isAllChecked));
    //     setcheckdetail(a => a.map(() => !isAllCheckeddetail));
    //     setcheckdetail1(a => a.map(() => !isAllCheckeddetail1));
    // };
    const toggleAll = () => {
        setCheck(prevCheck => {
            const toggledCheck = prevCheck.map(() => !isAllChecked);
            setcheckdetail(toggledCheck);
            setcheckdetail1(toggledCheck);
            return toggledCheck;
        });
    };
    // =========== (필수) 더 모던 가입/이용을 위한 이용 약관 ===========
    const toggleDetail = (index) => {
        setCheck(a => a.map((item, i) => (i === index) ? !item : item));
        if (index === 1) {
            setcheckdetail(a => a.map(() => !isAllCheckeddetail));
        }
        if (index === 2) {
            setcheckdetail1(a => a.map(() => !isAllCheckeddetail1));
        }
    };
    const toggleCheckDetail = (index) => {
        setcheckdetail(a => a.map((item, i) => (i === index) ? !item : item));
    };
    useEffect(() => {
        if (isAllCheckeddetail) {
            setCheck(prevCheck => [prevCheck[0], true, prevCheck[2]]);
        } else {
            setCheck(prevCheck => [prevCheck[0], false, prevCheck[2]]);
        }
    }, [checkdetail]);
    // =========== (선택) 광고성 정보 수신 동의 (SMS/이메일)===========
    const toggleCheckDetail1 = (index) => {
        setcheckdetail1(a => a.map((item, i) => (i === index) ? !item : item));
    };
    useEffect(() => {
        if (isAllCheckeddetail1) {
            setCheck(prevCheck => [prevCheck[0], prevCheck[1], true]);
        } else {
            setCheck(prevCheck => [prevCheck[0], prevCheck[1], false]);
        }
    }, [checkdetail1]);
    let [dropdown, setDropdown] = useState([false, false]);
    const toggledropdown = (index) => {
        setDropdown(a => a.map((item, i) => (i === index) ? !item : item));
    }

    return (
        <>
            <div className={showTerms ? 'terms-gray move' : "terms-gray"}>
                <div className="terms-bg">
                    <div className="terms-head">
                        <h3>이용 약관동의</h3>
                        <span className="material-symbols-outlined" onClick={() => {
                            dispatch(setShowTerms(false))
                        }}>
                            close
                        </span>
                    </div>
                    <div className="terms-content" onClick={toggleAll}>
                        <span className="material-symbols-outlined" style={{
                            color: isAllChecked ? 'white' : '#ccc', border: isAllChecked ? '1px solid red' : '1px solid #ccc',
                            background: isAllChecked ? 'red' : null
                        }}>
                            check
                        </span>
                        <p>전체 동의</p>
                    </div>
                    <div className="terms-detail">
                        <div className="terms-detail1">
                            <div className="terms-detail-content" onClick={() => { toggleDetail(0) }}>
                                <span className="material-symbols-outlined" style={{ color: check[0] ? 'red' : '#ccc' }}>
                                    check
                                </span>
                                <p>(필수) 만 14세 이상입니다.</p>
                            </div>
                        </div>
                        <div className="terms-detail1">
                            <div className="terms-detail1_1">
                                <div className="terms-detail-content" onClick={() => { toggleDetail(1) }}>
                                    <span className="material-symbols-outlined" style={{ color: check[1] ? 'red' : '#ccc' }}>
                                        check
                                    </span>
                                    <p>(필수) 더 모던 가입/이용을 위한 이용 약관</p>
                                </div>
                                <span className="material-symbols-outlined" onClick={() => { toggledropdown(0) }}>
                                    {dropdown[0] ? 'expand_less' : 'expand_more'}
                                </span>
                            </div>
                            <div className="additional" style={{ display: dropdown[0] ? 'block' : 'none' }}>
                                <div className="terms-detail-content1">
                                    <div className="terms-detail-content1_2" onClick={() => { toggleCheckDetail(0) }}>
                                        <span className="material-symbols-outlined" style={{ color: checkdetail[0] == true ? 'red' : check[1] ? 'red' : '#ccc' }} >
                                            check
                                        </span>
                                        <p>서비스 이용 약관 동의</p>
                                    </div>
                                    <span className="material-symbols-outlined" onClick={() => {
                                        navigate('/sign_up/terms1')
                                    }}>
                                        chevron_right
                                    </span>
                                </div>
                                <div className="terms-detail-content1">
                                    <div className="terms-detail-content1_2" onClick={() => { toggleCheckDetail(1) }}>
                                        <span className="material-symbols-outlined" style={{ color: checkdetail[1] == true ? 'red' : check[1] ? 'red' : '#ccc' }}>
                                            check
                                        </span>
                                        <p>개인정보 수집/이용 동의</p>
                                    </div>
                                    <span className="material-symbols-outlined" onClick={() => {
                                        navigate('/sign_up/terms2')
                                    }}>
                                        chevron_right
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="terms-detail1">
                            <div className="terms-detail1_1">
                                <div className="terms-detail-content" onClick={() => { toggleDetail(2) }}>
                                    <span className="material-symbols-outlined" style={{ color: check[2] ? 'red' : '#ccc' }}>
                                        check
                                    </span>
                                    <p>(선택) 광고성 정보 수신 동의 (SMS/이메일)</p>
                                </div>
                                <span className="material-symbols-outlined" onClick={() => { toggledropdown(1) }}>
                                    {dropdown[1] ? 'expand_less' : 'expand_more'}
                                </span>
                            </div>
                            <div className="additional" style={{ display: dropdown[1] ? 'block' : 'none' }}>
                                <div className="terms-detail-content1">
                                    <div className="terms-detail-content1_2" onClick={() => { toggleCheckDetail1(0) }}>
                                        <span className="material-symbols-outlined" style={{ color: checkdetail1[0] == true ? 'red' : check[2] ? 'red' : '#ccc' }}>
                                            check
                                        </span>
                                        <p>개인정보 수집/이용 동의</p>
                                    </div>
                                    <span className="material-symbols-outlined" onClick={() => {
                                        navigate('/sign_up/terms3')
                                    }}>
                                        chevron_right
                                    </span>
                                </div>
                                <div className="terms-detail-content1">
                                    <div className="terms-detail-content1_2" onClick={() => { toggleCheckDetail1(1) }}>
                                        <span className="material-symbols-outlined" style={{ color: checkdetail1[1] == true ? 'red' : check[2] ? 'red' : '#ccc' }}>
                                            check
                                        </span>
                                        <p>광고성 정보 수신 동의 (SMS)</p>
                                    </div>
                                    <span className="material-symbols-outlined" onClick={() => {
                                        navigate('/sign_up/terms4')
                                    }}>
                                        chevron_right
                                    </span>
                                </div>
                                <div className="terms-detail-content1">
                                    <div className="terms-detail-content1_2" onClick={() => { toggleCheckDetail1(2) }}>
                                        <span className="material-symbols-outlined" style={{ color: checkdetail1[2] == true ? 'red' : check[2] ? 'red' : '#ccc' }}>
                                            check
                                        </span>
                                        <p>광고성 정보 수신 동의 (이메일)</p>
                                    </div>
                                    <span className="material-symbols-outlined" onClick={() => {
                                        navigate('/sign_up/terms5')
                                    }}>
                                        chevron_right
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Button variant={
                            isAllChecked ? 'danger' : isFirstAndSecondChecked ? 'danger' : 'secondary'
                        } className="consent">동의하기</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sign 