import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { useStatsStore } from "../model";

import type { ReactNode } from "react";

interface AccordionItemProps {
  children: ReactNode;
  value: string;
}

const AccordionItem = (props: AccordionItemProps) => {
  const { children, value } = props;

  return (
    <Accordion.Item
      className="focus-within:shadow-base-content mt-px overflow-hidden first:mt-0 first:rounded-t-xl last:rounded-b-xl focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]"
      value={value}
    >
      {children}
    </Accordion.Item>
  );
};

interface AccordionTriggerProps {
  children: ReactNode;
}

const AccordionTrigger = (props: AccordionTriggerProps) => {
  const { children } = props;

  return (
    <Accordion.Header className="flex">
      <Accordion.Trigger className="group text-base-content hover:bg-base-300 bg-base-200 flex h-16 flex-1 items-center justify-between px-6 text-lg font-semibold outline-none">
        {children}
        <ChevronDownIcon
          className="text-base-content size-8 transition-transform duration-300 ease-in group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  );
};

interface AccordionContentProps {
  children: ReactNode;
}

const AccordionContent = (props: AccordionContentProps) => {
  const { children } = props;

  return (
    <Accordion.Content className="bg-base-200 text-base-content overflow-hidden">
      <div className="p-5">{children}</div>
    </Accordion.Content>
  );
};

const StatsAccordion = () => {
  const { topics } = useStatsStore((state) => state);

  return (
    <Accordion.Root
      className="bg-base-200 w-4/5 max-w-xl rounded-xl"
      type="multiple"
    >
      {topics.map((topic) => (
        <AccordionItem value={topic} key={topic}>
          <AccordionTrigger>{topic}</AccordionTrigger>
          <AccordionContent>
            {`Краткая статистика по продукту ${topic}.`}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion.Root>
  );
};

export { StatsAccordion };
