export function _debounce (func, wait, leading = false) {
  let inDebounce
  return function() {
    // inDebounce 값이 변하기 전에 미리 저장
    let callNow = leading && !inDebounce

    // leading=true가 아닌 경우에만 wait 이후 func이 실행되도록 함
    const later = () => {
      inDebounce = null
      if (!leading) func.apply(this, ...arguments)
    }

    // setTimeout이 실행된 Timeout의 ID를 반환하고, clearTimeout()으로 이를 해제할 수 있음을 이용
    clearTimeout(inDebounce)
    inDebounce = setTimeout(later, wait)

    // 만약 leading=true이고 inDebounce가 없으면 func를 실행
    if (callNow) func.apply(this, ...arguments)
  }
}