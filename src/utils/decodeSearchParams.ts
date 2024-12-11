type DecodeSearchParamsToString = (searchParams: URLSearchParams) => string;

// searchParams를 디코딩 후 다시 문자열로 변환
export const decodeSearchParamsToString: DecodeSearchParamsToString = (searchParams) => {
  const decodedParams = Array.from(searchParams.entries()).map(([key, value]) => {
    // value에서 '%' 문자를 '%25'로 변환하여 인코딩
    const encodedValue = value.replace(/%/g, '%25');
    return `${key}=${encodedValue}`;
  });

  // '&'로 join하여 최종 문자열 반환
  return decodedParams.join('&');
};
