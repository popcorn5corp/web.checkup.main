export default {
  workspace: {
    createWorkspace: '워크스페이스 만들기',
    joinWorkspace: '워크스페이스 초대 코드 입력하기',
    welcomeTit: '{userName}님 환영합니다!',
    welcomeDesc: `체크업에 가입해주셔서 감사합니다.
    이제 업무를 시작하기 위해 원하시는 선택지를 선택해주세요.`,
    createStep1Tit: '회사 또는 팀 이름 입력',
    createStep1Desc: '생성되는 워크스페이스의 이름이 됩니다.',
    nameProfileDesc: `워크스페이스 내에서 사용할 프로필 이름과 사진을 등록해 주세요.`,
    profileImg: '내 프로필 사진',
    profileImgDesc: `팀원들이 적절한 사람과 대화하고 있음을
    알 수 있도록 하세요.`,
    createStep3Tit: '팀원 또는 직장 동료 추가',
    createStep3Desc: '함께할 동료를 이메일로 초대 해보세요.',
    createStep3Info: '이메일 작성 후 엔터키(enter)',
    createStep4Tit: '업종과 규모 선택',
    createStep4Desc: '팀/회사의 업종과 팀/회사의 규모(인원수)를 선택해주세요.',
    createCompleteTit: '워크스페이스 생성이 완료되었어요!',
    createCompleteDesc: '{userName}님 이제 워크스페이스를 시작해보세요.',
    inviteStep1Tit: '워크스페이스 초대 코드 입력',
    inviteStep1Desc: `수령하신 초대 코드를 아래에 입력 후 확인 절차를 진행해주세요.
    초대 코드를 받지 못하셨을 경우,
    담당자 또는 시스템 관리자분께 문의하시기 바랍니다.`,
    inviteStepJump: '이 단계 건너뛰기',
    joinCompleteTit: '{workspaceName} 워크스페이스에 참여되었어요!',
    joinCompleteDesc1: '이제 워크스페이스 사용이 가능합니다.',
    joinCompleteDesc2: '{name} 님이 사용중입니다.',
    joinCompleteDesc3: '{name} 님 외 {count}명이 사용중입니다.',
    listTitle: '워크스페이스 선택',
    listDesc: '선택한 워크스페이스로 이동합니다.',
    listCheckText: '마지막으로 사용했던 워크스페이스로 기본설정',
    listArrowText: '현재 워크스페이스',
    listInviteText: '찾고 있는 워크스페이스가 아닙니까?',
    listInviteSubText: '초대 코드 입력하기'
  },
  manage: {
    userName: '{userName} 님이 ',
    targetName: '{targetName} 님을',
    userStatus: {
      CREATE: '그룹을 생성 했습니다.',
      JOIN: '가입 되었습니다.',
      WITHDRAWN: '탈퇴 되었습니다.',
      REVOKE: '제명 되었습니다.',
      ACTIVE: '활성화하였습니다.',
      INACTIVE: '비활성화하였습니다.'
    },
    history: '타임라인',
    joined: '이미 가입됨',
    groupName: '그룹명',
    groupDescription: '그룹 설명',
    addUserToAGroup: '그룹에 사용자 추가',
    removeUserToAGroup: '그룹에서 제거',
    typingUserName: '사용자의 이름을 입력해주세요.',
    moreContent: '더 불러오기',
    groupTitle: '그룹 제목',
    groupContent: '그룹 내용',
    groupInfo: '그룹 정보',
    userInfo: '사용자 정보',
    userInvite: '사용자 초대',
    emailInvite: '이메일로 직장동료 추가',
    group: '그룹'
  },
  login: {
    createAccount: '회원가입 후 서비스 이용', //
    newUser: '계정이 없으신가요?', //
    forgotPassword: '비밀번호를 잊어버리셨나요?', //
    // 회원가입
    signUpDesc: '이미 계정이 있으신가요?',
    signUpComplete: '{ name } 님 가입이 완료되었습니다',
    signUpTerms: '개인정보 보호정책 및 약관에 동의합니다.',
    // 계정 찾기
    authPhone: '휴대폰 번호로 인증',
    authEmail: '이메일로 인증',
    certifiSuccessText: '인증정보로 확인된 아이디입니다.',
    certifiFailText: '가입되지 않은 사용자입니다.',
    resetPassword: '비밀번호 재설정',
    successResetPassword: '비밀번호 재설정이 완료되었습니다.'
  },
  userAccount: {
    passwordConfirm: `개인정보 보호를 위해 비밀번호를 확인합니다.`,
    profileName: '프로필명',
    closeEditModal: `현재 수정중인 사항이 있습니다.
페이지를 벗어나면 저장되지 않습니다.`
  }
}
