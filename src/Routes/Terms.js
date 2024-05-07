import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

const Terms1 = lazy(() => import('./Terms1')); // 파일 경로에 맞게 수정필요
const Terms2 = lazy(() => import('./Terms2'));
const Terms3 = lazy(() => import('./Terms3'));
const Terms4 = lazy(() => import('./Terms4'));
const Terms5 = lazy(() => import('./Terms5'));

function Terms() {
    const { id } = useParams();

    const provision = (id) => {
        switch (id) {
            case 'terms1':
                return <Terms1 />;
            case 'terms2':
                return <Terms2 />;
            case 'terms3':
                return <Terms3 />;
            case 'terms4':
                return <Terms4 />
            case 'terms5':
                return <Terms5 />
            default:
                return <div>존재하지않는 페이지임</div>;
        }
    };
    console.log(id)
    return (
        <>
            <Suspense fallback={<div>로딩중...</div>}>

                {provision(id)}

            </Suspense>
        </>
    );
}


export default Terms;





