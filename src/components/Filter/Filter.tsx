import Button from '@components/Button/Button';

interface FilterProps {
  text: string;
  onClick: () => void;
}

const Filter = ({ text, onClick }: FilterProps) => {
  return (
    <Button
      type="button"
      text={text}
      variant="white"
      size="small"
      width="fit"
      icon={<img src="/img/icon-select-arrow.svg" alt="닫기 아이콘" />}
      iconSizeWidth="1rem"
      iconSizeHeight="0.4rem"
      iconPosition="right"
      disabled={false}
      onClick={onClick}
    />
  );
};

export default Filter;
