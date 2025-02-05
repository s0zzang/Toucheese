import ReservationFooter from '@components/ReservationFooter/ReservationFooter';
import { useUserStore } from '@store/useUserStore';
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
  totalPrice: number;
  options?: Option[];
  menuId?: number;
  menuName?: string;
  visitorName?: string;
  visitorPhone?: string;
  requests?: string;
  date: string;
  time: string;
}

interface Option {
  option_id: number;
  optionPrice: number;
  optionName: string;
}

const Payment = ({
  onClick,
  trigger,
  paymentMethod,
  isAgreed,
  totalPrice,
  options = [],
  menuId,
  menuName,
  visitorName,
  visitorPhone,
  requests,
  date,
  time,
}: PaymentProps) => {
  const { _id } = useParams<{ _id: string }>();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const returnUrl = `${baseUrl}/studio/${_id}/reservation/complete`;

  const optionIds = options.map((option) => option.option_id);
  const { username, phone } = useUserStore();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.IMP) {
      const merchantId = import.meta.env.VITE_PORTONE_CODE;
      if (!merchantId) {
        return;
      }
      window.IMP.init(merchantId); // 포트원 초기화
    }
  }, []);

  useEffect(() => {
    // 네이버페이 SDK 로드
    const script = document.createElement('script');
    script.src = 'https://nsp.pay.naver.com/sdk/js/naverpay.min.js';
    script.async = true;
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
      case '카카오페이':
        requestKakaoPay();
        break;
      case '네이버페이':
        requestNaverPay();
        break;
      case '일반신용카드':
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
        name: menuName,
        amount: totalPrice,
        buyer_email: 'test@portone.io', // 구매자 이메일
        buyer_name: username,
        buyer_tel: phone,
        m_redirect_url: returnUrl,
      },
      (rsp: PaymentResponse) => {
        if (rsp.success) {
          console.log('결제 성공:', rsp);

          fetch(`${import.meta.env.VITE_TOUCHEESE_API}/reservation/action`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imp_uid: rsp.imp_uid, // 포트원 결제 고유 ID
              merchant_uid: rsp.merchant_uid, // 상점에서 생성한 주문번호
              studioId: _id,
              menuID: menuId,
              additionalOptionId: optionIds,
              visitingCustomerName: visitorName,
              visitingCustomerPhone: visitorPhone,
              note: requests,
              totalPrice,
              paymentMethod,
              date,
              startTime: time,
            }),
          })
            .then(async (response) => {
              const result = await response.json();
              if (response.ok) {
                console.log('결제 검증 성공:', result);
                window.location.href = returnUrl;
              } else {
                console.error('결제 검증 실패:', result.message || result);
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
        merchant_uid: 'order_' + new Date().getTime(),
        name: menuName,
        amount: totalPrice,
        buyer_email: 'test@portone.io',
        buyer_name: username,
        buyer_tel: phone,
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        m_redirect_url: returnUrl,
      },
      (rsp: PaymentResponse) => {
        if (rsp.success) {
          console.log('결제 성공:', rsp);
          fetch(`${import.meta.env.VITE_TOUCHEESE_API}/reservation/action`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imp_uid: rsp.imp_uid, // 포트원 결제 고유 ID
              merchant_uid: rsp.merchant_uid, // 상점에서 생성한 주문번호
              studioId: _id,
              menuID: menuId,
              additionalOptionId: optionIds,
              visitingCustomerName: visitorName,
              visitingCustomerPhone: visitorPhone,
              note: requests,
              totalPrice,
              paymentMethod,
              date,
              startTime: time,
            }),
          })
            .then(async (response) => {
              const result = await response.json();
              if (response.ok) {
                console.log('결제 검증 성공:', result);
                window.location.href = returnUrl;
              } else {
                console.error('결제 검증 실패:', result.message || result);
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
      productName: menuName,
      totalPayAmount: totalPrice, // 결제 금액
      taxScopeAmount: totalPrice,
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
        fetch(`${import.meta.env.VITE_TOUCHEESE_API}/reservation/action`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            merchant_uid: data.merchantPayKey,
            studioId: _id,
            menuID: menuId,
            additionalOptionId: optionIds,
            visitingCustomerName: visitorName,
            visitingCustomerPhone: visitorPhone,
            note: requests,
            totalPrice,
            paymentMethod,
            date,
            startTime: time,
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
  );
};

export default Payment;
