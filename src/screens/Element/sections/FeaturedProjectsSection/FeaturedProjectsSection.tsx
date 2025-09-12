import React from "react";
import { Button } from "../../../../components/ui/button";

const projectsData = [
  {
    id: "01",
    company: "ООО «ИНВЕСТ ТРЕЙД»",
    description: "Поставка компании лицензий на АСМОГРАФ",
    isExpanded: false,
    iconSrc: "/icon-2.svg",
  },
  {
    id: "02",
    company: "ООО «НСТЭЦ»",
    description: "Поставка компании лицензий на АСМОГРАФ",
    isExpanded: false,
    iconSrc: "/icon-2.svg",
  },
  {
    id: "03",
    company: "ООО «АРГОС»",
    description: "Поставка компании лицензий на АСМОГРАФ",
    isExpanded: true,
    iconSrc: "/icon-6.svg",
    expandedContent:
      "В рамках программы импортозамещения была успешно осуществлена поставка программного обеспечения АСМОграф. Решение стало ключевым инструментом для оптимизации работы и сокращения зависимости от зарубежных продуктов.",
  },
];

export const FeaturedProjectsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-10 relative">
      <h2 className="relative self-stretch mt-[-1.00px] font-1920-h2 font-[number:var(--1920-h2-font-weight)] text-black text-[length:var(--1920-h2-font-size)] tracking-[var(--1920-h2-letter-spacing)] leading-[var(--1920-h2-line-height)] [font-style:var(--1920-h2-font-style)]">
        ВЫПОЛНЕННЫЕ ПРОЕКТЫ
      </h2>

      <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex flex-col items-start relative flex-[0_0_auto] w-full">
          {projectsData.map((project, index) => (
            <div key={project.id}>
              {!project.isExpanded ? (
                <div className="flex w-full items-start p-5 relative flex-[0_0_auto] bg-white border-b [border-bottom-style:solid] border-[#acbdff]">
                  <div className="flex items-center gap-5 pl-0 pr-5 py-0 relative flex-1 grow">
                    <div className="relative w-[540px] mt-[-1.00px] font-1920-txt font-[number:var(--1920-txt-font-weight)] text-black text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]">
                      {project.id}
                    </div>

                    <div className="relative flex-1 mt-[-1.00px] font-1920-h4 font-[number:var(--1920-h4-font-weight)] text-black text-[length:var(--1920-h4-font-size)] tracking-[var(--1920-h4-letter-spacing)] leading-[var(--1920-h4-line-height)] [font-style:var(--1920-h4-font-style)]">
                      {project.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-[30px] relative flex-1 grow">
                    <div className="flex-1 font-1920-h5 font-[number:var(--1920-h5-font-weight)] text-black relative mt-[-1.00px] text-[length:var(--1920-h5-font-size)] tracking-[var(--1920-h5-letter-spacing)] leading-[var(--1920-h5-line-height)] [font-style:var(--1920-h5-font-style)]">
                      {project.description}
                    </div>

                    <img
                      className="relative w-5 h-5"
                      alt="Icon"
                      src={project.iconSrc}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full h-[440px] items-start gap-5 p-5 relative border-b [border-bottom-style:solid] border-[#acbdff] bg-[linear-gradient(0deg,rgba(20,57,191,1)_0%,rgba(3,11,57,1)_100%),url(../project.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(20,57,191,1)_0%,rgba(3,11,57,1)_100%)]">
                  <div className="items-start self-stretch w-full flex-[0_0_auto] flex relative">
                    <div className="h-6 items-center gap-5 pl-0 pr-5 py-0 flex-1 grow flex relative">
                      <div className="relative w-[540px] font-1920-txt font-[number:var(--1920-txt-font-weight)] text-white text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]">
                        {project.id}
                      </div>

                      <div className="relative flex-1 font-1920-h4 font-[number:var(--1920-h4-font-weight)] text-white text-[length:var(--1920-h4-font-size)] tracking-[var(--1920-h4-letter-spacing)] leading-[var(--1920-h4-line-height)] [font-style:var(--1920-h4-font-style)]">
                        {project.company}
                      </div>
                    </div>

                    <div className="flex items-center gap-[30px] relative flex-1 grow">
                      <div className="relative flex-1 mt-[-1.00px] font-1920-h5 font-[number:var(--1920-h5-font-weight)] text-white text-[length:var(--1920-h5-font-size)] tracking-[var(--1920-h5-letter-spacing)] leading-[var(--1920-h5-line-height)] [font-style:var(--1920-h5-font-style)]">
                        {project.description}
                      </div>

                      <img
                        className="relative w-5 h-5"
                        alt="Icon"
                        src={project.iconSrc}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2.5 pl-[840px] pr-[380px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative w-[460px] mt-[-1.00px] font-1920-txt font-[number:var(--1920-txt-font-weight)] text-white text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]">
                      {project.expandedContent}
                    </div>

                    <Button className="inline-flex justify-center p-5 flex-[0_0_auto] bg-white items-center gap-2.5 relative h-auto hover:bg-gray-100">
                      <div className="relative w-fit mt-[-1.00px] font-1920-button font-[number:var(--1920-button-font-weight)] text-black text-[length:var(--1920-button-font-size)] tracking-[var(--1920-button-letter-spacing)] leading-[var(--1920-button-line-height)] whitespace-nowrap [font-style:var(--1920-button-font-style)]">
                        Читать подробнее
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button className="flex justify-center p-5 self-stretch w-full flex-[0_0_auto] bg-black items-center gap-2.5 relative h-auto hover:bg-gray-800">
          <div className="relative w-fit mt-[-1.00px] font-1920-button font-[number:var(--1920-button-font-weight)] text-white text-[length:var(--1920-button-font-size)] tracking-[var(--1920-button-letter-spacing)] leading-[var(--1920-button-line-height)] whitespace-nowrap [font-style:var(--1920-button-font-style)]">
            Смотреть все проекты
          </div>
        </Button>
      </div>
    </section>
  );
};
