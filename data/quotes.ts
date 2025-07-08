export const quotesData = [
  {
    category: "motivation",
    quotes: [
      { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
      { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
    ]
  },
  {
    category: "wisdom",
    quotes: [
      { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
      { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
      { quote: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon" },
      { quote: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" }
    ]
  },
  {
    category: "programming",
    quotes: [
      { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
      { quote: "Java is to JavaScript what car is to carpet.", author: "Chris Heilmann" },
      { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
      { quote: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" }
    ]
  },
  {
    category: "life",
    quotes: [
        { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { quote: "Get busy living or get busy dying.", author: "Stephen King" },
        { quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" }
    ]
  }
];

export const allCategories = quotesData.map(item => item.category);