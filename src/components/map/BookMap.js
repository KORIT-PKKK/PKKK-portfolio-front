const exSwitch = (value) => {
    const map = {
        1: "전체",
        2: "공연/전시",
        3: "생활/클래스",
        4: "식당/카페",
        5: "숙박",
        6: "스포츠/레저",
        7: "병의원",
        8: "기타"
    }
    return map[value]?? "기타";
}