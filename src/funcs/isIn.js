// 벡터 크로스 프로덕트를 계산하는 함수
const crossProduct = (point1, point2, point3) => {
  return (
    (point2.latitude - point1.latitude) * (point3.longitude - point1.longitude) -
    (point2.longitude - point1.longitude) * (point3.latitude - point1.latitude)
  );
};

// 주어진 좌표가 삼각형 안에 있는지 확인하는 함수
const isPointInTriangle = (lat, lng) => {
  const point = { latitude: lat, longitude: lng };
  const vertexA = { latitude: 37.611835, longitude: 127.005432 }; //위쪽 꼭지점
  const vertexB = { latitude: 37.611308, longitude: 127.005298 }; //왼쪽 꼭지점
  const vertexC = { latitude: 37.611353, longitude: 127.005673 }; //오른쪽 꼭지점
  // 각 점에 대한 크로스 프로덕트를 계산
  const d1 = crossProduct(point, vertexA, vertexB);
  const d2 = crossProduct(point, vertexB, vertexC);
  const d3 = crossProduct(point, vertexC, vertexA);

  // 같은 방향(모두 양수 혹은 모두 음수)인지 확인
  const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;

  // 모두 같은 방향이면 true를 반환
  return !(hasNegative && hasPositive);
};

// test
// console.log(isPointInTriangle(37.611528, 127.00544));
// console.log(isPointInTriangle(37.611248, 127.005216));
