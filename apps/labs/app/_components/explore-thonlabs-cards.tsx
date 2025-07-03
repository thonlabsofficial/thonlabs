import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardArrowRight,
} from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import { Building, Globe, Mail, ShieldEllipsis } from 'lucide-react';
import Link from 'next/link';

interface ExploreThonLabsCardProps {
  title: string;
  description: string;
  icon: any;
  link: string;
}

function ExploreThonLabsCard({
  title,
  description,
  icon,
  link,
}: ExploreThonLabsCardProps) {
  return (
    <Link href={link}>
      <Card icon={icon} variant="link" padding className="h-full">
        <CardHeader className="flex !flex-row items-center justify-between">
          <CardTitle className="flex gap-1">{title}</CardTitle>
          <CardArrowRight className="w-4 h-4" />
        </CardHeader>
        <CardContent>
          <Typo variant="muted">{description}</Typo>
        </CardContent>
      </Card>
    </Link>
  );
}

interface Props {
  environmentId: string;
}

export default function ExploreThonLabsCards({ environmentId }: Props) {
  return (
    <div className="grid grid-cols-4 items-stretch gap-3">
      <ExploreThonLabsCard
        title="Auth Builder"
        description="Setup SSO providers for your users, configure colors and tokens"
        icon={ShieldEllipsis}
        link={`/${environmentId}/builder`}
      />
      <ExploreThonLabsCard
        title="Custom Templates"
        description="Build customizable email templates with a Notion-style editor"
        icon={Mail}
        link={`/${environmentId}/email-templates`}
      />
      <ExploreThonLabsCard
        title="Setup Domain"
        description="Configure your custom domain for authentication"
        icon={Globe}
        link={`/${environmentId}/settings`}
      />
      <ExploreThonLabsCard
        title="Create Organizations"
        description="Effortless access control with organization-based user management"
        icon={Building}
        link={`/${environmentId}/organizations`}
      />
    </div>
  );
}
