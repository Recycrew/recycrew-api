import { app } from './app';

const PORT = 3000;

const server = app.listen(PORT, () => console.log('Application is running on ' + PORT));

process.on('SIGINT', () => {
    server.close();
    console.log('Application closed');
})