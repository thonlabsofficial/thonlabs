const Log = {
  generateTimestamp() {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours() % 12 || 12}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  },
  info(data: any) {
    const timestamp = this.generateTimestamp();
    console.log(`[${timestamp}] TL_LOG: ${JSON.stringify(data)}`);
  },
  error(data: any) {
    const timestamp = this.generateTimestamp();
    console.error(`[${timestamp}] TL_ERROR: ${JSON.stringify(data)}`);
  },
};

export default Log;
