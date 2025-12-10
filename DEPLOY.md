# Vercel 배포 가이드

## 배포 방법

### 방법 1: Vercel 웹사이트에서 배포 (추천)

1. **Vercel 계정 생성/로그인**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인 (권장)

2. **프로젝트 가져오기**
   - Vercel 대시보드에서 "Add New Project" 클릭
   - GitHub 저장소 `mann-WOO/baseball` 선택
   - Import 클릭

3. **프로젝트 설정**
   - Framework Preset: Vite (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (자동 설정됨)
   - Output Directory: `dist` (자동 설정됨)
   - Install Command: `npm install` (자동 설정됨)

4. **환경 변수**
   - 현재는 필요 없음 (추후 필요시 추가)

5. **배포 실행**
   - "Deploy" 버튼 클릭
   - 배포 완료까지 약 1-2분 소요

6. **배포 완료**
   - 배포 완료 후 자동으로 URL 생성
   - 예: `https://baseball-xxx.vercel.app`
   - 커스텀 도메인 설정 가능

### 방법 2: Vercel CLI로 배포

1. **Vercel CLI 설치**
   ```bash
   npm install -g vercel
   ```

2. **로그인**
   ```bash
   vercel login
   ```

3. **배포**
   ```bash
   cd /Users/mann/cursor/baseball
   vercel
   ```

4. **프로덕션 배포**
   ```bash
   vercel --prod
   ```

## 배포 후 확인사항

- [ ] 모든 화면이 정상적으로 표시되는지
- [ ] 이미지 리소스가 제대로 로드되는지
- [ ] 게임 로직이 정상 작동하는지
- [ ] 모바일에서도 정상 작동하는지
- [ ] 반응형 디자인이 제대로 적용되는지

## 자동 배포 설정

GitHub 저장소와 연결하면:
- `main` 브랜치에 push할 때마다 자동 배포
- Pull Request 생성 시 프리뷰 배포 자동 생성

## 커스텀 도메인 설정

1. Vercel 대시보드에서 프로젝트 선택
2. Settings > Domains 메뉴
3. 원하는 도메인 입력
4. DNS 설정 안내에 따라 도메인 설정

## 환경 변수 (필요시)

현재는 환경 변수가 필요 없지만, 추후 필요시:
1. Vercel 대시보드 > 프로젝트 > Settings > Environment Variables
2. 변수 추가

## 트러블슈팅

### 이미지가 로드되지 않는 경우
- `public/resources/` 경로 확인
- 빌드 후 `dist/resources/`에 파일이 있는지 확인

### 라우팅 문제
- `vercel.json`의 `rewrites` 설정 확인
- SPA 라우팅을 위해 모든 경로를 `index.html`로 리다이렉트

### 빌드 실패
- `package.json`의 빌드 스크립트 확인
- Vercel 빌드 로그 확인
