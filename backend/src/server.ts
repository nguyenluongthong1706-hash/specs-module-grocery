import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/categories', categoryRoutes);


// Route mặc định
app.get('/', (req, res) => {
  res.send('Store Inventory API is running...');
});

// Khởi chạy
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});