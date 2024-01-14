// generate a random number between min and max (inclusive)
export const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
// generate a random array of numbers
export const randomNumberArray = (length: number) => {
    return Array.from({ length }, () => randomNumber(1, 100));
}

// Create an array of nested arrays with random numbers
export const nestedNumberArrays = Array.from({ length: 3 }, () => randomNumberArray(5));

// generate a random string (for name and email)
export const randomString = (length: number) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // generate a random email address
  export const randomEmail = () => {
    const domain = ['gmail.com', 'yahoo.com', 'example.com'];
    const randomDomain = domain[Math.floor(Math.random() * domain.length)];
    return randomString(8) + '@' + randomDomain;
  }
  
  // generate a random user object
  export const randomUser = () => {
    return {
      id: Math.floor(Math.random() * 1000), // Assuming user IDs are integers
      name: randomString(8),
      email: randomEmail(),
      age: Math.floor(Math.random() * 50) + 18,
      description: ''
    };
  }
  
  
  
  
  