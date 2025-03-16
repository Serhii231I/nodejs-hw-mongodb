import app from './app.js';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = getEnvVar('PORT', 3000);

export async function setupServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
