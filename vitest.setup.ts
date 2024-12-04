// DOM 환경을 위한 폴리필 추가
// fetch API 폴리필
// import 'whatwg-fetch';

// 테스트 전 공통적으로 사용할 설정
globalThis.BASE_URL = 'http://localhost:5173';

// 필요하면 Jest 스타일의 매처 확장
import '@testing-library/jest-dom';
