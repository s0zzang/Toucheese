import ReservationFooter from '@components/ReservationFooter/ReservationFooter';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

declare global {
  interface Window {
    IMP?: any;
    Naver: any;
  }
}

interface PaymentResponse {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  error_msg?: string;
}

interface PaymentProps {
  onClick: () => void;
  trigger: () => Promise<boolean>;
  paymentMethod: string;
  isAgreed: boolean;
}

const Payment = ({ onClick, trigger, paymentMethod, isAgreed }: PaymentProps) => {
  const { _id } = useParams<{ _id: string }>();

  const baseUrl =
    process.env.NODE_ENV === 'production' ? 'https://toucheese.store' : 'http://localhost:5173';
  const returnUrl = `${baseUrl}/studio/${_id}/reservation/complete`;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.IMP) {
      const merchantId = import.meta.env.VITE_PORTONE_CODE;
      if (!merchantId) {
        console.error('가맹점 식별코드가 설정되지 않았습니다.');
        console.log('가맹점 식별코드:', import.meta.env.VITE_PORTONE_CODE);
        return;
      }
      window.IMP.init(merchantId); // 포트원 초기화
      console.log('포트원 초기화 완료:', merchantId);
    } else {
      console.error('포트원 스크립트가 로드되지 않았습니다.');
    }
  }, []);

  useEffect(() => {
    // 네이버페이 SDK 로드
    const script = document.createElement('script');
    script.src = 'https://nsp.pay.naver.com/sdk/js/naverpay.min.js';
    script.async = true;
    script.onload = () => {
      console.log('네이버페이 SDK 로드 완료');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!isAgreed) {
      return;
    }

    const isFormValid = await trigger();
    if (!isFormValid) {
      return;
    }

    if (!window.IMP) {
      alert('포트원 초기화되지 않았습니다.');
      return;
    }

    switch (paymentMethod) {
      case 'kakaoPay':
        requestKakaoPay();
        break;
      case 'naverPay':
        requestNaverPay();
        break;
      case 'creditCard':
        requestCreditCard();
        break;
      default:
        alert('유효하지 않은 결제수단입니다.');
    }
  };

  const requestCreditCard = () => {
    window.IMP.request_pay(
      {
        pg: 'html5_inicis', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: 'order_' + new Date().getTime(), // 고유 주문번호
        name: '주문상품', // 상품명
        amount: 1, // 결제 금액
        buyer_email: 'iamport@siot.do', // 구매자 이메일
        buyer_name: '박지똥', // 구매자 이름
        buyer_tel: '02-1234-1234', // 구매자 연락처
        m_redirect_url: returnUrl,
      },
      (rsp: PaymentResponse) => {
        if (rsp.success) {
          console.log('결제 성공:', rsp);

          // 서버에 결제 검증 요청 (임시)
          fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imp_uid: rsp.imp_uid, // 포트원 결제 고유 ID
              merchant_uid: rsp.merchant_uid, // 상점에서 생성한 주문번호
            }),
          })
            .then((response) => {
              if (response.ok) {
                console.log('결제 검증 성공');
              } else {
                console.error('결제 검증 실패');
              }
            })
            .catch((error) => {
              console.error('결제 검증 요청 중 오류 발생:', error);
            });
        } else {
          console.error('결제 실패:', rsp.error_msg);
        }
      },
    );
  };

  const requestKakaoPay = () => {
    window.IMP.request_pay(
      {
        channelKey: import.meta.env.VITE_PORTONE_KAKAO_CHANNEL_KEY,
        pay_method: 'EASY_PAY',
        merchant_uid: 'order_no_0001',
        name: '주문명:결제테스트',
        amount: 1,
        buyer_email: 'test@portone.io',
        buyer_name: '박지뚱',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        m_redirect_url: returnUrl,
      },
      (rsp: PaymentResponse) => {
        if (rsp.success) {
          console.log('결제 성공:', rsp);

          // 서버에 결제 검증 요청 (임시)
          fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imp_uid: rsp.imp_uid, // 포트원 결제 고유 ID
              merchant_uid: rsp.merchant_uid, // 상점에서 생성한 주문번호
            }),
          })
            .then((response) => {
              if (response.ok) {
                console.log('결제 검증 성공');
              } else {
                console.error('결제 검증 실패');
              }
            })
            .catch((error) => {
              console.error('결제 검증 요청 중 오류 발생:', error);
            });
        } else {
          console.error('결제 실패:', rsp.error_msg);
        }
      },
    );

    return;
  };

  const requestNaverPay = () => {
    if (!window.Naver || !window.Naver.Pay) {
      console.error('네이버페이 SDK가 로드되지 않았습니다.');
      return;
    }

    const oPay = window.Naver.Pay.create({
      mode: 'development', //  또는 "production"
      clientId: import.meta.env.VITE_NAVERPAY_CLIENT_ID,
      chainId: import.meta.env.VITE_NAVERPAY_CHAIN_ID,
    });

    oPay.open({
      merchantUserKey: 'unique_user_key_1234', // 사용자 고유 키
      merchantPayKey: 'order_' + new Date().getTime(),
      productName: '테스트 상품',
      totalPayAmount: 1000, // 결제 금액
      taxScopeAmount: 1000,
      taxExScopeAmount: 0,
      returnUrl,
    });

    // 결제 성공 후 처리
    window.addEventListener('message', (event) => {
      if (event.origin !== baseUrl) {
        return;
      }

      const data = event.data;
      if (data.success) {
        console.log('네이버페이 결제 성공:', data);
        fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            merchant_uid: data.merchantPayKey, // 주문번호
          }),
        })
          .then((response) => {
            if (response.ok) {
              console.log('결제 검증 성공');
            } else {
              console.error('결제 검증 실패');
            }
          })
          .catch((error) => {
            console.error('결제 검증 요청 중 오류 발생:', error);
          });
      } else {
        console.error('네이버페이 결제 실패:', data.message);
      }
    });
  };

  return (
    <ReservationFooter
      text="결제하기"
      type="button"
      onClick={() => {
        onClick();
        handlePayment();
      }}
      disabled={!isAgreed}
    />
    // <button
    //   onClick={() => {
    //     onClick();
    //     handlePayment();
    //   }}
    // >
    //   결제하기
    // </button>
  );
};

export default Payment;
