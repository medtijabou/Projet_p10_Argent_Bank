const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const dbConnection = require('./database/connection'); // Assure-toi que ce fichier existe et marche
const accountRoute = require('./routes/accountRoute');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connexion à la base de données
dbConnection();

// Gestion du CORS
app.use(cors());

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Chargement de la documentation Swagger
const swaggerDocs = yaml.load('./swagger.yaml');

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user', accountRoute);
app.use('/api/v1/user', transactionRoutes);


// Route Swagger UI, uniquement en dev
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// Route racine
app.get('/', (req, res) => {
  res.send('Hello from my Express server v2!');
});

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
