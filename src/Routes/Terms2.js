import styles from './Terms.module.css';
import Table from 'react-bootstrap/Table';
function Terms2() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h2>개인정보 수집/이용 동의 (휴대폰 간편가입)</h2>
                </div>
                <div className={styles.main_title}>
                    <b className={styles.title}>개인정보수집/이용 약관</b>
                </div>
                <div className={styles.content}>
                    <p className='subtitle1'>더 모던㈜ 귀중<br />

                        더 모던 이용과 관련하여 본인은 동의내용을 숙지하였으며, 이에 따라 본인의 개인정보를 더 모던에서 수집/이용하는 것에 동의합니다.</p>
                </div>
                <div className={styles.terms_table}>
                    <Table>
                        <colgroup>
                            <col style={{width:'34%'}}/>
                            <col style={{width:'33%'}}/>
                            <col style={{width:'33%'}}/>
                        </colgroup>
                        <thead>
                            <tr className={styles.content_detail}>
                                <th>목적</th>
                                <th>항목</th>
                                <th>보유기간</th>
                            </tr>
                        </thead>
                        <tbody className={styles.table_content}>
                            <tr className={styles.content_detail}>
                                <td>이용자식별, 계약이행을 위한 연락, 서비스 이용에따른 정보제공(고지사항전달, 본인의사 확인, 서비스 관련 상담, 민원사항처리, 유의사항 등)</td>
                                <td>이메일, 휴대폰번호, 이름, 상담내용</td>
                                <td rowspan='4'>
                                <br/>
                                    회원탈퇴(서비스 재가입 정책에 따라 회원 탈퇴 후, 1개월 동안 보관) 또는 개인정보 유효기간 도래 시 까지 보관<br/><br/>

                                    * 단 관계 법령에 따라 고객님의 개인정보를 보관하여야 하는 경우, 회사는 해당 법령에 정한기간동안 보관
                                    * 유효기간이라 함은 일정 기간(1년) 서비스를 이용하지 않는 경우로 탈퇴등의 조치가 적용
                                </td>
                            </tr>
                            <tr className={styles.content_detail}>
                                <td>더 모던㈜의 상품/서비스 이용 실적 정보 통계/분석 및 상품/서비스 추천</td>
                                <td>필수, 선택 항목에서 수집한 모든 정보</td>
                            </tr>
                            <tr className={styles.content_detail}>
                                <td>불법/부정이용 방지, 개인정보 유효기간제 준수, 장바구니, 최근 본 상품등 서비스</td>
                                <td>자동수집정보 : 서비스이용기록, 이용정지 기록, 이용해지 기록, 아이피주소(IP address), 접속로그, 쿠키(cookie)</td>
                            </tr>
                            <tr className={styles.content_detail}>
                                <td>부정거래 방지</td>
                                <td>이메일, 휴대폰번호, 이름, 서비스의 이용기록, 아이피주소(IP address)</td>
                            </tr>
                        </tbody>
                    </Table>
                    <p>고객님께서는 동의를 거부하실 수 있으며, 동의거부시 회원가입이 제한됩니다.</p>
                </div>

            </div>
        </>
    )
}
export default Terms2