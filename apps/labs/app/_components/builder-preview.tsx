import { Card, CardContent } from '@repo/ui/card';
import SectionHeader from '@/_components/section-header';

export default function BuilderPreview() {
  const currentURL =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3000';

  return (
    <>
      <SectionHeader title="Preview" />
      <Card className="h-[46rem] overflow-hidden">
        <CardContent className="p-0 w-full h-full">
          {/* <div>
            <ThonLabsAuthPage
              params={Promise.resolve({ thonlabs: ['login'] })}
              searchParams={Promise.resolve({})}
              previewMode={true}
            />
          </div> */}
          <iframe
            src={`${currentURL}/builder-preview/login?previewMode=true`}
            className="w-full h-full"
          />
        </CardContent>
      </Card>
    </>
  );
}
