'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { useJobFormStore } from '../../hooks/useJobFormStore';
import useJobForm from '../../hooks/useJobForm';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { ArrowRight } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  phone: z.string().min(1, 'Required'),
  email: z.string().email().min(1, 'Required')
});

type FormProps = z.infer<typeof formSchema>;

function CustomerInformationPage() {
  const { goToNextStep } = useJobForm();
  const t = useTranslations('form.customerInformationPage');
  const customer = useJobFormStore((state) => state.job.customer);
  const setCustomer = useJobFormStore((state) => state.setCustomer);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    },
    values: customer
  });

  const handleOnSubmit = (data: FormProps) => {
    console.log(data);
    setCustomer(data);
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('firstNameField.title')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('lastNameField.title')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phoneField.title')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emailField.title')}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit">
              {t('cta')} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CustomerInformationPage;
