import useModal from '@hooks/useModal';
import DimmedModal from './components/DimmedModal';

const StudioDimTest = () => {
  const { open } = useModal(1);

  const handleClick = () => {
    console.log('클릭');
    open();
  };

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
      <DimmedModal />
    </>
  );
};

export default StudioDimTest;
