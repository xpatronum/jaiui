import { Accordion } from "radix-ui";
import { useEffect } from "react";
import Plot from "react-plotly.js";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { usePollingStore } from "@/entities/polling";
import { api } from "@/shared/api";

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
      <div className="flex flex-row items-center justify-center p-4">
        {children}
      </div>
    </Accordion.Content>
  );
};

const StatsAccordion = () => {
  const { uuid, topics, nums, samples, figure, update } = useStatsStore(
    (state) => state,
  );
  const { isPolling, progress } = usePollingStore((state) => state);

  useEffect(() => {
    if (!isPolling && progress === 100) {
      api.post("/render", { uuid }).then((response) => {
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
              <Plot
                className="self-center"
                data={[
                  {
                    values: [
                      nums[index].num_positives,
                      nums[index].num_negatives,
                      nums[index].num_neutral,
                    ],
                    labels: ["Позитивные", "Негативные", "Нейтральные"],
                    marker: { colors: ["#10B981", "#EF4444", "#6B7280"] },
                    type: "pie",
                    textinfo: "label+percent",
                  },
                ]}
                layout={{
                  width: 480,
                  height: 480,
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                  font: {
                    color: "#FFFFFF",
                  },
                  margin: {
                    t: 160,
                  },
                  showlegend: false,
                  title: {
                    text: "Общее количество отзывов",
                    font: { color: "#FFFFFF", size: 18 },
                  },
                }}
                config={{
                  displayModeBar: false,
                  displaylogo: false,
                  responsive: true,
                }}
              />
              <div className="flex grow flex-col gap-8">
                <header className="text-lg font-semibold">
                  Популярные отзывы
                </header>
                {samples[index].samples_positives.length > 0 && (
                  <ul className="flex w-full flex-col gap-2">
                    {samples[index].samples_positives
                      .slice(0, 3)
                      .map((sample, sampleIndex) => (
                        <li
                          key={`${index}+${sampleIndex}`}
                          className="rounded-xl bg-[#10B981] p-2"
                        >
                          {`${sample.slice(0, 30)}...`}
                        </li>
                      ))}
                  </ul>
                )}
                {samples[index].samples_negatives.length > 0 && (
                  <ul className="flex w-full flex-col gap-2">
                    {samples[index].samples_negatives
                      .slice(0, 3)
                      .map((sample, sampleIndex) => (
                        <li
                          key={`${index}-${sampleIndex}`}
                          className="rounded-xl bg-[#EF4444] p-2"
                        >
                          {`${sample.slice(0, 30)}...`}
                        </li>
                      ))}
                  </ul>
                )}
                {samples[index].samples_neutral.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {samples[index].samples_neutral
                      .slice(0, 3)
                      .map((sample, sampleIndex) => (
                        <li
                          key={`${index}_${sampleIndex}`}
                          className="rounded-xl bg-[#6B7280] p-2"
                        >
                          {`${sample.slice(0, 30)}...`}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion.Root>
    </div>
  );
};

export { StatsAccordion };
