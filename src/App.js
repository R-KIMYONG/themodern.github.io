import logo from './logo.svg';
import './App.css';
import { Button, Nav, Container, Navbar } from 'react-bootstrap';
import { useState, useEffect, Suspense, lazy, useTransition } from "react";
import data from './data.js';
import { 상품, Detail, Allproduct } from "./data.js"
import Recently from './watchmore.js'
import {Link, useNavigate, Outlet, Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';
import { Watched } from './Routes/watched.js';
import { useQuery } from 'react-query';
import Slide from './Slide';

const Cart = lazy(() => import('./Routes/Cart.js'))
const Sign = lazy(() => import('./Routes/sign.js'));
const Terms = lazy(()=> import('./Routes/Terms'));
const Login = lazy(()=> import('./Routes/Login.js'));
const About = lazy(()=> import('./Routes/About.js'));
const Contentbox = lazy(()=>import('./Routes/Contentbox.js'))
let box = styled.div`
  background:black;
  padding:20px;
`
function App() {
  // let result = useQuery('test1', () => {
  //   return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
  //     console.log('요청함')
  //     return a.data
  //   })
  // }, { staleTime: 2000 })
  // console.log(result.data.name)
  let [product, setProduct] = useState(data);
  let [more, setMore] = useState(0)
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let [detail, setDetail] = useState(false)
  let [isPending, startTransition] = useTransition()
  const [isScrolled, setIsScrolled] = useState(false);
  // navigate 훅이다 훅은 각종기능을 담긴 멀티함수임 보통 위처럼 함수에 넣어서 사용함
  function 정렬() {
    let 정렬copy = [...product]; // 새로운 배열을 만듭니다.
    정렬copy.sort((a, b) => a.title.localeCompare(b.title));
    setProduct(정렬copy);
  }
  useEffect(() => {
    let 최근본상품 = localStorage.getItem('watch');
    let 최근상품꺼냄 = JSON.parse(최근본상품);
    localStorage.setItem('watch', JSON.stringify([]))

  }, [])
  function 더보기() {
    startTransition(() => {
      if (loading == false) {
        setLoading(true)
        Promise.all([axios.get('https://codingapple1.github.io/shop/data2.json'), axios.get('https://codingapple1.github.io/shop/data3.json')])
          .then(([결과1, 결과2]) => {
            if (more == 0) {
              setLoading(false)
              setProduct([...product, ...결과1.data]);
              setMore(1)
            } else if (more == 1) {
              setLoading(false)
              setMore(2)
              setProduct([...product, ...결과2.data]);
            }
          }).catch((error) => {
            setLoading(false)
            console.error('데이터 요청 실패', error);
          }).finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false)
      }
    })

  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 50; // Scroll down by 50 pixels to change the background color

      setIsScrolled(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);
  return (
    <div className="App">
      <Navbar style={{ backgroundColor: `rgba(0, 0, 0, ${isScrolled ? '0.3' : '1'})` }}variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>
            <Link to="/"><img src={process.env.PUBLIC_URL + '/img/logo2.png'} alt="로고" /></Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/detail">Detail</Link>
            <Link to="/about">About</Link>
            <Link to="/Event">Event</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/Community">Community</Link>
            {/* <Nav.Link onClick={()=>{navigate('/')}}>홈으로</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>디테일</Nav.Link> 
            <Nav.Link onClick={()=>{navigate(-1)}}>뒤로가기</Nav.Link>
            훅의 사용예제임 */}
          </Nav>
          <Nav className="me-auto">
            <Link to='/sign_up'>Sign</Link>
            <Link to='/login'>Login</Link>
          </Nav>
        </Container>
      </Navbar>
      <Watched />{/* 최근본상품 페이지임 */}
      {/* 여기서부터 홈 내용 */}
      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          <Route path='/' element={
            <>
              <div className='main-bg'>
                {<Slide />}
              </div>
              <div className='product'>
                <상품 product={product} />
                {loading ? <div className='img1'><h4>로딩중입니다.</h4></div> : null}
              </div>
              <Button onClick={() => { 정렬() }} className="arrbtn" variant="dark">정렬</Button>
              <Button variant="dark" onClick={() => {
                {
                  if (more >= 2) {
                    navigate('/detail')
                  } else {
                    더보기();
                  }
                }
              }}>
                {more >= 2 ? "전체 보기" : "더보기"}
              </Button>
              <Contentbox></Contentbox>
            </>
          } />
          <Route path='/recently' element={<Recently product={product} />} />
          <Route path='/sign_up/:id' element={<Terms></Terms>} />
          <Route path='/login' element={<Login></Login>}/>
          <Route path='/detail' element={<Allproduct product={product} />} />
          <Route path='/detail/:id' element={<Detail product={product} />} />
          <Route path='/About' element={<About />}>
            <Route path='member' element={<div> 조직도 </div>} />
            <Route path='location' element={<div> 회사위치</div>} />
          </Route>
          <Route path='/cart' element={<Cart></Cart>} />
          <Route path='/sign_up' element={<Sign />} />
          <Route path='/*' element={<div style={{marginTop:'100px'}}> 존재하지않는 페이지 </div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Event() {
  let navigate = useNavigate();
  return (
    <>
      <div>오늘의 이벤트</div>
      <Outlet>

      </Outlet>
      <button onClick={() => navigate('one')}>Go to One</button>
      <button onClick={() => navigate('two')}>Go to Two</button>

    </>
  )
}

export default App;
