import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Location = {
  lat: number;
  lng: number;
  address: string;
};

type Vehicle = {
  make: string;
  model: string;
  year: string;
  color: string;
  registrationNo: string;
};

type Customer = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type Job = {
  towLocation: Location;
  towDestination: Location;
  vehicle: Vehicle;
  customer: Customer;
  note?: string | undefined;
};

type StepName = 'find-me' | 'tow-location' | 'tow-destination' | 'vehicle-information' | 'customer-information' | 'add-note' | 'service-type' | 'summary';

type Step = {
  index: number;
  name: StepName;
  href: string;
};

export const Steps: Step[] = [
  {
    index: 0,
    name: 'find-me',
    href: '/jobs/find-me'
  },
  {
    index: 1,
    name: 'tow-location',
    href: '/jobs/form/tow-location'
  },
  {
    index: 2,
    name: 'tow-destination',
    href: '/jobs/form/tow-destination'
  },
  {
    index: 3,
    name: 'vehicle-information',
    href: '/jobs/form/vehicle-information'
  },
  {
    index: 4,
    name: 'customer-information',
    href: '/jobs/form/customer-information'
  },
  {
    index: 5,
    name: 'add-note',
    href: '/jobs/form/add-note'
  },
  {
    index: 6,
    name: 'service-type',
    href: '/jobs/form/service-type'
  },
  {
    index: 7,
    name: 'summary',
    href: '/jobs/form/summary'
  }
];

type JobFormState = {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  job: Job;
  setTowLocation: (location: Location) => void;
  setTowDestination: (location: Location) => void;
  setVehicle: (vehicle: Vehicle) => void;
  setCustomer: (customer: Customer) => void;
  setNote: (note: string | undefined) => void;
};

const DEFAULT_JOB: Job = {
  towLocation: {
    lat: 23.588,
    lng: 58.3829,
    address: 'Muscat, Oman'
  },
  towDestination: {
    lat: 23.588,
    lng: 58.3829,
    address: 'Muscat, Oman'
  },
  vehicle: {
    make: '',
    model: '',
    year: '',
    color: '',
    registrationNo: ''
  },
  customer: {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  },
  note: ''
};

export const useJobFormStore = create<JobFormState>()(
  persist(
    (set) => ({
      currentStep: Steps[0],
      setCurrentStep(step) {
        set({ currentStep: step });
      },
      job: DEFAULT_JOB,
      setTowLocation: (location) => set((state) => ({ job: { ...state.job, towLocation: location } })),
      setTowDestination: (location) => set((state) => ({ job: { ...state.job, towDestination: location } })),
      setVehicle: (vehicle) => set((state) => ({ job: { ...state.job, vehicle } })),
      setCustomer: (customer) => set((state) => ({ job: { ...state.job, customer } })),
      setNote: (note) => set((state) => ({ job: { ...state.job, note } }))
    }),
    { name: 'jobFormStore' }
  )
);
