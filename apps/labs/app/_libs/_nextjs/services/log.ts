const Log = {
  info(data: any) {
    const date = new Date();
    const timestamp = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours() % 12 || 12}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;

    console.log(`[${timestamp}] TL_LOG: ${JSON.stringify(data)}`);
  },
};

export default Log;
