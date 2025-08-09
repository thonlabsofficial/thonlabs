import { format } from 'date-fns';
import util from 'node:util';

const Log = {
  common(instanceName: string, data: any) {
    const timestamp = format(new Date(), 'M/d/yyyy, h:mm:ss a');

    return `[${timestamp}] ${instanceName}: ${JSON.stringify(data)}`;
  },
  info(instanceName: string, data: any) {
    console.log(this.common(instanceName, data));
  },
  error(instanceName: string, data: any) {
    console.error(this.common(instanceName, data));
  },
};

export default Log;
