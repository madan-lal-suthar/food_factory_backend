import nodeCron from 'node-cron';

nodeCron.schedule('*/1 * * * *',()=> {
    console.log("Cron job executed every 5 minutes");
});
