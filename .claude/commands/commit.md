# /commit - Conventional Commits 명령어

변경사항을 Conventional Commits 규칙에 따라 커밋합니다.

## 사용법

```
/commit [타입(스코프): 설명]
```

## Conventional Commits 형식

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## 커밋 타입

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정  
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
- `refactor`: 기능 변경 없는 코드 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 추가 또는 수정
- `chore`: 빌드 작업, 패키지 매니저 설정 등
- `ci`: CI 설정 파일 및 스크립트 변경
- `build`: 빌드 시스템 또는 외부 종속성 변경

## 예시

```
/commit feat: 카카오 로그인 기능 추가
/commit fix: 앱 크래시 문제 해결
/commit feat(auth): 소셜 로그인 구현
/commit docs: README 파일 업데이트
/commit style: 코드 포맷팅 정리
/commit refactor(components): 공통 컴포넌트 구조 개선
```

## 동작

1. 현재 변경사항을 확인합니다
2. Conventional Commits 형식으로 커밋을 생성합니다
3. 커밋 메시지에 자동으로 Claude Code 서명을 추가합니다

커밋 메시지를 제공하지 않으면 변경사항을 분석하여 적절한 Conventional Commits 형식의 메시지를 자동으로 생성합니다.
