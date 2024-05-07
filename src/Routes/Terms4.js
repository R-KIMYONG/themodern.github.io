import styles from './Terms.module.css';
import Table from 'react-bootstrap/Table';

function Terms4() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h2>마케팅 활용 및 SMS 수신 동의(선택) - MW</h2>
                </div>
                <div className={styles.content}>
                    <p className='subtitle1'>
                        고객님께서는 동의를 거부하실 수 있으며, 동의하지 않아도 가입이 가능합니다.
                    </p>
                </div>
                <div className={styles.terms_table}>
                    <Table>
                        <colgroup>
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '75%' }} />
                        </colgroup>
                        <tbody className={styles.table_content}>
                            <tr className={styles.content_detail}>
                                <td valign="middle" className={styles.mini_title}>이용목적</td>
                                <td className={styles.mini_title1}>
                                    <strong>더 모던가 취급하는 상품/서비스 및 이벤트 등 광고성 대한 메시지, 할인쿠폰, 경품 등을 SMS로 수신하는데 동의합니다.</strong>
                                </td>
                            </tr>
                            <tr className={styles.content_detail}>
                                <td valign="middle" className={styles.mini_title}>수집항목</td>
                                <td>휴대폰번호</td>
                            </tr>
                            <tr className={styles.content_detail}>
                                <td valign="middle" className={styles.mini_title}>보유기간</td>
                                <td className={styles.mini_title1}>
                                    <strong>
                                        회원탈퇴 또는 개인정보 유효기간* 도래 시 까지 보관<br/>
                                        *단, 관계 법령에 따라 고객님의 개인정보를 보존하여야 하는 경우, 회사는 해당 법령에서 정한 기간 동안 보관합니다.
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}
export default Terms4