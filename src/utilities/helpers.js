const generateRoomCode = function generateRoomCode() {
  const list = 'ABCDEFGHIJKLMNPQRSTUVWXY';
  let res = '';
  for (let i = 0; i < 4; i += 1) {
    const random = Math.floor(Math.random() * list.length);
    res += list.charAt(random);
  }
  return res;
};

export { generateRoomCode };
