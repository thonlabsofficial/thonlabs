import { format } from 'date-fns';

const Log = {
  info(instanceName: string, data: any) {
    const timestamp = format(new Date(), 'M/d/yyyy, h:mm:ss a');

    console.log(
      `[${timestamp}] LOG [${instanceName}]: ${JSON.stringify(data)}`,
    );
  },
};

export default Log;
