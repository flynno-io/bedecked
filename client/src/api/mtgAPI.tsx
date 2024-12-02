// src/api/mtgAPI.tsx

type mana = "W" | "U" | "B" | "R" | "G" | "C"  // mana types - white, blue, black, red, green, colorless
interface filters {
  name?: string
  type_line?: string
  oracle_text?: string
  subtype?: string
  colors?: mana[]
  cmc?: number
  power?: number
  toughness?: number
  page?: number
  limit?: number
}

const getAllCards = async (filters: filters) => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}

const getNextPage = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}

// const login = async (userInfo: UserLogin) => {
//   const response = await fetch('/auth/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userInfo),
//   });
  
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   const data: LoginResponse = await response.json();
//   console.log(data);
//   return data;
// }

export { getAllCards, getNextPage }