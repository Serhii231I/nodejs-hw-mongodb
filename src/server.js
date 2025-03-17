import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {
  getAllContacts,
  getContactById,
} from './services/contactsWorkService.js';

const PORT = process.env.PORT || 3000;

export async function setupServer() {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.get('/contacts', async (req, res) => {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    });

    app.get('/contacts/:id', async (req, res) => {
      const { id } = req.params;
      const contact = await getContactById(id);
      if (contact === null) {
        return res.status(404).send('Contact not found!');
      }

      res.status(200).json({
        message: `Successfully found contact with id ${id}!`,
        data: contact,
      });
    });

    app.use('*', (req, res, next) => {
      res.status(404).json({
        message: 'Not found',
      });
    });

    app.use((err, req, res, next) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
