/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useState } from 'react';

interface ImageUploadPreviewProps {
  maxImages?: number; // 최대 이미지 개수 (선택적 prop)
  onImagesChange?: (images: string[]) => void; // 이미지 변경 시 호출될 콜백 함수 추가
}

/** 이미지 업로드 컴포넌트 */
const ImageUploadPreview = ({ maxImages = 5, onImagesChange }: ImageUploadPreviewProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // 남은 업로드 가능 개수 계산
      const remainingSlots = maxImages - selectedImages.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);

      filesToProcess.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImages((prev) => {
            const newImages = [...prev, reader.result as string];
            onImagesChange?.(newImages); // 이미지가 추가될 때 부모에게 알림
            return newImages;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prev) => {
      const newImages = prev.filter((_, index) => index !== indexToRemove);
      onImagesChange?.(newImages); // 이미지가 제거될 때 부모에게 알림
      return newImages;
    });
  };

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      `}
    >
      {selectedImages.map((image, index) => (
        <div
          key={index}
          css={css`
            position: relative;
            width: 9.4rem;
            height: 11.8rem;
            border: 1px solid ${variables.colors.gray300};
            overflow: hidden;
          `}
        >
          <img
            src={image}
            alt={`업로드된 이미지 ${index + 1}`}
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
            `}
          />
          <button
            onClick={() => handleRemoveImage(index)}
            css={css`
              position: absolute;
              top: 8px;
              right: 8px;
              background-color: ${variables.colors.gray900};
              border: none;
              border-radius: 50%;
              width: 20px;
              height: 20px;
              color: ${variables.colors.white};
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            ✕
          </button>
        </div>
      ))}

      {selectedImages.length < maxImages && (
        <label
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 9.4rem;
            height: 11.8rem;
            background-color: ${variables.colors.white};
            border: 1px solid ${variables.colors.gray300};
            cursor: pointer;
          `}
        >
          <span
            css={css`
              font-size: 24px;
              color: ${variables.colors.gray400};
              margin-bottom: 8px;
            `}
          >
            +
          </span>
          <span
            css={css`
              color: ${variables.colors.gray400};
            `}
          >
            {selectedImages.length}/{maxImages}
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            css={css`
              display: none;
            `}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploadPreview;
