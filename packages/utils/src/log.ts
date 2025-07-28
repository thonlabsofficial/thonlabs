import { format } from 'date-fns';

const Log = {
  info(instanceName: string, data: any) {
    const timestamp = format(new Date(), 'M/d/yyyy, h:mm:ss a');

    console.log(
      `[${timestamp}] LOG [${instanceName}]: ${process.env.NODE_ENV !== 'development' ? JSON.stringify(data) : ''}`
    );

    if (process.env.NODE_ENV === 'development') {
      console.log(data);
    }
  },
};

export default Log;
