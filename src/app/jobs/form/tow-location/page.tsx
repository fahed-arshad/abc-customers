'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { GoogleMap, Libraries, useJsApiLoader, Marker, Autocomplete, useGoogleMap } from '@react-google-maps/api';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const libraries: Libraries = ['places'];

export const defaultMapContainerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: '15px 0px 0px 15px'
};

const defaultMapCenter = {
  lat: 35.8799866,
  lng: 76.5048004
};

const defaultMapZoom = 15;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: 'auto',
  mapTypeId: 'roadmap'
};

const formSchema = z.object({
  //   towLocation: z.object({
  //     lat: z.number({ invalid_type_error: 'Numbers only' }).min(1),
  //     lng: z.number({ invalid_type_error: 'Numbers only' }).min(1)
  //   })
  towLocation: z.string()
});

type FormProps = z.infer<typeof formSchema>;

function TowLocationPage() {
  const autocompleteRef = useRef<HTMLInputElement>(null);
  //   const map = useGoogleMap();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries: libraries
  });

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    values: { towLocation: '' }
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;

  if (!isLoaded) return <p>Map Script is loading ...</p>;

  return (
    <div>
      <div className="py-8">
        <h1 className="text-4xl text-center font-semibold">Tow Location</h1>
      </div>

      <div className="relative">
        <GoogleMap mapContainerStyle={defaultMapContainerStyle} center={defaultMapCenter} zoom={defaultMapZoom} options={defaultMapOptions}>
          {/* Child components, such as markers, info windows, etc. */}
          <Marker
            position={defaultMapCenter}
            draggable
            onDragEnd={(e) => {
              console.log(e.latLng?.lat());
            }}
          />
        </GoogleMap>
        <Form {...form}>
          <form
            className="space-y-4 absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] rounded-lg z-10"
            onSubmit={form.handleSubmit((values) => {
              console.log('values', values);
            })}
          >
            <FormField
              control={form.control}
              name="towLocation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Autocomplete
                      onPlaceChanged={() => {
                        console.log('place changed', autocompleteRef.current?.value);
                      }}
                    >
                      <Input
                        autoFocus
                        ref={autocompleteRef}
                        placeholder="Enter an address or location"
                        onKeyDown={(e) => {
                          console.log('key down', e.currentTarget.value);
                          form.setValue('towLocation', e.currentTarget.value);
                        }}
                        // onMouseDown={(e) => {
                        //   console.log('mouse down', e.currentTarget.value);
                        //   form.setValue('towLocation', e.currentTarget.value);
                        // }}
                        onSelect={(e) => {
                          console.log('select', e.currentTarget.value);
                          form.setValue('towLocation', e.currentTarget.value);
                        }}
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        // {...field}
                      />
                    </Autocomplete>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="absolute top-72 font-semibold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Confirm Location <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default TowLocationPage;
