import axios from "axios";
import { Accordion } from "radix-ui";
import { useEffect } from "react";
import Plot from "react-plotly.js";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { usePollingStore } from "@/entities/polling";

import { useStatsStore, type StatsState } from "../model";

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
      <div className="flex flex-col p-5">{children}</div>
    </Accordion.Content>
  );
};

const StatsAccordion = () => {
  const { uuid, topics, nums, figure, update } = useStatsStore(
    (state) => state,
  );
  const { isPolling, progress } = usePollingStore((state) => state);

  useEffect(() => {
    if (!isPolling && progress === 100) {
      axios.post("/render", { uuid }).then((response) => {
        if (response.status === 200) {
          update(response.data as unknown as Partial<StatsState>);
        }
      });
    }
  }, [isPolling, progress, update, uuid]);

  return (
    <div className="flex w-4/5 max-w-4xl flex-col items-center justify-center gap-4">
      <span className="text-base-content text-2xl font-semibold">
        Статистика отзывов
      </span>
      <Plot {...figure} />
      <Accordion.Root className="bg-base-200 w-full rounded-xl" type="multiple">
        {topics.map((topic, index) => (
          <AccordionItem value={topic} key={index}>
            <AccordionTrigger>{topic}</AccordionTrigger>
            <AccordionContent>
              {`Краткая статистика по продукту ${topic}.`}
              <Plot
                className="self-center"
                data={[
                  {
                    values: [
                      nums[index].num_positives,
                      nums[index].num_neutral,
                      nums[index].num_negatives,
                    ],
                    labels: ["Положительные", "Нейтральные", "Негативные"],
                    type: "pie",
                    textinfo: "label+percent",
                  },
                ]}
                layout={{
                  width: 360,
                  height: 240,
                  paper_bgcolor: "rgba(0,0,0,0)",
                  plot_bgcolor: "rgba(0,0,0,0)",
                }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion.Root>
    </div>
  );
};

export { StatsAccordion };
