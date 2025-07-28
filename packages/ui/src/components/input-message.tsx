import type { Input } from './input';
import { Typo } from './typo';

interface Props extends React.HTMLAttributes<HTMLElement> {
  size?: React.ComponentProps<typeof Input>['size'];
  state?: 'error' | 'default';
}

export function InputMessage({
  size = 'sm',
  state = 'error',
  ...props
}: Props) {
  return <Typo variant={size} state={state} className='text-sm' {...props} />;
}
