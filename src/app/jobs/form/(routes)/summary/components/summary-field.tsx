import { createContext, ReactNode, useContext } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea as ShadTextarea } from '@/components/ui/textarea';

import { Pencil } from 'lucide-react';

type SummaryField = {
  title: string;
  value: string;
  onEdit?: () => void;
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
          {summaryField.onEdit && <SummaryField.EditLink />}
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
  const action = summaryField.onEdit as () => void;
  return (
    <Button className="text-sm text-black hover:no-underline" variant="link" onClick={() => action()}>
      <Pencil className="w-3 h-3 mr-1 inline" /> Edit
    </Button>
  );
};

SummaryField.Input = function () {
  const { summaryField } = useSummaryFieldContext();
  return <Input disabled value={summaryField.value} className="disabled:opacity-100" />;
};

SummaryField.Textarea = function () {
  const { summaryField } = useSummaryFieldContext();
  return <ShadTextarea disabled value={summaryField.value} className="disabled:opacity-100" />;
};
