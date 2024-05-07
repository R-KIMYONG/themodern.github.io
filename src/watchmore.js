import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recently(props){
    const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
    });
    const navigate = useNavigate();
    let 최근본상품 = localStorage.getItem('watch');
    let 최근상품꺼냄 = JSON.parse(최근본상품);
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        Promise.all([axios.get('https://codingapple1.github.io/shop/data2.json'), axios.get('https://codingapple1.github.io/shop/data3.json')]).then(([결과1, 결과2]) => {
            // setAllData([...props.product, ...결과1.data, ...결과2.data])
            const newData = [...props.product, ...결과1.data, ...결과2.data];
            const uniqueData = newData.reduce((acc, current) => {
                const isDuplicate = acc.some(item => item.id === current.id);
                if (!isDuplicate) {
                    acc.push(current);
                }
                return acc;
            }, []);
    
            setAllData(uniqueData);
        }).catch(error => {
            console.error('데이터 요청 실패', error);
        });
    }, [props.product])

    let item = allData.filter((a)=>{
        return 최근상품꺼냄.includes(a.id)
    });
    console.log(item)
    return(
        <>
            {
                item.length ==0?
                <div>최근본 상품 없습니다.</div>:
                <div className="detail">
                {item.map(function (a, i) {
                    return (
                        <div className="container" key={i}>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={process.env.PUBLIC_URL + `/main${a.id + 1}.jpeg`} width="100%" />
                                </div>
                                <div className="col-md-6 productinfo">
                                    <h4>{a.title}</h4>
                                    <p>{a.content}</p>
                                    <p>{formatter.format(a.price)}</p>
                                    <button className="btn btn-danger" onClick={() => { navigate(`/detail/${a.id}`) }}>More</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
            }

        </>
    )
    
}

export default Recently