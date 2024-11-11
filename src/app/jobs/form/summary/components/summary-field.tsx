import { createContext, PropsWithChildren, ReactNode, useContext } from 'react';

import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Textarea as ShadTextarea } from '@/components/ui/textarea';

import { Pencil } from 'lucide-react';

type SummaryField = {
  title: string;
  value: string;
  href?: string;
};

type SummaryFieldContext = {
  summaryField: SummaryField;
};

const SummaryFieldContext = createContext<SummaryFieldContext | undefined>(undefined);

function useSummaryFieldContext() {
  const context = useContext(SummaryFieldContext);
  if (!context) {
    throw new Error('useSummaryFieldContext must be used within a SummaryFieldContextProvider');
  }
  return context;
}

type SummaryFieldProps = React.HTMLAttributes<HTMLDivElement> &
  SummaryFieldContext & {
    children?: ReactNode;
  };

function SummaryField({ summaryField, children, className }: SummaryFieldProps) {
  return (
    <SummaryFieldContext.Provider value={{ summaryField }}>
      <div className={className}>
        <div className="flex flex-row items-center justify-between mb-2">
          <SummaryField.Title />
          {summaryField.href && <SummaryField.EditLink />}
        </div>
        {children}
      </div>
    </SummaryFieldContext.Provider>
  );
}

export default SummaryField;

SummaryField.Title = function () {
  const { summaryField } = useSummaryFieldContext();
  return <h2 className="text-lg font-semibold">{summaryField.title}</h2>;
};

SummaryField.EditLink = function () {
  const { summaryField } = useSummaryFieldContext();
  return (
    <Link href={summaryField.href!} className="text-sm">
      <Pencil className="w-3 h-3 mr-1 inline" /> Edit
    </Link>
  );
};

SummaryField.Input = function () {
  const { summaryField } = useSummaryFieldContext();
  return <Input disabled value={summaryField.value} />;
};

SummaryField.Textarea = function () {
  const { summaryField } = useSummaryFieldContext();
  return <ShadTextarea disabled value={summaryField.value} />;
};
