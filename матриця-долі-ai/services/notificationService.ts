
import type { TelegramWebApp } from '../types';

interface UserDetails {
  name: string;
  dob: string;
  email: string;
}

/**
 * Simulates sending an email. In a real application, this would be an API call to a backend service.
 * @param details - User details to be included in the email.
 */
export const sendEmail = (details: UserDetails): void => {
  const { name, dob, email } = details;
  const emailRecipient = "hipnocoaching.pl@gmail.com";
  
  const emailBody = `
    Новий запит на розбір Матриці Долі:
    --------------------------------------
    Ім'я: ${name}
    Дата народження: ${dob}
    Email: ${email}
    --------------------------------------
  `;

  console.log("--- SIMULATING EMAIL SEND ---");
  console.log(`To: ${emailRecipient}`);
  console.log(`Subject: Новий запит на розбір`);
  console.log(`Body: ${emailBody}`);
  console.log("----------------------------");

  // This alert is for demonstration purposes.
  // alert(`Симуляція: Email з вашими даними надіслано на ${emailRecipient}`);
};

/**
 * Simulates sending a message via Telegram bot. This requires a backend to securely handle the bot token.
 * @param message - The analysis result to be sent to the user.
 */
export const sendTelegramMessage = (message: string): void => {
  try {
    const tg = (window as any).Telegram.WebApp as TelegramWebApp;
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const userId = tg.initDataUnsafe.user.id;
      
      console.log("--- SIMULATING TELEGRAM MESSAGE SEND ---");
      console.log(`User ID: ${userId}`);
      console.log("Message to be sent:", message.substring(0, 200) + "...");
      console.log("This would be an API call to a backend that then calls the Telegram Bot API.");
      console.log("-----------------------------------------");

      // This alert is for demonstration purposes.
      // alert("Симуляція: Результат аналізу надіслано вам у Telegram бот.");
    } else {
      console.warn("Telegram WebApp context not found. Cannot simulate sending message.");
    }
  } catch (error) {
    console.error("Error accessing Telegram WebApp context:", error);
  }
};
