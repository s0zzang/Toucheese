type DecodeSearchParamsToString = (searchParams: URLSearchParams) => string;

// searchParams를 디코딩 후 다시 문자열로 변환
export const decodeSearchParamsToString: DecodeSearchParamsToString = (searchParams) => {
  // 모든 key-value 쌍을 디코딩
  const decodedParams = Array.from(searchParams.entries()).map(([key, value]) => {
    return `${key}=${decodeURIComponent(value)}`;
  });

  // '&'로 join하여 최종 문자열 반환
  return decodedParams.join('&');
};
