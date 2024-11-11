'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

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
    <div>
      <h1 className="text-4xl text-center font-semibold">CUSTOMER INFORMATION</h1>
      <Separator className="my-8 w-full mx-auto md:w-[800px]" />
      <Form {...form}>
        <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
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
                <FormLabel>Last Name</FormLabel>
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
                <FormLabel>Phone Number</FormLabel>
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit">
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CustomerInformationPage;
