# 모바일 테스트 가이드

## 방법 1: 브라우저 개발자 도구 사용 (추천)

### Chrome/Edge
1. 개발 서버 실행: `npm run dev`
2. 브라우저에서 `http://localhost:5173` 접속
3. `F12` 또는 `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)로 개발자 도구 열기
4. `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Windows)로 디바이스 모드 활성화
5. 상단에서 디바이스 선택:
   - iPhone SE (375px)
   - iPhone 12/13 Pro (390px)
   - iPhone 14 Pro Max (430px)
   - Samsung Galaxy S20/S21 (360px)
   - iPad (768px)

### Firefox
1. 개발 서버 실행: `npm run dev`
2. 브라우저에서 `http://localhost:5173` 접속
3. `F12`로 개발자 도구 열기
4. 반응형 디자인 모드 아이콘 클릭 (또는 `Cmd+Shift+M`)

## 방법 2: 실제 모바일 기기에서 테스트

### 1단계: 네트워크 설정
터미널에서 다음 명령어로 실행:
```bash
cd /Users/mann/cursor/baseball
npm run dev -- --host
```

또는 vite.config.js를 수정:
```js
server: {
  host: '0.0.0.0',  // 모든 네트워크 인터페이스에서 접근 가능
}
```

### 2단계: IP 주소 확인
터미널에서 다음 명령어 실행:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

또는:
```bash
ipconfig getifaddr en0  # Wi-Fi
ipconfig getifaddr en1  # 이더넷
```

출력 예시: `192.168.1.100`

### 3단계: 모바일 기기에서 접속
1. PC와 모바일이 같은 Wi-Fi 네트워크에 연결되어 있는지 확인
2. 모바일 브라우저에서 접속:
   ```
   http://192.168.1.100:5173
   ```
   (위에서 확인한 IP 주소 사용)

## 현재 반응형 디자인 적용 상태

### 모바일 (767px 이하)
- 좌우 패딩: 20px (`px-5`)
- 캐릭터 이미지: 160px × 160px (`w-40 h-40`)
- 제목 폰트: 2.25rem (`text-4xl`)
- 입력 필드: 전체 너비, 중앙 정렬

### 태블릿 (768px ~ 1023px)
- 좌우 패딩: 40px (`md:px-10`)
- 캐릭터 이미지: 192px × 192px (`sm:w-48 sm:h-48`)
- 제목 폰트: 3rem (`sm:text-5xl`)

### 데스크톱 (1024px 이상)
- 최대 너비: 800px (`lg:max-w-2xl`)
- 좌우 패딩: 160px (`lg:px-40`)
- 캐릭터 이미지: 256px × 256px (`md:w-64 md:h-64`)
- 제목 폰트: 3.75rem (`md:text-6xl`)

## 테스트 체크리스트

- [ ] 캐릭터 선택 화면이 가로로 잘 배치되는지
- [ ] 텍스트가 잘리지 않는지
- [ ] 입력 필드가 터치하기 편한 크기인지
- [ ] 버튼이 충분히 큰지 (최소 44px × 44px 권장)
- [ ] 스크롤이 필요한 부분이 있는지
- [ ] 이미지가 적절한 크기로 표시되는지
