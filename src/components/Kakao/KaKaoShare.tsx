/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

interface KakaoShareProps {
  title: string;
  description: string;
  imageUrl: string;
  webUrl: string;
  mobileWebUrl?: string;
}

const KakaoShareButton = ({ title, description, imageUrl, webUrl, mobileWebUrl }: KakaoShareProps) => {
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY;
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(apiKey);
    }
  }, []);

  const handleShare = () => {
    window.Kakao.Share.createDefaultButton({
      container: '#kakaotalk-sharing-btn',
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: mobileWebUrl || webUrl,
          webUrl,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: mobileWebUrl || webUrl,
            webUrl,
          },
        },
      ],
    });
  };

  return (
    <a
      id="kakaotalk-sharing-btn"
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleShare();
      }}
    >
      <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png" />
    </a>
  );
};

export default KakaoShareButton;
