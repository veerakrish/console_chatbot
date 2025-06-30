require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline');

// Access your API key from .env file
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
    
    while (true) {
      const prompt = await askQuestion('\nEnter your question (or type "exit" to quit): ');
      
      if (prompt.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close();
        break;
      }

      console.log('\nThinking...');
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log('\nResponse:', text);
    }
  } catch (error) {
    console.error('Error:', error);
    rl.close();
  }
}

run();
