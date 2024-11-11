'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import useJobForm from '../../hooks/useJobForm';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { ArrowRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  isStandardServiceType: z.boolean()
});

type FormProps = z.infer<typeof formSchema>;

function ServiceTypePage() {
  const { goToNextStep } = useJobForm();

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isStandardServiceType: true
    }
  });

  const handleOnSubmit = (data: FormProps) => {
    console.log(data);
    goToNextStep();
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-semibold">SERVICE TYPE</h1>
      <Separator className="my-8 w-full mx-auto md:w-[800px]" />
      <Form {...form}>
        <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormField
            control={form.control}
            name="isStandardServiceType"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Standard service</FormLabel>
                  <FormDescription>20-120+ minute wait time</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
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

export default ServiceTypePage;
