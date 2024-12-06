import Button from '@components/Button/Button';

const Filter = ({ text }: { text: string }) => {
  return (
    <Button
      type="button"
      text={text}
      variant="white"
      size="small"
      width="fit"
      icon={<img src="./img/icon-select-arrow.svg" alt="닫기 아이콘" />}
      iconSizeWidth="1rem"
      iconSizeHeight="0.4rem"
      iconPosition="right"
      disabled={false}
    />
  );
};

export default Filter;
