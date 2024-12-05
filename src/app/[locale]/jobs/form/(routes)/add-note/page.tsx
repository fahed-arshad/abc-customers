'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { useJobFormStore } from '../../hooks/useJobFormStore';
import useJobForm from '../../hooks/useJobForm';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

import { ArrowRight } from 'lucide-react';

const formSchema = z.object({
  note: z.string().optional()
});

type FormProps = z.infer<typeof formSchema>;

function AddNotePage() {
  const { goToNextStep } = useJobForm();
  const t = useTranslations('form.addNotePage');
  const note = useJobFormStore((state) => state.job.note);
  const setNote = useJobFormStore((state) => state.setNote);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: ''
    },
    values: { note }
  });

  const handleOnSubmit = (data: FormProps) => {
    console.log(data);
    setNote(data.note);
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
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('noteField.title')}</FormLabel>
                <FormDescription>{t('noteField.description')}</FormDescription>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" className="w-full md:w-fit">
              {t('cta')} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AddNotePage;
