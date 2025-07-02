import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Typo } from './typo';
import { Label } from './label';
import { Skeleton } from './skeleton';
import { useWatch } from 'react-hook-form';
import { useToast } from '../hooks/use-toast';
import { Card } from './card';
import { IconSquare } from './icon-square';
import { FileImageIcon, FileIcon } from 'lucide-react';
import { ButtonLink } from './button-link';

const iconFileMapper = [
  {
    extensions: ['png', 'jpg', 'jpeg', 'webp', 'svg'],
    icon: FileImageIcon,
  },
  {
    extensions: ['pdf'],
    icon: FileIcon,
  },
];

const inputSingleFileVariants = cva(
  `flex flex-col h-24 items-center justify-center w-full
    group-hover:border-zinc-400 dark:group-hover:border-zinc-500
    transition-default`,
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form' | 'type'>,
  VariantProps<typeof inputSingleFileVariants> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  loading?: boolean;
  allowedExtensions?: string[];
  maxFileSizeInMB?: number;
  form: any;
  replaceBy: React.ReactNode;
  onRemove?: () => void;
}

const InputSingleFile = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      loading,
      allowedExtensions,
      maxFileSizeInMB,
      form,
      replaceBy,
      onRemove,
      ...props
    },
    ref,
  ) => {
    const formValues = useWatch({ control: form.control });
    const name = props.name || '';
    const formFile: File = React.useMemo(
      () => formValues[name]?.[0],
      [formValues, name],
    );
    const [validFile, setValidFile] = React.useState(false);
    const [fileIcon, setFileIcon] = React.useState<any>(null);
    const { toast } = useToast();

    React.useEffect(() => {
      if (!formFile) {
        return;
      }

      const extension = formFile.name.split('.').pop()?.toLowerCase() || '';
      if (allowedExtensions && !allowedExtensions.includes(extension)) {
        toast({
          title: 'Invalid file type',
          description: `Allowed extensions ${allowedExtensions.length > 1 ? 'are' : 'is'
            } ${allowedExtensions.join(', ')}`,
          variant: 'destructive',
        });
        form.setValue(name, undefined);
        return;
      }

      if (maxFileSizeInMB && formFile.size > maxFileSizeInMB * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `Max allowed size is ${maxFileSizeInMB}MB - Current file size: ${formFile.size * 1024 * 1024
            }MB`,
          variant: 'destructive',
        });
        form.setValue(name, undefined);
        return;
      }

      setValidFile(true);
      setFileIcon(
        iconFileMapper.find((icon) => icon.extensions.includes(extension))
          ?.icon,
      );
    }, [formFile]);

    return (
      <>
        {label && (
          <>
            {' '}
            {!loading ? (
              <Label htmlFor={props.id} withFocusWithin={!props.readOnly}>
                {label}
              </Label>
            ) : (
              <Skeleton width={'7.5rem'} height={'0.875rem'} />
            )}
          </>
        )}
        <div>
          {!loading ? (
            <>
              {validFile ? (
                <div className="flex flex-col gap-2">
                  {replaceBy}
                  <Card
                    variant={'darker'}
                    className="flex items-center gap-1.5 p-1.5"
                  >
                    <IconSquare icon={fileIcon} />
                    <div className="flex flex-col">
                      <div className="truncate max-w-[17.375rem]">
                        <Typo variant="sm">{formFile?.name}</Typo>
                      </div>
                      <div className="flex gap-1">
                        <ButtonLink
                          type="button"
                          size={'xs'}
                          variant={'destructive'}
                          onClick={() => {
                            setValidFile(false);
                            form.setValue(name, undefined);
                            onRemove?.();
                          }}
                        >
                          Remove
                        </ButtonLink>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="w-full relative group cursor-pointer">
                  <input
                    id={props.name}
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    ref={ref}
                    {...props}
                  />
                  <Card
                    variant="transparent"
                    border="dashed"
                    className={inputSingleFileVariants()}
                  >
                    <Typo className="font-semibold">Drop File</Typo>
                    <Typo variant="sm">or</Typo>
                    <Typo className="font-semibold">Click to Upload</Typo>
                  </Card>
                </div>
              )}
            </>
          ) : (
            <Skeleton width={'100%'} className="!rounded-md h-24" />
          )}
        </div>
      </>
    );
  },
);
InputSingleFile.displayName = 'InputSingleFile';

export { InputSingleFile, inputSingleFileVariants };
