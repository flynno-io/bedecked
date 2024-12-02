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
  try {
    const token =localStorage.getItem('token');

    if (!token) {
      throw new Error('Please log in'); 
    }

    const response = await fetch('/api/cards/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // may need other required headers, e.g., authorization tokens
      },
      body: JSON.stringify(filters || {}),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch cards: ${errorMessage}`);
    }

    const data = await response.json();

    console.log('Fetched data:', data);

    return data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
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