# travue

### ...ing

- 로딩화면 구현(서스펜스)
- 로그인 인증 수정

### 수정해야할 부분

2. 로그인 인증(라우터) 수정
3. 하트 로직 변경하기
4. 서스펜스 안먹음... 하...

### 해결방법

- 포스트 팝업창을 클릭하는 순간 그 포스트의 컨텐츠 넘버를 쿼리로 서버로 보내 그 컨텐츠와 그 컨텐츠에 적힌 댓글만 호출해서 띄우는 방식으로 변경
- script setup 안에서 ref 변수에 값을 대입할 때는 ref변수.value = 대입할 값 으로 해야함
