import useModal from '@hooks/useModal';
import { SwiperSlide } from 'swiper/react';
import DimmedModal from './components/DimmedModal';

const StudioDimTest = () => {
  const { open } = useModal(1);

  const handleClick = () => {
    console.log('클릭');
    open();
  };

  const items = [
    {
      id: 530,
      userId: 1,
      userName: '김멋사',
      menuId: 71,
      menuName: '증명사진',
      content: '촬영 분위기가 편안해서 자연스러운 사진을 얻을 수 있었습니다.',
      rating: 3,
      reviewImages: [
        {
          id: 1285,
          reviewId: 530,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
      ],
      created_at: '2024-12-13T05:05:39',
      updated_at: '2024-12-13T05:05:39',
      imageExists: true,
    },
    {
      id: 531,
      userId: 1,
      userName: '김멋사',
      menuId: 71,
      menuName: '증명사진',
      content: '스텝분들이 친절하고 프로페셔널하셔서 마음에 들었어요.',
      rating: 3,
      reviewImages: [
        {
          id: 1286,
          reviewId: 531,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1287,
          reviewId: 531,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1288,
          reviewId: 531,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
      ],
      created_at: '2024-12-13T05:05:39',
      updated_at: '2024-12-13T05:05:39',
      imageExists: true,
    },
    {
      id: 532,
      userId: 1,
      userName: '김멋사',
      menuId: 71,
      menuName: '증명사진',
      content: '예약부터 촬영까지 모든 과정이 매끄럽게 진행됐습니다.',
      rating: 4,
      reviewImages: [
        {
          id: 1289,
          reviewId: 532,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1290,
          reviewId: 532,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1291,
          reviewId: 532,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1292,
          reviewId: 532,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1293,
          reviewId: 532,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
      ],
      created_at: '2024-12-13T05:05:39',
      updated_at: '2024-12-13T05:05:39',
      imageExists: true,
    },
    {
      id: 533,
      userId: 1,
      userName: '김멋사',
      menuId: 71,
      menuName: '증명사진',
      content: '사진 수정 요청도 친절히 대응해주셔서 기분이 좋았어요.',
      rating: 3,
      reviewImages: [
        {
          id: 1294,
          reviewId: 533,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1295,
          reviewId: 533,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1296,
          reviewId: 533,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1297,
          reviewId: 533,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1298,
          reviewId: 533,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
      ],
      created_at: '2024-12-13T05:05:39',
      updated_at: '2024-12-13T05:05:39',
      imageExists: true,
    },
    {
      id: 534,
      userId: 1,
      userName: '김멋사',
      menuId: 71,
      menuName: '증명사진',
      content: '사진 수정 요청도 친절히 대응해주셔서 기분이 좋았어요.',
      rating: 5,
      reviewImages: [
        {
          id: 1299,
          reviewId: 534,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
        {
          id: 1300,
          reviewId: 534,
          url: 'https://picsum.photos/600/400',
          created_at: '2024-12-13T05:29:35.219594',
          updated_at: '2024-12-13T05:29:35.219594',
        },
      ],
      created_at: '2024-12-13T05:05:39',
      updated_at: '2024-12-13T05:05:39',
      imageExists: true,
    },
  ];

  const slides = items.map((item) => (
    <SwiperSlide key={item.id}>
      <div>{item.content}</div>
    </SwiperSlide>
  ));

  return (
    <>
      <button onClick={handleClick}>
        <img src="https://i.imgur.com/BMDwLgQ.jpeg" alt="테스트 이미지" style={{ width: '9.4rem', height: '11.8rem' }} />
      </button>
      <button>
        <img src="https://i.imgur.com/BMDwLgQ.jpeg" alt="테스트 이미지" style={{ width: '9.4rem', height: '11.8rem' }} />
      </button>
      <button>
        <img src="https://i.imgur.com/BMDwLgQ.jpeg" alt="테스트 이미지" style={{ width: '9.4rem', height: '11.8rem' }} />
      </button>
      <DimmedModal children={slides} />
    </>
  );
};

export default StudioDimTest;
