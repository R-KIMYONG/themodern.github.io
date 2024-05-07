import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { setordermodal } from './store.js';
import { useSelector, useDispatch } from 'react-redux';

function Order(){
    const navigate = useNavigate();
    let modal = useSelector((state) => state.order);
    let dispatch = useDispatch();  
    return(
        <div className="orderModal-bg">
            <div className="orderModal-window">
                <h3>알림</h3>
                <p>장바구니에 추가완료했습니다.</p>
                <Button className="gotoCart" variant="outline-success" onClick={()=>{
                    navigate('/cart');
                    dispatch(setordermodal(true));
                }}>장바구니 보기</Button>
                <Button className='livehere' variant="outline-secondary" onClick={()=>{
                    dispatch(setordermodal(true))
                }}>쇼핑 계속하기</Button>
            </div>
        </div>
    )
}

export default Order