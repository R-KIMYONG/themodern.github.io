import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { plus, minus, del } from './../store.js'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

function Cart() {
    const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
    });
    let a = useSelector((state) => state.stock)
    let dispatch = useDispatch();
    const navigate = useNavigate();
    function 총합() {
        console.log(a.length)
        let total = 0
        for (let i = 0; i < a.length; i++) {
            total += a[i].price * a[i].count
        }
        return formatter.format(total)
    }
    return (
        <>
            <div className={styles.cart_main}>
                <div className={styles.cart_title}>
                    <h1>Cart</h1>
                </div>
                <Table >
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            a.map((a, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{1 + i}</td>
                                        <td onClick={() => {
                                            navigate(`/detail/${i}`)
                                        }} style={{ cursor: 'pointer' }}>{a.name}</td>
                                        <td>{formatter.format(a.price)}</td>
                                        <td>{a.count}</td>
                                        <td className='control'>
                                            <Button variant="outline-light" onClick={() => {
                                                dispatch(plus(a.id))
                                            }} className='plus'>+</Button>
                                            <Button variant="outline-light" onClick={() => {
                                                if(a.count>0){
                                                    dispatch(minus(a.id))
                                                }else if(a.count==0){
                                                    dispatch(del(a.id));
                                                }
                                            }} className='minus'>-</Button>
                                            <Button variant="outline-danger" className='del' onClick={() => {
                                                dispatch(del(a.id));
                                            }}>삭제</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan={'3'}>합계</td>
                            <td>
                                {a.length > 0 ? 총합() : 0}
                            </td>
                            <td>
                                <Button variant="outline-success">결제</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Cart