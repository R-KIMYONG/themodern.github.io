import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Watched() {
  const navigate = useNavigate();
  let [arrow, setArrow] = useState(false);
  let 최근본상품 = localStorage.getItem("watch");
  let 최근상품꺼냄 = JSON.parse(최근본상품);
  let recendly = Array.isArray(최근상품꺼냄) ? 최근상품꺼냄.slice(-2) : [];
  let cartproduct = useSelector((state) => state.stock) || [];
  // console.log(cartproduct[0].id)
  return (
    <>
      <div className={`watched ${arrow ? "watchedOn" : null}`}>
        <div
          className="outin"
          onClick={() => {
            setArrow(!arrow);
          }}
        >
          <span className="material-symbols-outlined">
            {arrow
              ? "keyboard_double_arrow_right"
              : "keyboard_double_arrow_left"}
          </span>
        </div>
        <div className="watchedlist">
          <div className="watch-cart">
            <p
              onClick={() => {
                navigate("/cart");
              }}
            >
              장바구니
            </p>
            <p>{cartproduct.length}</p>
          </div>
          <p>최근본 상품</p>
          <div className="watch-list">
            {recendly.map((a, i) => {
              return (
                <div className="watch-1" key={i}>
                  <img
                    src={process.env.PUBLIC_URL + `/main${a + 1}.jpeg`}
                    alt="최근본상품1"
                    onClick={() => {
                      navigate(`/detail/${a}`);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="controlbtn">
            <Navbar.Brand href="#" className="toTop">
              Top▲
            </Navbar.Brand>
            <button
              onClick={() => {
                navigate(`/recently`);
              }}
            >
              더보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { Watched };
