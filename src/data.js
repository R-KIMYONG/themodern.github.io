import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Nav from 'react-bootstrap/Nav';
import React, { useEffect, useState } from 'react';
import { addItem, setordermodal } from './store.js';
import { useSelector, useDispatch } from 'react-redux';
import { putinWatch } from './watchmore.js';
import Order from './Ordercomplete.js'
import axios from 'axios';

let data = [
    {
        id: 0,
        title: "White and Black",
        content: "Born in France",
        price: 120000
    },

    {
        id: 1,
        title: "Red Knit",
        content: "Born in Seoul",
        price: 110000
    },

    {
        id: 2,
        title: "Grey Yordan",
        content: "Born in the States",
        price: 130000
    }
]

export default data


function 상품(props) {
    const navigate = useNavigate();
    const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
    });
    return (
        props.product.map(function (a, i) {
            return (
                <div className='img1' key={i} >
                    <img src={process.env.PUBLIC_URL + `/main${i + 1}.jpeg`} alt="product1" onClick={
                        () => {
                            navigate(`/detail/${i}`);
                        }
                    } />
                    <h4>{a.title}</h4>
                    <p>{a.content}</p>
                    <p style={{ fontWeight: 'blod' }}>{formatter.format(a.price)}</p>
                </div>
            )
        })
    )
};

const formatter = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
});
let Box = styled.div`
  background:black;
  padding:20px;
`
let YellowBtn = styled.button`
background:${props => props.bg};
color:${props => props.bg == 'yellow' ? 'red' : 'white'};
padding:5px 10px;
`
let NewBtn = styled.button`
    ${YellowBtn}
    background:gray;
`
// 이상 Box,YellowBtn,NewBtn  styled의 예제 입니다.

function Detail(props) {
    let [salealert, setSalealert] = useState(true);
    let [alert1, setalert1] = useState(false);
    let [input, setInput] = useState(0);
    let [tap, setTap] = useState(0);
    let [fadein, setFadein] = useState('')
    let { id } = useParams();
    let modal = useSelector((state) => state.order)
    let dispatch = useDispatch();
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        Promise.all([axios.get('https://codingapple1.github.io/shop/data2.json'), axios.get('https://codingapple1.github.io/shop/data3.json')]).then(([결과1, 결과2]) => {
            setAllData([...props.product, ...결과1.data, ...결과2.data])
        }).catch(error => {
            console.error('데이터 요청 실패', error);
        });
    }, [props.product])
    // useEffect(() => {
    //     let 최근본상품 = localStorage.getItem('watch');
    //     let 최근상품꺼냄 = JSON.parse(최근본상품);
    //     let 찾은상품 = props.product[id].id;
    //     최근상품꺼냄.push(찾은상품)
    //     최근상품꺼냄=new Set(최근상품꺼냄)
    //     최근상품꺼냄 =Array.from(최근상품꺼냄)
    //     localStorage.setItem('watch',JSON.stringify(최근상품꺼냄))
    // },[])
    useEffect(() => {
        let 최근본상품 = localStorage.getItem('watch');
        let 최근상품꺼냄 = JSON.parse(최근본상품) || []; // 기존에 저장된 값이 없으면 빈 배열로 초기화
        let 찾은상품 = allData[id]?.id;
        if (찾은상품) {
            최근상품꺼냄.push(찾은상품);
            최근상품꺼냄 = [...new Set(최근상품꺼냄)];
            localStorage.setItem('watch', JSON.stringify(최근상품꺼냄));
        }
    }, [allData, id]);
    useEffect(() => {
        setTimeout(() => { setFadein('detailend') }, 10);
        return () => { setFadein('') }
    }, [id]);
    useEffect(() => {
        let a = setTimeout(() => {
            setSalealert(false)
        }, 10000);
        let 검사식 = /[^0-9]/g;
        if (검사식.test(input)) {
            setalert1(true);
        } else {
            setalert1(false);
        }
        return () => {
            clearTimeout(a);
        }
    }, [input])
    if (id >= allData.length) {
        return (
            <div>
                <h2>존재하지않는 페이지입니다.</h2>
            </div>
        )
    }
    return (
        <div className={`detail detailstart ${fadein} isdetailpage`} key={id}>
            {modal ? <Order></Order> : null}
            <div className="container">
                {
                    salealert ? <타임세일 /> : null
                }
                <div className="row">
                    <div className="col-md-6">
                        <img src={process.env.PUBLIC_URL + `/main${parseInt(id) + 1}.jpeg`} width="100%" />
                    </div>
                    <div className="col-md-6 productinfo">
                        <h4>{allData[id].title}</h4>
                        <p>{allData[id].content}</p>
                        <p>{formatter.format(allData[id].price)}</p>
                        <div className="numbox">
                            <input type="text" className="number" onInput={(e) => { setInput(parseInt(e.target.value, 10)); }} />
                            {
                                alert1 == true ?
                                    <p className="warningtext">경고 : 숫자만 입력하세요!</p> : null
                            }
                        </div>
                        {/* <button className="btn btn-danger" onClick={() => {
                            if (input > 0) {
                                dispatch(addItem({ id: allData[id].id, name: allData[id].title, count: input }));
                                dispatch(setordermodal(false))
                            } else {
                                alert("상품갯수를 입력하세요!")
                            }
                        }}>주문하기</button> */}
                        <button className="btn btn-danger" onClick={() => {
                            if (allData[id] && input > 0) {
                                dispatch(addItem({ id: allData[id].id, price: allData[id].price, name: allData[id].title, count: input }));
                                dispatch(setordermodal(false));
                            } else {
                                alert("상품 정보가 올바르지 않습니다. 상품갯수를 입력하세요!");
                            }
                        }}>주문하기</button>
                        {/* <Box>
                                <YellowBtn bg="yellow">더보기</YellowBtn>
                                <NewBtn>new</NewBtn>
                            </Box> */}
                    </div>
                </div>
                <Nav variant="pills" defaultActiveKey="tap0">
                    <Nav.Item>
                        <Nav.Link eventKey="tap0" onClick={() => { setTap(0) }}>상세내용</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="tap1" onClick={() => { setTap(1) }}>주의사항</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="tap2" onClick={() => { setTap(2) }}>구매후기</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tapcontent tap={tap} product={props.product} />
            </div>
        </div>
    )
}

function Allproduct() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [결과1, 결과2] = await Promise.all([
                    axios.get('https://codingapple1.github.io/shop/data2.json'),
                    axios.get('https://codingapple1.github.io/shop/data3.json')
                ]);

                setAllData([...data, ...결과1.data, ...결과2.data]);
            } catch (error) {
                console.error('데이터 요청 실패', error);
            }
        };

        fetchData();
    }, []);
    if (id >= allData.length) {
        return (
            <div>
                <h2>존재하지않는 페이지입니다.</h2>
            </div>
        )
    }
    return (
        <>
            <div className='allproduct_title'>
                <h1>All Product</h1>
            </div>
            <div className="allproduct" >
                {allData.map(function (a, i) {
                    return (
                        <div className="container" key={i}>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={process.env.PUBLIC_URL + `/main${i + 1}.jpeg`} width="100%" />
                                </div>
                                <div className="col-md-6 productinfo">
                                    <h4>{a.title}</h4>
                                    <p>{a.content}</p>
                                    <p>{formatter.format(a.price)}</p>
                                    <button className="btn btn-danger" onClick={() => { navigate(`/detail/${i}`) }}>More</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

function 타임세일() {
    let [count, setCount] = useState(10)

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(count => count - 1);

        }, 1000);

        // 컴포넌트가 언마운트되면 clearInterval을 호출하여 인터벌을 정리합니다.
        return function () { clearInterval(timer) }
    });
    return (
        <div className="alert alert-warning">
            <h3>타임세일 {count}초후 종료될 예정입니다.</h3>
        </div>
    )
}
function Tapcontent({ tap, product }) {
    let [fadein, setFadein] = useState('');
    useEffect(() => {
        setTimeout(() => { setFadein('tapEnd') }, 10)
        return () => {
            setFadein('')
        }
    }, [tap])
    return (
        <div className={`tapStart ${fadein}`}>
            {[<div>{product[tap].title}</div>, <div>{product[tap].title}</div>, <div>{product[tap].title}</div>][tap]}
        </div>
    )
}
export { 상품, Detail, Allproduct }