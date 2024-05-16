export const generateRandomHexColor = () => {
  // 生成随机的 R、G、B 分量
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // 将 R、G、B 转换为十六进制字符串，并确保长度为两位
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  // 拼接成十六进制颜色字符串并返回
  return `#${rHex}${gHex}${bHex}`;
};

export function sumRandom(max, min) {
  var num = Math.floor(Math.random() * (max - min) + min);
  return num;
}

export function gradientRandom(loop: number = 3) {
  const colors: string[] = [];
  while (loop) {
    const deg = sumRandom(360, 0);
    const [color1, color2] = [
      generateRandomHexColor(),
      generateRandomHexColor()
    ];
    colors.push(`linear-gradient(${deg}deg, ${color1}, ${color2} 60.66%)`);
    loop--;
  }
  return `${colors.join(',')};`;
}
