# Vue convention 
---
## 필수 사항

0. 객체, 변수, 함수명:
    - 두 단어 이상일 경우 camelCase를 반드시 준수 (단, API를 통해 서버로 부터 넘겨 받은 데이터를 직접 접근할 경우, snake_case 허용)
1. Vue 파일 이름
    - 확장자가 vue인 파일의 이름은 PaskalCase를 준수.
    - 반드시 두단어 이상을 조합할 것. 예) LoginForm, MainPage
2. views 폴더
    - router-view를 통해 이동할 페이지 컴포넌트만 포함
    - 목적에 따라 폴더 생성 가능. 예) views/qna
    - views 폴더 안의 vue 파일들은 이름이 반드시 Page로 끝난다. 예) NotFoundPage
3. components 폴더
    - 페이지 컴포넌트에서 재사용할 컴포넌트들 포함
    - views 폴더와 같이 목적에 따라 폴더 생성 가능
    - 공통적으로 사용이 가능한 컴포넌트는 common 폴더에 저장할 것. 예) components/common
    - vue 파일이름은 다음과 같은 양식으로 적을 것
        - {FuntionTask} 예) LoginForm, PostAddForm, PostEditForm
        - {PropertyRole} 예) BounceSpinner, BigButton, MainHeader
4. assets 폴더
    - 이미지와 같은 리소스 파일 저장
5. router 폴더
    - index.js를 기본으로 router link를 등록한다.
    - path는 "/{기능}/{속성}" 형태로 적는다. 예) "/login", "/post/:id" (동적할당의 경우)
    - component 등록은 빠른 로딩을 위해 [코드 스플리팅](https://joshua1988.github.io/vue-camp/advanced/code-splitting.html)을 사용한다.
        - component: MainPage                               (x)
        - component: () => import('@/views/MainPage.vue)    (o) 
    - [네비게이션 가드](https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/)를 사용하고자 할 경우 
        - 모든 url에 대한 검사를 원할 경우 => 전역 가드
        - 특정 url에 대한 검사를 원할 경우 => 라우터 가드
        - 특정 view 컴포넌트에 들어갈 때, 또는 나갈 때 검사를 원할 경우 => 컴포넌트 가드
6. store 폴더
    - index.js를 기본으로 하고 코드가 길어질 경우, state, getters, actions, mutations를 모듈화해서 index.js에 import할 것
    - state의 property 키는 데이터를 나타내는 단어를 쓸 것. 
        - 예) id, token
    - getters의 함수는 ,단순히 state의 키를 가져올 경우, get{State}(state, ...args) 형태로 쓸 것. 
        - 예) getId(state), getToken(state) 
    - mutations의 함수는 {functionState}(state, ...args) 형태로 쓸 것. 
        - 예) setId(state), clearUserInfo(state) 
        - 만약 state를 한번에 여러개 처리할 경우, 각각의 함수를 따로 만들어줄 것. 
        - 예) clearId(state), clearToken(state)
    - actions의 함수는 {FUNCTION}({commit},...args) 형태로 쓸 것. 
        - 예) LOGIN({commit}, userData)
7. utils 폴더
    - utils 폴더 안 파일명은 camelCase을 준수한다.
    - cookies 또는 validation, filter와 같이 공통적으로 사용이 가능한 함수들은 기능별로 저장한다.
    

## 권장 사항
1. 파일 참조
    - 파일 참조는 '@'를 활용한 절대경로로 쓸 것을 권장.
        -  리팩토링에 파일위치가 바뀔 때마다 상대 경로를 체크해야하기 때문.
        ```
        예) 
        import MainHeader from '../component/common/MainHeader' (x),
        import MainHeader from '@/componenet/common/MainHeader' (o),
        ``` 
2. store 사용
    - template 안의 마크업에서 이벤트 처리시 동작할 $store 함수가 길이가 짧더라도 method에 기술할 것을 권장
        -예)
        ```
         <div @click="$store.state.id=3"> (X) 
         ////////////////////////////////////
         <div @click="assign3"> (O) 
         method:{
             assign3(){
                 // 단순한 예시로 적긴했지만, 왠만해서는 mutation으로 값 할당 시킬 것.
                 this.$store.state.id=3
             }
         }

         ```
