import { format } from 'date-fns';
import util from 'node:util';

const Log = {
  info(instanceName: string, data: any) {
    const timestamp = format(new Date(), 'M/d/yyyy, h:mm:ss a');

    console.log(
      `[${timestamp}] LOG [${instanceName}]: ${process.env.NODE_ENV !== 'development' ? JSON.stringify(data) : ''}`,
    );

    if (process.env.NODE_ENV === 'development') {
      console.log(JSON.stringify(data, null, 2));
    }
  },
};

export default Log;
