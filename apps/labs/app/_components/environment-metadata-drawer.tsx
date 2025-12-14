'use client';

import { Button } from '@repo/ui/button';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerContentContainer,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerScrollArea,
	DrawerTitle,
	DrawerTrigger,
} from '@repo/ui/drawer';
import { Typo, typoVariants } from '@repo/ui/typo';
import { Alert, AlertDescription } from '@repo/ui/alert';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import MetadataValueForm from '@/_components/metadata-value-form';
import { useMetadataModels } from '@/_hooks/use-metadata-models';
import { EnvironmentDetail } from '@/_interfaces/environment';
import { z } from 'zod';
import { createMetadataSchema } from '@/_validators/metadata-validators';
import useEnvironment from '@/_hooks/use-environment';

type Props = {
	trigger?: React.ReactNode;
	environment: EnvironmentDetail;
};

export default function EnvironmentMetadataDrawer({
	trigger,
	environment,
	...props
}: Props & React.ComponentProps<typeof Drawer>) {
	const [open, setOpen] = React.useState(props.open || false);
	const { environmentId } = useParams();
	const { metadataModels, isLoadingMetadataModels } =
		useMetadataModels('Environment');
	const [isSaving, startTransitionSaving] = useTransition();
	const { updateEnvironmentMetadata } = useEnvironment();

	const formSchema = z.object({
		metadata: createMetadataSchema(metadataModels),
	});

	type FormData = z.infer<typeof formSchema>;

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	React.useEffect(() => {
		if (props.open || open) {
			handleReset();
		}
	}, [props.open, open, metadataModels]);

	function onSubmit(payload: FormData) {
		startTransitionSaving(async () => {
			try {
				await updateEnvironmentMetadata(environment.id, payload.metadata || {});
				setOpen(false);
				props.onOpenChange?.(false);
			} catch {}
		});
	}

	function handleReset() {
		form.clearErrors();
		form.reset({
			metadata: {},
		});

		if (environment.metadata) {
			Object.keys(environment.metadata).forEach((key) => {
				let value = environment.metadata![key];
				if (value !== null && typeof value === 'object') {
					value = JSON.stringify(value);
				}
				form.setValue(`metadata.${key}` as any, value);
			});
		}
	}

	return (
		<Drawer open={open} onOpenChange={setOpen} {...props}>
			{trigger && (
				<DrawerTrigger asChild onClick={handleReset}>
					{trigger}
				</DrawerTrigger>
			)}
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Global Metadata</DrawerTitle>
					<DrawerDescription>
						Manage metadata values for this environment that apply globally across
						your application.
					</DrawerDescription>
				</DrawerHeader>
				<form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
					<DrawerScrollArea>
						<DrawerContentContainer>
							<div className="grid w-full items-center gap-6">
								<section>
									<header className="flex flex-col gap-0.5 mb-2">
										<Typo variant="lg" className="flex items-center gap-1">
											Environment Metadata
										</Typo>
									</header>
									{isLoadingMetadataModels ? (
										<div className="text-sm text-zinc-500">
											Loading metadata models...
										</div>
									) : metadataModels.length === 0 ? (
										<Alert variant="info" size={'sm'}>
											<AlertDescription>
												No metadata models found for environments.{' '}
												<Link
													href={`/${environmentId}/metadata/models`}
													className={typoVariants({ variant: 'link' })}
												>
													Create a metadata model
												</Link>{' '}
												with "Environment" context to start adding custom fields.
											</AlertDescription>
										</Alert>
									) : (
										<MetadataValueForm
											form={form}
											metadataModels={metadataModels}
											context="environments"
										/>
									)}
								</section>
							</div>
						</DrawerContentContainer>
					</DrawerScrollArea>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button
								type="button"
								variant="ghost"
								disabled={isSaving}
								size="md"
							>
								Back
							</Button>
						</DrawerClose>
						<Button
							type="submit"
							loading={isSaving}
							size="md"
							disabled={
								!form.formState.isDirty ||
								isSaving ||
								metadataModels.length === 0
							}
						>
							{isSaving ? 'Saving...' : 'Save Changes'}
						</Button>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	);
}
