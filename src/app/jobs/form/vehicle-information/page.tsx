'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';

import { getVehicleMakes, getVehicleModels } from '@/app/actions/vehicle';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Autocomplete } from '@/components/ui/autocomplete';

import { vehicleColors, VehicleYears } from './data/vehicle-data';

import { ArrowRight } from 'lucide-react';

const formSchema = z.object({
  make: z.string().min(1, 'Required'),
  model: z.string().min(1, 'Required'),
  year: z.string().min(1, 'Required'),
  color: z.string().min(1, 'Required'),
  registrationNo: z.string().min(1, 'Required')
});

type FormProps = z.infer<typeof formSchema>;

function VehicleInformationPage() {
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: '',
      model: '',
      year: '',
      color: '',
      registrationNo: ''
    }
  });

  const { data: vehicleMakes, isLoading: isVehicleMakesLoading } = useQuery({
    queryKey: ['vehicles', 'makes', form.watch('make')],
    queryFn: () => getVehicleMakes(form.watch('make'))
  });

  const { data: vehicleModels, isLoading: isVehicleModelsLoading } = useQuery({
    queryKey: ['vehicles', 'models', form.watch('model')],
    queryFn: () => getVehicleModels(form.watch('model'))
  });

  const handleOnSubmit = (data: FormProps) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-semibold">VEHICLE INFORMATION</h1>
      <Separator className="my-8 w-full mx-auto md:w-[800px]" />
      <Form {...form}>
        <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Autocomplete
                    isLoading={isVehicleMakesLoading}
                    items={vehicleMakes?.map((make) => ({ label: make as string, value: make as string })) ?? []}
                    placeholder="Select vehicle make"
                    searchValue={field.value}
                    onSearchValueChange={field.onChange}
                    selectedValue={field.value}
                    onSelectedValueChange={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Autocomplete
                    isLoading={isVehicleModelsLoading}
                    items={vehicleModels?.map((model) => ({ label: model as string, value: model as string })) ?? []}
                    placeholder="Select vehicle model"
                    searchValue={field.value}
                    onSearchValueChange={field.onChange}
                    selectedValue={field.value}
                    onSelectedValueChange={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Autocomplete
                    items={VehicleYears?.filter((year) => year.includes(field.value))?.map((year) => ({ label: year, value: year })) ?? []}
                    placeholder="Select vehicle year"
                    searchValue={field.value}
                    onSearchValueChange={field.onChange}
                    selectedValue={field.value}
                    onSelectedValueChange={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Autocomplete
                    items={vehicleColors?.filter((color) => color.includes(field.value))?.map((color) => ({ label: color, value: color })) ?? []}
                    placeholder="Select vehicle color"
                    searchValue={field.value}
                    onSearchValueChange={field.onChange}
                    selectedValue={field.value}
                    onSelectedValueChange={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
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

export default VehicleInformationPage;