export interface ModalProps {
  /**
   * 버튼 위치
   */
  positionCenter?: boolean
  /**
   * 완료 버튼 텍스트
   */
  okBtnText?: string
  /**
   * 완료 버튼 노출 여부
   */
  useOkBtn?: boolean
  /**
   * 취소 버튼 텍스트
   */
  cancelBtnText?: string
  /**
   * 취소버튼 노출 여부
   */
  useCancelBtn?: boolean
  /**
   * Modal 로딩 스피너 여부
   */
  isModalLoading?: boolean
  /**
   * 완료 버튼에 대한 disabled 상태
   */
  disabledOk?: boolean
}
