'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import useJobForm from '../../hooks/useJobForm';
import { useJobFormStore } from '../../hooks/useJobFormStore';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import { ArrowRight } from 'lucide-react';

const formSchema = z.object({
  isStandardServiceType: z.boolean()
});

type FormProps = z.infer<typeof formSchema>;

function ServiceTypePage() {
  const { goToNextStep } = useJobForm();
  const t = useTranslations('form.serviceTypePage');
  const service = useJobFormStore((state) => state.job.service);
  const setService = useJobFormStore((state) => state.setService);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isStandardServiceType: false
    },
    values: {
      isStandardServiceType: service?.type === 'TOW'
    }
  });

  const handleOnSubmit = (data: FormProps) => {
    setService(data.isStandardServiceType ? 'TOW' : undefined);
    goToNextStep();
  };

  return (
    <div className="container py-20">
      <h1 className="text-4xl text-center font-semibold">{t('title')}</h1>
      <Separator className="my-8 w-full mx-auto md:w-[800px]" />
      <Form {...form}>
        <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormField
            control={form.control}
            name="isStandardServiceType"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{t('standardServiceField.title')}</FormLabel>
                  <FormDescription>{t('standardServiceField.description')}</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" className="w-full md:w-fit" disabled={!form.watch('isStandardServiceType')}>
              {t('cta')} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ServiceTypePage;
