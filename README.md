# travue

### ...ing

- 하트
- 댓글(댓글 뿌리기 end)
- 로딩화면 구현
- 모든 페이지의 취소버튼
- 에러페이지

### 수정해야할 부분

1. 새 글, 수정 페이지에서 v-calendar 없애는 이벤트 수정
   -> 문제는 데이터 피커 안의 월 선택 레이아웃이 데이터 피커 div 안에 있음에도 불구하고 이벤트에서는 다른 레이아웃으로 적용된다. 이벤트버블링에 대해 공부하고 다시 해봐야할 듯..? (@click.stop, 마우스, 포커스 이벤트, 인풋 바꼈을 때 등 다 해봤는데.. 더 알아볼 것)
2. 수정페이지에서 캘린더 값을 수정해야 할 날짜로 넣었을 때 안바뀜...
   -> v-calendar는 field 옵션이 없어서 값을 v-model로 지정하여 값을 나타내고 싶은 곳에 넣어줘야하는데 .. 수정페이지가 처음 뜰 때 수정해야 할 값을 넣어놔야 하기 때문에 여기서 꼬인 듯..? 여러가지의 경우의 수 더 시험해 볼 것
3. 수정 페이지 열었을 때 수정해야 할 값을 다 띄우는 데 이것을 건드리지 않고 수정버튼을 눌러 수정할 때 들어갔던 값이 그대로 전송되게 하기!(지금은 전송되는 값이 빈칸으로 전송됨.. 왜지?)
4. 로그인 인증 로직 수정해야함...
5. 로그인 시 비밀번호나 존재하지않는 아이디 등 설정해야됨... alret이 안뜸..
6. 포스트 팝업창은 어디에도 속해있지않는 컴포넌트인데 메인뷰에서 클릭하면 메인뷰의 데이터를 띄워야하고, 마이투어뷰에서 클릭하면 마이투어뷰의 데이터를 띄워야함.. mitt 안됨 아예 로직을 바꿔야할 듯
7. 유저 정보에 가지고있는 하트 배열과 글 no를 조인시키기 위해 반복문을 돌렸더니 하트가 엄청 많이 생김.. 이것도 로직 아예 바꿔야할 듯..? 좀 더 생각해보잣..
